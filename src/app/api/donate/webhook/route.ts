import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendDonationThankYou, notifyAdmin } from '@/lib/email'

// Disable body parsing - we need the raw body for webhook signature verification
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(invoice)
        break
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCanceled(subscription)
        break
      }
      default:
        // Unhandled event type - acknowledge receipt
        break
    }
  } catch (err) {
    console.error(`Error handling ${event.type}:`, err)
    // Return 200 anyway to prevent Stripe from retrying
    // The error is logged for investigation
  }

  return NextResponse.json({ received: true }, { status: 200 })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {}
  const donationType = metadata.donation_type || 'one-time'
  const donorEmail = metadata.donor_email || session.customer_email || null
  const donorName = metadata.donor_name || null
  const isAnonymous = metadata.is_anonymous === 'true'
  const campaign = metadata.campaign || 'general'

  const amountCents = session.amount_total || 0

  const { error } = await supabaseAdmin()
    .from('donations')
    .insert({
      donor_email: donorEmail,
      donor_name: donorName,
      amount_cents: amountCents,
      currency: session.currency || 'usd',
      donation_type: donationType,
      stripe_session_id: session.id,
      stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
      stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
      is_anonymous: isAnonymous,
      status: 'completed',
      campaign,
    })

  if (error) {
    console.error('Failed to insert donation record:', error)
  }

  // Send thank-you email
  if (donorEmail) {
    sendDonationThankYou(donorEmail, donorName, amountCents, donationType === 'recurring')
  }

  // Notify admin
  const amount = `$${(amountCents / 100).toFixed(2)}`
  const displayName = isAnonymous ? 'Anonymous' : (donorName || donorEmail || 'Unknown')
  notifyAdmin(
    `New ${donationType} donation: ${amount}`,
    `<strong>${displayName}</strong> donated ${amount} (${donationType})${campaign !== 'general' ? ` for campaign: ${campaign}` : ''}.`
  )
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // This fires for recurring subscription payments after the first one
  // The first payment is handled by checkout.session.completed
  const subDetails = invoice.parent?.subscription_details
  const subscriptionRef = subDetails?.subscription
  const subscriptionId = typeof subscriptionRef === 'string'
    ? subscriptionRef
    : subscriptionRef?.id || null

  if (!subscriptionId) return

  // Check if this is the first invoice (already handled by checkout.session.completed)
  if (invoice.billing_reason === 'subscription_create') return

  const amountCents = invoice.amount_paid || 0
  const donorEmail = invoice.customer_email || null

  const { error } = await supabaseAdmin()
    .from('donations')
    .insert({
      donor_email: donorEmail,
      donor_name: null,
      amount_cents: amountCents,
      currency: invoice.currency || 'usd',
      donation_type: 'recurring',
      stripe_session_id: null,
      stripe_subscription_id: subscriptionId,
      stripe_customer_id: typeof invoice.customer === 'string' ? invoice.customer : null,
      is_anonymous: false,
      status: 'completed',
      campaign: 'general',
    })

  if (error) {
    console.error('Failed to insert recurring donation record:', error)
  }

  // Notify admin of renewal
  const amount = `$${(amountCents / 100).toFixed(2)}`
  notifyAdmin(
    `Recurring donation renewed: ${amount}`,
    `Subscription <code>${subscriptionId}</code> renewed for ${amount}.`
  )
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  // Mark any pending donations for this subscription as canceled
  const { error } = await supabaseAdmin()
    .from('donations')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id)
    .eq('status', 'pending')

  if (error) {
    console.error('Failed to update canceled subscription donations:', error)
  }

  notifyAdmin(
    'Recurring donation canceled',
    `Subscription <code>${subscription.id}</code> has been canceled.`
  )
}
