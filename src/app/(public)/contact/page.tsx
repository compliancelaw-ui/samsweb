import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Mic,
  Building2,
  Handshake,
  PenLine,
  Heart,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sam's OATH. Whether you have questions, want to book a speaking engagement, or explore partnership opportunities — we'd love to hear from you.",
};

const CONTACT_TYPES = [
  {
    icon: MessageSquare,
    title: "General Inquiries",
    description:
      "Have a question about Sam's OATH, the movement, or how to get involved? We'd love to hear from you. No question is too small.",
    iconBg: "bg-teal-50",
    iconColor: "text-teal",
  },
  {
    icon: Mic,
    title: "Speaking Engagements",
    description:
      "Invite Frank Sheeder to share the Sam's OATH story at your event, conference, or community gathering. His talks inspire action and break down barriers around substance use and mental health.",
    iconBg: "bg-primary-50",
    iconColor: "text-primary",
  },
  {
    icon: Building2,
    title: "Workplace Training",
    description:
      "Bring the OATH into your organization with Safe Listener Training, workplace certification programs, and employee wellness initiatives that address the hidden epidemic of silence.",
    iconBg: "bg-sage-50",
    iconColor: "text-sage",
  },
  {
    icon: Handshake,
    title: "Partnership Opportunities",
    description:
      "We're building a coalition of organizations, nonprofits, treatment centers, and businesses committed to breaking the stigma. Let's explore how we can work together.",
    iconBg: "bg-orange-50",
    iconColor: "text-orange",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            Get In Touch
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Whether you want to share your story, bring the OATH to your
            workplace, or simply say hello — we&apos;re here and we&apos;re
            listening.
          </p>
        </div>
      </section>

      {/* ===== CONTACT TYPES ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-16">
          <h2 className="mb-4">How Can We Help?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re a small team with a big mission, and we read every
            message that comes our way.
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

      {/* ===== CONTACT FORM PLACEHOLDER + EMAIL ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form placeholder */}
            <div className="lg:col-span-3">
              <h2 className="mb-4">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                We typically respond within 1-2 business days. For urgent
                matters or crisis support, please call 988 or visit our{" "}
                <Link
                  href="/resources"
                  className="text-primary font-semibold hover:text-primary-600 transition-colors"
                >
                  Resources page
                </Link>
                .
              </p>
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                <PenLine className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Contact Form Coming Soon
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We&apos;re building a secure contact form. In the meantime,
                  please reach out via email below.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
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

              {/* Social media links placeholder */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Follow the Movement
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "LinkedIn", handle: "Sam's OATH" },
                    { name: "Instagram", handle: "@samsoath" },
                    { name: "Facebook", handle: "Sam's OATH" },
                    { name: "YouTube", handle: "Sam's OATH" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors group"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                        <Heart className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{social.name}</p>
                        <p className="text-xs text-gray-400">
                          {social.handle}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FOR MEDIA ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">For Media &amp; Press</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Sam&apos;s OATH is available for interviews, features, and media
            collaborations. Frank Sheeder has spoken about the movement on
            podcasts, at conferences, and in publications. We&apos;re always
            happy to share the story behind the OATH and the families it&apos;s
            reaching.
          </p>
          <p className="text-gray-600 mb-8">
            For press inquiries, please email{" "}
            <a
              href="mailto:info@samsoath.org"
              className="text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              info@samsoath.org
            </a>{" "}
            with &ldquo;Media Inquiry&rdquo; in the subject line.
          </p>
        </div>
      </SectionWrapper>

      {/* ===== CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">Join the Movement Today</h2>
          <p className="text-white/80 text-xl mb-10 leading-relaxed">
            You don&apos;t need permission to be part of this. Take the OATH,
            share your story, or simply tell someone you know about Sam&apos;s
            OATH. Every conversation is a step toward healing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
            >
              Take the OATH
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
