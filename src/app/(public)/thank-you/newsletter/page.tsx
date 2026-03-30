import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Heart, BookOpen, Megaphone, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "You're Subscribed",
  description: "Welcome to the Sam's OATH community. You'll hear from us soon.",
  robots: { index: false, follow: false },
};

export default function ThankYouNewsletterPage() {
  return (
    <>
      {/* Confirmation Hero */}
      <section className="bg-gradient-to-br from-sage to-teal py-24">
        <div className="container-wide text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            You&apos;re In
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Welcome to the community. You&apos;ll receive movement updates,
            stories, and ways to get involved. We promise not to spam you.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">Now Help Spread the Word</h2>
          <p className="text-gray-600 text-lg mb-10">
            The most powerful thing you can do right now is tell someone else.
            One conversation can change everything for a family carrying this in silence.
          </p>
          <div className="space-y-4">
            <Link
              href="/take-the-oath"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
            >
              <div className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-teal" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Take Sam&apos;s OATH</p>
                  <p className="text-sm text-gray-500">
                    Place your pin on the map and make it official
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/share-your-story"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
            >
              <div className="flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-orange" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    Share Your Story
                  </p>
                  <p className="text-sm text-gray-500">
                    Your experience could help another family feel less alone
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/get-involved"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
            >
              <div className="flex items-center gap-4">
                <Megaphone className="w-6 h-6 text-sage" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    Get Involved
                  </p>
                  <p className="text-sm text-gray-500">
                    Volunteer, partner, or bring the movement to your community
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
