import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/admin/digest — Weekly stats for newsletter update emails
export async function GET() {
  try {
    const db = supabaseAdmin();
    const oneWeekAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    // Run all queries in parallel
    const [oathsRes, storiesRes, subscribersRes, featuredRes, totalOathsRes] =
      await Promise.all([
        // New oaths this week
        db
          .from("oath_submissions")
          .select("id", { count: "exact", head: true })
          .gte("created_at", oneWeekAgo),
        // New stories this week
        db
          .from("story_submissions")
          .select("id, title, slug, author_name", { count: "exact" })
          .gte("created_at", oneWeekAgo),
        // New subscribers this week
        db
          .from("newsletter_subscribers")
          .select("id", { count: "exact", head: true })
          .gte("created_at", oneWeekAgo),
        // A featured/published story to highlight
        db
          .from("story_submissions")
          .select("id, title, slug, author_name, excerpt, content")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(1),
        // Total oaths all-time
        db
          .from("oath_submissions")
          .select("id", { count: "exact", head: true }),
      ]);

    const oathsThisWeek = oathsRes.count ?? 0;
    const storiesThisWeek = storiesRes.count ?? 0;
    const newStories = storiesRes.data ?? [];
    const subscribersThisWeek = subscribersRes.count ?? 0;
    const featuredStory = featuredRes.data?.[0] ?? null;
    const totalOaths = totalOathsRes.count ?? 0;

    // Build a draft email body
    const storySnippet = featuredStory
      ? `<p><strong>"${featuredStory.title}"</strong> by ${featuredStory.author_name}</p>
<p>${featuredStory.excerpt || featuredStory.content?.slice(0, 200) + "..."}</p>
<p><a href="https://samsoath.org/stories/${featuredStory.slug}">Read the full story &rarr;</a></p>`
      : "";

    const draftSubject = `Sam's OATH Weekly Update — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;

    const draftBody = `<p>Because you support Sam's OATH, I want to give you a quick status update on our movement.</p>

<h2>This Week at a Glance</h2>
<ul>
<li><strong>${oathsThisWeek}</strong> ${oathsThisWeek === 1 ? "person" : "people"} took Sam's OATH this week (${totalOaths.toLocaleString()} total)</li>
<li><strong>${storiesThisWeek}</strong> ${storiesThisWeek === 1 ? "story was" : "stories were"} shared</li>
<li><strong>${subscribersThisWeek}</strong> new ${subscribersThisWeek === 1 ? "subscriber" : "subscribers"} joined our community</li>
</ul>

${featuredStory ? `<h2>A Story You Might Be Interested In</h2>\n${storySnippet}` : ""}

<p>Every person who takes the OATH is a reminder that silence doesn't protect us — it isolates us. Thank you for being part of this.</p>

<p>With hope,<br>Frank Sheeder<br>Founder, Sam's OATH</p>

<p><a href="https://samsoath.org/take-the-oath">Take Sam's OATH</a> · <a href="https://samsoath.org/share-your-story">Share Your Story</a> · <a href="https://samsoath.org/map">View the Map</a></p>`;

    return NextResponse.json({
      stats: {
        oaths_this_week: oathsThisWeek,
        stories_this_week: storiesThisWeek,
        subscribers_this_week: subscribersThisWeek,
        total_oaths: totalOaths,
        new_stories: newStories,
        featured_story: featuredStory,
      },
      draft: {
        subject: draftSubject,
        body: draftBody,
      },
    });
  } catch (error) {
    console.error("Digest API error:", error);
    return NextResponse.json(
      { error: "Failed to generate digest" },
      { status: 500 }
    );
  }
}
