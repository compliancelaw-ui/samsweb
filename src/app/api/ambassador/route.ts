import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { ambassadorSchema } from '@/lib/validators'

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
    const { data: ambassador, error } = await supabaseAdmin()
      .from('ambassadors')
      .insert({
        ...data,
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
