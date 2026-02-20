import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Users,
  ArrowRight,
  Quote,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Family Perspectives",
  description:
    "Substance use and mental health affect every member of the family. Hear from parents, siblings, and loved ones who chose openness over silence.",
};

export default function FamiliesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange to-primary py-24">
        <div className="container-wide text-white text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Every Family Has a Story
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Substance use and mental health challenges don&apos;t just affect
            one person. They ripple through entire families. These are the voices
            of those who refused to stay silent.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Beyond One Perspective</h2>
          <p className="text-gray-600 text-lg">
            When we talk about substance use and mental health, we often hear
            from one person. But every family member experiences it differently —
            the parent who lies awake at night, the sibling who feels invisible,
            the spouse who carries the weight alone. At Sam&apos;s OATH, we
            believe every perspective matters.
          </p>
        </div>
      </SectionWrapper>

      {/* Family Voices */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">Family Voices</h2>
          <div className="space-y-8">
            {/* These are placeholder sections - will be filled with real family perspectives */}
            {[
              {
                role: "A Parent's Perspective",
                description:
                  "The guilt, the fear, the love that never wavers. Parents carry a unique weight when a child struggles. There is no manual for this.",
                color: "bg-primary-50 border-primary-200",
                iconColor: "text-primary",
              },
              {
                role: "A Sibling's Perspective",
                description:
                  "Growing up in the shadow of someone else's struggle. Siblings often feel forgotten — their own pain dismissed, their own needs set aside. Their voices matter too.",
                color: "bg-teal-50 border-teal-200",
                iconColor: "text-teal",
              },
              {
                role: "A Spouse's Perspective",
                description:
                  "Loving someone through their darkest moments while trying to hold yourself together. Spouses and partners face impossible choices every day.",
                color: "bg-orange-50 border-orange-200",
                iconColor: "text-orange",
              },
              {
                role: "A Friend's Perspective",
                description:
                  "Sometimes the people closest to us aren't family by blood. Friends see things families can't — and they carry their own weight of worry and helplessness.",
                color: "bg-sage-50 border-sage-200",
                iconColor: "text-sage",
              },
            ].map((voice) => (
              <div
                key={voice.role}
                className={`p-8 rounded-xl border ${voice.color}`}
              >
                <div className="flex items-start gap-4">
                  <Quote className={`w-8 h-8 ${voice.iconColor} flex-shrink-0 mt-1`} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {voice.role}
                    </h3>
                    <p className="text-gray-600 text-lg italic">
                      {voice.description}
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                      Personal stories coming soon
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="w-10 h-10 text-orange mx-auto mb-4" />
          <h2 className="mb-4">Share Your Family&apos;s Story</h2>
          <p className="text-gray-600 text-lg mb-8">
            Every family perspective is valuable. Whether you&apos;re a parent,
            sibling, spouse, child, or friend — your voice matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 bg-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Share Your Story <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors"
            >
              <Users className="w-4 h-4" />
              Take the OATH
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
