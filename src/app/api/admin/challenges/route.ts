import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = supabaseAdmin()

    // ----- Stats -----
    let totalReferrals = 0
    let uniqueReferrers = 0
    let totalOaths = 0

    try {
      // Total oaths (for conversion rate denominator)
      const { count: oathCount } = await db
        .from('oath_submissions')
        .select('*', { count: 'exact', head: true })

      totalOaths = oathCount || 0

      // Total successful referrals (oaths where referred_by is not null)
      const { count: referralCount } = await db
        .from('oath_submissions')
        .select('*', { count: 'exact', head: true })
        .not('referred_by', 'is', null)

      totalReferrals = referralCount || 0

      // Unique referrers (distinct referred_by values)
      const { data: referrerRows } = await db
        .from('oath_submissions')
        .select('referred_by')
        .not('referred_by', 'is', null)

      if (referrerRows) {
        const unique = new Set(referrerRows.map((r: { referred_by: string }) => r.referred_by))
        uniqueReferrers = unique.size
      }
    } catch {
      // referral_code / referred_by columns may not exist yet
      totalReferrals = 0
      uniqueReferrers = 0
    }

    const conversionRate =
      totalOaths > 0
        ? Math.round((totalReferrals / totalOaths) * 1000) / 10
        : 0

    // ----- Top referrers -----
    interface TopReferrer {
      referred_by: string
      referral_count: number
      display_name: string
      city: string
      state: string
    }

    let topReferrers: TopReferrer[] = []

    try {
      // Get all referred_by values with counts
      const { data: referralRows } = await db
        .from('oath_submissions')
        .select('referred_by')
        .not('referred_by', 'is', null)

      if (referralRows && referralRows.length > 0) {
        // Count referrals per code
        const countMap: Record<string, number> = {}
        for (const row of referralRows) {
          const code = (row as { referred_by: string }).referred_by
          countMap[code] = (countMap[code] || 0) + 1
        }

        // Sort by count descending, take top 20
        const sorted = Object.entries(countMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 20)

        // Look up each referrer's info by their referral_code
        const referrerCodes = sorted.map(([code]) => code)
        const { data: referrerInfo } = await db
          .from('oath_submissions')
          .select('referral_code, display_name, city, state')
          .in('referral_code', referrerCodes)

        const infoMap: Record<string, { display_name: string; city: string; state: string }> = {}
        if (referrerInfo) {
          for (const r of referrerInfo) {
            const info = r as { referral_code: string; display_name: string; city: string; state: string }
            infoMap[info.referral_code] = {
              display_name: info.display_name,
              city: info.city,
              state: info.state,
            }
          }
        }

        topReferrers = sorted.map(([code, count]) => ({
          referred_by: code,
          referral_count: count,
          display_name: infoMap[code]?.display_name || 'Unknown',
          city: infoMap[code]?.city || '',
          state: infoMap[code]?.state || '',
        }))
      }
    } catch {
      // columns may not exist yet
      topReferrers = []
    }

    // ----- Recent referral activity -----
    interface RecentReferral {
      id: string
      created_at: string
      display_name: string
      city: string
      state: string
      referred_by: string
      referrer_name: string
      referrer_city: string
      referrer_state: string
    }

    let recentReferrals: RecentReferral[] = []

    try {
      const { data: recentRows } = await db
        .from('oath_submissions')
        .select('id, created_at, display_name, city, state, referred_by')
        .not('referred_by', 'is', null)
        .order('created_at', { ascending: false })
        .limit(20)

      if (recentRows && recentRows.length > 0) {
        // Look up referrer info for each
        const codeSet = new Set(
          recentRows.map(
            (r: { referred_by: string }) => r.referred_by
          )
        )
        const codes = Array.from(codeSet)
        const { data: referrerInfo } = await db
          .from('oath_submissions')
          .select('referral_code, display_name, city, state')
          .in('referral_code', codes)

        const infoMap: Record<string, { display_name: string; city: string; state: string }> = {}
        if (referrerInfo) {
          for (const r of referrerInfo) {
            const info = r as { referral_code: string; display_name: string; city: string; state: string }
            infoMap[info.referral_code] = {
              display_name: info.display_name,
              city: info.city,
              state: info.state,
            }
          }
        }

        recentReferrals = recentRows.map(
          (row: { id: string; created_at: string; display_name: string; city: string; state: string; referred_by: string }) => ({
            id: row.id,
            created_at: row.created_at,
            display_name: row.display_name,
            city: row.city,
            state: row.state,
            referred_by: row.referred_by,
            referrer_name: infoMap[row.referred_by]?.display_name || 'Unknown',
            referrer_city: infoMap[row.referred_by]?.city || '',
            referrer_state: infoMap[row.referred_by]?.state || '',
          })
        )
      }
    } catch {
      // columns may not exist yet
      recentReferrals = []
    }

    return NextResponse.json({
      stats: {
        total_referrals: totalReferrals,
        unique_referrers: uniqueReferrers,
        conversion_rate: conversionRate,
      },
      top_referrers: topReferrers,
      recent_referrals: recentReferrals,
    })
  } catch (error) {
    console.error('Admin challenges error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch challenge data' },
      { status: 500 }
    )
  }
}
