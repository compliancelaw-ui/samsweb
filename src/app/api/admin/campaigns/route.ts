import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

// GET: Fetch all campaigns + conversion analytics
export async function GET() {
  try {
    // Fetch all campaigns
    const { data: campaigns, error: campError } = await supabaseAdmin()
      .from('ad_campaigns')
      .select('*')
      .order('created_at', { ascending: false })

    if (campError) throw campError

    // Aggregate UTM conversion data from all 5 submission tables
    // For each table, count rows grouped by utm_source, utm_campaign
    const tables = [
      { name: 'oath_submissions', label: 'OATHs' },
      { name: 'story_submissions', label: 'Stories' },
      { name: 'contact_messages', label: 'Messages' },
      { name: 'newsletter_subscribers', label: 'Subscribers' },
      { name: 'ambassadors', label: 'Ambassadors' },
    ]

    // Get UTM-attributed conversions from each table
    const conversionPromises = tables.map(async (table) => {
      const { data, error } = await supabaseAdmin()
        .from(table.name)
        .select('utm_source, utm_medium, utm_campaign')
        .not('utm_source', 'is', null)

      if (error) {
        console.error(`Error fetching ${table.name} UTM data:`, error)
        return { table: table.label, conversions: [] }
      }
      return { table: table.label, conversions: data || [] }
    })

    const conversionData = await Promise.all(conversionPromises)

    // Also get total counts for each table (for conversion rate calculation)
    const totalPromises = tables.map(async (table) => {
      const { count, error } = await supabaseAdmin()
        .from(table.name)
        .select('*', { count: 'exact', head: true })
      return { table: table.label, total: error ? 0 : (count || 0) }
    })

    const totals = await Promise.all(totalPromises)

    return NextResponse.json({ campaigns: campaigns || [], conversions: conversionData, totals })
  } catch (error) {
    console.error('Campaigns GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
  }
}

// POST: Create a new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, error } = await supabaseAdmin()
      .from('ad_campaigns')
      .insert({
        name: body.name,
        platform: body.platform || 'google',
        campaign_type: body.campaign_type || 'search',
        utm_campaign: body.utm_campaign || null,
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        budget: body.budget || null,
        spent: body.spent || 0,
        start_date: body.start_date || null,
        end_date: body.end_date || null,
        status: body.status || 'draft',
        notes: body.notes || null,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Campaign create error:', error)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}

// PUT: Update a campaign
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'Missing campaign id' }, { status: 400 })

    updates.updated_at = new Date().toISOString()

    const { data, error } = await supabaseAdmin()
      .from('ad_campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Campaign update error:', error)
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 })
  }
}

// DELETE: Delete a campaign
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing campaign id' }, { status: 400 })

    const { error } = await supabaseAdmin()
      .from('ad_campaigns')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Campaign delete error:', error)
    return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 })
  }
}
