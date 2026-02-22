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
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { LiveImpactStats } from "@/components/home/live-impact-stats";
import { ActivityTicker } from "@/components/home/activity-ticker";

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
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
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
              Millions of families face substance use and mental health
              challenges in silence. The OATH gives them a way out — four
              commitments that turn isolation into community.
            </p>
            <p className="text-lg text-white/70 mb-10 max-w-2xl">
              Sixty seconds. A pin on the map. A family that no longer
              carries this alone. Take Sam&apos;s OATH and join thousands
              who chose openness over silence.
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
          <h2 className="mb-4">The OATH: A Framework for Families</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Silence keeps families stuck. The OATH is how they move forward —
            four commitments that replace shame with strength.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              letter: "O",
              word: "Openness",
              description:
                "When we talk about substance use and mental health without shame, we give others permission to do the same.",
              color: "bg-teal text-white",
            },
            {
              letter: "A",
              word: "Authenticity",
              description:
                "When families share what they've really been through, isolation loses its grip. Your real story is your most powerful tool.",
              color: "bg-primary text-white",
            },
            {
              letter: "T",
              word: "Togetherness",
              description:
                "No family should face this alone. Together we are stronger than any stigma and louder than any silence.",
              color: "bg-sage text-white",
            },
            {
              letter: "H",
              word: "Healing",
              description:
                "Healing starts when we stop hiding. We choose healing — for ourselves, our families, and our communities.",
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
          <h2 className="mb-4">Find Your Place in the Movement</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everyone who takes the OATH does it for their own reason.
            What&apos;s yours?
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: Heart,
              title: "Supporting a Loved One",
              description:
                "Someone you care about is struggling. The OATH connects you with families who understand \u2014 so you never have to navigate this alone.",
              color: "border-teal",
              iconBg: "bg-teal-50",
              iconColor: "text-teal",
              dotColor: "bg-teal",
            },
            {
              icon: Users,
              title: "Standing With You",
              description:
                "You believe no family should face this in silence. Your OATH says: I see you, I stand with you, and you are not alone.",
              color: "border-sage",
              iconBg: "bg-sage-50",
              iconColor: "text-sage",
              dotColor: "bg-sage",
            },
            {
              icon: Sun,
              title: "Hope & Recovery",
              description:
                "You\u2019re walking your own path to recovery or finding hope. Your OATH lights the way for someone still in the dark.",
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

      {/* ===== THE MOVEMENT IS GROWING (COMBINED STATS + MAP) ===== */}
      <SectionWrapper variant="gradient">
        <div className="text-center text-white mb-12">
          <h2 className="text-white mb-4">The Movement Is Growing</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Every pin on the map is a family that chose community over isolation.
            This is what happens when people stop hiding and start healing.
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
              <div className="w-3 h-3 rounded-full bg-sage" />
              <span className="text-sm text-white/70">Standing With You</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange" />
              <span className="text-sm text-white/70">Hope &amp; Recovery</span>
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

      {/* ===== ORIGIN — SPLIT LAYOUT ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
                The Story Behind the Movement
              </p>
              <h2 className="mb-6">Why &ldquo;Sam&apos;s&rdquo; OATH?</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-4">
                Sam&apos;s OATH is named after Sam Sheeder (1998–2025), who
                faced substance use disorder with courage and honesty. After
                losing Sam, his father Frank wrote openly about what their
                family had been through — and the response was overwhelming.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hundreds of families said the same thing: &ldquo;I thought I
                was the only one.&rdquo; That moment became the foundation of
                this movement — built on the belief that no family should carry
                this weight alone.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
              >
                Read the full story
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

      {/* ===== FINAL CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-6">
            From Silence to Strength. It Starts Here.
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            The opposite of addiction is not sobriety — it&apos;s community.
            Take Sam&apos;s OATH, put your pin on the map, and join a
            growing movement of families who refuse to carry this weight alone.
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
