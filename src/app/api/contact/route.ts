import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { contactSchema } from '@/lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data

    // Determine priority based on contact type and subject
    let priority = 'normal'

    if (data.message_type === 'speaking' || data.message_type === 'workplace') {
      priority = 'high'
    }

    if (data.subject && data.subject.toLowerCase().includes('press')) {
      priority = 'urgent'
    }

    // Get IP address from request headers
    const ip_address =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Insert into contact_messages
    const { error } = await supabaseAdmin()
      .from('contact_messages')
      .insert({
        ...data,
        priority,
        ip_address,
      })

    if (error) {
      console.error('Contact insert error:', error)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Message sent successfully.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
