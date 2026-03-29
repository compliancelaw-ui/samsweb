import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, BookOpen, ArrowRight, Share2, Heart } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { ChallengeThreeFlow } from "@/components/home/challenge-three";
import { OathShareSection } from "@/components/ui/oath-share-section";
import { SoftEmailCapture } from "@/components/ui/soft-email-capture";

export const metadata: Metadata = {
  title: "Thank You for Taking Sam's OATH",
  description: "You've taken Sam's OATH. Welcome to the movement.",
  robots: { index: false, follow: false },
};

export default async function ThankYouOathPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; name?: string; date?: string }>;
}) {
  const params = await searchParams;
  const referralCode = params.ref || "";
  const name = params.name || "Friend";
  const date =
    params.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      {/* Hero - Openness */}
      <section className="bg-gradient-to-br from-teal to-primary py-24">
        <div className="container-wide text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            You&apos;re on the Map
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-2">
            You chose openness. That takes courage.
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Your pin is live. Your voice has been counted. You just joined a
            growing community of people who chose openness over silence.
          </p>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 mt-8 text-white/90 font-medium hover:text-white transition-colors"
          >
            View Sam&apos;s OATH Map <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section 1 - Certificate & Sharing (Authenticity) */}
      <SectionWrapper variant="white">
        <OathShareSection name={name} date={date} />
      </SectionWrapper>

      {/* Section 2 - Challenge 3 People (Togetherness) */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="mb-2">Togetherness Starts Here</h2>
          <p className="text-gray-600 text-lg">
            The movement grows when you invite others in
          </p>
        </div>
        <ChallengeThreeFlow referralCode={referralCode} />
      </SectionWrapper>

      {/* Section 3 - Email Capture (bridge to Healing) */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="mb-2">Healing Is a Journey</h2>
          <p className="text-gray-600 text-lg">
            Not a destination. Let us walk alongside you.
          </p>
        </div>
        <SoftEmailCapture />
      </SectionWrapper>

      {/* Section 4 - Keep the Momentum Going (Healing) */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-teal" aria-hidden="true" />
          </div>
          <h2 className="mb-2">Healing Happens in Community</h2>
          <p className="text-gray-600 text-lg mb-10">
            Here&apos;s where to find it.
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
                    Become an ambassador or bring Sam&apos;s OATH to your
                    workplace
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
