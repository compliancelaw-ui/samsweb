import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const rateCheck = checkRateLimit(ip, 'upload', RATE_LIMITS.upload.max, RATE_LIMITS.upload.window)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many uploads. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.resetIn) } }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Accepted: JPG, PNG, WebP.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5 MB.' },
        { status: 400 }
      )
    }

    // Generate a unique filename
    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `stories/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())

    const { error } = await supabaseAdmin()
      .storage
      .from('uploads')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('Storage upload error:', error)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    const { data: urlData } = supabaseAdmin()
      .storage
      .from('uploads')
      .getPublicUrl(filename)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
