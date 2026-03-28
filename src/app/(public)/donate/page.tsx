import type { Metadata } from "next";
import {
  Heart,
  Users,
  Megaphone,
  BookOpen,
  Shield,
  HandHeart,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { DonationForm } from "@/components/forms/donation-form";

export const metadata: Metadata = {
  title: "Donate | Support the Movement Against Silence",
  description:
    "Your donation to Sam's OATH funds awareness campaigns, community events, and support resources for families affected by substance use and mental health challenges.",
  alternates: { canonical: "/donate" },
};

const IMPACT_ITEMS = [
  {
    icon: Megaphone,
    title: "Awareness Campaigns",
    description:
      "Digital and grassroots campaigns that reach hundreds of thousands of families and break through the stigma of silence.",
    color: "teal",
    bgColor: "bg-teal-50",
  },
  {
    icon: Users,
    title: "Community Events",
    description:
      "Local gatherings, speaking engagements, and OATH ceremonies that bring families together and build real connection.",
    color: "primary",
    bgColor: "bg-primary-50",
  },
  {
    icon: BookOpen,
    title: "Support Resources",
    description:
      "Free educational materials, Safe Listener Training programs, and workplace tools that give people the words to help.",
    color: "sage",
    bgColor: "bg-sage-50",
  },
  {
    icon: HandHeart,
    title: "Family Support",
    description:
      "Direct outreach and resource connections for families navigating substance use and mental health challenges.",
    color: "orange",
    bgColor: "bg-orange-50",
  },
];

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal to-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Heart className="w-12 h-12 mx-auto mb-6 text-white/80" />
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Support the Movement
            </h1>
            <p className="text-xl text-white/80">
              Every dollar helps us break the silence around substance use and
              mental health. Your generosity ensures no family carries this
              weight alone.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Make a Donation
            </h2>
            <p className="text-gray-600 mb-8">
              Choose an amount and frequency. You will be redirected to Stripe
              for secure payment.
            </p>
            <DonationForm />
          </div>
        </div>
      </SectionWrapper>

      {/* Impact section */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-4">Where Your Donation Goes</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            100% of donations go directly toward our mission. Here is how your
            support makes a difference.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {IMPACT_ITEMS.map((item) => (
              <div
                key={item.title}
                className={`p-8 ${item.bgColor} rounded-xl`}
              >
                <div
                  className={`w-14 h-14 bg-${item.color} rounded-xl flex items-center justify-center mb-5`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Transparency */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="mb-4">Transparency and Trust</h2>
          <p className="text-gray-600 text-lg mb-8">
            Sam&apos;s OATH Foundation is a registered 501(c)(3) nonprofit
            organization. All donations are tax-deductible to the extent allowed
            by law. We are committed to full transparency in how we use every
            dollar entrusted to us.
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-left">
              <p className="text-sm text-gray-500">Organization</p>
              <p className="font-semibold text-gray-900">
                Sam&apos;s OATH Foundation
              </p>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block" />
            <div className="text-left">
              <p className="text-sm text-gray-500">Tax Status</p>
              <p className="font-semibold text-gray-900">501(c)(3) Nonprofit</p>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block" />
            <div className="text-left">
              <p className="text-sm text-gray-500">EIN</p>
              <p className="font-semibold text-gray-900">99-1234567</p>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block" />
            <div className="text-left">
              <p className="text-sm text-gray-500">Payment</p>
              <p className="font-semibold text-gray-900">Secured by Stripe</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/about/annual-reports"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-600 transition-colors"
            >
              <FileText className="w-4 h-4" />
              View Annual Reports
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
