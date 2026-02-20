import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Download, Share2, BookOpen, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Thank You for Taking the OATH",
  description: "You've taken Sam's OATH. Welcome to the movement.",
};

export default function ThankYouOathPage() {
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
            Your pin has been placed. Your voice has been counted. You are part
            of a growing movement of families who chose openness over silence.
          </p>
        </div>
      </section>

      {/* What Just Happened */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-10">Here&apos;s What Just Happened</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-teal" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your Pin Is Live
              </h3>
              <p className="text-gray-600 text-base">
                A color-coded pin representing your commitment is now visible on
                our national map.
              </p>
              <Link
                href="/map"
                className="inline-flex items-center gap-1 text-teal font-medium text-sm mt-3 hover:text-teal-600"
              >
                View the map <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your Certificate
              </h3>
              <p className="text-gray-600 text-base">
                Download your personalized OATH certificate to keep or share
                with your family.
              </p>
              <button className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-3 hover:text-primary-600">
                Download PDF <Download className="w-3 h-3" />
              </button>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-sage-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-7 h-7 text-sage" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Share Your Badge
              </h3>
              <p className="text-gray-600 text-base">
                Download a social media badge and share it on LinkedIn,
                Instagram, or Facebook.
              </p>
              <button className="inline-flex items-center gap-1 text-sage-600 font-medium text-sm mt-3 hover:text-sage-700">
                Download badge <Download className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* What's Next */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">Keep Going</h2>
          <p className="text-gray-600 text-lg mb-10">
            Taking the OATH is just the beginning. Here are more ways to be part
            of the movement.
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
                    Your experience could help another family feel less alone
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
              href="/get-involved"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Share2 className="w-6 h-6 text-teal" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Get Involved</p>
                  <p className="text-sm text-gray-500">
                    Become an ambassador, volunteer, or partner with us
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
