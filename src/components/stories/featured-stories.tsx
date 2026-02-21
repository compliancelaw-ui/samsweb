import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";

interface FeaturedStory {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  author_name: string;
  author_city: string | null;
  author_state: string | null;
  published_at: string;
  author_relation: string | null;
}

async function getFeaturedStories(): Promise<FeaturedStory[]> {
  try {
    // First try featured stories
    const { data: featured } = await supabaseAdmin()
      .from("story_submissions")
      .select(
        "id, title, excerpt, slug, author_name, author_city, author_state, published_at, author_relation"
      )
      .eq("status", "published")
      .eq("is_featured", true)
      .order("published_at", { ascending: false })
      .limit(3);

    if (featured && featured.length > 0) return featured as FeaturedStory[];

    // Fallback to latest published stories
    const { data: latest } = await supabaseAdmin()
      .from("story_submissions")
      .select(
        "id, title, excerpt, slug, author_name, author_city, author_state, published_at, author_relation"
      )
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3);

    return (latest as FeaturedStory[]) || [];
  } catch {
    return [];
  }
}

export async function FeaturedStories() {
  const stories = await getFeaturedStories();

  if (stories.length === 0) return null;

  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
          Community Voices
        </p>
        <h2 className="mb-4">Stories of Courage</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Real stories from real families who chose openness over silence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/stories/${story.slug}`}
            className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all hover:border-primary/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-primary" />
              {story.author_relation && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-50 text-primary">
                  {story.author_relation}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {story.title}
            </h3>
            {story.excerpt && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {story.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-400">
                <span className="font-medium text-gray-500">
                  {story.author_name}
                </span>
                {story.author_city && story.author_state && (
                  <span>
                    {" "}
                    &middot; {story.author_city}, {story.author_state}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
        >
          Read all stories
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
