import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { oathSchema } from '@/lib/validators'
import { geocode } from '@/lib/geocode'
import { OATH_CATEGORIES } from '@/lib/constants'
import { sendOathConfirmation, notifyAdmin } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const result = oathSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data

    // Compute display name based on name_display_type
    let display_name: string
    switch (data.name_display_type) {
      case 'full':
        display_name = data.last_name ? `${data.first_name} ${data.last_name}` : data.first_name
        break
      case 'first':
        display_name = data.first_name
        break
      case 'initials':
        display_name = `${data.first_name.charAt(0)}.${data.last_name ? data.last_name.charAt(0) + '.' : ''}`
        break
      case 'anonymous':
        display_name = 'A Friend of Sam'
        break
      default:
        display_name = data.first_name
    }

    // Geocode the city + state
    const coords = await geocode(data.city, data.state)

    // Determine pin color from category
    const categoryInfo = OATH_CATEGORIES[data.category as keyof typeof OATH_CATEGORIES]
    const pin_color = categoryInfo?.color || '#3EABA8'

    // Get IP address from request headers
    const ip_address =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Insert into oath_submissions
    const { data: submission, error } = await supabaseAdmin()
      .from('oath_submissions')
      .insert({
        first_name: data.first_name,
        last_name: data.last_name || '',
        email: data.email,
        category: data.category,
        city: data.city,
        state: data.state,
        latitude: coords?.lat || null,
        longitude: coords?.lng || null,
        geocoded: !!coords,
        display_name,
        name_display_type: data.name_display_type,
        message: data.message || null,
        email_optin: data.email_optin || false,
        ip_address,
        pin_color,
      })
      .select('id, display_name, pin_color, category')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      )
    }

    // Fire-and-forget emails (don't block the response)
    if (data.email) {
      sendOathConfirmation(data.email, data.first_name)
    }
    notifyAdmin(
      'New OATH taken',
      `<strong>${display_name}</strong> took Sam's OATH from ${data.city}, ${data.state} (${data.category}).`
    )

    return NextResponse.json(
      {
        id: submission.id,
        display_name: submission.display_name,
        pin_color: submission.pin_color,
        category: submission.category,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('OATH submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
