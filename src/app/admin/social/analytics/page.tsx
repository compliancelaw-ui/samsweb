"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Eye,
  MousePointerClick,
  Heart,
  Share2,
  MessageCircle,
  TrendingUp,
  RefreshCw,
  Loader2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

interface SocialMetrics {
  platform: string;
  impressions: number;
  clicks: number;
  likes: number;
  shares: number;
  comments: number;
  engagementRate: number;
  period: string;
}

const PLATFORM_CONFIG: Record<
  string,
  { color: string; bg: string; border: string; icon: React.ReactNode }
> = {
  Facebook: {
    color: "text-[#1877F2]",
    bg: "bg-[#1877F2]/5",
    border: "border-[#1877F2]/20",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#1877F2]" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  Instagram: {
    color: "text-[#E1306C]",
    bg: "bg-[#E1306C]/5",
    border: "border-[#E1306C]/20",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#E1306C]" aria-hidden="true">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0z" />
      </svg>
    ),
  },
  LinkedIn: {
    color: "text-[#0A66C2]",
    bg: "bg-[#0A66C2]/5",
    border: "border-[#0A66C2]/20",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#0A66C2]" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
};

const ALL_PLATFORMS = ["Facebook", "Instagram", "LinkedIn"];

type TimePeriod = 7 | 30 | 90;

export default function SocialAnalyticsPage() {
  const [metrics, setMetrics] = useState<SocialMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<TimePeriod>(30);

  const fetchMetrics = useCallback(async (days: TimePeriod) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/social/analytics?days=${days}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMetrics(data.metrics || []);
    } catch (err) {
      console.error("Failed to fetch social analytics:", err);
      setMetrics([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics(period);
  }, [period, fetchMetrics]);

  // Aggregate totals across all platforms
  const totals = metrics.reduce(
    (acc, m) => ({
      impressions: acc.impressions + m.impressions,
      clicks: acc.clicks + m.clicks,
      likes: acc.likes + m.likes,
      shares: acc.shares + m.shares,
      comments: acc.comments + m.comments,
      engagement: acc.engagement + m.likes + m.comments + m.shares + m.clicks,
    }),
    { impressions: 0, clicks: 0, likes: 0, shares: 0, comments: 0, engagement: 0 }
  );

  const overallEngagementRate =
    totals.impressions > 0 ? totals.engagement / totals.impressions : 0;

  // Get metrics for a specific platform (or null)
  const getMetricsFor = (platform: string): SocialMetrics | null =>
    metrics.find((m) => m.platform === platform) || null;

  // Format number with locale
  const fmt = (n: number) => n.toLocaleString();

  // Format percentage
  const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

  // Max engagement rate for bar visualization
  const maxEngRate = Math.max(
    ...metrics.map((m) => m.engagementRate),
    0.01
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              href="/admin/social"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">
              Social Media Analytics
            </h2>
          </div>
          <p className="text-gray-500 mt-1 ml-8">
            Performance metrics across your connected social platforms.
          </p>
        </div>
        <button
          onClick={() => fetchMetrics(period)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 shrink-0"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Refresh
        </button>
      </div>

      {/* Time period selector */}
      <div className="flex items-center gap-2">
        {([7, 30, 90] as TimePeriod[]).map((d) => (
          <button
            key={d}
            onClick={() => setPeriod(d)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              period === d
                ? "bg-primary text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            )}
          >
            {d} Days
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm text-gray-500">Fetching analytics...</p>
          </div>
        </div>
      ) : metrics.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            No Platforms Connected
          </h3>
          <p className="text-sm text-blue-700 max-w-md mx-auto">
            Configure your social platform credentials in environment variables to see
            analytics. Required variables:
          </p>
          <div className="mt-4 text-left max-w-sm mx-auto space-y-2 text-xs text-blue-600 font-mono">
            <p>META_SAMSOATH_PAGE_TOKEN, META_SAMSOATH_PAGE_ID</p>
            <p>META_SAMSOATH_IG_ACCOUNT_ID</p>
            <p>LINKEDIN_SAMSOATH_ACCESS_TOKEN, LINKEDIN_SAMSOATH_ORG_ID</p>
          </div>
        </div>
      ) : (
        <>
          {/* Overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-50 rounded-lg p-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Total Impressions
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {fmt(totals.impressions)}
              </p>
              <p className="text-xs text-gray-400 mt-1">Last {period} days</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-50 rounded-lg p-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Total Engagement
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {fmt(totals.engagement)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {pct(overallEngagementRate)} rate
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-50 rounded-lg p-2">
                  <MousePointerClick className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Total Clicks
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {fmt(totals.clicks)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Across {metrics.length} platform{metrics.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Engagement rate comparison */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="h-5 w-5 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900">
                Engagement Rate by Platform
              </h3>
            </div>
            <div className="space-y-4">
              {metrics.map((m) => {
                const config = PLATFORM_CONFIG[m.platform];
                const barWidth = (m.engagementRate / maxEngRate) * 100;
                return (
                  <div key={m.platform} className="flex items-center gap-4">
                    <div className="w-24 flex items-center gap-2 shrink-0">
                      {config?.icon}
                      <span className="text-sm font-medium text-gray-700">
                        {m.platform}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            m.platform === "Facebook"
                              ? "bg-[#1877F2]"
                              : m.platform === "Instagram"
                                ? "bg-[#E1306C]"
                                : "bg-[#0A66C2]"
                          )}
                          style={{ width: `${Math.max(barWidth, 2)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                      {pct(m.engagementRate)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Per-platform breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {ALL_PLATFORMS.map((platformName) => {
              const m = getMetricsFor(platformName);
              const config = PLATFORM_CONFIG[platformName];

              if (!m) {
                return (
                  <div
                    key={platformName}
                    className="bg-white rounded-lg border border-gray-200 p-5"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {config?.icon}
                      <h3 className="text-sm font-semibold text-gray-900">
                        {platformName}
                      </h3>
                    </div>
                    <div className="text-center py-6">
                      <AlertCircle className="h-6 w-6 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Not Connected</p>
                      <p className="text-xs text-gray-300 mt-1">
                        Add credentials to see metrics
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={platformName}
                  className={cn(
                    "bg-white rounded-lg border p-5",
                    config?.border || "border-gray-200"
                  )}
                >
                  <div className="flex items-center gap-2 mb-4">
                    {config?.icon}
                    <h3 className="text-sm font-semibold text-gray-900">
                      {platformName}
                    </h3>
                    <span
                      className={cn(
                        "ml-auto text-xs font-medium px-2 py-0.5 rounded-full",
                        config?.bg,
                        config?.color
                      )}
                    >
                      {m.period}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">Impressions</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {fmt(m.impressions)}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MousePointerClick className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">Clicks</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {fmt(m.clicks)}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Heart className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">Likes</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {fmt(m.likes)}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Share2 className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">Shares</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {fmt(m.shares)}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MessageCircle className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">Comments</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {fmt(m.comments)}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <TrendingUp className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">Eng. Rate</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {pct(m.engagementRate)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
