import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Heart, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Thank You | Sam's OATH",
  description: "Thank you for your generous donation to Sam's OATH Foundation.",
  robots: { index: false },
};

export default function DonateThankYouPage() {
  return (
    <>
      <SectionWrapper variant="white" className="min-h-[60vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-teal" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Generosity
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Your donation makes a real difference. Because of supporters like
            you, families no longer have to carry the weight of silence alone.
          </p>
          <p className="text-gray-500 mb-10">
            A receipt from Stripe has been sent to your email. As a 501(c)(3)
            nonprofit, your donation to Sam&apos;s OATH Foundation is
            tax-deductible to the extent allowed by law.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal text-white font-semibold shadow-sm hover:bg-teal-500 hover:shadow-md transition-all"
            >
              See the Movement Map
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary-50 transition-all"
            >
              <Heart className="w-4 h-4" />
              Take Sam&apos;s OATH
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
