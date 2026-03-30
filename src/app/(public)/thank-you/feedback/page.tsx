import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircleHeart, ArrowRight, Heart, Users, Share2 } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Thank You for Your Feedback",
  description: "Your feedback has been received. It helps us build better resources for families.",
  robots: { index: false, follow: false },
};

export default function ThankYouFeedbackPage() {
  return (
    <>
      {/* Confirmation Hero */}
      <section className="bg-gradient-to-br from-teal to-primary py-24">
        <div className="container-wide text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircleHeart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            We Hear You
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your feedback is exactly how this movement grows - from the ground up,
            shaped by the people it serves. Thank you.
          </p>
        </div>
      </section>

      {/* What happens next */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">What Happens Next</h2>
          <p className="text-gray-600 text-lg mb-4">
            Frank reads every piece of feedback personally. What you shared will
            directly influence the resources, guides, and programs we build next.
          </p>
          <p className="text-gray-500">
            If you left your contact info, we may reach out to learn more about
            your experience.
          </p>
        </div>
      </SectionWrapper>

      {/* Help spread the word */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">Help Spread the Movement</h2>
          <p className="text-gray-600 mb-8">
            The most powerful thing you can do right now is tell someone else
            about Sam&apos;s OATH. One conversation can change everything.
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
                    Place your pin on the map and join the movement
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/get-involved"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Users className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Get Involved</p>
                  <p className="text-sm text-gray-500">
                    Volunteer, partner, or bring Sam&apos;s OATH to your community
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/share-your-story"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Share2 className="w-6 h-6 text-orange" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Share Your Story</p>
                  <p className="text-sm text-gray-500">
                    Your experience can help another family feel less alone
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
