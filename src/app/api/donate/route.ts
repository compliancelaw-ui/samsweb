import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { donationSchema } from '@/lib/validators'
import { checkHoneypot } from '@/lib/honeypot'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://samsoath.org'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Anti-spam: honeypot check
    const honeypotResponse = checkHoneypot(body)
    if (honeypotResponse) return honeypotResponse

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const rateCheck = checkRateLimit(ip, 'donate', RATE_LIMITS.donate.max, RATE_LIMITS.donate.window)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.resetIn) } }
      )
    }

    // Validate request body
    const result = donationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data
    const stripe = getStripe()
    const amountCents = Math.round(data.amount * 100)

    // Build common session params
    const metadata = {
      donor_name: data.donor_name || '',
      donor_email: data.donor_email || '',
      is_anonymous: String(data.is_anonymous),
      campaign: data.campaign,
      donation_type: data.donation_type,
    }

    if (data.donation_type === 'recurring') {
      // Create a price for the recurring donation
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: "Sam's OATH Monthly Donation",
                description: 'Monthly recurring donation to support the mission',
              },
              unit_amount: amountCents,
              recurring: { interval: 'month' },
            },
            quantity: 1,
          },
        ],
        customer_email: data.donor_email || undefined,
        metadata,
        subscription_data: {
          metadata,
        },
        success_url: `${SITE_URL}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SITE_URL}/donate`,
      })

      return NextResponse.json({ url: session.url }, { status: 200 })
    }

    // One-time payment
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: "Sam's OATH Donation",
              description: 'One-time donation to support the mission',
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      customer_email: data.donor_email || undefined,
      metadata,
      success_url: `${SITE_URL}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/donate`,
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error) {
    console.error('Donation checkout error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to create checkout session', detail: message },
      { status: 500 }
    )
  }
}
