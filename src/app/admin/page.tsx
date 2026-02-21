"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Heart,
  BookOpen,
  Clock,
  Users,
  MessageSquare,
  UserCheck,
  FileEdit,
  Mail,
  MapPin,
  Layers,
  RefreshCw,
  ExternalLink,
  Database,
  Globe,
  BarChart3,
  Search,
  Map,
  TrendingUp,
} from "lucide-react";
import type { DashboardStats, RecentActivityItem } from "@/lib/types";

const QUICK_ACTIONS = [
  {
    label: "Review Stories",
    href: "/admin/stories",
    icon: FileEdit,
    description: "Moderate submitted stories",
  },
  {
    label: "Compose Newsletter",
    href: "/admin/email",
    icon: Mail,
    description: "Send email campaigns",
  },
  {
    label: "View OATHs",
    href: "/admin/oaths",
    icon: MapPin,
    description: "See OATH submissions",
  },
  {
    label: "Manage Content",
    href: "/admin/content",
    icon: Layers,
    description: "Edit site content",
  },
];

const QUICK_LINKS = [
  {
    label: "Supabase",
    href: "https://supabase.com/dashboard",
    icon: Database,
    description: "Database & auth",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Vercel",
    href: "https://vercel.com/dashboard",
    icon: Globe,
    description: "Deployments & analytics",
    color: "text-gray-900",
    bg: "bg-gray-100",
  },
  {
    label: "Google Analytics",
    href: "https://analytics.google.com",
    icon: BarChart3,
    description: "Traffic & behavior",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Search Console",
    href: "https://search.google.com/search-console",
    icon: Search,
    description: "SEO & indexing",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Mapbox",
    href: "https://studio.mapbox.com",
    icon: Map,
    description: "Map styles & data",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    label: "Resend",
    href: "https://resend.com",
    icon: Mail,
    description: "Email delivery",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const STAT_CARDS = [
  { key: "total_oaths", label: "Total OATHs", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
  { key: "published_stories", label: "Published Stories", icon: BookOpen, color: "text-primary", bg: "bg-primary-50" },
  { key: "pending_stories", label: "Pending Stories", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  { key: "newsletter_subscribers", label: "Subscribers", icon: Users, color: "text-teal", bg: "bg-teal-50" },
  { key: "unread_messages", label: "Unread Messages", icon: MessageSquare, color: "text-orange", bg: "bg-orange-50" },
  { key: "ambassadors", label: "Ambassadors", icon: UserCheck, color: "text-sage", bg: "bg-sage-50" },
] as const;

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  struggling: { label: "I'm Struggling", color: "bg-teal" },
  memory: { label: "In Loving Memory", color: "bg-primary" },
  supporter: { label: "I'm a Supporter", color: "bg-sage" },
  hope: { label: "Hope & Recovery", color: "bg-orange" },
};

const ACTIVITY_ICONS: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  oath: { icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
  story: { icon: BookOpen, color: "text-primary", bg: "bg-primary-50" },
  message: { icon: MessageSquare, color: "text-orange", bg: "bg-orange-50" },
  ambassador: { icon: UserCheck, color: "text-sage", bg: "bg-sage-50" },
};

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
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data.stats);
      setActivity(data.activity || []);
    } catch {
      console.error("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 mt-1">
            Welcome to the Sam&apos;s OATH admin dashboard.
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors self-start"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          const value = stats ? stats[card.key] : null;
          return (
            <div
              key={card.key}
              className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4"
            >
              <div className={`${card.bg} rounded-lg p-3`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <span className="inline-block w-8 h-7 bg-gray-100 rounded animate-pulse" />
                  ) : (
                    (value ?? 0).toLocaleString()
                  )}
                </p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category breakdown + This month */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Category breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" />
              OATH Categories
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.category_breakdown).map(([key, count]) => {
                const meta = CATEGORY_META[key];
                if (!meta) return null;
                const total = stats.total_oaths || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{meta.label}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {count.toLocaleString()} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${meta.color} rounded-full transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* This month */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-teal" />
              This Month
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-rose-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-rose-600">
                  {stats.oaths_this_month.toLocaleString()}
                </p>
                <p className="text-sm text-rose-500 mt-1">New OATHs</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-amber-600">
                  {stats.pending_stories.toLocaleString()}
                </p>
                <p className="text-sm text-amber-500 mt-1">Awaiting Review</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-teal-600">
                  {stats.newsletter_subscribers.toLocaleString()}
                </p>
                <p className="text-sm text-teal-500 mt-1">Subscribers</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-orange-600">
                  {stats.unread_messages.toLocaleString()}
                </p>
                <p className="text-sm text-orange-500 mt-1">Unread Messages</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.label}
                href={action.href}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <Icon className="h-8 w-8 text-primary mb-3 group-hover:text-teal transition-colors" />
                <p className="font-semibold text-gray-900">{action.label}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {action.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Quick Links (external tools) */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Links
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all group text-center"
              >
                <div className={`${link.bg} rounded-lg p-2 w-10 h-10 flex items-center justify-center mx-auto mb-2`}>
                  <Icon className={`h-5 w-5 ${link.color}`} />
                </div>
                <p className="text-sm font-medium text-gray-900 flex items-center justify-center gap-1">
                  {link.label}
                  <ExternalLink className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{link.description}</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="h-6 w-6 animate-spin text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Loading activity...</p>
            </div>
          ) : activity.length === 0 ? (
            <div className="p-8 text-center">
              <Clock className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No activity yet</p>
              <p className="text-sm text-gray-400 mt-1">
                New OATHs, stories, and messages will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {activity.map((item) => {
                const meta = ACTIVITY_ICONS[item.type] || ACTIVITY_ICONS.oath;
                const Icon = meta.icon;
                return (
                  <div key={`${item.type}-${item.id}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className={`${meta.bg} rounded-lg p-2 flex-shrink-0`}>
                      <Icon className={`h-4 w-4 ${meta.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">
                        {item.summary}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 flex-shrink-0">
                      {timeAgo(item.created_at)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
