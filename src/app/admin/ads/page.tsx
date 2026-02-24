"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  BarChart3,
  Layers,
  Link2,
  Plus,
  Pencil,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Target,
  RefreshCw,
  X,
  Loader2,
} from "lucide-react";

export const dynamic = "force-dynamic";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Campaign {
  id: string;
  name: string;
  platform: string;
  campaign_type: string;
  utm_campaign: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  budget: number | null;
  spent: number | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface ConversionRow {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

interface ConversionTable {
  table: string;
  conversions: ConversionRow[];
}

interface TotalTable {
  table: string;
  total: number;
}

interface APIResponse {
  campaigns: Campaign[];
  conversions: ConversionTable[];
  totals: TotalTable[];
}

type TabKey = "overview" | "campaigns" | "utm";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "campaigns", label: "Campaigns", icon: Layers },
  { key: "utm", label: "UTM Builder", icon: Link2 },
];

const PLATFORM_BADGE: Record<string, string> = {
  google: "bg-blue-100 text-blue-700",
  meta: "bg-purple-100 text-purple-700",
  tiktok: "bg-pink-100 text-pink-700",
  linkedin: "bg-blue-100 text-blue-800",
  other: "bg-gray-100 text-gray-700",
};

const STATUS_BADGE: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  active: "bg-emerald-100 text-emerald-700",
  paused: "bg-amber-100 text-amber-700",
  completed: "bg-slate-200 text-slate-700",
};

const TABLE_LABELS = ["OATHs", "Stories", "Messages", "Subscribers", "Ambassadors"];

const PLATFORM_OPTIONS = ["Google", "Meta", "TikTok", "LinkedIn", "Other"];
const TYPE_OPTIONS = ["Search", "Display", "Social", "Video", "Email"];
const STATUS_OPTIONS = ["Draft", "Active", "Paused", "Completed"];

const PAGE_PATHS = [
  "/",
  "/take-the-oath",
  "/stories",
  "/share-your-story",
  "/resources",
  "/blog",
  "/music",
  "/ambassadors",
  "/contact",
  "/get-involved",
  "/families",
  "/workplace",
  "/map",
];

const QUICK_TEMPLATES = [
  { label: "Google Ad Grant", source: "google", medium: "cpc" },
  { label: "Facebook Ad", source: "facebook", medium: "paid-social" },
  { label: "Instagram Organic", source: "instagram", medium: "social" },
  { label: "Newsletter", source: "newsletter", medium: "email" },
  { label: "LinkedIn Post", source: "linkedin", medium: "social" },
  { label: "TikTok", source: "tiktok", medium: "social" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Empty campaign form state ──────────────────────────────────────────────────

const EMPTY_FORM = {
  name: "",
  platform: "google",
  campaign_type: "search",
  utm_campaign: "",
  utm_source: "",
  utm_medium: "",
  budget: "",
  spent: "",
  start_date: "",
  end_date: "",
  status: "draft",
  notes: "",
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function AdminAdsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [conversions, setConversions] = useState<ConversionTable[]>([]);
  const [totals, setTotals] = useState<TotalTable[]>([]);

  // Campaign form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  // UTM builder state
  const [utmBase, setUtmBase] = useState("https://samsoath.org");
  const [utmPath, setUtmPath] = useState("/");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmContent, setUtmContent] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [copied, setCopied] = useState(false);

  // ── Fetch data ─────────────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/campaigns");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: APIResponse = await res.json();
      setCampaigns(data.campaigns || []);
      setConversions(data.conversions || []);
      setTotals(data.totals || []);
    } catch {
      console.error("Failed to fetch ads data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Computed analytics ─────────────────────────────────────────────────────

  const analytics = useMemo(() => {
    // Flatten all conversions
    const allConversions: { table: string; row: ConversionRow }[] = [];
    conversions.forEach((ct) => {
      ct.conversions.forEach((row) => {
        allConversions.push({ table: ct.table, row });
      });
    });

    const totalConversions = allConversions.length;

    // Total submissions across all tables
    const totalSubmissions = totals.reduce((sum, t) => sum + t.total, 0);

    // Count by source
    const bySource: Record<string, Record<string, number>> = {};
    allConversions.forEach(({ table, row }) => {
      const src = row.utm_source || "unknown";
      if (!bySource[src]) bySource[src] = {};
      bySource[src][table] = (bySource[src][table] || 0) + 1;
    });

    // Count by campaign
    const byCampaign: Record<string, Record<string, number>> = {};
    allConversions.forEach(({ table, row }) => {
      const camp = row.utm_campaign || "unknown";
      if (!byCampaign[camp]) byCampaign[camp] = {};
      byCampaign[camp][table] = (byCampaign[camp][table] || 0) + 1;
    });

    // Top source
    let topSource = "None";
    let topSourceCount = 0;
    Object.entries(bySource).forEach(([src, tables]) => {
      const total = Object.values(tables).reduce((a, b) => a + b, 0);
      if (total > topSourceCount) {
        topSourceCount = total;
        topSource = src;
      }
    });

    // Top campaign
    let topCampaign = "None";
    let topCampaignCount = 0;
    Object.entries(byCampaign).forEach(([camp, tables]) => {
      const total = Object.values(tables).reduce((a, b) => a + b, 0);
      if (total > topCampaignCount) {
        topCampaignCount = total;
        topCampaign = camp;
      }
    });

    // Conversion rate
    const conversionRate = totalSubmissions > 0 ? ((totalConversions / totalSubmissions) * 100) : 0;

    // Sort sources and campaigns by total
    const sourceRows = Object.entries(bySource)
      .map(([source, tables]) => {
        const counts: Record<string, number> = {};
        TABLE_LABELS.forEach((label) => { counts[label] = tables[label] || 0; });
        return {
          source,
          counts,
          total: Object.values(tables).reduce((a, b) => a + b, 0),
        };
      })
      .sort((a, b) => b.total - a.total);

    const campaignRows = Object.entries(byCampaign)
      .map(([campaign, tables]) => {
        const counts: Record<string, number> = {};
        TABLE_LABELS.forEach((label) => { counts[label] = tables[label] || 0; });
        return {
          campaign,
          counts,
          total: Object.values(tables).reduce((a, b) => a + b, 0),
        };
      })
      .sort((a, b) => b.total - a.total);

    return {
      totalConversions,
      totalSubmissions,
      topSource,
      topCampaign,
      conversionRate,
      sourceRows,
      campaignRows,
    };
  }, [conversions, totals]);

  // ── Campaign CRUD ──────────────────────────────────────────────────────────

  const openCreateForm = () => {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setAutoSlug(true);
    setShowForm(true);
  };

  const openEditForm = (campaign: Campaign) => {
    setForm({
      name: campaign.name || "",
      platform: campaign.platform || "google",
      campaign_type: campaign.campaign_type || "search",
      utm_campaign: campaign.utm_campaign || "",
      utm_source: campaign.utm_source || "",
      utm_medium: campaign.utm_medium || "",
      budget: campaign.budget != null ? String(campaign.budget) : "",
      spent: campaign.spent != null ? String(campaign.spent) : "",
      start_date: campaign.start_date || "",
      end_date: campaign.end_date || "",
      status: campaign.status || "draft",
      notes: campaign.notes || "",
    });
    setEditingId(campaign.id);
    setAutoSlug(false);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setAutoSlug(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && autoSlug) {
        next.utm_campaign = slugify(value);
      }
      return next;
    });
    if (field === "utm_campaign") {
      setAutoSlug(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const payload = {
        ...(editingId ? { id: editingId } : {}),
        name: form.name.trim(),
        platform: form.platform,
        campaign_type: form.campaign_type,
        utm_campaign: form.utm_campaign || null,
        utm_source: form.utm_source || null,
        utm_medium: form.utm_medium || null,
        budget: form.budget ? parseFloat(form.budget) : null,
        spent: form.spent ? parseFloat(form.spent) : 0,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
        status: form.status,
        notes: form.notes || null,
      };

      const res = await fetch("/api/admin/campaigns", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");
      closeForm();
      fetchData();
    } catch {
      alert("Failed to save campaign. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete campaign "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/campaigns?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchData();
    } catch {
      alert("Failed to delete campaign. Please try again.");
    }
  };

  // ── UTM builder ────────────────────────────────────────────────────────────

  const generatedUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (utmSource) params.set("utm_source", utmSource);
    if (utmMedium) params.set("utm_medium", utmMedium);
    if (utmCampaign) params.set("utm_campaign", utmCampaign);
    if (utmContent) params.set("utm_content", utmContent);
    if (utmTerm) params.set("utm_term", utmTerm);
    const qs = params.toString();
    const base = utmBase.replace(/\/+$/, "");
    const path = utmPath === "/" ? "" : utmPath;
    return qs ? `${base}${path}?${qs}` : `${base}${path}`;
  }, [utmBase, utmPath, utmSource, utmMedium, utmCampaign, utmContent, utmTerm]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = generatedUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const applyTemplate = (template: { source: string; medium: string }) => {
    setUtmSource(template.source);
    setUtmMedium(template.medium);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#4A6FA5]/10 rounded-lg p-2.5">
            <Megaphone className="h-6 w-6 text-[#4A6FA5]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ads &amp; Campaigns</h2>
            <p className="text-gray-500 mt-0.5">
              Track ad performance, manage campaigns, and build UTM links.
            </p>
          </div>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors self-start"
        >
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#4A6FA5] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-lg border border-gray-200 px-6 py-16 text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Loading ads data...</p>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          OVERVIEW TAB
          ════════════════════════════════════════════════════════════════════════ */}
      {!loading && activeTab === "overview" && (
        <div className="space-y-6">
          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
              <div className="bg-[#4A6FA5]/10 rounded-lg p-3">
                <TrendingUp className="h-6 w-6 text-[#4A6FA5]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.totalConversions.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Total Ad Conversions</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
              <div className="bg-[#3EABA8]/10 rounded-lg p-3">
                <BarChart3 className="h-6 w-6 text-[#3EABA8]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 truncate" title={analytics.topSource}>
                  {analytics.topSource}
                </p>
                <p className="text-sm text-gray-500">Top Source</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
              <div className="bg-[#7AB87A]/10 rounded-lg p-3">
                <Layers className="h-6 w-6 text-[#7AB87A]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 truncate" title={analytics.topCampaign}>
                  {analytics.topCampaign}
                </p>
                <p className="text-sm text-gray-500">Top Campaign</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 flex items-center gap-4">
              <div className="bg-[#E8956F]/10 rounded-lg p-3">
                <Target className="h-6 w-6 text-[#E8956F]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.conversionRate.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Conversion Rate</p>
              </div>
            </div>
          </div>

          {/* Conversions by Source */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#4A6FA5]" />
                Conversions by Source
              </h3>
            </div>
            {analytics.sourceRows.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <TrendingUp className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No UTM-attributed conversions yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Conversions will appear here once visitors arrive via UTM-tagged links.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3 text-left">Source</th>
                      {TABLE_LABELS.map((label) => (
                        <th key={label} className="px-4 py-3 text-right">{label}</th>
                      ))}
                      <th className="px-6 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {analytics.sourceRows.map((row) => (
                      <tr key={row.source} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 font-medium text-gray-900">{row.source}</td>
                        {TABLE_LABELS.map((label) => (
                          <td key={label} className="px-4 py-3 text-right text-gray-600">
                            {row.counts[label] || 0}
                          </td>
                        ))}
                        <td className="px-6 py-3 text-right font-semibold text-gray-900">
                          {row.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Conversions by Campaign */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#7AB87A]" />
                Conversions by Campaign
              </h3>
            </div>
            {analytics.campaignRows.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Layers className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No campaign conversions yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Tag your ad URLs with utm_campaign to track performance by campaign.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3 text-left">Campaign</th>
                      {TABLE_LABELS.map((label) => (
                        <th key={label} className="px-4 py-3 text-right">{label}</th>
                      ))}
                      <th className="px-6 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {analytics.campaignRows.map((row) => (
                      <tr key={row.campaign} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 font-medium text-gray-900">{row.campaign}</td>
                        {TABLE_LABELS.map((label) => (
                          <td key={label} className="px-4 py-3 text-right text-gray-600">
                            {row.counts[label] || 0}
                          </td>
                        ))}
                        <td className="px-6 py-3 text-right font-semibold text-gray-900">
                          {row.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          CAMPAIGNS TAB
          ════════════════════════════════════════════════════════════════════════ */}
      {!loading && activeTab === "campaigns" && (
        <div className="space-y-6">
          {/* New Campaign button */}
          <div className="flex justify-end">
            <button
              onClick={openCreateForm}
              className="flex items-center gap-2 px-4 py-2 bg-[#4A6FA5] text-white text-sm font-medium rounded-lg hover:bg-[#4A6FA5]/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Campaign
            </button>
          </div>

          {/* Campaign form (create / edit) */}
          {showForm && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingId ? "Edit Campaign" : "New Campaign"}
                </h3>
                <button
                  onClick={closeForm}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Name */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="e.g., Spring 2026 Awareness"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* Platform */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Platform</label>
                  <select
                    value={form.platform}
                    onChange={(e) => handleFormChange("platform", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  >
                    {PLATFORM_OPTIONS.map((p) => (
                      <option key={p} value={p.toLowerCase()}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Campaign Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Campaign Type
                  </label>
                  <select
                    value={form.campaign_type}
                    onChange={(e) => handleFormChange("campaign_type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  >
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t.toLowerCase()}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* UTM Campaign */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    UTM Campaign
                  </label>
                  <input
                    type="text"
                    value={form.utm_campaign}
                    onChange={(e) => handleFormChange("utm_campaign", e.target.value)}
                    placeholder="auto-generated-from-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* UTM Source */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">UTM Source</label>
                  <input
                    type="text"
                    value={form.utm_source}
                    onChange={(e) => handleFormChange("utm_source", e.target.value)}
                    placeholder="e.g., google"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* UTM Medium */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    UTM Medium
                  </label>
                  <input
                    type="text"
                    value={form.utm_medium}
                    onChange={(e) => handleFormChange("utm_medium", e.target.value)}
                    placeholder="e.g., cpc"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Budget ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={form.budget}
                      onChange={(e) => handleFormChange("budget", e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                    />
                  </div>
                </div>

                {/* Spent */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Spent ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={form.spent}
                      onChange={(e) => handleFormChange("spent", e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => handleFormChange("start_date", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => handleFormChange("end_date", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => handleFormChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s.toLowerCase()}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div className="lg:col-span-3 md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => handleFormChange("notes", e.target.value)}
                    rows={3}
                    placeholder="Optional notes about this campaign..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5] resize-y"
                  />
                </div>
              </div>

              {/* Form actions */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={handleSave}
                  disabled={saving || !form.name.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-[#4A6FA5] text-white text-sm font-medium rounded-lg hover:bg-[#4A6FA5]/90 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {editingId ? "Save Changes" : "Create Campaign"}
                </button>
                <button
                  onClick={closeForm}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Campaigns table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {campaigns.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Layers className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No campaigns yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Create your first campaign to start tracking ad performance.
                </p>
                <button
                  onClick={openCreateForm}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#4A6FA5] text-white text-sm font-medium rounded-lg hover:bg-[#4A6FA5]/90 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  New Campaign
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Platform</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-left">UTM Campaign</th>
                      <th className="px-4 py-3 text-right">Budget</th>
                      <th className="px-4 py-3 text-right">Spent</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-left">Dates</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3">
                          <p className="font-medium text-gray-900">{campaign.name}</p>
                          {campaign.notes && (
                            <p className="text-xs text-gray-400 truncate max-w-[200px]" title={campaign.notes}>
                              {campaign.notes}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                            PLATFORM_BADGE[campaign.platform] || PLATFORM_BADGE.other
                          )}>
                            {campaign.platform}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 capitalize">
                          {campaign.campaign_type}
                        </td>
                        <td className="px-4 py-3">
                          {campaign.utm_campaign ? (
                            <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                              {campaign.utm_campaign}
                            </code>
                          ) : (
                            <span className="text-gray-400">--</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-600">
                          {campaign.budget != null ? `$${Number(campaign.budget).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "--"}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-600">
                          {campaign.spent != null ? `$${Number(campaign.spent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "--"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                            STATUS_BADGE[campaign.status] || STATUS_BADGE.draft
                          )}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {campaign.start_date ? (
                            <span>
                              {new Date(campaign.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              {campaign.end_date && (
                                <> &ndash; {new Date(campaign.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</>
                              )}
                            </span>
                          ) : (
                            <span className="text-gray-400">No dates</span>
                          )}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEditForm(campaign)}
                              className="p-1.5 text-gray-400 hover:text-[#4A6FA5] transition-colors rounded hover:bg-gray-100"
                              title="Edit campaign"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(campaign.id, campaign.name)}
                              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50"
                              title="Delete campaign"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          UTM BUILDER TAB
          ════════════════════════════════════════════════════════════════════════ */}
      {!loading && activeTab === "utm" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Builder form */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Link2 className="h-5 w-5 text-[#4A6FA5]" />
                Build Your URL
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Base URL */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Base URL</label>
                  <input
                    type="text"
                    value={utmBase}
                    onChange={(e) => setUtmBase(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* Page Path */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Page Path</label>
                  <select
                    value={utmPath}
                    onChange={(e) => setUtmPath(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  >
                    {PAGE_PATHS.map((path) => (
                      <option key={path} value={path}>
                        {path === "/" ? "/ (Homepage)" : path}
                      </option>
                    ))}
                  </select>
                </div>

                {/* UTM Source */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    UTM Source *
                  </label>
                  <input
                    type="text"
                    value={utmSource}
                    onChange={(e) => setUtmSource(e.target.value)}
                    placeholder="e.g., google, facebook, newsletter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* UTM Medium */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    UTM Medium *
                  </label>
                  <input
                    type="text"
                    value={utmMedium}
                    onChange={(e) => setUtmMedium(e.target.value)}
                    placeholder="e.g., cpc, social, email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* UTM Campaign */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    UTM Campaign *
                  </label>
                  <input
                    type="text"
                    value={utmCampaign}
                    onChange={(e) => setUtmCampaign(e.target.value)}
                    placeholder="e.g., spring-2026-awareness"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* UTM Content (optional) */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    UTM Content <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={utmContent}
                    onChange={(e) => setUtmContent(e.target.value)}
                    placeholder="e.g., hero-banner"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>

                {/* UTM Term (optional) */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    UTM Term <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={utmTerm}
                    onChange={(e) => setUtmTerm(e.target.value)}
                    placeholder="e.g., substance use family"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5]"
                  />
                </div>
              </div>

              {/* Generated URL */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Generated URL
                </label>
                <div className="flex items-stretch gap-2">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 break-all font-mono">
                    {generatedUrl}
                  </div>
                  <button
                    onClick={copyUrl}
                    className={cn(
                      "flex items-center gap-2 px-4 rounded-lg text-sm font-medium transition-colors flex-shrink-0",
                      copied
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-[#4A6FA5] text-white hover:bg-[#4A6FA5]/90"
                    )}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                {utmSource && (
                  <div className="mt-2 flex items-center gap-2">
                    <a
                      href={generatedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#4A6FA5] hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Preview link
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Templates */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
              <p className="text-sm text-gray-500 mb-4">
                Click a template to auto-fill the source and medium fields.
              </p>
              <div className="space-y-2">
                {QUICK_TEMPLATES.map((template) => (
                  <button
                    key={template.label}
                    onClick={() => applyTemplate(template)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left",
                      utmSource === template.source && utmMedium === template.medium
                        ? "bg-[#4A6FA5]/10 text-[#4A6FA5] border border-[#4A6FA5]/20"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent"
                    )}
                  >
                    <span>{template.label}</span>
                    <span className="text-xs text-gray-400">
                      {template.source} / {template.medium}
                    </span>
                  </button>
                ))}
              </div>

              {/* Helpful info */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  UTM Parameters Guide
                </h4>
                <dl className="space-y-2 text-xs text-gray-500">
                  <div>
                    <dt className="font-medium text-gray-700">Source</dt>
                    <dd>Where the traffic comes from (google, facebook)</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Medium</dt>
                    <dd>Marketing medium (cpc, social, email)</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Campaign</dt>
                    <dd>Specific campaign name or promo</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Content</dt>
                    <dd>Differentiates ads / links (A/B tests)</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Term</dt>
                    <dd>Paid search keywords</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
