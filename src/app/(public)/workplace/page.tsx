import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  Building2,
  ArrowRight,
  Heart,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Workplace Programs | End Stigma at Work | Sam's OATH",
  description:
    "Bring the Sam's OATH movement to your workplace. Programs to reduce stigma around substance use and mental health, support employees, and build compassionate culture.",
};

export default function WorkplacePage() {
  return (
    <>
      {/* Hero — split with image */}
      <section className="bg-gradient-to-br from-primary to-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                The Workplace OATH
              </h1>
              <p className="text-xl text-white/80">
                Give your team permission to be honest about what they&apos;re going
                through — substance use or mental health challenges, or someone in their
                life who is. The Workplace OATH creates a culture where people get
                support instead of silence.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/photos/frank-headshot.jpg"
                alt="Frank Sheeder, Founder of Sam's OATH"
                width={800}
                height={800}
                className="w-full max-w-xs h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem — stats with emphasis */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <h2 className="mb-4">Why This Matters at Work</h2>
              <p className="text-gray-600 text-lg mb-4">
                One in five American adults has a family member struggling with
                substance use. Most come to work every day and say nothing —
                because they don&apos;t feel safe to.
              </p>
              <p className="text-gray-600">
                The Workplace OATH changes that. When organizations commit
                publicly, employees feel safe acknowledging what they&apos;re
                going through — and they get help sooner.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {[
                { stat: "1 in 5", label: "adults affected by a loved one's substance use" },
                { stat: "77%", label: "say they hide it from coworkers" },
                { stat: "$740B", label: "annual cost of untreated mental health in the workplace" },
                { stat: "3x", label: "more likely to miss work when carrying in silence" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 bg-primary-50 rounded-lg text-center"
                >
                  <p className="text-2xl font-bold text-primary">{item.stat}</p>
                  <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Programs */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Three programs designed to build a culture of openness — flexible
            for organizations of any size.
          </p>
          <div className="space-y-8">
            {/* Safe Listener Training */}
            <div className="p-8 bg-white rounded-xl shadow-sm">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-7 h-7 text-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Safe Listener Training
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Train managers and team leads to recognize when a colleague
                    may be struggling, respond with empathy instead of judgment,
                    and connect them to resources. Not therapy — just human
                    decency at work.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["2-hour workshop", "Virtual or in-person", "Up to 50 participants", "Certificate included"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate OATH */}
            <div className="p-8 bg-white rounded-xl shadow-sm">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Corporate OATH Program
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A comprehensive program that includes leadership training,
                    employee awareness sessions, resource guides, and ongoing
                    support. Your organization takes the OATH as a whole — a
                    public commitment to supporting families.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Multi-session program", "Custom to your org", "Leadership + all-hands", "Ongoing support"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Keynote */}
            <div className="p-8 bg-white rounded-xl shadow-sm">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-7 h-7 text-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Keynote Speaking
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Frank Sheeder shares his family&apos;s story and the OATH
                    framework in a powerful, moving presentation. Ideal for
                    all-hands meetings, wellness weeks, conferences, and
                    leadership retreats.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["30-60 minutes", "Q&A included", "Virtual or in-person", "Music optional"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Why It Works */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">What Changes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Reduces Stigma",
                description:
                  "When organizations publicly commit to the OATH, employees feel safe acknowledging what they're going through.",
              },
              {
                icon: TrendingUp,
                title: "Improves Retention",
                description:
                  "Employees stay at organizations that support the whole person — not just the worker.",
              },
              {
                icon: CheckCircle,
                title: "Saves Lives",
                description:
                  "Early intervention saves lives. When people feel safe speaking up, they get help sooner.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="gradient">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-white mb-4">
            Bring the OATH to Your Organization
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Your employees are already carrying this. The question is whether
            they carry it alone. Let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Request Information <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
