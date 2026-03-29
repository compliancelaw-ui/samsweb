import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Bell, ArrowRight, Heart, Compass } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { StoryShareButtons } from "./share-buttons";
import { SoftEmailCapture } from "@/components/ui/soft-email-capture";

export const metadata: Metadata = {
  title: "Thank You for Sharing Your Story",
  description: "Your story has been submitted. We'll review it and be in touch.",
  robots: { index: false, follow: false },
};

export default function ThankYouStoryPage() {
  return (
    <>
      {/* Hero - Celebrating Authenticity */}
      <section className="bg-gradient-to-br from-orange to-primary py-24">
        <div className="container-wide text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Your Voice Matters
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            You just did one of the hardest things there is - you told the truth.
            That&apos;s <strong>Authenticity</strong> in action.
          </p>
        </div>
      </section>

      {/* Section 1 - Your Story's Journey */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-10">Your Story&apos;s Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-orange" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We Review It
              </h3>
              <p className="text-gray-600 text-base">
                Our team will read your story within 48 hours. We review every
                submission with care and respect.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We&apos;ll Be in Touch
              </h3>
              <p className="text-gray-600 text-base">
                You&apos;ll receive an email when your story is reviewed. We may
                reach out with questions or suggestions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-teal" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your Story Goes Live
              </h3>
              <p className="text-gray-600 text-base">
                Once approved, your story will be published on our Stories page
                and may appear as a pin on the map.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Section 2 - Share the Movement (Togetherness) */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-3">Share the Movement</h2>
          <p className="text-gray-600 text-lg mb-8">
            Your story isn&apos;t published yet, but you can still invite others
            into <strong>Togetherness</strong>. Let people know you spoke up.
          </p>
          <StoryShareButtons />
        </div>
      </SectionWrapper>

      {/* Section 3 - Stay Connected */}
      <SectionWrapper variant="white">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-gray-600 text-base mb-6">
            We&apos;d love to stay in touch as your story makes its way to others.
          </p>
          <SoftEmailCapture />
        </div>
      </SectionWrapper>

      {/* Section 4 - Keep Going (Togetherness + Healing) */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">Keep Going</h2>
          <p className="text-gray-600 text-lg mb-10">
            Sharing your story was an act of courage. Here&apos;s how to keep
            building <strong>Togetherness</strong> and <strong>Healing</strong>.
          </p>
          <div className="space-y-4">
            <Link
              href="/take-the-oath"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-teal" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Take Sam&apos;s OATH</p>
                  <p className="text-sm text-gray-500">
                    Place your pin on the map and stand with others
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/stories"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Read Stories</p>
                  <p className="text-sm text-gray-500">
                    See what other families have shared
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/resources"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Compass className="w-6 h-6 text-orange" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Resources</p>
                  <p className="text-sm text-gray-500">
                    Free guides for families navigating substance use and mental health
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
