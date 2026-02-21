import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

// GET /api/blog — list published blog posts (public) or all posts (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12', 10)))
    const offset = (page - 1) * limit
    const showAll = searchParams.get('all') === 'true' // admin usage

    let query = supabaseAdmin()
      .from('blog_posts')
      .select('id, title, slug, excerpt, author, published_at, featured_image, tags, status, created_at', { count: 'exact' })

    if (!showAll) {
      query = query.eq('status', 'published').not('published_at', 'is', null)
    }

    const { data: posts, count, error } = await query
      .order('published_at', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Blog fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }

    return NextResponse.json({
      posts,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (error) {
    console.error('Blog GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
