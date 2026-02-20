import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Blog & News",
  description:
    "Updates from the Sam's OATH movement. Stories from Frank, community news, and resources for families.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-slate py-24">
        <div className="container-wide text-white text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Blog &amp; News
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Updates from the movement, reflections from Frank, and stories of
            families finding their voice.
          </p>
        </div>
      </section>

      {/* Empty State */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center py-12">
          <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            We&apos;re getting ready to share updates, reflections, and news
            from the movement. Check back soon or subscribe to our newsletter to
            be the first to know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Subscribe to Updates <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary border border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Read Community Stories
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
