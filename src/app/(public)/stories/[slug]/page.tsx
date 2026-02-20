import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

// This will be a dynamic page that fetches story data from Supabase
// For now, we show a placeholder that will be wired up when the database is connected

export const metadata: Metadata = {
  title: "Story",
  description: "A story from the Sam's OATH community.",
};

export default function StoryPage() {
  return (
    <>
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>

          {/* Placeholder */}
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Story Not Found
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              This story may not exist yet, or it may be pending review.
            </p>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Browse All Stories
            </Link>
          </div>

          {/* When wired up, the story will show:
            - Author name (if consent_name is true)
            - Author location (city, state)
            - Published date
            - Story title
            - Full story content
            - Share buttons
            - Related stories
          */}
        </div>
      </SectionWrapper>
    </>
  );
}
