import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

const VALID_CONTENT_TYPES = ['oath', 'story', 'page'] as const
const VALID_PLATFORMS = ['facebook', 'linkedin', 'x', 'tiktok', 'instagram', 'copy-link'] as const

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { content_type, content_id, platform } = body

    // Basic validation
    if (!content_type || !platform) {
      return NextResponse.json(
        { error: 'content_type and platform are required' },
        { status: 400 }
      )
    }

    if (!VALID_CONTENT_TYPES.includes(content_type)) {
      return NextResponse.json(
        { error: `content_type must be one of: ${VALID_CONTENT_TYPES.join(', ')}` },
        { status: 400 }
      )
    }

    if (!VALID_PLATFORMS.includes(platform)) {
      return NextResponse.json(
        { error: `platform must be one of: ${VALID_PLATFORMS.join(', ')}` },
        { status: 400 }
      )
    }

    const referrer_url = request.headers.get('referer') || null

    try {
      const sb = supabaseAdmin()
      const { error } = await sb.from('share_events').insert({
        content_type,
        content_id: content_id || null,
        platform,
        referrer_url,
      })

      if (error) {
        // Table might not exist yet - log and return success anyway
        console.warn('[share-track] Supabase insert failed (table may not exist yet):', error.message)
        return NextResponse.json({ ok: true, stored: false })
      }

      return NextResponse.json({ ok: true, stored: true })
    } catch (dbError) {
      // DB connection issues - log and return success
      console.warn('[share-track] Database error:', dbError)
      return NextResponse.json({ ok: true, stored: false })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
