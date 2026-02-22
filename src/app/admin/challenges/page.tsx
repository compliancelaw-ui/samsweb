"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Trophy,
  Users,
  TrendingUp,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

interface ChallengeStats {
  total_referrals: number;
  unique_referrers: number;
  conversion_rate: number;
}

interface TopReferrer {
  referred_by: string;
  referral_count: number;
  display_name: string;
  city: string;
  state: string;
}

interface RecentReferral {
  id: string;
  created_at: string;
  display_name: string;
  city: string;
  state: string;
  referred_by: string;
  referrer_name: string;
  referrer_city: string;
  referrer_state: string;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const STAT_CARDS = [
  {
    key: "total_referrals" as const,
    label: "Total Referrals",
    icon: Trophy,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    key: "unique_referrers" as const,
    label: "Unique Challengers",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary-50",
  },
  {
    key: "conversion_rate" as const,
    label: "Conversion Rate",
    icon: TrendingUp,
    color: "text-teal",
    bg: "bg-teal-50",
    suffix: "%",
  },
];

export default function AdminChallengesPage() {
  const [stats, setStats] = useState<ChallengeStats | null>(null);
  const [topReferrers, setTopReferrers] = useState<TopReferrer[]>([]);
  const [recentReferrals, setRecentReferrals] = useState<RecentReferral[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/challenges");
      if (!res.ok) throw new Error("Failed to fetch challenge data");
      const data = await res.json();
      setStats(data.stats || null);
      setTopReferrers(data.top_referrers || []);
      setRecentReferrals(data.recent_referrals || []);
    } catch {
      console.error("Failed to fetch challenge data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hasData =
    stats &&
    (stats.total_referrals > 0 ||
      topReferrers.length > 0 ||
      recentReferrals.length > 0);

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Challenges &amp; Referrals
          </h2>
          <p className="text-gray-500 mt-1">
            Track how OATH takers are challenging friends and family to join the
            movement.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors self-start"
        >
          <RefreshCw
            className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          const value = stats ? stats[card.key] : null;
          return (
            <div
              key={card.key}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
            >
              <div className={`${card.bg} rounded-lg p-3`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <span className="inline-block w-12 h-7 bg-gray-100 rounded animate-pulse" />
                  ) : (
                    <>
                      {(value ?? 0).toLocaleString()}
                      {"suffix" in card && card.suffix ? card.suffix : ""}
                    </>
                  )}
                </p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {!loading && !hasData && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="bg-amber-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-7 w-7 text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No referrals yet
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            The challenge system will track when OATH takers share their unique
            link and friends sign up. Once people start challenging others,
            you&apos;ll see leaderboards and activity here.
          </p>
        </div>
      )}

      {/* Top Challengers leaderboard */}
      {!loading && topReferrers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Challengers
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Name</div>
              <div className="col-span-3">Location</div>
              <div className="col-span-3 text-right">Referrals</div>
            </div>

            {/* Rows */}
            {topReferrers.map((referrer, index) => (
              <div
                key={referrer.referred_by}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center">
                  {index < 3 ? (
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                        index === 0
                          ? "bg-amber-100 text-amber-700"
                          : index === 1
                          ? "bg-gray-100 text-gray-600"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {index + 1}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500 pl-2">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="col-span-5 flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {referrer.display_name}
                  </span>
                </div>

                {/* Location */}
                <div className="col-span-3 flex items-center text-sm text-gray-600">
                  {referrer.city && referrer.state
                    ? `${referrer.city}, ${referrer.state}`
                    : referrer.city || referrer.state || "--"}
                </div>

                {/* Referrals count */}
                <div className="col-span-3 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-sm font-semibold rounded-full">
                    {referrer.referral_count.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading skeleton for leaderboard */}
      {loading && (
        <div>
          <div className="h-6 w-40 bg-gray-100 rounded animate-pulse mb-4" />
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-4 border-b border-gray-100"
              >
                <div className="w-7 h-7 bg-gray-100 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-50 rounded animate-pulse" />
                </div>
                <div className="h-6 w-10 bg-gray-100 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Referral Activity */}
      {!loading && recentReferrals.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Referral Activity
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {recentReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-amber-50 rounded-lg p-2 flex-shrink-0">
                    <Trophy className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-900">
                        {referral.referrer_name}
                      </span>
                      {referral.referrer_city && referral.referrer_state && (
                        <span className="text-gray-400 text-xs ml-1">
                          ({referral.referrer_city}, {referral.referrer_state})
                        </span>
                      )}
                      <ArrowRight className="inline h-3 w-3 mx-1.5 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {referral.display_name}
                      </span>
                      {referral.city && referral.state && (
                        <span className="text-gray-400 text-xs ml-1">
                          ({referral.city}, {referral.state})
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 flex-shrink-0">
                    {timeAgo(referral.created_at)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading skeleton for recent activity */}
      {loading && (
        <div>
          <div className="h-6 w-48 bg-gray-100 rounded animate-pulse mb-4" />
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-100"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="h-3 w-12 bg-gray-50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
