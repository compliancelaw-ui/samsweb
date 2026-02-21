import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import {
  ArrowRight,
  Heart,
  Users,
  Music,
  ChevronRight,
  Briefcase,
  BookOpen,
  Sun,
  User,
  HandHeart,
  MessageCircle,
  Shield,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { FeaturedStories } from "@/components/stories/featured-stories";
import { LiveImpactStats } from "@/components/home/live-impact-stats";

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
  title: "Sam's OATH | Break the Silence on Addiction & Mental Health",
  description:
    "Join a national movement of families breaking the silence around substance use and mental health. Take the OATH. Share your story. You are not alone.",
};

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
              A National Movement
            </p>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              What&apos;s Hidden
              <br />
              Doesn&apos;t Heal
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed max-w-2xl">
              Millions of families are struggling with substance use and mental
              health challenges — in silence, shame, and isolation.
            </p>
            <p className="text-lg text-white/70 mb-10 max-w-2xl">
              Sam&apos;s OATH is a movement to break that silence. Take the OATH.
              Join the community. You are not alone.
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

      {/* ===== THE PROBLEM: SILENCE ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Silence Is the Crisis</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            When someone you love is struggling, the weight doesn&apos;t just
            fall on them — it falls on the entire family. The guilt. The shame.
            The loneliness of going through it without ever speaking openly.
            Families carry it in silence — and what&apos;s hidden doesn&apos;t
            heal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">1 in 5</p>
              <p className="text-gray-500">
                American families are affected by substance use disorder
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-teal mb-2">46M</p>
              <p className="text-gray-500">
                adults experience mental illness each year
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange mb-2">90%</p>
              <p className="text-gray-500">
                of families never talk about it openly
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== THE OATH: THE SOLUTION ===== */}
      <SectionWrapper variant="light" id="what-is-oath">
        <div className="text-center mb-16">
          <h2 className="mb-4">The OATH</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four commitments. Sixty seconds. A lifetime of change.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              letter: "O",
              word: "Openness",
              description:
                "I will talk about substance use and mental health without shame.",
              color: "bg-teal text-white",
            },
            {
              letter: "A",
              word: "Authenticity",
              description:
                "I will be honest about what my family has been through.",
              color: "bg-primary text-white",
            },
            {
              letter: "T",
              word: "Togetherness",
              description:
                "I will stand with others who are carrying this weight.",
              color: "bg-sage text-white",
            },
            {
              letter: "H",
              word: "Healing",
              description:
                "I will choose healing — for myself and for my community.",
              color: "bg-orange text-white",
            },
          ].map((item) => (
            <div
              key={item.letter}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center"
            >
              <div
                className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}
              >
                {item.letter}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.word}
              </h3>
              <p className="text-gray-600">{item.description}</p>
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

      {/* ===== WHICH ONE ARE YOU? (CATEGORY ENTRY POINTS) ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-12">
          <h2 className="mb-4">Which One Are You?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No matter where you are on this journey, there&apos;s a place for
            you here.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Heart,
              title: "I\u2019m Struggling",
              description:
                "Someone I love is facing substance use or mental health challenges. I need to know I\u2019m not alone.",
              color: "border-teal",
              iconBg: "bg-teal-50",
              iconColor: "text-teal",
              dotColor: "bg-teal",
            },
            {
              icon: User,
              title: "In Loving Memory",
              description:
                "I lost someone I love. I want to honor them and help other families avoid the silence we carried.",
              color: "border-primary",
              iconBg: "bg-primary-50",
              iconColor: "text-primary",
              dotColor: "bg-primary",
            },
            {
              icon: Users,
              title: "I\u2019m a Supporter",
              description:
                "I believe no family should struggle in silence. I\u2019m here to stand with those who are carrying this weight.",
              color: "border-sage",
              iconBg: "bg-sage-50",
              iconColor: "text-sage",
              dotColor: "bg-sage",
            },
            {
              icon: Sun,
              title: "Hope & Recovery",
              description:
                "I\u2019m on a journey of recovery or finding hope. I want to share that light with others still in the dark.",
              color: "border-orange",
              iconBg: "bg-orange-50",
              iconColor: "text-orange",
              dotColor: "bg-orange",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href="/take-the-oath"
              className={`group block rounded-xl border-2 ${item.color} p-6 text-center hover:shadow-lg transition-all`}
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
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <span className="text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                Take the OATH &rarr;
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== IMPACT / SOCIAL PROOF ===== */}
      <SectionWrapper variant="gradient">
        <div className="text-center text-white">
          <h2 className="text-white mb-4">A Movement Growing Every Day</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
            What started as one conversation became a national community of
            families choosing openness over silence.
          </p>
          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-12 w-24 bg-white/20 rounded mx-auto mb-2" />
                    <div className="h-4 w-20 bg-white/10 rounded mx-auto" />
                  </div>
                ))}
              </div>
            }
          >
            <LiveImpactStats />
          </Suspense>
        </div>
      </SectionWrapper>

      {/* ===== LIVE MAP PREVIEW ===== */}
      <SectionWrapper variant="light">
        <div className="text-center mb-10">
          <h2 className="mb-4">See the Movement</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every pin is a family that chose openness. Every color tells a
            story.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg"
            style={{ height: "450px" }}
          >
            <HomeMapPreview />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal" />
              <span className="text-sm text-gray-500">I&apos;m Struggling</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-gray-500">In Loving Memory</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sage" />
              <span className="text-sm text-gray-500">I&apos;m a Supporter</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange" />
              <span className="text-sm text-gray-500">Hope &amp; Recovery</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
          >
            Explore the full OATH Map
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ===== FEATURED STORIES ===== */}
      <SectionWrapper variant="white">
        <Suspense fallback={null}>
          <FeaturedStories />
        </Suspense>
      </SectionWrapper>

      {/* ===== WHAT HAPPENS WHEN YOU TAKE THE OATH ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-16">
          <h2 className="mb-4">What Happens When You Take the OATH</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            It takes 60 seconds. Here&apos;s what you get.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Shield,
              title: "Your Pin on the Map",
              description:
                "A color-coded pin appears on our national map \u2014 proof that you\u2019re not alone.",
            },
            {
              icon: BookOpen,
              title: "A Personalized Certificate",
              description:
                "Download your OATH certificate to keep or share with your family.",
            },
            {
              icon: MessageCircle,
              title: "A Social Badge",
              description:
                "Share on LinkedIn, Instagram, or Facebook to inspire others.",
            },
            {
              icon: HandHeart,
              title: "A Community",
              description:
                "Join families across the country who chose openness over silence.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-teal" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== MUSIC PREVIEW ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-orange font-medium mb-2 uppercase tracking-wide text-sm">
              Original Music
            </p>
            <h2 className="mb-4">Songs for the Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              15 original songs for every family that knows the weight of
              silence — and the relief of finally being heard.
            </p>
          </div>
          {/* Featured track embed */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="175"
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "10px",
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/album/whats-hidden-doesnt-heal/1863071795"
            />
          </div>
          <div className="text-center">
            <Link
              href="/music"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              <Music className="w-5 h-5" />
              Listen to all 15 tracks
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== WAYS TO GET INVOLVED ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-12">
          <h2 className="mb-4">Ways to Get Involved</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            There are many ways to be part of this movement. Find the one that
            fits you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Heart,
              title: "Take Sam\u2019s OATH",
              description:
                "Make the commitment. Get your pin on the map, your certificate, and your badge.",
              href: "/take-the-oath",
              color: "text-teal",
              bg: "bg-teal-50",
            },
            {
              icon: BookOpen,
              title: "Share Your Story",
              description:
                "Your story could be the reason someone else reaches out for help.",
              href: "/share-your-story",
              color: "text-primary",
              bg: "bg-primary-50",
            },
            {
              icon: Briefcase,
              title: "Bring It to Your Workplace",
              description:
                "Safe Listener Training and the Workplace OATH program for organizations.",
              href: "/workplace",
              color: "text-sage",
              bg: "bg-sage-50",
            },
            {
              icon: Users,
              title: "Become an Ambassador",
              description:
                "Represent the movement in your state and help it grow.",
              href: "/get-involved",
              color: "text-orange",
              bg: "bg-orange-50",
            },
            {
              icon: Music,
              title: "Listen & Share the Music",
              description:
                "15 original songs on Apple Music, Spotify, and all platforms.",
              href: "/music",
              color: "text-primary",
              bg: "bg-primary-50",
            },
            {
              icon: HandHeart,
              title: "Find Resources",
              description:
                "Crisis hotlines, support organizations, and reading for families.",
              href: "/resources",
              color: "text-teal",
              bg: "bg-teal-50",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div
                className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== ORIGIN — BRIEF ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
            The Story Behind the Movement
          </p>
          <h2 className="mb-6">Why &ldquo;Sam&apos;s&rdquo; OATH?</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Sam&apos;s OATH is named after Sam Sheeder (1998–2025), who faced
            substance use disorder with courage and honesty. After losing Sam,
            his father Frank wrote openly about what their family had been
            through — and the response was overwhelming. Hundreds of families
            said the same thing: &ldquo;I thought I was the only one.&rdquo;
          </p>
          <p className="text-gray-500 mb-8">
            That moment became the foundation of this movement — built on the
            belief that no family should carry this weight in silence.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
          >
            Read the full story
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ===== FINAL CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-6">
            You Don&apos;t Have to Be Silent Anymore
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Whether you&apos;re struggling, grieving, recovering, or simply
            standing in support — your voice matters. Take Sam&apos;s OATH. Join
            the movement. Help us prove that what&apos;s hidden doesn&apos;t
            have to stay that way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
            >
              Take Sam&apos;s OATH
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
            >
              Read Stories
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
