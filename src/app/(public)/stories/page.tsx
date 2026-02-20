import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Filter, PenLine } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Read stories of courage from families affected by substance use and mental health challenges. Every story shared breaks the cycle of silence.",
};

const FILTER_CATEGORIES = [
  { label: "All", value: "all", color: "bg-gray-900 text-white" },
  { label: "Struggling", value: "struggling", color: "bg-teal/10 text-teal border border-teal/30" },
  { label: "In Memory", value: "memory", color: "bg-primary/10 text-primary border border-primary/30" },
  { label: "Supporter", value: "supporter", color: "bg-sage/10 text-sage border border-sage/30" },
];

export default function StoriesPage() {
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

      {/* ===== FILTER BAR ===== */}
      <SectionWrapper variant="white" className="py-8 md:py-8 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <Filter className="w-5 h-5 text-gray-400 mr-1" />
          {FILTER_CATEGORIES.map((category) => (
            <button
              key={category.value}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all hover:shadow-md ${
                category.value === "all"
                  ? category.color
                  : category.color + " hover:opacity-80"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== STORY GRID (EMPTY STATE) ===== */}
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
            Be the first to share yours and help build this community of openness.
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
              Take the OATH First
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
