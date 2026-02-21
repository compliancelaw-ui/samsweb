import { supabaseAdmin } from "@/lib/supabase/admin";

interface ImpactCounts {
  totalOaths: number;
  totalStories: number;
  stateCount: number;
}

async function getImpactCounts(): Promise<ImpactCounts> {
  try {
    const [oathsResult, storiesResult, statesResult] = await Promise.all([
      supabaseAdmin()
        .from("oath_submissions")
        .select("*", { count: "exact", head: true }),
      supabaseAdmin()
        .from("story_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "published"),
      supabaseAdmin()
        .from("oath_submissions")
        .select("state"),
    ]);

    const uniqueStates = new Set(
      (statesResult.data || []).map((r: { state: string }) => r.state)
    );

    return {
      totalOaths: oathsResult.count || 0,
      totalStories: storiesResult.count || 0,
      stateCount: uniqueStates.size,
    };
  } catch {
    return { totalOaths: 0, totalStories: 0, stateCount: 0 };
  }
}

export async function LiveImpactStats() {
  const counts = await getImpactCounts();

  // If no data yet, show the aspirational static stats
  if (counts.totalOaths === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <div>
          <p className="text-4xl md:text-5xl font-bold mb-2">345K+</p>
          <p className="text-white/70">People Reached</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-bold mb-2">1,934</p>
          <p className="text-white/70">Reactions</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-bold mb-2">484</p>
          <p className="text-white/70">Stories Shared</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-bold mb-2">22+</p>
          <p className="text-white/70">States</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
      <div>
        <p className="text-4xl md:text-5xl font-bold mb-2">
          {counts.totalOaths.toLocaleString()}
        </p>
        <p className="text-white/70">OATHs Taken</p>
      </div>
      <div>
        <p className="text-4xl md:text-5xl font-bold mb-2">
          {counts.totalStories}
        </p>
        <p className="text-white/70">Stories Shared</p>
      </div>
      <div className="col-span-2 md:col-span-1">
        <p className="text-4xl md:text-5xl font-bold mb-2">
          {counts.stateCount}
        </p>
        <p className="text-white/70">States Represented</p>
      </div>
    </div>
  );
}
