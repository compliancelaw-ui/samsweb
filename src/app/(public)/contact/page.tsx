import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Mic,
  Building2,
  Handshake,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { ContactForm } from "@/components/forms/contact-form";
import { SocialFollowButtonsLabeled } from "@/components/ui/social-follow-buttons";
import { getPageContent } from "@/lib/cms/get-page-content";

export const metadata: Metadata = {
  title: "Contact Sam's OATH | Reach Out to Our Team",
  description:
    "Have a question, want to partner, or need to connect? Reach out to the Sam's OATH team. We're here for people breaking the silence around substance use and mental health.",
};

const CONTACT_TYPES = [
  {
    icon: MessageSquare,
    title: "General Inquiries",
    description:
      "Have a question about Sam's OATH, the movement, or how to get involved? We'd love to hear from you.",
    iconBg: "bg-teal-50",
    iconColor: "text-teal",
  },
  {
    icon: Mic,
    title: "Speaking Engagements",
    description:
      "Invite Frank Sheeder to share the Sam's OATH story at your event, conference, or community gathering.",
    iconBg: "bg-primary-50",
    iconColor: "text-primary",
  },
  {
    icon: Building2,
    title: "Workplace Training",
    description:
      "Bring the OATH into your organization with Safe Listener Training and employee wellness initiatives.",
    iconBg: "bg-sage-50",
    iconColor: "text-sage",
  },
  {
    icon: Handshake,
    title: "Partnership Opportunities",
    description:
      "We're building a coalition of organizations, nonprofits, and businesses committed to breaking the stigma.",
    iconBg: "bg-orange-50",
    iconColor: "text-orange",
  },
];

export default async function ContactPage() {
  const c = await getPageContent("contact");

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            {c["hero.eyebrow"]}
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {c["hero.title"]}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {c["hero.subtitle"]}
          </p>
        </div>
      </section>

      {/* ===== CONTACT TYPES ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-16">
          <h2 className="mb-4">{c["help.title"]}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {c["help.subtitle"]}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {CONTACT_TYPES.map((type) => (
            <div
              key={type.title}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div
                className={`w-14 h-14 ${type.iconBg} rounded-xl flex items-center justify-center mb-4`}
              >
                <type.icon className={`w-7 h-7 ${type.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {type.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== CONTACT FORM + SIDEBAR ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="mb-4">{c["form.title"]}</h2>
              <p className="text-gray-600 mb-8">
                {c["form.body"]}{" "}
                Visit our{" "}
                <Link
                  href="/resources"
                  className="text-primary font-semibold hover:text-primary-600 transition-colors"
                >
                  Resources page
                </Link>
                {" "}for additional support.
              </p>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <Image
                src="/images/photos/frank-sam-suits.jpg"
                alt="Frank and Sam in suits"
                width={4032}
                height={3024}
                className="w-full h-auto rounded-xl shadow-sm mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Reach Out Directly
              </h3>

              {/* Email */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href="mailto:info@samsoath.org"
                      className="text-primary font-semibold hover:text-primary-600 transition-colors"
                    >
                      info@samsoath.org
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  For general inquiries, partnership requests, and media
                  questions.
                </p>
              </div>

              {/* Social media links */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Follow the Movement
                </h4>
                <SocialFollowButtonsLabeled
                  platforms={["instagram", "facebook", "youtube", "tiktok"]}
                />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FOR MEDIA ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">{c["media.title"]}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {c["media.body"]}
          </p>
          <Link
            href="/press"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
          >
            Visit our Press page
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ===== CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">{c["cta.title"]}</h2>
          <p className="text-white/80 text-xl mb-10 leading-relaxed">
            {c["cta.body"]}
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
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
