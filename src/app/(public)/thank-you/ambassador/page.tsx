import type { Metadata } from "next";
import Link from "next/link";
import { Award, Clock, CheckCircle, Users, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Ambassador Application Received",
  description: "Your ambassador application has been submitted. We'll review it shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouAmbassadorPage() {
  return (
    <>
      {/* Confirmation Hero */}
      <section className="bg-gradient-to-br from-primary to-teal py-24">
        <div className="container-wide text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Application Received
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Thank you for wanting to be an ambassador for Sam&apos;s OATH. Your
            willingness to lead speaks volumes.
          </p>
        </div>
      </section>

      {/* What Happens Next */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-10">What Happens Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We Review
              </h3>
              <p className="text-gray-600 text-base">
                Our team reviews every ambassador application personally. We
                look for passion, commitment, and alignment with Sam's OATH values.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-teal" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We Connect
              </h3>
              <p className="text-gray-600 text-base">
                If approved, you&apos;ll receive a welcome email with your
                ambassador resources, badge, and guidelines for representing the
                movement.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-sage-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-sage" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                You Lead
              </h3>
              <p className="text-gray-600 text-base">
                As an ambassador, you&apos;ll help spread Sam's OATH in your
                community, share resources, and help families break the silence.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Meanwhile */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">In the Meantime</h2>
          <div className="space-y-4 mt-8">
            <Link
              href="/take-the-oath"
              className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Award className="w-6 h-6 text-teal" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Take Sam&apos;s OATH</p>
                  <p className="text-sm text-gray-500">
                    If you haven&apos;t already, place your pin on the map
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
                <Users className="w-6 h-6 text-orange" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    Share Your Story
                  </p>
                  <p className="text-sm text-gray-500">
                    Your experience could inspire others to join the movement
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
