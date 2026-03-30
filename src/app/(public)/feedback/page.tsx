import type { Metadata } from "next";
import { MessageCircleHeart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { FeedbackForm } from "@/components/forms/feedback-form";

export const metadata: Metadata = {
  title: "Share Feedback | Help Us Help You",
  description:
    "Tell Sam's OATH what you need most. Your feedback shapes the resources, tools, and support we build for families navigating substance use and mental health challenges.",
  alternates: { canonical: "/feedback" },
};

export default function FeedbackPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal to-primary py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircleHeart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            How Can We Help?
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            You know better than anyone what families need. Tell us what would
            make the biggest difference in your journey, and we will build it.
          </p>
        </div>
      </section>

      {/* Form */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your voice shapes this movement
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Every resource, guide, and program we build starts with listening.
              This form is anonymous unless you choose to share your contact
              info. There are no wrong answers, just honest ones.
            </p>
          </div>
          <FeedbackForm />
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            While we work on building what you need, there are things you can do
            right now to be part of the movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
            >
              Take Sam&apos;s OATH
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
