import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar, MapPin, PenLine, Share2 } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const revalidate = 300;

interface StoryDetail {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  author_name: string;
  author_city: string | null;
  author_state: string | null;
  author_relation: string | null;
  published_at: string;
}

async function getStory(slug: string): Promise<StoryDetail | null> {
  try {
    const { data } = await supabaseAdmin()
      .from("story_submissions")
      .select(
        "id, title, content, excerpt, slug, author_name, author_city, author_state, author_relation, published_at"
      )
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    return data as StoryDetail | null;
  } catch {
    return null;
  }
}

async function getRelatedStories(
  currentId: string
): Promise<{ id: string; title: string; slug: string; author_name: string; excerpt: string | null }[]> {
  try {
    const { data } = await supabaseAdmin()
      .from("story_submissions")
      .select("id, title, slug, author_name, excerpt")
      .eq("status", "published")
      .neq("id", currentId)
      .order("published_at", { ascending: false })
      .limit(3);

    return data || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: story.title,
    description:
      story.excerpt ||
      `Read ${story.author_name}'s story about substance use and mental health.`,
    openGraph: {
      title: story.title,
      description:
        story.excerpt || `A story of courage from ${story.author_name}.`,
      type: "article",
      publishedTime: story.published_at,
    },
    alternates: { canonical: `/stories/${slug}` },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) notFound();

  const relatedStories = await getRelatedStories(story.id);

  const storyJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description:
      story.excerpt ||
      `${story.author_name}'s story about substance use and mental health.`,
    datePublished: story.published_at,
    author: {
      "@type": "Person",
      name: story.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: "Sam's OATH",
      url: "https://samsoath.org",
    },
    mainEntityOfPage: `https://samsoath.org/stories/${story.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }}
      />
      {/* ===== STORY HEADER ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-20 md:py-28">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-white text-center">
          {story.author_relation && (
            <p className="text-teal-200 text-sm font-medium mb-4 tracking-wide uppercase">
              {story.author_relation}
            </p>
          )}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {story.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/70 text-sm flex-wrap">
            <span className="font-medium text-white/90">
              {story.author_name}
            </span>
            {story.author_city && story.author_state && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {story.author_city}, {story.author_state}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(story.published_at)}
            </span>
          </div>
        </div>
      </section>

      {/* ===== STORY CONTENT ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-medium text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all stories
          </Link>

          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
            {story.content.split("\n").map((paragraph, i) =>
              paragraph.trim() ? <p key={i}>{paragraph}</p> : null
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-gray-500">
                Shared by{" "}
                <span className="font-medium text-gray-700">
                  {story.author_name}
                </span>
                {story.author_city && story.author_state && (
                  <span>
                    {" "}from {story.author_city}, {story.author_state}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Share2 className="w-4 h-4" />
                <span>Share this story to help break the silence</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== RELATED STORIES ===== */}
      {relatedStories.length > 0 && (
        <SectionWrapper variant="light">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center mb-8">More Stories of Courage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedStories.map((related) => (
                <Link
                  key={related.id}
                  href={`/stories/${related.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all hover:border-primary/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  {related.excerpt && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {related.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-3 font-medium">
                    {related.author_name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* ===== CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">Your Story Matters Too</h2>
          <p className="text-white/80 text-xl mb-8 leading-relaxed">
            Reading someone else&apos;s story might be the first step toward
            sharing your own. When you&apos;re ready, we&apos;re here.
          </p>
          <Link
            href="/share-your-story"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
          >
            <PenLine className="w-5 h-5" />
            Share Your Story
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
