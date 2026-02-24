import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  Users,
  ChevronRight,
  Sun,
  Quote,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { LiveImpactStats } from "@/components/home/live-impact-stats";
import { ActivityTicker } from "@/components/home/activity-ticker";
import { FeaturedStories } from "@/components/stories/featured-stories";
import { getPageContent } from "@/lib/cms/get-page-content";

const HomeMapPreview = dynamic(() => import("@/components/map/oath-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-50 rounded-2xl">
      <div className="text-center">
        <div className="relative mx-auto mb-4">
          <div className="h-10 w-10 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 h-10 w-10 animate-spin rounded-full border-4 border-transparent border-t-teal" />
        </div>
        <p className="text-sm text-gray-500">Loading map...</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Sam's OATH | Break the Silence on Substance Use & Mental Health",
  description:
    "Join a national movement breaking the silence around substance use and mental health. Take Sam's OATH. Share your story. You are not alone.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const c = await getPageContent("home");

  return (
    <>
      {/* ===== HERO WITH PHOTO ===== */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="/images/photos/sam-finish-line.jpg"
          alt="Sam crossing the finish line"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E3B4E]/90 via-[#4A6FA5]/80 to-[#3EABA8]/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
              {c["hero.eyebrow"]}
            </p>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              {c["hero.title"].split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed max-w-2xl">
              {c["hero.subtitle"]}
            </p>
            <p className="text-lg text-white/70 mb-10 max-w-2xl">
              {c["hero.body"]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/take-the-oath"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
              >
                Take Sam&apos;s OATH
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/share-your-story"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
              >
                Share Your Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ACTIVITY TICKER ===== */}
      <Suspense fallback={null}>
        <ActivityTicker />
      </Suspense>

      {/* ===== THE OATH: THE SOLUTION ===== */}
      <SectionWrapper variant="light" id="what-is-oath">
        <div className="text-center mb-16">
          <h2 className="mb-4">{c["oath.title"]}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {c["oath.subtitle"]}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {[
            {
              letter: "O",
              word: "Openness",
              description: c["oath.o-description"],
              color: "bg-teal text-white",
            },
            {
              letter: "A",
              word: "Authenticity",
              description: c["oath.a-description"],
              color: "bg-primary text-white",
            },
            {
              letter: "T",
              word: "Togetherness",
              description: c["oath.t-description"],
              color: "bg-sage text-white",
            },
            {
              letter: "H",
              word: "Healing",
              description: c["oath.h-description"],
              color: "bg-orange text-white",
            },
          ].map((item) => (
            <div
              key={item.letter}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 flex items-start gap-4"
            >
              <div
                className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0`}
              >
                {item.letter}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.word}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/take-the-oath"
            className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-teal-600 transition-colors"
          >
            Take Sam&apos;s OATH — It Takes 60 Seconds
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ===== FOUNDER QUOTE ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0">
              <Image
                src="/images/photos/frank-headshot.jpg"
                alt="Frank Sheeder, Founder of Sam's OATH"
                width={600}
                height={600}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-teal/20"
              />
            </div>
            <div className="relative">
              <Quote className="w-10 h-10 text-teal/20 absolute -top-2 -left-4 rotate-180" />
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed italic pl-6">
                {c["quote.text"]}
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-teal pl-6">
                {c["quote.attribution"]}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== WHICH ONE ARE YOU? (CATEGORY ENTRY POINTS) ===== */}
      <SectionWrapper variant="light">
        <div className="text-center mb-12">
          <h2 className="mb-4">{c["categories.title"]}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {c["categories.subtitle"]}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: Heart,
              title: "Supporting a Loved One",
              description: c["categories.supporting-description"],
              color: "border-teal",
              iconBg: "bg-teal-50",
              iconColor: "text-teal",
              dotColor: "bg-teal",
            },
            {
              icon: Sun,
              title: "Seeking Hope & Recovery",
              description: c["categories.recovery-description"],
              color: "border-orange",
              iconBg: "bg-orange-50",
              iconColor: "text-orange",
              dotColor: "bg-orange",
            },
            {
              icon: Users,
              title: "Standing With Others",
              description: c["categories.standing-description"],
              color: "border-sage",
              iconBg: "bg-sage-50",
              iconColor: "text-sage",
              dotColor: "bg-sage",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href="/take-the-oath"
              className={`group flex flex-col items-center rounded-xl border-2 ${item.color} bg-white p-6 text-center hover:shadow-lg transition-all h-full`}
            >
              <div
                className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}
              >
                <item.icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`} />
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                {item.description}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-auto px-5 py-2 rounded-lg bg-[#4A6FA5]/10 text-[#4A6FA5] text-sm font-semibold group-hover:bg-[#4A6FA5] group-hover:text-white transition-all">
                Take Sam&apos;s OATH <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== FEATURED STORIES ===== */}
      <Suspense fallback={null}>
        <SectionWrapper variant="white">
          <FeaturedStories />
        </SectionWrapper>
      </Suspense>

      {/* ===== THE MOVEMENT IS GROWING (COMBINED STATS + MAP) ===== */}
      <SectionWrapper variant="gradient">
        <div className="text-center text-white mb-12">
          <h2 className="text-white mb-4">{c["movement.title"]}</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            {c["movement.subtitle"]}
          </p>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 w-24 bg-white/20 rounded mx-auto mb-2" />
                  <div className="h-4 w-20 bg-white/10 rounded mx-auto" />
                </div>
              ))}
            </div>
          }
        >
          <div className="mb-12">
            <LiveImpactStats />
          </div>
        </Suspense>
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-lg h-[300px] sm:h-[350px] md:h-[450px]">
            <HomeMapPreview />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal" />
              <span className="text-sm text-white/70">Supporting a Loved One</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange" />
              <span className="text-sm text-white/70">Seeking Hope &amp; Recovery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sage" />
              <span className="text-sm text-white/70">Standing With Others</span>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-white/80 transition-colors"
            >
              Explore the full OATH Map
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== MISSION — SPLIT LAYOUT ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
                {c["mission.eyebrow"]}
              </p>
              <h2 className="mb-6">{c["mission.title"]}</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-4">
                {c["mission.body-1"]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {c["mission.body-2"]}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
              >
                Learn more about the movement
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/photos/sam-portrait.jpg"
                alt="Sam Sheeder"
                width={3024}
                height={4032}
                className="w-full max-w-sm h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

    </>
  );
}
