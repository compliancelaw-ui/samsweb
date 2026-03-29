import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = supabaseAdmin()

    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    // Run summary queries in parallel
    const [
      allDonations,
      thisMonthDonations,
      recurringCount,
      oneTimeCount,
      recentDonations,
    ] = await Promise.all([
      // Total raised (all successful donations)
      db.from('donations')
        .select('amount_cents, donor_email')
        .neq('status', 'cancelled'),

      // This month total
      db.from('donations')
        .select('amount_cents')
        .neq('status', 'cancelled')
        .gte('created_at', monthStart),

      // Active recurring (distinct subscriptions)
      db.from('donations')
        .select('stripe_subscription_id')
        .eq('donation_type', 'recurring')
        .neq('status', 'cancelled')
        .not('stripe_subscription_id', 'is', null),

      // One-time count
      db.from('donations')
        .select('*', { count: 'exact', head: true })
        .eq('donation_type', 'one-time')
        .neq('status', 'cancelled'),

      // Recent 20 donations
      db.from('donations')
        .select('id, created_at, donor_name, donor_email, amount_cents, currency, donation_type, is_anonymous, status, campaign')
        .order('created_at', { ascending: false })
        .limit(20),
    ])

    // Calculate totals from the fetched rows
    const totalRaised = (allDonations.data || []).reduce(
      (sum, d) => sum + (d.amount_cents || 0),
      0
    )

    const thisMonthTotal = (thisMonthDonations.data || []).reduce(
      (sum, d) => sum + (d.amount_cents || 0),
      0
    )

    // Distinct active subscriptions
    const uniqueSubscriptions = new Set(
      (recurringCount.data || [])
        .map((d) => d.stripe_subscription_id)
        .filter(Boolean)
    )
    const activeRecurring = uniqueSubscriptions.size

    const allCount = (allDonations.data || []).length
    const donorEmails = new Set(
      (allDonations.data || []).map((d) => d.donor_email).filter(Boolean)
    )

    const averageDonation = allCount > 0 ? Math.round(totalRaised / allCount) : 0

    // Monthly totals for last 6 months
    const monthlyTotals: { month: string; total: number }[] = []
    for (let i = 5; i >= 0; i--) {
      const mStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const mEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      const label = mStart.toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      })

      const { data: mData } = await db
        .from('donations')
        .select('amount_cents')
        .neq('status', 'cancelled')
        .gte('created_at', mStart.toISOString())
        .lt('created_at', mEnd.toISOString())

      const mTotal = (mData || []).reduce(
        (sum, d) => sum + (d.amount_cents || 0),
        0
      )
      monthlyTotals.push({ month: label, total: mTotal })
    }

    return NextResponse.json({
      summary: {
        total_raised: totalRaised,
        this_month: thisMonthTotal,
        recurring_count: activeRecurring,
        one_time_count: oneTimeCount.count || 0,
        donor_count: donorEmails.size,
        average_donation: averageDonation,
      },
      recent: recentDonations.data || [],
      monthly: monthlyTotals,
    })
  } catch (error) {
    console.error('Admin donations error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donation data' },
      { status: 500 }
    )
  }
}
