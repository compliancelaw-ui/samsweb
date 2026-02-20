import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, ArrowRight, Heart, BookOpen } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Message Sent",
  description: "Your message has been received. We'll respond as soon as possible.",
};

export default function ThankYouContactPage() {
  return (
    <>
      {/* Confirmation Hero */}
      <section className="bg-gradient-to-br from-primary to-slate py-24">
        <div className="container-wide text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Message Received
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Thank you for reaching out. We read every message and will get back
            to you as soon as possible.
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Clock className="w-7 h-7 text-primary" />
          </div>
          <h2 className="mb-4">What to Expect</h2>
          <p className="text-gray-600 text-lg mb-4">
            We typically respond within 1-2 business days. For speaking
            engagements and partnership inquiries, we may need a bit more time to
            prepare a thoughtful response.
          </p>
          <p className="text-gray-500">
            If your matter is urgent, please call the 988 Suicide &amp; Crisis
            Lifeline by dialing or texting <strong>988</strong>.
          </p>
        </div>
      </SectionWrapper>

      {/* Explore More */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">While You Wait</h2>
          <div className="space-y-4 mt-8">
            <Link
              href="/take-the-oath"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-teal" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Take the OATH</p>
                  <p className="text-sm text-gray-500">
                    Join the movement and place your pin on the map
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
                <BookOpen className="w-6 h-6 text-orange" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Read Stories</p>
                  <p className="text-sm text-gray-500">
                    Hear from families who chose openness over silence
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
