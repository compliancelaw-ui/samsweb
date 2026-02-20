import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { newsletterSchema } from '@/lib/validators'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const result = newsletterSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data

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
