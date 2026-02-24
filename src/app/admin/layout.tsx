"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  MessageSquare,
  FileText,
  Users,
  Mail,
  Layers,
  Image,
  Settings,
  Menu,
  X,
  LogOut,
  Shield,
  Trophy,
  Share2,
  HelpCircle,
  Wrench,
  Megaphone,
  Sparkles,
  Loader2,
  Send,
  ArrowRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Stories", href: "/admin/stories", icon: BookOpen },
  { label: "OATHs", href: "/admin/oaths", icon: Heart },
  { label: "Challenges", href: "/admin/challenges", icon: Trophy },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Social Posts", href: "/admin/social", icon: Share2 },
  { label: "Ambassadors", href: "/admin/ambassadors", icon: Users },
  { label: "Email", href: "/admin/email", icon: Mail },
  { label: "Ads", href: "/admin/ads", icon: Megaphone },
  { label: "Content", href: "/admin/content", icon: Layers },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Maintenance", href: "/admin/maintenance", icon: Wrench },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Manual", href: "/admin/manual", icon: HelpCircle },
];

/* Context-sensitive help content per page */
const PAGE_HELP: Record<string, { title: string; tips: string[]; manualSection: string }> = {
  "/admin": {
    title: "Dashboard",
    tips: [
      "Click Refresh to pull latest stats from the database.",
      "Stat cards show live counts — OATHs, stories, subscribers, messages, ambassadors.",
      "Quick Actions are shortcuts to the most common tasks.",
      "Recent Activity shows the latest OATHs, stories, and messages.",
    ],
    manualSection: "dashboard",
  },
  "/admin/stories": {
    title: "Story Moderation",
    tips: [
      "New stories start in Pending. Review, edit, then approve or reject.",
      "Click Edit to modify a story's title and content before approving.",
      "AI Polish improves grammar and clarity while preserving the author's voice.",
      "Published stories can be featured (star icon) or turned into blog posts.",
    ],
    manualSection: "stories",
  },
  "/admin/oaths": {
    title: "OATH Submissions",
    tips: [
      "Filter by category or state to find specific submissions.",
      "A teal map pin means geocoding succeeded — the pin is on the map.",
      "A gray pin means the city/state couldn't be found on the map.",
      "Select multiple entries with checkboxes for bulk delete.",
    ],
    manualSection: "oaths",
  },
  "/admin/challenges": {
    title: "Challenges & Referrals",
    tips: [
      "This tracks the 'Challenge 3 People' viral loop automatically.",
      "Each OATH taker gets a unique referral link on the thank-you page.",
      "The leaderboard ranks people by successful referrals.",
      "Conversion rate = referral OATHs / total OATHs.",
    ],
    manualSection: "challenges",
  },
  "/admin/messages": {
    title: "Messages",
    tips: [
      "Blue dot = unread. Click a message to expand and read.",
      "Click 'Mark as Read' to clear the unread indicator.",
      "Reply opens your email client with a pre-filled Re: subject.",
      "Filter by All, Unread, or Read using the tabs.",
    ],
    manualSection: "messages",
  },
  "/admin/blog": {
    title: "Blog Posts",
    tips: [
      "Click 'New Post' to start writing. Save as draft or publish directly.",
      "Toggle 'AI Assist' for help writing, improving, or adding SEO keywords.",
      "Tags help with SEO — use relevant keywords like 'family, mental health'.",
      "Published posts appear on the public /blog page immediately.",
    ],
    manualSection: "blog",
  },
  "/admin/social": {
    title: "Social Post Generator",
    tips: [
      "Select a platform first — each has different character limits and tone.",
      "Pick a post type for a quick start, or write custom instructions.",
      "Click Copy to paste directly into the social platform.",
      "Add hashtags from the suggestions below the generated post.",
    ],
    manualSection: "social",
  },
  "/admin/ambassadors": {
    title: "Ambassadors",
    tips: [
      "New applications arrive as Pending. Approve or reject with one click.",
      "Click a name to expand and see their bio and social links.",
      "Approved ambassadors appear on the public Ambassadors page.",
    ],
    manualSection: "ambassadors",
  },
  "/admin/email": {
    title: "Email Composer",
    tips: [
      "Switch between Individual Email and Newsletter modes.",
      "Weekly Digest auto-generates a newsletter from this week's stats.",
      "AI Draft writes email content from a brief description.",
      "Preview shows the branded email template before sending.",
      "All 11 @samsoath.org aliases are available as senders.",
    ],
    manualSection: "email",
  },
  "/admin/ads": {
    title: "Ads & Attribution",
    tips: [
      "Overview shows which ad sources drive the most conversions.",
      "Create campaigns to track budget and spending per platform.",
      "UTM Builder generates tagged links — use them in every ad and post.",
      "Run the SQL migration in Supabase before using this tab.",
    ],
    manualSection: "ads",
  },
  "/admin/content": {
    title: "Manage Content",
    tips: [
      "Static pages are in code files — use the AI assistant to edit them.",
      "Blog posts and stories are managed through their respective admin tabs.",
      "Each page listing shows the file path for direct editing.",
    ],
    manualSection: "content",
  },
  "/admin/media": {
    title: "Media Library",
    tips: [
      "Add media by URL — paste the link to an image or file hosted elsewhere.",
      "Hover over an image to copy its URL, edit details, or delete.",
      "Alt text is important for accessibility — add it to every image.",
    ],
    manualSection: "media",
  },
  "/admin/maintenance": {
    title: "Maintenance",
    tips: [
      "Dependencies tab checks npm for newer package versions.",
      "Green = up to date, amber = minor update, red = major update.",
      "Major updates may have breaking changes — update with care.",
      "Security tab links to GitHub Dependabot and Vercel security settings.",
    ],
    manualSection: "maintenance",
  },
  "/admin/settings": {
    title: "Settings",
    tips: [
      "Check Environment Status to see which services are connected.",
      "Green check = connected, red X = needs configuration.",
      "Quick Links take you directly to external service dashboards.",
    ],
    manualSection: "settings",
  },
  "/admin/manual": {
    title: "Admin Manual",
    tips: [
      "Search to find any topic quickly.",
      "Click a tab name in the overview grid to jump to its guide.",
      "FAQ section covers the most common questions.",
    ],
    manualSection: "",
  },
};

function getPageHelp(pathname: string) {
  // Exact match first
  if (PAGE_HELP[pathname]) return PAGE_HELP[pathname];
  // Check prefix matches (e.g. /admin/blog/new matches /admin/blog)
  const segments = pathname.split("/").filter(Boolean);
  while (segments.length > 1) {
    segments.pop();
    const prefix = "/" + segments.join("/");
    if (PAGE_HELP[prefix]) return PAGE_HELP[prefix];
  }
  return PAGE_HELP["/admin"];
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const pathname = usePathname();
  const pageHelp = getPageHelp(pathname);

  const handleAiSearch = useCallback(async () => {
    if (!aiQuery.trim() || aiLoading) return;
    setAiLoading(true);
    setAiAnswer("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `The user is on the "${pageHelp.title}" page of the Sam's OATH admin dashboard. Answer their question concisely in 2-3 sentences. Question: ${aiQuery}`,
          type: "blog",
        }),
      });
      if (!res.ok) throw new Error("AI failed");
      const data = await res.json();
      setAiAnswer(data.text || data.content || data.result || "Sorry, I couldn't generate an answer. Try rephrasing your question.");
    } catch {
      setAiAnswer("AI search requires the Anthropic API key. Check Settings to confirm it's connected.");
    } finally {
      setAiLoading(false);
    }
  }, [aiQuery, aiLoading, pageHelp.title]);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ backgroundColor: "#2E3B4E" }}
      >
        {/* Branding */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-teal" />
            <div>
              <span className="text-white font-bold text-lg leading-none block">
                Sam&apos;s OATH
              </span>
              <span className="text-gray-400 text-xs">Admin Panel</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-teal" : "text-gray-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href="/"
            className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
          >
            <span>&larr;</span>
            <span>View Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto text-[15px] leading-relaxed [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg">
          {children}
        </main>

        {/* Context-sensitive help button */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* Help panel */}
          {helpOpen && (
            <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden mb-2">
              {/* Header */}
              <div className="px-4 py-3 bg-primary text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span className="font-semibold text-sm">{pageHelp.title} Help</span>
                </div>
                <button
                  onClick={() => setHelpOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Quick tips */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Quick Tips
                </p>
                <ul className="space-y-1.5">
                  {pageHelp.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ArrowRight className="h-3 w-3 mt-1 text-teal flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
                {pageHelp.manualSection && (
                  <Link
                    href={`/admin/manual`}
                    onClick={() => setHelpOpen(false)}
                    className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-primary hover:underline"
                  >
                    <BookOpen className="h-3 w-3" />
                    Read full guide in the Manual
                  </Link>
                )}
              </div>

              {/* AI search */}
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  <Sparkles className="h-3 w-3 inline mr-1" />
                  Ask AI
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAiSearch();
                    }}
                    placeholder="How do I..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    onClick={handleAiSearch}
                    disabled={aiLoading || !aiQuery.trim()}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {aiLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {aiAnswer && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed">
                    {aiAnswer}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FAB button */}
          <button
            onClick={() => setHelpOpen(!helpOpen)}
            className={cn(
              "w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105",
              helpOpen
                ? "bg-gray-600 text-white"
                : "bg-primary text-white hover:bg-primary/90"
            )}
            title="Help"
          >
            {helpOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <HelpCircle className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
