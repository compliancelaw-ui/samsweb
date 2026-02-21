import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { ambassadorSchema } from '@/lib/validators'
import { notifyAdmin } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const result = ambassadorSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data

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
