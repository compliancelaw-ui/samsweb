"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Share2,
  FileDown,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareData {
  total_shares: number;
  by_platform: { platform: string; count: number }[];
  by_content_type: { content_type: string; count: number }[];
  daily_30d: { date: string; count: number }[];
  top_content: { content_id: string; count: number }[];
}

interface DownloadData {
  total_downloads: number;
  per_guide: {
    title: string;
    slug: string;
    category: string | null;
    download_count: number;
  }[];
}

const PLATFORM_COLORS: Record<string, { bg: string; label: string }> = {
  facebook: { bg: "bg-blue-500", label: "Facebook" },
  linkedin: { bg: "bg-blue-800", label: "LinkedIn" },
  x: { bg: "bg-gray-900", label: "X" },
  twitter: { bg: "bg-gray-900", label: "X" },
  instagram: { bg: "bg-pink-500", label: "Instagram" },
  tiktok: { bg: "bg-gray-700", label: "TikTok" },
  copy: { bg: "bg-teal", label: "Copy Link" },
  email: { bg: "bg-purple-500", label: "Email" },
};

const CONTENT_TYPE_META: Record<string, { label: string; color: string; bg: string }> = {
  oath: { label: "OATHs", color: "text-rose-600", bg: "bg-rose-50" },
  story: { label: "Stories", color: "text-primary", bg: "bg-primary-50" },
  page: { label: "Pages", color: "text-teal", bg: "bg-teal-50" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "mental-health": "bg-purple-100 text-purple-700",
  "substance-use": "bg-amber-100 text-amber-700",
  "family-support": "bg-teal-100 text-teal-700",
  recovery: "bg-emerald-100 text-emerald-700",
};

type Tab = "shares" | "downloads";

export default function AnalyticsPage() {
  const [shares, setShares] = useState<ShareData | null>(null);
  const [downloads, setDownloads] = useState<DownloadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("shares");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/analytics");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setShares(data.shares);
      setDownloads(data.downloads);
    } catch {
      console.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const topPlatform =
    shares && shares.by_platform.length > 0
      ? PLATFORM_COLORS[shares.by_platform[0].platform]?.label || shares.by_platform[0].platform
      : "N/A";

  const topContentType =
    shares && shares.by_content_type.length > 0
      ? CONTENT_TYPE_META[shares.by_content_type[0].content_type]?.label || shares.by_content_type[0].content_type
      : "N/A";

  const maxPlatformCount = shares
    ? Math.max(...shares.by_platform.map((p) => p.count), 1)
    : 1;

  const maxDailyCount = shares
    ? Math.max(...shares.daily_30d.map((d) => d.count), 1)
    : 1;

  const maxDownloadCount = downloads
    ? Math.max(...downloads.per_guide.map((g) => g.download_count), 1)
    : 1;

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-500 mt-1">
            Track shares and resource downloads across the site.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors self-start"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("shares")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
            tab === "shares"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          <Share2 className="h-4 w-4" />
          Shares
        </button>
        <button
          onClick={() => setTab("downloads")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
            tab === "downloads"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          <FileDown className="h-4 w-4" />
          Downloads
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading analytics...</p>
        </div>
      )}

      {/* ======== SHARES TAB ======== */}
      {!loading && tab === "shares" && (
        <>
          {shares && shares.total_shares === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Share2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600">No shares yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Share events will appear here as visitors click share buttons across the site.
              </p>
            </div>
          ) : shares && (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {shares.total_shares.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Total Shares</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
                  <div className="bg-teal-50 rounded-lg p-3">
                    <Award className="h-6 w-6 text-teal" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{topPlatform}</p>
                    <p className="text-sm text-gray-500">Top Platform</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
                  <div className="bg-rose-50 rounded-lg p-3">
                    <BarChart3 className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{topContentType}</p>
                    <p className="text-sm text-gray-500">Most Shared Type</p>
                  </div>
                </div>
              </div>

              {/* Platform breakdown + Content type */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Platform breakdown */}
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-primary" />
                    Platform Breakdown
                  </h3>
                  {shares.by_platform.length === 0 ? (
                    <p className="text-sm text-gray-400">No platform data yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {shares.by_platform.map((p) => {
                        const meta = PLATFORM_COLORS[p.platform] || {
                          bg: "bg-gray-400",
                          label: p.platform,
                        };
                        const pct = (p.count / maxPlatformCount) * 100;
                        return (
                          <div key={p.platform}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-600">{meta.label}</span>
                              <span className="text-sm font-medium text-gray-900">
                                {p.count.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${meta.bg} rounded-full transition-all`}
                                style={{ width: `${Math.max(pct, 2)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Content type breakdown */}
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-rose-500" />
                    Content Type Breakdown
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {["oath", "story", "page"].map((ct) => {
                      const meta = CONTENT_TYPE_META[ct] || {
                        label: ct,
                        color: "text-gray-600",
                        bg: "bg-gray-50",
                      };
                      const found = shares.by_content_type.find(
                        (c) => c.content_type === ct
                      );
                      const count = found ? found.count : 0;
                      return (
                        <div
                          key={ct}
                          className={`${meta.bg} rounded-lg p-4 text-center`}
                        >
                          <p className={`text-3xl font-bold ${meta.color}`}>
                            {count.toLocaleString()}
                          </p>
                          <p className={`text-sm ${meta.color} mt-1`}>{meta.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 30-day trend */}
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-teal" />
                  Last 30 Days
                </h3>
                <div className="flex items-end gap-[3px] h-32">
                  {shares.daily_30d.map((d) => {
                    const heightPct =
                      maxDailyCount > 0 ? (d.count / maxDailyCount) * 100 : 0;
                    return (
                      <div
                        key={d.date}
                        className="flex-1 group relative"
                        title={`${d.date}: ${d.count} shares`}
                      >
                        <div className="w-full flex items-end h-28">
                          <div
                            className="w-full bg-teal/70 hover:bg-teal rounded-t transition-all"
                            style={{
                              height: `${Math.max(heightPct, 2)}%`,
                              minHeight: "2px",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    {shares.daily_30d[0]?.date
                      ? new Date(shares.daily_30d[0].date + "T00:00:00").toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )
                      : ""}
                  </span>
                  <span className="text-xs text-gray-400">Today</span>
                </div>
              </div>

              {/* Top shared content */}
              {shares.top_content.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    Top Shared Content
                  </h3>
                  <div className="space-y-2">
                    {shares.top_content.map((item, i) => (
                      <div
                        key={item.content_id}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-bold text-gray-400 w-5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-700 flex-1 truncate font-mono">
                          {item.content_id}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {item.count.toLocaleString()} shares
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ======== DOWNLOADS TAB ======== */}
      {!loading && tab === "downloads" && (
        <>
          {downloads && downloads.total_downloads === 0 && downloads.per_guide.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <FileDown className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600">No downloads yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Download counts will appear here as visitors download resource guides.
              </p>
            </div>
          ) : downloads && (
            <>
              {/* Total downloads stat card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <FileDown className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {downloads.total_downloads.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Total Downloads</p>
                  </div>
                </div>
              </div>

              {/* Per-guide table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Downloads by Guide
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {downloads.per_guide.length === 0 ? (
                    <div className="p-8 text-center">
                      <FileDown className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No guides yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="text-left px-5 py-3 font-medium text-gray-500">
                              Guide
                            </th>
                            <th className="text-left px-5 py-3 font-medium text-gray-500">
                              Category
                            </th>
                            <th className="text-right px-5 py-3 font-medium text-gray-500">
                              Downloads
                            </th>
                            <th className="text-left px-5 py-3 font-medium text-gray-500 w-48">
                              &nbsp;
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {downloads.per_guide.map((guide, i) => {
                            const barPct =
                              maxDownloadCount > 0
                                ? (guide.download_count / maxDownloadCount) * 100
                                : 0;
                            const categoryClass =
                              guide.category && CATEGORY_COLORS[guide.category]
                                ? CATEGORY_COLORS[guide.category]
                                : "bg-gray-100 text-gray-600";
                            return (
                              <tr
                                key={guide.slug}
                                className={
                                  i % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                                }
                              >
                                <td className="px-5 py-3 text-gray-900 font-medium">
                                  {guide.title}
                                </td>
                                <td className="px-5 py-3">
                                  {guide.category ? (
                                    <span
                                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryClass}`}
                                    >
                                      {guide.category.replace(/-/g, " ")}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400 text-xs">
                                      -
                                    </span>
                                  )}
                                </td>
                                <td className="px-5 py-3 text-right font-medium text-gray-900 whitespace-nowrap">
                                  {guide.download_count.toLocaleString()}
                                </td>
                                <td className="px-5 py-3">
                                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-emerald-400 rounded-full transition-all"
                                      style={{
                                        width: `${Math.max(barPct, 2)}%`,
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
