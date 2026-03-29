import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine, Quote } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { StoryShareButton } from "@/components/stories/story-share-button";
import { SoftEmailCapture } from "@/components/ui/soft-email-capture";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Stories of Substance Use & Recovery | Sam's OATH",
  description:
    "Read real stories from people navigating substance use, mental health, grief, and recovery. These voices are breaking the silence and choosing openness.",
  alternates: { canonical: "/stories" },
};

export const revalidate = 300;

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

const FAMILY_STORIES = [
  {
    relation: "Supporting a Loved One",
    title: "The Post That Started It All",
    excerpt:
      "After we lost Sam, I wrote one honest post about what our family had been through. 345,000 people read it. Hundreds of families said the same thing: \u2018I thought I was the only one.\u2019 That\u2019s when I knew \u2014 the silence was the real epidemic. If we could build a community around openness instead of shame, we could change how families deal with these struggles. That\u2019s why Sam\u2019s OATH exists.",
    author: "Frank Sheeder",
    location: "Texas",
  },
  {
    relation: "Supporting a Loved One",
    title: "My Brother Taught Me What Courage Looks Like",
    excerpt:
      "Sam was my brother, and watching him fight every day took a kind of courage most people never see. Our family learned the hard way that silence doesn\u2019t protect anyone \u2014 it isolates them. I want other siblings to know: it\u2019s okay to talk about what your family is going through. You\u2019re not betraying anyone by being honest. You\u2019re helping them.",
    author: "Annie Sheeder",
    location: "North Carolina",
  },
  {
    relation: "Supporting a Loved One",
    title: "We Don\u2019t Have to Carry This Alone",
    excerpt:
      "Growing up, I didn\u2019t have the words for what our family was going through. I just knew something was wrong and nobody was talking about it. Losing Sam changed that for me. Now I talk about it \u2014 with friends, with anyone who\u2019ll listen. Because the families who are still carrying this in silence need to hear that there\u2019s another way.",
    author: "Joey Sheeder",
    location: "Texas",
  },
  {
    relation: "Supporting a Loved One",
    title: "Love Doesn\u2019t Fix Everything, but It\u2019s Where Healing Starts",
    excerpt:
      "When I became part of this family, I stepped into something I wasn\u2019t prepared for. Substance use doesn\u2019t just affect one person \u2014 it reshapes every relationship in the house. I learned that loving someone through substance use challenges means showing up even when you don\u2019t have answers. And it means being willing to talk about it, openly, so other families know they\u2019re not alone.",
    author: "Nancy Sheeder",
    location: "Texas",
  },
];

export default async function StoriesPage() {
  const stories = await getPublishedStories();

  const featuredStory = stories.find((s) => s.is_featured);
  const gridStories = stories.filter((s) => s !== featuredStory);
  const hasDbStories = stories.length > 0;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            Authenticity in Action
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Every Story Breaks the Silence a Little More
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            These are real families choosing Authenticity over pretending.
            Read their words. Feel their courage. Share yours when you&apos;re ready.
          </p>
        </div>
      </section>

      {/* ===== FEATURED STORY ===== */}
      {featuredStory && (
        <SectionWrapper variant="white">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/stories/${featuredStory.slug}`}
              className="group block bg-gradient-to-br from-primary-50 to-teal-50 rounded-2xl border border-primary/10 p-8 md:p-12 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                {featuredStory.author_relation && (
                  <span
                    className={cn(
                      "text-xs font-medium px-3 py-1 rounded-full",
                      RELATION_COLORS[featuredStory.author_relation] ||
                        "bg-gray-100 text-gray-600"
                    )}
                  >
                    {featuredStory.author_relation}
                  </span>
                )}
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-600">
                  Featured
                </span>
              </div>

              {featuredStory.excerpt && (
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" aria-hidden="true" />
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic pl-8">
                    {featuredStory.excerpt}
                  </p>
                </div>
              )}

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                {featuredStory.title}
              </h2>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">
                    {featuredStory.author_name}
                  </span>
                  {featuredStory.author_city && featuredStory.author_state && (
                    <span>
                      {" "}
                      &middot; {featuredStory.author_city},{" "}
                      {featuredStory.author_state}
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Read Full Story
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </SectionWrapper>
      )}

      {/* ===== STORIES GRID ===== */}
      <SectionWrapper variant="light">
        {hasDbStories ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto [column-fill:_balance]">
            {gridStories.map((story, index) => (
              <Fragment key={story.id}>
                <div
                  className="break-inside-avoid mb-6"
                >
                  <div className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all hover:border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                      {story.author_relation && (
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            RELATION_COLORS[story.author_relation] ||
                              "bg-gray-100 text-gray-600"
                          )}
                        >
                          {story.author_relation}
                        </span>
                      )}
                    </div>

                    <Link href={`/stories/${story.slug}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                    </Link>

                    {story.excerpt && (
                      <Link href={`/stories/${story.slug}`}>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                          {story.excerpt}
                        </p>
                      </Link>
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
                      <StoryShareButton
                        slug={story.slug}
                        title={story.title}
                        authorName={story.author_name}
                      />
                    </div>
                  </div>
                </div>

                {/* Add Your Voice CTA card every 4 stories */}
                {(index + 1) % 4 === 0 && (
                  <div className="break-inside-avoid mb-6">
                    <Link
                      href="/share-your-story"
                      className="block bg-gradient-to-br from-teal-50 to-primary-50 rounded-xl border border-teal/20 p-6 text-center hover:shadow-lg transition-all group"
                    >
                      <PenLine className="w-8 h-8 text-teal mx-auto mb-3" aria-hidden="true" />
                      <p className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        Add Your Voice
                      </p>
                      <p className="text-sm text-gray-500">
                        Your story gives someone else permission to speak up.
                      </p>
                    </Link>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        ) : (
          /* Family stories fallback */
          <div className="columns-1 md:columns-2 gap-6 max-w-5xl mx-auto [column-fill:_balance]">
            {FAMILY_STORIES.map((story, index) => (
              <Fragment key={story.title}>
                <div
                  className="break-inside-avoid mb-6"
                >
                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          RELATION_COLORS[story.relation] ||
                            "bg-gray-100 text-gray-600"
                        )}
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
                </div>

                {/* Add Your Voice CTA after story #2 in fallback */}
                {index === 1 && (
                  <div className="break-inside-avoid mb-6">
                    <Link
                      href="/share-your-story"
                      className="block bg-gradient-to-br from-teal-50 to-primary-50 rounded-xl border border-teal/20 p-6 text-center hover:shadow-lg transition-all group"
                    >
                      <PenLine className="w-8 h-8 text-teal mx-auto mb-3" aria-hidden="true" />
                      <p className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        Add Your Voice
                      </p>
                      <p className="text-sm text-gray-500">
                        Your story gives someone else permission to speak up.
                      </p>
                    </Link>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* ===== WHY STORIES MATTER ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
                The Power of Authenticity
              </p>
              <h2 className="mb-4">Why Stories Matter</h2>
              <p className="text-xl text-gray-600 mb-8">
                Every story shared is an act of Authenticity that gives someone
                else permission to stop pretending.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "They Break the Isolation",
                    description:
                      "When you share your story, you tell someone else who's struggling in silence that they are not alone. That single connection can change everything.",
                  },
                  {
                    title: "They Build Openness",
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

              {/* Pull quote */}
              <div className="mt-8 pl-6 border-l-4 border-teal/30">
                <p className="text-gray-700 italic leading-relaxed">
                  &ldquo;To speak openly of addiction is rare; to do so with
                  the generosity of spirit that Sam showed is
                  extraordinary.&rdquo;
                </p>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  From Sam&apos;s obituary
                </p>
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
          <h2 className="text-white mb-4">Your Story Is an Act of Courage</h2>
          <p className="text-white/80 text-xl mb-4 leading-relaxed">
            You chose Openness when you came here.
            Sharing your story is Authenticity.
            Together, we heal.
          </p>
          <p className="text-white/60 text-base mb-10">
            O &rarr; A &rarr; T &rarr; H
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
              Take Sam&apos;s OATH
            </Link>
          </div>

          {/* Email capture for those not ready to share */}
          <div className="mt-12">
            <p className="text-white/70 text-sm mb-4">
              Not ready to share? Stay connected.
            </p>
            <SoftEmailCapture
              source="stories-page"
              heading="Stay Connected"
              subtext="Get stories and resources delivered to your inbox. No spam, no judgment, just community."
            />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
