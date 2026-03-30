import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  Mic2,
  Users,
  Building2,
  GraduationCap,
  Church,
  Heart,
  Clock,
  MapPin,
  ArrowRight,
  MessageSquare,
  Monitor,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Events & Speaking | Sam's OATH",
  description:
    "Book Frank Sheeder to speak about substance use, breaking the silence, loss, and advocacy. Keynotes, workshops, panels, and virtual presentations for conferences, workplaces, schools, and communities.",
  alternates: { canonical: "/events" },
};

/* ─── DATA ──────────────────────────────────────────────────────────────────── */

interface SpeakingTopic {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SPEAKING_TOPICS: SpeakingTopic[] = [
  {
    title: "Sam's Story",
    description:
      "A deeply personal account of a family's journey through substance use disorder, the silence that surrounded it, and how grief became a movement. Frank shares what he wishes he had known, what he wishes he had said, and why he built Sam's OATH.",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: "Choosing Openness in Your Community",
    description:
      "Silence is the number one reason people with substance use disorders do not seek help. This talk examines how silence operates at the community level and provides concrete strategies for replacing judgment with support.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "What Employers Need to Know",
    description:
      "Substance use and mental health challenges cost U.S. employers over $400 billion annually. More importantly, they cost lives. This session helps leaders create workplace cultures where people feel safe asking for help before crisis hits.",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    title: "A Father's Perspective",
    description:
      "A talk for families, support groups, and recovery communities. Frank speaks candidly about the guilt, the silence, the mistakes, and the moments of grace that come with loving someone who is struggling, and about finding purpose after loss.",
    icon: <MessageSquare className="w-6 h-6" />,
  },
];

interface FormatOption {
  label: string;
  duration: string;
  description: string;
}

const FORMAT_OPTIONS: FormatOption[] = [
  {
    label: "Keynote",
    duration: "30 to 60 minutes",
    description:
      "A focused presentation for conferences, fundraisers, or community gatherings. Includes Q&A.",
  },
  {
    label: "Workshop",
    duration: "2 to 4 hours",
    description:
      "An interactive session with exercises, group discussion, and practical tools participants can use immediately.",
  },
  {
    label: "Panel Discussion",
    duration: "60 to 90 minutes",
    description:
      "Frank joins a moderated panel alongside other advocates, clinicians, or community leaders.",
  },
  {
    label: "Virtual Presentation",
    duration: "30 to 60 minutes",
    description:
      "Live virtual keynote or workshop via Zoom, Teams, or your platform of choice. Ideal for distributed teams and national organizations.",
  },
];

interface EventType {
  label: string;
  icon: React.ReactNode;
}

const EVENT_TYPES: EventType[] = [
  { label: "Conferences", icon: <Mic2 className="w-5 h-5" /> },
  { label: "Community Forums", icon: <Users className="w-5 h-5" /> },
  { label: "Workplace Training", icon: <Building2 className="w-5 h-5" /> },
  { label: "Schools & Universities", icon: <GraduationCap className="w-5 h-5" /> },
  { label: "Faith Communities", icon: <Church className="w-5 h-5" /> },
  { label: "Recovery Communities", icon: <Heart className="w-5 h-5" /> },
];

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */

export default function EventsPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-[#2E3B4E] via-[#4A6FA5] to-[#3EABA8] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            Events & Speaking
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Bringing the Conversation to Your Community
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Frank Sheeder speaks to organizations, communities, and families about
            substance use, loss, and the power of choosing openness over
            silence.
          </p>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Upcoming Events
          </h2>
          <p className="text-gray-500 mb-10">
            Public appearances, workshops, and speaking engagements
          </p>

          <div className="rounded-xl border border-gray-100 bg-[#F8FAFB] p-12 text-center">
            <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No Upcoming Events Scheduled
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-8">
              We are currently booking speaking engagements for 2026 and beyond.
              If your organization would like to bring this conversation to your
              community, we would love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#4A6FA5] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3d5f8f] transition-colors"
            >
              Inquire About Booking <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== SPEAKING TOPICS ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Speaking Topics
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Each presentation is grounded in personal experience, supported by
              research, and tailored to the audience. Frank speaks with honesty,
              compassion, and a commitment to practical action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SPEAKING_TOPICS.map((topic) => (
              <div
                key={topic.title}
                className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-[#3EABA8]/10 text-[#3EABA8] flex items-center justify-center mb-5">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {topic.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FORMAT OPTIONS ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Presentation Formats
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Flexible options to fit your event, schedule, and audience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FORMAT_OPTIONS.map((format) => (
              <div
                key={format.label}
                className="rounded-xl border border-gray-100 p-6 hover:border-[#4A6FA5]/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#4A6FA5]/10 text-[#4A6FA5] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {format.label === "Virtual Presentation" ? (
                      <Monitor className="w-5 h-5" />
                    ) : (
                      <Mic2 className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {format.label}
                    </h3>
                    <p className="text-sm text-[#3EABA8] font-medium flex items-center gap-1.5 mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      {format.duration}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {format.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== EVENT TYPES ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Where Frank Speaks
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
            Frank has spoken to audiences across a range of settings. Every
            presentation is adapted for the specific needs and culture of the
            audience.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {EVENT_TYPES.map((type) => (
              <div
                key={type.label}
                className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#E8956F]/10 text-[#E8956F] flex items-center justify-center">
                  {type.icon}
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {type.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== PAST EVENTS ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Past Events
          </h2>
          <p className="text-gray-500 mb-10">
            Previous speaking engagements and appearances
          </p>

          <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center">
            <p className="text-gray-400">
              Past events will be listed here as they are completed.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== BOOK FRANK CTA ===== */}
      <SectionWrapper variant="dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bring This Conversation to Your Community
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Every audience includes people who are carrying substance use or
            mental health challenges in silence. Frank helps organizations create
            space for honest conversation, practical support, and lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#3EABA8] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#35968f] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Book a Speaking Engagement
            </Link>
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Take Sam&apos;s OATH
            </Link>
          </div>
          <p className="text-white/70 text-sm mt-6">
            For booking inquiries, use the contact form or email directly.
            Frank is available for in-person and virtual events nationwide.
          </p>
        </div>
      </SectionWrapper>

      {/* ===== CRISIS RESOURCES FOOTER ===== */}
      <div className="bg-[#F8FAFB] border-t border-gray-100 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            If you or someone you love is in crisis:{" "}
            <strong>988 Suicide & Crisis Lifeline</strong> (call or text 988)
            {" | "}
            <strong>SAMHSA Helpline</strong> 1-800-662-4357
            {" | "}
            <strong>Crisis Text Line</strong> text HELLO to 741741
          </p>
        </div>
      </div>
    </>
  );
}
