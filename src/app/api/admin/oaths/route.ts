import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

// GET /api/admin/oaths — list all oath submissions with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)))
    const offset = (page - 1) * limit
    const category = searchParams.get('category')
    const state = searchParams.get('state')

    let query = supabaseAdmin()
      .from('oath_submissions')
      .select('id, created_at, first_name, last_name, display_name, category, city, state, pin_color, email, latitude, longitude, message, name_display_type', { count: 'exact' })

    if (category) query = query.eq('category', category)
    if (state) query = query.eq('state', state.toUpperCase())

    const { data: oaths, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Admin oaths fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch oaths' }, { status: 500 })
    }

    return NextResponse.json({
      oaths,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (error) {
    console.error('Admin oaths GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/oaths — delete one or more oath submissions
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const ids: string[] = Array.isArray(body.ids) ? body.ids : [body.id].filter(Boolean)

    if (ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 })
    }

    const { error } = await supabaseAdmin()
      .from('oath_submissions')
      .delete()
      .in('id', ids)

    if (error) {
      console.error('Admin oaths delete error:', error)
      return NextResponse.json({ error: 'Failed to delete oaths' }, { status: 500 })
    }

    return NextResponse.json({ deleted: ids.length })
  } catch (error) {
    console.error('Admin oaths DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
