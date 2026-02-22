import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ArrowRight, BookOpen, MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { LiveImpactStats } from "@/components/home/live-impact-stats";

export const metadata: Metadata = {
  title: "OATH Map | See the Movement Growing Across America",
  description:
    "Every pin on this map is a family that chose openness over silence. See the movement growing across the country and add your pin.",
  openGraph: {
    title: "OATH Map | See the Movement Growing Across America",
    description:
      "Every pin on this map is a family that chose openness over silence. See the movement growing across the country and add your pin.",
  },
};

const OathMap = dynamic(() => import("@/components/map/oath-map"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative mx-auto mb-4">
          <div className="h-12 w-12 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-teal" />
        </div>
        <p className="text-sm font-medium text-gray-600">
          Loading the movement map...
        </p>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-16 md:py-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4 text-teal-200" />
            <span className="text-sm font-medium text-white/90">
              The Centerpiece of the Movement
            </span>
          </div>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            This Is What Happens When
            <br />
            Families Stop Hiding
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
            Every pin on this map is someone who decided that silence was no
            longer an option. A parent, a sibling, a friend, a person in
            recovery &mdash; each one proving that no family has to face this
            alone.
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            This map isn&apos;t data. It&apos;s proof. Proof that when one
            person speaks up, others find the courage to do the same.
          </p>
        </div>
      </section>

      {/* ===== LIVE STATS ===== */}
      <SectionWrapper variant="gradient">
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
      </SectionWrapper>

      {/* ===== THE MAP ===== */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg h-[280px] sm:h-[400px] md:h-[550px] lg:h-[600px]">
          <OathMap />
        </div>
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3EABA8" }} />
            <span className="text-sm text-gray-600">Supporting a Loved One</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7AB87A" }} />
            <span className="text-sm text-gray-600">Standing With You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#E8956F" }} />
            <span className="text-sm text-gray-600">Hope &amp; Recovery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4A6FA5" }} />
            <span className="text-sm text-gray-600">Story Sharer</span>
          </div>
        </div>
        <p className="mt-2 text-center text-sm text-gray-400">
          Use +/&minus; to zoom. Click any pin to see details.
        </p>
      </div>

      {/* ===== ADD YOUR PIN CTA ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="mb-4">Add Your Pin to the Map</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every pin makes the next family feel less alone. Whether you&apos;re
              supporting someone you love, standing in solidarity, or walking your
              own path to recovery &mdash; your pin matters.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/take-the-oath"
              className="group flex flex-col items-center gap-3 p-8 bg-white rounded-xl border-2 border-teal/20 hover:border-teal hover:shadow-lg transition-all text-center"
            >
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors">
                <MapPin className="w-7 h-7 text-teal group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg mb-1">
                  Take Sam&apos;s OATH
                </p>
                <p className="text-sm text-gray-500">
                  60 seconds. Your pin on the map. A family that no longer
                  carries this alone.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-teal font-medium text-sm group-hover:gap-2 transition-all">
                Get started <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/share-your-story"
              className="group flex flex-col items-center gap-3 p-8 bg-white rounded-xl border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all text-center"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <BookOpen className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg mb-1">
                  Share Your Story
                </p>
                <p className="text-sm text-gray-500">
                  Your experience could be the reason another family stops
                  hiding. Every voice matters.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                Tell your story <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== CLOSING ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">
            Silence Ends One Pin at a Time
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Every community in America has families carrying this weight in
            secret. The map proves they don&apos;t have to. When you add your
            pin, you&apos;re not just joining a movement &mdash; you&apos;re
            giving someone else permission to join too.
          </p>
          <Link
            href="/take-the-oath"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
          >
            Take Sam&apos;s OATH
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
