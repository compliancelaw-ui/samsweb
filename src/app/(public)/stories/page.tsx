import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Family Stories of Addiction & Recovery | Sam's OATH",
  description:
    "Read real stories from families navigating addiction, mental health, grief, and recovery. These voices are breaking the silence and ending the stigma.",
};

export const revalidate = 300; // revalidate every 5 minutes

interface PublishedStory {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  author_name: string;
  author_city: string | null;
  author_state: string | null;
  author_relation: string | null;
  published_at: string;
  is_featured: boolean;
}

async function getPublishedStories(): Promise<PublishedStory[]> {
  try {
    const { data } = await supabaseAdmin()
      .from("story_submissions")
      .select(
        "id, title, excerpt, slug, author_name, author_city, author_state, author_relation, published_at, is_featured"
      )
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false });

    return (data as PublishedStory[]) || [];
  } catch {
    return [];
  }
}

const RELATION_COLORS: Record<string, string> = {
  "I'm Struggling": "bg-teal/10 text-teal",
  "In Loving Memory": "bg-primary/10 text-primary",
  "I'm a Supporter": "bg-sage/10 text-sage",
  "Hope & Recovery": "bg-orange/10 text-orange",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function StoriesPage() {
  const stories = await getPublishedStories();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            Community Voices
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Stories of Courage
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Every story shared is a step away from silence and toward healing.
            These are real voices from real families who chose openness over
            shame.
          </p>
        </div>
      </section>

      {/* ===== STORIES ===== */}
      {stories.length > 0 ? (
        <SectionWrapper variant="light">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {stories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all hover:border-primary/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {story.author_relation && (
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        RELATION_COLORS[story.author_relation] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {story.author_relation}
                    </span>
                  )}
                  {story.is_featured && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                      Featured
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
                  <span className="text-xs text-gray-400">
                    {formatDate(story.published_at)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA below stories */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Have a story of your own? Your voice matters.
            </p>
            <Link
              href="/share-your-story"
              className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-teal-600 transition-colors"
            >
              <PenLine className="w-5 h-5" />
              Share Your Story
            </Link>
          </div>
        </SectionWrapper>
      ) : (
        /* ===== EMPTY STATE ===== */
        <SectionWrapper variant="light">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-primary-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Stories Are Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-3 leading-relaxed">
              This is where your stories will live — real accounts from families
              who&apos;ve chosen courage over silence. Every story shared here
              helps someone else feel less alone.
            </p>
            <p className="text-gray-500 mb-8">
              Be the first to share yours and help build this community of
              openness.
            </p>
            <Link
              href="/share-your-story"
              className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-teal-600 transition-colors"
            >
              <PenLine className="w-5 h-5" />
              Share Your Story
            </Link>
          </div>
        </SectionWrapper>
      )}

      {/* ===== WHY STORIES MATTER ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="mb-4">Why Stories Matter</h2>
          <p className="text-xl text-gray-600">
            Every story is an act of courage. Here&apos;s what happens when
            families speak up.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "They Break the Isolation",
              description:
                "When you share your story, you tell someone else who's struggling in silence that they are not alone. That single connection can change everything.",
            },
            {
              title: "They Reduce Stigma",
              description:
                "Every story told normalizes the conversation around substance use and mental health. The more we talk openly, the less power shame has over us.",
            },
            {
              title: "They Inspire Action",
              description:
                "Your story might be the reason someone else reaches out for help, checks on a neighbor, or finally has that conversation with their family.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-xl p-8 text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== SHARE YOUR STORY CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">Your Story Could Change a Life</h2>
          <p className="text-white/80 text-xl mb-10 leading-relaxed">
            You don&apos;t have to be a writer. You don&apos;t have to have it
            all figured out. You just have to be willing to be honest. Your
            story — in any form, at any length — matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
            >
              Share Your Story
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
            >
              Take Sam&apos;s OATH First
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
