import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { storySchema } from '@/lib/validators'
import { notifyAdmin } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12', 10)))
    const offset = (page - 1) * limit

    // Get total count of published stories
    const { count, error: countError } = await supabaseAdmin()
      .from('story_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')

    if (countError) {
      console.error('Stories count error:', countError)
      return NextResponse.json(
        { error: 'Failed to fetch stories' },
        { status: 500 }
      )
    }

    const total = count || 0
    const totalPages = Math.ceil(total / limit)

    // Fetch published stories with public fields only
    const { data: stories, error } = await supabaseAdmin()
      .from('story_submissions')
      .select('id, author_name, author_city, author_state, title, excerpt, slug, published_at, is_featured, author_relation')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Stories fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch stories' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      stories,
      total,
      page,
      totalPages,
    })
  } catch (error) {
    console.error('Stories GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const result = storySchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data

    // Insert story with pending status
    const { data: story, error } = await supabaseAdmin()
      .from('story_submissions')
      .insert({
        ...data,
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Story insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save story' },
        { status: 500 }
      )
    }

    // Notify admin about new story submission
    notifyAdmin(
      'New story submitted',
      `<strong>${data.author_name}</strong> submitted a story: "${data.title}". It's pending your review.`
    )

    return NextResponse.json(
      { id: story.id, message: 'Story submitted successfully and is pending review.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Stories POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
