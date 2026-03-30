import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  MessageCircle,
  Heart,
  Printer,
  CreditCard,
  ArrowRight,
  Download,
  Shield,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { ToolkitDownloadForm } from "./toolkit-download-form";

export const metadata: Metadata = {
  title:
    "Free Workplace Mental Health Toolkit | Sam's OATH",
  description:
    "A free toolkit for starting honest conversations about substance use and mental health at work. Includes facilitator guide, discussion prompts, and printable materials.",
  alternates: { canonical: "/workplace/toolkit" },
  openGraph: {
    title: "Free Workplace Mental Health Toolkit | Sam's OATH",
    description:
      "Everything you need to bring Sam's OATH to your workplace: facilitator guide, discussion prompts, ceremony instructions, and printable materials.",
    url: "https://samsoath.org/workplace/toolkit",
  },
};

const toolkitItems = [
  {
    icon: BookOpen,
    title: "Facilitator Guide",
    description:
      "A step-by-step guide for running a 30-minute Sam's OATH session at work. Includes a script, timing notes, and tips for keeping the conversation safe and productive.",
    color: "bg-teal-50",
    iconColor: "text-teal",
  },
  {
    icon: MessageCircle,
    title: "10 Discussion Prompts",
    description:
      "Thoughtful, tested conversation starters for team meetings. Designed to open dialogue without pressuring anyone to share more than they're comfortable with.",
    color: "bg-primary-50",
    iconColor: "text-primary",
  },
  {
    icon: Heart,
    title: "OATH Ceremony Guide",
    description:
      "How to host a brief, optional group oath-taking at work. Five minutes, deeply meaningful, and a moment your team will remember.",
    color: "bg-orange-50",
    iconColor: "text-orange",
  },
  {
    icon: Printer,
    title: "Printable Materials",
    description:
      "Poster, flyer, and table card templates with QR codes linking to samsoath.org. Print them out, hang them up, leave them in the break room.",
    color: "bg-sage-50",
    iconColor: "text-sage",
  },
  {
    icon: CreditCard,
    title: "Quick-Reference Card",
    description:
      "A pocket-sized summary of crisis resources, person-first language tips, and how to respond if someone opens up to you at work.",
    color: "bg-teal-50",
    iconColor: "text-teal",
  },
];

export default function WorkplaceToolkitPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-teal py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Bring Sam&apos;s OATH to Your Workplace
            </h1>
            <p className="text-xl text-white/90 mb-8">
              A free toolkit for starting honest conversations about substance
              use and mental health at work.
            </p>
            <a
              href="#download"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Get the Free Toolkit <Download className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-4">What&apos;s Included</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Five resources, one download. Everything an HR leader, manager, or
            team member needs to start the conversation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolkitItems.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Why It Matters */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">Why It Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-3xl font-bold text-primary mb-2">
                1 in 5
              </p>
              <p className="text-gray-600 text-lg mb-6">
                employees deals with substance use or mental health challenges.
                Most never tell anyone at work.
              </p>
              <p className="text-gray-600 mb-4">
                Silence costs companies billions in lost productivity,
                absenteeism, and turnover. But the real cost is human: people
                suffering alone because the culture never made it safe to speak
                up.
              </p>
              <p className="text-gray-600">
                This toolkit gives you practical tools to change that, one
                conversation at a time.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  stat: "$740B",
                  label: "annual cost of untreated mental health in U.S. workplaces",
                },
                {
                  stat: "77%",
                  label: "of employees say they hide personal struggles from coworkers",
                },
                {
                  stat: "3x",
                  label: "more likely to miss work when carrying the weight of silence",
                },
                {
                  stat: "62%",
                  label: "say they'd stay longer at a company that supported their whole self",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 bg-white rounded-lg shadow-sm"
                >
                  <p className="text-xl font-bold text-primary">{item.stat}</p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Download Section */}
      <SectionWrapper variant="white" id="download">
        <div className="max-w-xl mx-auto">
          <h2 className="text-center mb-4">Download the Free Toolkit</h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your email to receive the complete Sam&apos;s OATH Workplace
            Toolkit as a downloadable PDF.
          </p>

          <ToolkitDownloadForm />

          <div className="mt-6 flex items-start gap-3 text-sm text-gray-500">
            <Shield className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
            <p>
              We send the toolkit and occasional updates about Sam&apos;s OATH.
              Never spam. Unsubscribe anytime. Your email is never shared.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA: Bring us to your workplace */}
      <SectionWrapper variant="gradient">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-white mb-4">Want More Than a Toolkit?</h2>
          <p className="text-white/90 text-lg mb-8">
            Sam&apos;s OATH offers live workplace programs: Safe Listener
            Training, Corporate OATH Programs, and keynote speaking. Let us come
            to your organization.
          </p>
          <Link
            href="/workplace"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            View Workplace Programs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
