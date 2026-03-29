import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = supabaseAdmin()

    // --- Share analytics ---
    const shareData = {
      total_shares: 0,
      by_platform: [] as { platform: string; count: number }[],
      by_content_type: [] as { content_type: string; count: number }[],
      daily_30d: [] as { date: string; count: number }[],
      top_content: [] as { content_id: string; count: number }[],
    }

    try {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const [allShares, recentShares] = await Promise.all([
        db.from('share_events').select('platform, content_type, content_id, created_at'),
        db.from('share_events')
          .select('created_at')
          .gte('created_at', thirtyDaysAgo.toISOString()),
      ])

      if (allShares.error) throw allShares.error

      const rows = allShares.data || []
      shareData.total_shares = rows.length

      // Group by platform
      const platformMap: Record<string, number> = {}
      const contentTypeMap: Record<string, number> = {}
      const contentIdMap: Record<string, number> = {}

      for (const row of rows) {
        const p = row.platform || 'unknown'
        platformMap[p] = (platformMap[p] || 0) + 1

        const ct = row.content_type || 'unknown'
        contentTypeMap[ct] = (contentTypeMap[ct] || 0) + 1

        if (row.content_id) {
          contentIdMap[row.content_id] = (contentIdMap[row.content_id] || 0) + 1
        }
      }

      shareData.by_platform = Object.entries(platformMap)
        .map(([platform, count]) => ({ platform, count }))
        .sort((a, b) => b.count - a.count)

      shareData.by_content_type = Object.entries(contentTypeMap)
        .map(([content_type, count]) => ({ content_type, count }))
        .sort((a, b) => b.count - a.count)

      shareData.top_content = Object.entries(contentIdMap)
        .map(([content_id, count]) => ({ content_id, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      // Daily counts for last 30 days
      const dailyMap: Record<string, number> = {}
      const recentRows = recentShares.data || []
      for (const row of recentRows) {
        const day = row.created_at.slice(0, 10)
        dailyMap[day] = (dailyMap[day] || 0) + 1
      }

      // Fill in all 30 days (including zeros)
      const days: { date: string; count: number }[] = []
      for (let i = 29; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const key = d.toISOString().slice(0, 10)
        days.push({ date: key, count: dailyMap[key] || 0 })
      }
      shareData.daily_30d = days
    } catch {
      // share_events table may not exist - return zeros
    }

    // --- Download analytics ---
    const downloadData = {
      total_downloads: 0,
      per_guide: [] as { title: string; slug: string; category: string | null; download_count: number }[],
    }

    try {
      const { data: guides, error } = await db
        .from('resource_documents')
        .select('title, slug, category, download_count')
        .order('download_count', { ascending: false })

      if (error) throw error

      const rows = guides || []
      downloadData.total_downloads = rows.reduce((sum, r) => sum + (r.download_count || 0), 0)
      downloadData.per_guide = rows.map((r) => ({
        title: r.title,
        slug: r.slug,
        category: r.category || null,
        download_count: r.download_count || 0,
      }))
    } catch {
      // resource_documents table may not exist - return zeros
    }

    return NextResponse.json({ shares: shareData, downloads: downloadData })
  } catch (err) {
    console.error('Analytics API error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
