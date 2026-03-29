import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Quote,
  PenLine,
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
      {/* ===== 1. HERO — Full-bleed photo with gradient overlay ===== */}
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
            <p className="text-lg text-white/90 mb-10 max-w-2xl">
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

      {/* ===== 2. WHO WAS SAM — Emotional intro (white bg) ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <Image
                src="/images/photos/sam-portrait.jpg"
                alt="Sam Sheeder"
                width={3024}
                height={4032}
                className="w-full max-w-sm h-auto rounded-2xl shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
                The Person Behind the Movement
              </p>
              <h2 className="mb-6">Sam</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-4">
                Sam Sheeder lit up every room he walked into. He was
                adventurous, fearless, and could strike up a conversation with
                anyone, from CEOs to those experiencing homelessness, making
                them feel seen and heard.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sam also faced the hard road of substance use disorder with a
                courage and honesty most people never attempt. He talked about
                it openly. He refused to hide. And he taught his family that
                the opposite of addiction is not sobriety - it is community.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                When we lost Sam in 2025, his father Frank made a choice: to
                honor Sam&apos;s openness by building a movement around it.
                Sam&apos;s OATH exists because one family decided that silence
                was no longer an option.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
              >
                Read Sam&apos;s full story
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== 3. THE SILENCE PROBLEM — Stats + urgency (dark bg) ===== */}
      <section className="bg-[#2E3B4E] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
              The Silence Is the Crisis
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
              Nearly 50 million Americans face substance use challenges. One
              in five adults experiences a mental health condition every year.
              Behind every one of those numbers is a family carrying this
              weight in silence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
            <div className="bg-white/10 rounded-xl p-8 text-center">
              <p className="text-4xl font-bold text-teal mb-2">50M+</p>
              <p className="text-white/70 text-sm">Americans face substance use challenges</p>
            </div>
            <div className="bg-white/10 rounded-xl p-8 text-center">
              <p className="text-4xl font-bold text-orange mb-2">1 in 5</p>
              <p className="text-white/70 text-sm">Adults experience a mental health condition yearly</p>
            </div>
            <div className="bg-white/10 rounded-xl p-8 text-center">
              <p className="text-4xl font-bold text-sage mb-2">Millions</p>
              <p className="text-white/70 text-sm">Of families carry this in silence, alone</p>
            </div>
          </div>
          <p className="text-center text-white/60 text-lg max-w-2xl mx-auto">
            They&apos;re not alone. They just can&apos;t see each other because
            nobody is talking. Sam&apos;s OATH changes that.
          </p>
        </div>
      </section>

      {/* ===== 4. THE OATH — Framework with emotional hooks (light bg) ===== */}
      <SectionWrapper variant="light" id="what-is-oath">
        <div className="text-center mb-16">
          <h2 className="mb-4">{c["oath.title"]}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four commitments that replace silence with community. Each one is
            something Sam lived.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {[
            {
              letter: "O",
              word: "Openness",
              hook: "Sam never hid. He told the truth even when it was hard.",
              description: c["oath.o-description"],
              color: "bg-teal text-white",
              border: "border-l-4 border-teal",
            },
            {
              letter: "A",
              word: "Authenticity",
              hook: "Your real story is your most powerful tool.",
              description: c["oath.a-description"],
              color: "bg-primary text-white",
              border: "border-l-4 border-primary",
            },
            {
              letter: "T",
              word: "Togetherness",
              hook: "The opposite of addiction is not sobriety. It is community.",
              description: c["oath.t-description"],
              color: "bg-sage text-white",
              border: "border-l-4 border-sage",
            },
            {
              letter: "H",
              word: "Healing",
              hook: "What's hidden doesn't heal. But what's shared can.",
              description: c["oath.h-description"],
              color: "bg-orange text-white",
              border: "border-l-4 border-orange",
            },
          ].map((item) => (
            <div
              key={item.letter}
              className={`bg-white rounded-lg ${item.border} shadow-sm hover:shadow-md transition-shadow p-5 flex items-start gap-4`}
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
                <p className="text-primary font-medium text-sm italic mb-2">
                  {item.hook}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== 5. FOUNDER QUOTE — Dark dramatic break ===== */}
      <section className="bg-[#2E3B4E] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0">
              <Image
                src="/images/photos/frank-headshot.jpg"
                alt="Frank Sheeder, Founder of Sam's OATH"
                width={600}
                height={600}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-xl border-4 border-teal/30"
              />
            </div>
            <div className="relative text-center md:text-left">
              <Quote className="w-12 h-12 text-teal/30 absolute -top-4 -left-2 rotate-180 hidden md:block" />
              <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed italic md:pl-8">
                {c["quote.text"]}
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-teal md:pl-8">
                {c["quote.attribution"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. THE MOVEMENT IS GROWING — Stats + Map (gradient) ===== */}
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

      {/* ===== 7. FEATURED STORIES (light bg, hidden if none) ===== */}
      <Suspense fallback={null}>
        <SectionWrapper variant="light">
          <FeaturedStories />
        </SectionWrapper>
      </Suspense>

      {/* ===== 8. ACTIVITY TICKER — Social proof ===== */}
      <Suspense fallback={null}>
        <ActivityTicker />
      </Suspense>

      {/* ===== 9. SINGLE CTA — One clear closing ask (white bg) ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-6">Join the Movement</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Take Sam&apos;s OATH and put your pin on the map. Share your story
            and help someone else find their voice. Every person who chooses
            openness makes it easier for the next one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-teal-600 transition-colors"
            >
              Take Sam&apos;s OATH
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-600 transition-colors"
            >
              Share Your Story
              <PenLine className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
