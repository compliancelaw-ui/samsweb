"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DollarSign,
  RefreshCw,
  TrendingUp,
  Repeat,
  Users,
  BarChart3,
} from "lucide-react";

interface DonationSummary {
  total_raised: number;
  this_month: number;
  recurring_count: number;
  one_time_count: number;
  donor_count: number;
  average_donation: number;
}

interface RecentDonation {
  id: string;
  created_at: string;
  donor_name: string | null;
  donor_email: string | null;
  amount_cents: number;
  currency: string;
  donation_type: string;
  is_anonymous: boolean;
  status: string;
  campaign: string | null;
}

interface MonthlyTotal {
  month: string;
  total: number;
}

function formatCents(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STAT_CARDS = [
  {
    key: "total_raised" as const,
    label: "Total Raised",
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    isCurrency: true,
  },
  {
    key: "this_month" as const,
    label: "This Month",
    icon: TrendingUp,
    color: "text-teal",
    bg: "bg-teal-50",
    isCurrency: true,
  },
  {
    key: "recurring_count" as const,
    label: "Active Recurring",
    icon: Repeat,
    color: "text-blue-500",
    bg: "bg-blue-50",
    isCurrency: false,
  },
  {
    key: "average_donation" as const,
    label: "Average Donation",
    icon: BarChart3,
    color: "text-purple-500",
    bg: "bg-purple-50",
    isCurrency: true,
  },
];

export default function DonationsPage() {
  const [summary, setSummary] = useState<DonationSummary | null>(null);
  const [recent, setRecent] = useState<RecentDonation[]>([]);
  const [monthly, setMonthly] = useState<MonthlyTotal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/donations");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSummary(data.summary);
      setRecent(data.recent || []);
      setMonthly(data.monthly || []);
    } catch {
      console.error("Failed to fetch donation data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const maxMonthly = Math.max(...monthly.map((m) => m.total), 1);

  // Empty state
  if (!loading && summary && summary.total_raised === 0 && recent.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Donation Reporting</h2>
            <p className="text-gray-500 mt-1">Track donations, revenue, and donor activity.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600">No donations yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Donations will appear here automatically once processed through Stripe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Donation Reporting</h2>
          <p className="text-gray-500 mt-1">Track donations, revenue, and donor activity.</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors self-start"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          const value = summary ? summary[card.key] : null;
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
                    <span className="inline-block w-16 h-7 bg-gray-100 rounded animate-pulse" />
                  ) : card.isCurrency ? (
                    formatCents(value ?? 0)
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

      {/* Monthly trend + Breakdown */}
      {summary && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Monthly trend chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-teal" />
              Monthly Trend
            </h3>
            <div className="flex items-end gap-3 h-40">
              {monthly.map((m) => {
                const heightPct = maxMonthly > 0 ? (m.total / maxMonthly) * 100 : 0;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500 font-medium">
                      {m.total > 0 ? formatCents(m.total) : "$0"}
                    </span>
                    <div className="w-full flex items-end" style={{ height: "120px" }}>
                      <div
                        className="w-full bg-teal rounded-t transition-all"
                        style={{
                          height: `${Math.max(heightPct, 2)}%`,
                          minHeight: "4px",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Breakdown: One-Time vs Recurring */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Donation Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-emerald-600">
                  {summary.one_time_count.toLocaleString()}
                </p>
                <p className="text-sm text-emerald-500 mt-1">One-Time</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {summary.recurring_count.toLocaleString()}
                </p>
                <p className="text-sm text-blue-500 mt-1">Recurring</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center col-span-2">
                <p className="text-3xl font-bold text-purple-600">
                  {summary.donor_count.toLocaleString()}
                </p>
                <p className="text-sm text-purple-500 mt-1">Unique Donors</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Donations table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Donations</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="h-6 w-6 animate-spin text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Loading donations...</p>
            </div>
          ) : recent.length === 0 ? (
            <div className="p-8 text-center">
              <DollarSign className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No donations yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-5 py-3 font-medium text-gray-500">Date</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">Donor</th>
                    <th className="text-right px-5 py-3 font-medium text-gray-500">Amount</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">Type</th>
                    <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recent.map((d, i) => (
                    <tr
                      key={d.id}
                      className={i % 2 === 1 ? "bg-gray-50/50" : "bg-white"}
                    >
                      <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                        {formatDate(d.created_at)}
                      </td>
                      <td className="px-5 py-3 text-gray-900">
                        {d.is_anonymous ? "Anonymous" : d.donor_name || d.donor_email || "Unknown"}
                      </td>
                      <td className="px-5 py-3 text-right font-medium text-gray-900 whitespace-nowrap">
                        {formatCents(d.amount_cents)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            d.donation_type === "recurring"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {d.donation_type === "recurring" ? "Recurring" : "One-time"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            d.status === "completed" || d.status === "succeeded"
                              ? "bg-green-50 text-green-700"
                              : d.status === "cancelled"
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
