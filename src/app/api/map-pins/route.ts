import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { STORY_PIN_COLOR } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch geocoded oath submissions
    const { data: oathPins, error: oathError } = await supabaseAdmin()
      .from('oath_submissions')
      .select('id, display_name, category, pin_color, latitude, longitude, city, state')
      .eq('geocoded', true)

    if (oathError) {
      console.error('Oath pins fetch error:', oathError)
      return NextResponse.json(
        { error: 'Failed to fetch map pins' },
        { status: 500 }
      )
    }

    // Fetch published stories that should appear on the map
    const { data: storyPins, error: storyError } = await supabaseAdmin()
      .from('story_submissions')
      .select('id, author_name, author_city, author_state, title, slug, latitude, longitude')
      .eq('show_on_map', true)
      .eq('status', 'published')

    if (storyError) {
      console.error('Story pins fetch error:', storyError)
      return NextResponse.json(
        { error: 'Failed to fetch map pins' },
        { status: 500 }
      )
    }

    // Normalize story pins to match oath pin shape
    const normalizedStoryPins = (storyPins || []).map((story) => ({
      id: story.id,
      display_name: story.author_name,
      category: 'story' as const,
      pin_color: STORY_PIN_COLOR,
      latitude: story.latitude,
      longitude: story.longitude,
      city: story.author_city,
      state: story.author_state,
      title: story.title,
      slug: story.slug,
    }))

    const pins = [...(oathPins || []), ...normalizedStoryPins]

    const response = NextResponse.json({ pins })

    // Cache for 5 minutes, allow stale content for 10 minutes while revalidating
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600'
    )

    return response
  } catch (error) {
    console.error('Map pins error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
