import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

// GET /api/admin/stories — list all stories with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)))
    const offset = (page - 1) * limit
    const status = searchParams.get('status')

    let query = supabaseAdmin()
      .from('story_submissions')
      .select('*', { count: 'exact' })

    if (status) query = query.eq('status', status)

    const { data: stories, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Admin stories fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
    }

    return NextResponse.json({
      stories,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (error) {
    console.error('Admin stories GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/admin/stories — update story status or featured flag
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, is_featured } = body

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const updates: Record<string, unknown> = {}

    if (status !== undefined) {
      const validStatuses = ['pending', 'approved', 'published', 'rejected']
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
      }
      updates.status = status
      if (status === 'published') {
        updates.published_at = new Date().toISOString()
      }
    }

    if (is_featured !== undefined) {
      updates.is_featured = Boolean(is_featured)
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 })
    }

    const { error } = await supabaseAdmin()
      .from('story_submissions')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error('Admin stories update error:', error)
      return NextResponse.json({ error: 'Failed to update story' }, { status: 500 })
    }

    return NextResponse.json({ updated: true })
  } catch (error) {
    console.error('Admin stories PATCH error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/stories — delete one or more stories
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const ids: string[] = Array.isArray(body.ids) ? body.ids : [body.id].filter(Boolean)

    if (ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 })
    }

    const { error } = await supabaseAdmin()
      .from('story_submissions')
      .delete()
      .in('id', ids)

    if (error) {
      console.error('Admin stories delete error:', error)
      return NextResponse.json({ error: 'Failed to delete stories' }, { status: 500 })
    }

    return NextResponse.json({ deleted: ids.length })
  } catch (error) {
    console.error('Admin stories DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
