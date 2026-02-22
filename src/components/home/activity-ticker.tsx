import Link from "next/link";
import { MapPin, TrendingUp } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function getRecentActivity() {
  try {
    const db = supabaseAdmin();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [oathsResult, storiesResult] = await Promise.all([
      db
        .from("oath_submissions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", oneDayAgo),
      db
        .from("story_submissions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", oneDayAgo),
    ]);

    return {
      recentOaths: oathsResult.count || 0,
      recentStories: storiesResult.count || 0,
    };
  } catch {
    return { recentOaths: 0, recentStories: 0 };
  }
}

export async function ActivityTicker() {
  const { recentOaths, recentStories } = await getRecentActivity();

  // Don't render if no recent activity
  if (recentOaths === 0 && recentStories === 0) return null;

  const parts: string[] = [];
  if (recentOaths > 0) {
    parts.push(
      `${recentOaths} ${recentOaths === 1 ? "person has" : "people have"} taken Sam's OATH`
    );
  }
  if (recentStories > 0) {
    parts.push(
      `${recentStories} ${recentStories === 1 ? "has" : "have"} shared their story`
    );
  }

  return (
    <Link
      href="/map"
      className="block bg-teal/10 border-y border-teal/20 py-3 hover:bg-teal/15 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3 text-sm">
        <div className="flex items-center gap-1.5 text-teal">
          <TrendingUp className="w-4 h-4" />
          <span className="font-semibold">In the last 24 hours:</span>
        </div>
        <span className="text-gray-700">{parts.join(" and ")}</span>
        <MapPin className="w-3.5 h-3.5 text-teal flex-shrink-0" />
      </div>
    </Link>
  );
}
