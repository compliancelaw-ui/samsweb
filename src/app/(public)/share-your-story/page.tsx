import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Users,
  VolumeX,
  Shield,
  Eye,
  CheckCircle,
  PenLine,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Share Your Story",
  description:
    "Your story matters. Share your experience with substance use, mental health, or loss — and help other families know they're not alone.",
};

export default function ShareYourStoryPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            Your Voice Matters
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your Story Matters
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            You don&apos;t need perfect words. You just need the willingness to
            be honest. Your story could be the reason someone else stops hiding.
          </p>
        </div>
      </section>

      {/* ===== WHY SHARE ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Share Your Story?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every story shared chips away at the wall of silence that keeps
            families isolated.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Users,
              title: "Help Others Feel Less Alone",
              description:
                "Right now, someone is sitting in silence, convinced they're the only family going through this. Your story tells them they're not. That single moment of connection can be the beginning of healing.",
            },
            {
              icon: VolumeX,
              title: "Break the Cycle of Silence",
              description:
                "Stigma thrives in silence. Every time someone speaks openly about substance use or mental health, the stigma loses its grip. Your words have the power to change the conversation — in your family and beyond.",
            },
            {
              icon: Heart,
              title: "Honor Someone You Love",
              description:
                "If you've lost someone, sharing their story keeps their memory alive in a way that matters. It transforms grief into purpose, and pain into a gift that helps others find their way.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-xl p-8 text-center"
            >
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-teal" />
              </div>
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

      {/* ===== PRIVACY & SAFETY ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Your Privacy. Your Terms.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We treat every story with care. Here&apos;s how we protect you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Reviewed Before Publishing",
                description:
                  "Every story is reviewed by our team before it goes live. We check for safety, remove identifying details if requested, and ensure your story is shared exactly the way you want it.",
              },
              {
                icon: Shield,
                title: "Privacy Options",
                description:
                  "Share with your full name, first name only, or completely anonymously. You choose what level of visibility feels right for you. You can also request to have your story removed at any time.",
              },
              {
                icon: CheckCircle,
                title: "Moderated with Compassion",
                description:
                  "Our moderation process is built on respect, not judgment. We're here to amplify your voice — not edit your truth. We only step in to ensure safety for you and our community.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-sm"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FORM PLACEHOLDER ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="mb-4">Tell Us Your Story</h2>
            <p className="text-gray-600 text-lg">
              Whether it&apos;s a paragraph or a page, whether you&apos;re
              sharing about yourself or someone you love — we&apos;re listening.
            </p>
          </div>

          {/* Form placeholder */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
            <PenLine className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Story Submission Form Coming Soon
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We&apos;re building a secure, compassionate form that lets you
              share at your own pace with full control over your privacy. In the
              meantime, you can reach out directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              Contact us to share your story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== STORY GUIDELINES ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="mb-4">What to Include</h2>
            <p className="text-gray-600 text-lg">
              There&apos;s no wrong way to share. But if you&apos;re not sure
              where to start, here are some ideas.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Your relationship to substance use or mental health challenges",
              "What silence looked or felt like in your family",
              "The moment you decided to speak up — or wish you had",
              "What healing looks like for you today",
              "A message to other families going through this",
              "A tribute to someone you've lost",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white rounded-lg p-4"
              >
                <div className="w-6 h-6 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-teal rounded-full" />
                </div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">Not Ready to Share Yet?</h2>
          <p className="text-white/80 text-xl mb-10 leading-relaxed">
            That&apos;s okay. There&apos;s no pressure and no timeline. You can
            start by taking the OATH — a 60-second commitment to break the
            silence. When you&apos;re ready to share more, we&apos;ll be here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
            >
              Take the OATH
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
            >
              Read Other Stories
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
