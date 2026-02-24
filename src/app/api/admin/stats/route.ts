import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = supabaseAdmin()

    // Run all count queries in parallel using head: true for efficiency
    const [
      oathsTotal,
      oathsThisMonth,
      storiesTotal,
      storiesPending,
      storiesPublished,
      unreadMessages,
      subscribers,
      supporting,
      supporter,
      hope,
      ambassadorCount,
    ] = await Promise.all([
      db.from('oath_submissions').select('*', { count: 'exact', head: true }),
      db.from('oath_submissions').select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
      db.from('story_submissions').select('*', { count: 'exact', head: true }),
      db.from('story_submissions').select('*', { count: 'exact', head: true })
        .eq('status', 'pending'),
      db.from('story_submissions').select('*', { count: 'exact', head: true })
        .eq('status', 'published'),
      db.from('contact_messages').select('*', { count: 'exact', head: true })
        .eq('is_read', false),
      db.from('newsletter_subscribers').select('*', { count: 'exact', head: true })
        .eq('is_active', true),
      db.from('oath_submissions').select('*', { count: 'exact', head: true })
        .eq('category', 'supporting'),
      db.from('oath_submissions').select('*', { count: 'exact', head: true })
        .eq('category', 'supporter'),
      db.from('oath_submissions').select('*', { count: 'exact', head: true })
        .eq('category', 'hope'),
      db.from('ambassador_applications').select('*', { count: 'exact', head: true }),
    ])

    // Fetch recent activity from multiple tables
    const [recentOaths, recentStories, recentMessages] = await Promise.all([
      db.from('oath_submissions')
        .select('id, created_at, display_name, category, city, state')
        .order('created_at', { ascending: false })
        .limit(5),
      db.from('story_submissions')
        .select('id, created_at, display_name, title, status')
        .order('created_at', { ascending: false })
        .limit(5),
      db.from('contact_messages')
        .select('id, created_at, sender_name, subject, is_read')
        .order('created_at', { ascending: false })
        .limit(5),
    ])

    // Merge and sort recent activity
    const activity = [
      ...(recentOaths.data || []).map((o) => ({
        id: o.id,
        type: 'oath' as const,
        created_at: o.created_at,
        summary: `${o.display_name} took Sam's OATH from ${o.city}, ${o.state}`,
      })),
      ...(recentStories.data || []).map((s) => ({
        id: s.id,
        type: 'story' as const,
        created_at: s.created_at,
        summary: `${s.display_name || 'Someone'} submitted "${s.title}"`,
      })),
      ...(recentMessages.data || []).map((m) => ({
        id: m.id,
        type: 'message' as const,
        created_at: m.created_at,
        summary: `${m.sender_name} sent a message: "${m.subject}"`,
      })),
    ]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)

    return NextResponse.json({
      stats: {
        total_oaths: oathsTotal.count || 0,
        oaths_this_month: oathsThisMonth.count || 0,
        total_stories: storiesTotal.count || 0,
        pending_stories: storiesPending.count || 0,
        published_stories: storiesPublished.count || 0,
        unread_messages: unreadMessages.count || 0,
        newsletter_subscribers: subscribers.count || 0,
        ambassadors: ambassadorCount.count || 0,
        category_breakdown: {
          supporting: supporting.count || 0,
          supporter: supporter.count || 0,
          hope: hope.count || 0,
        },
      },
      activity,
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
