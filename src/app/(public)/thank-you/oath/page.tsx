import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, BookOpen, ArrowRight, Share2 } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { ChallengeThreeFlow } from "@/components/home/challenge-three";

export const metadata: Metadata = {
  title: "Thank You for Taking the OATH",
  description: "You've taken Sam's OATH. Welcome to the movement.",
};

export default async function ThankYouOathPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const referralCode = params.ref || "";

  return (
    <>
      {/* Confirmation Hero */}
      <section className="bg-gradient-to-br from-teal to-primary py-24">
        <div className="container-wide text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            You&apos;re on the Map
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your pin is live. Your voice has been counted. You just joined
            a growing community of people who chose openness over silence.
          </p>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 mt-8 text-white/90 font-medium hover:text-white transition-colors"
          >
            View the OATH Map <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Challenge 3 People — the core viral mechanism */}
      <SectionWrapper variant="white">
        <ChallengeThreeFlow referralCode={referralCode} />
      </SectionWrapper>

      {/* Keep Going */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">Keep the Momentum Going</h2>
          <p className="text-gray-600 text-lg mb-10">
            Taking the OATH was the first step. Here&apos;s how your action
            keeps growing.
          </p>
          <div className="space-y-4">
            <Link
              href="/share-your-story"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-orange" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    Share Your Story
                  </p>
                  <p className="text-sm text-gray-500">
                    When one family shares, another realizes they&apos;re not
                    alone
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
                    See what others have shared
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
                <Share2 className="w-6 h-6 text-teal" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Get Involved</p>
                  <p className="text-sm text-gray-500">
                    Become an ambassador or bring the OATH to your workplace
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
