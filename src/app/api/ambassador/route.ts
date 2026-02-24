import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { ambassadorSchema } from '@/lib/validators'
import { notifyAdmin, sendAmbassadorConfirmation } from '@/lib/email'
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
    const rateCheck = checkRateLimit(ip, 'ambassador', RATE_LIMITS.ambassador.max, RATE_LIMITS.ambassador.window)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many applications. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.resetIn) } }
      )
    }

    // Validate request body
    const result = ambassadorSchema.safeParse(body)
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

    // Insert into ambassadors with pending status
    // Map form fields to DB columns (motivation + personal_story → bio)
    const { data: ambassador, error } = await supabaseAdmin()
      .from('ambassadors')
      .insert({
        name: data.name,
        email: data.email,
        city: data.city,
        state: data.state,
        bio: [data.motivation, data.personal_story].filter(Boolean).join('\n\n'),
        social_links: data.social_links || {},
        status: 'pending',
        ...utmFields,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Ambassador insert error:', error)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    // Send confirmation email to applicant (fire-and-forget)
    sendAmbassadorConfirmation(data.email, data.name)

    // Notify admin about new ambassador application
    notifyAdmin(
      'New ambassador application',
      `<strong>${data.name}</strong> from ${data.city}, ${data.state} applied to be an ambassador.`
    )

    return NextResponse.json(
      { id: ambassador.id, message: 'Ambassador application submitted successfully.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Ambassador submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
