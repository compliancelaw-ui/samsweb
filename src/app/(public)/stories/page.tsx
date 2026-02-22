import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Stories of Substance Use & Recovery | Sam's OATH",
  description:
    "Read real stories from people navigating substance use, mental health, grief, and recovery. These voices are breaking the silence and ending the stigma.",
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
  "Supporting a Loved One": "bg-teal/10 text-teal",
  "Standing With You": "bg-sage/10 text-sage",
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
      <SectionWrapper variant="light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {stories.length > 0 ? (
            stories.map((story) => (
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
            ))
          ) : (
            /* Family stories — placeholder content until submitted via the form */
            <>
              {[
                {
                  relation: "Supporting a Loved One",
                  title: "The Post That Started It All",
                  excerpt:
                    "After we lost Sam, I wrote one honest post about what our family had been through. 345,000 people read it. Hundreds of families said the same thing: \u2018I thought I was the only one.\u2019 That\u2019s when I knew \u2014 the silence was the real epidemic. If we could build a community around openness instead of shame, we could change how families deal with these struggles. That\u2019s why Sam\u2019s OATH exists.",
                  author: "Frank Sheeder",
                  location: "Dallas, TX",
                },
                {
                  relation: "Supporting a Loved One",
                  title: "My Brother Taught Me What Courage Looks Like",
                  excerpt:
                    "Sam was my brother, and watching him fight every day took a kind of courage most people never see. Our family learned the hard way that silence doesn\u2019t protect anyone \u2014 it isolates them. I want other siblings to know: it\u2019s okay to talk about what your family is going through. You\u2019re not betraying anyone by being honest. You\u2019re helping them.",
                  author: "Annie Sheeder",
                  location: "Dallas, TX",
                },
                {
                  relation: "Supporting a Loved One",
                  title: "We Don\u2019t Have to Carry This Alone",
                  excerpt:
                    "Growing up, I didn\u2019t have the words for what our family was going through. I just knew something was wrong and nobody was talking about it. Losing Sam changed that for me. Now I talk about it \u2014 with friends, with anyone who\u2019ll listen. Because the families who are still carrying this in silence need to hear that there\u2019s another way.",
                  author: "Joey Sheeder",
                  location: "Dallas, TX",
                },
                {
                  relation: "Supporting a Loved One",
                  title: "Love Doesn\u2019t Fix Everything, but It\u2019s Where Healing Starts",
                  excerpt:
                    "When I became part of this family, I stepped into something I wasn\u2019t prepared for. Substance use doesn\u2019t just affect one person \u2014 it reshapes every relationship in the house. I learned that loving someone through substance use challenges means showing up even when you don\u2019t have answers. And it means being willing to talk about it, openly, so other families know they\u2019re not alone.",
                  author: "Nancy Sheeder",
                  location: "Dallas, TX",
                },
              ].map((story) => (
                <div
                  key={story.title}
                  className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        RELATION_COLORS[story.relation] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {story.relation}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {story.excerpt}
                  </p>
                  <div className="pt-3 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500">
                      {story.author}
                    </span>
                    <span className="text-xs text-gray-400">
                      {" "}
                      &middot; {story.location}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
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

      {/* ===== WHY STORIES MATTER — split with image ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="mb-4">Why Stories Matter</h2>
              <p className="text-xl text-gray-600 mb-8">
                Every story is an act of courage. Here&apos;s what happens
                when families speak up.
              </p>
              <div className="space-y-6">
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
                  <div key={item.title}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/photos/family-couch.jpg"
                alt="Family sharing together"
                width={2048}
                height={1536}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
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
