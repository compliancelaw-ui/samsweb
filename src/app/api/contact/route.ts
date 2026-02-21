import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { contactSchema } from '@/lib/validators'
import { sendContactAutoReply, notifyAdmin } from '@/lib/email'

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

    // Insert into contact_messages
    const { error } = await supabaseAdmin()
      .from('contact_messages')
      .insert({
        sender_name: data.sender_name,
        sender_email: data.sender_email,
        sender_phone: data.sender_phone || null,
        message_type: data.message_type,
        subject: data.subject,
        body: data.body,
        metadata: data.metadata || {},
        priority,
      })

    if (error) {
      console.error('Contact insert error:', error)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    // Fire-and-forget emails
    sendContactAutoReply(data.sender_email, data.sender_name)
    notifyAdmin(
      `New message: ${data.subject}`,
      `<strong>${data.sender_name}</strong> (${data.sender_email}) sent a ${data.message_type} message:<br/><br/>${data.body.slice(0, 500)}`
    )

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
