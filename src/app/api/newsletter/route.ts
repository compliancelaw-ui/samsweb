import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { newsletterSchema } from '@/lib/validators'
import { sendNewsletterWelcome } from '@/lib/email'
import { checkHoneypot } from '@/lib/honeypot'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Anti-spam: honeypot check
    const honeypotResponse = checkHoneypot(body)
    if (honeypotResponse) return honeypotResponse

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const rateCheck = checkRateLimit(ip, 'newsletter', RATE_LIMITS.newsletter.max, RATE_LIMITS.newsletter.window)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.resetIn) } }
      )
    }

    // Validate request body
    const result = newsletterSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data

    // Extract UTM tracking fields (if present)
    const utmFields = {
      ...(body.utm_source && { utm_source: body.utm_source }),
      ...(body.utm_medium && { utm_medium: body.utm_medium }),
      ...(body.utm_campaign && { utm_campaign: body.utm_campaign }),
      ...(body.utm_content && { utm_content: body.utm_content }),
      ...(body.utm_term && { utm_term: body.utm_term }),
    }

    // Upsert into newsletter_subscribers:
    // On email conflict, update first_name and interests, and reactivate the subscription.
    const { error } = await supabaseAdmin()
      .from('newsletter_subscribers')
      .upsert(
        {
          email: data.email,
          first_name: data.first_name,
          interests: data.interests,
          is_active: true,
          ...utmFields,
        },
        {
          onConflict: 'email',
        }
      )

    if (error) {
      console.error('Newsletter upsert error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    // Fire-and-forget welcome email
    sendNewsletterWelcome(data.email, data.first_name ?? null)

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
