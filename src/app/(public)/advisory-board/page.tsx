import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Advisory Board | Sam's OATH",
  description:
    "Meet the multidisciplinary advisory board guiding Sam's OATH — experts in substance use medicine, mental health, family advocacy, and community building.",
};

const BOARD_MEMBERS = [
  {
    name: "Board Member",
    title: "Substance Use Medicine",
    initials: "AM",
    color: "from-teal/30 to-teal/10",
    bio: "A physician specializing in substance use medicine, bringing clinical expertise in substance use treatment and evidence-based recovery approaches to the board.",
  },
  {
    name: "Board Member",
    title: "Mental Health / Psychology",
    initials: "MH",
    color: "from-primary/30 to-primary/10",
    bio: "A licensed mental health professional with deep experience in family therapy, trauma-informed care, and the intersection of mental health and substance use.",
  },
  {
    name: "Board Member",
    title: "Family Advocacy",
    initials: "FA",
    color: "from-sage/30 to-sage/10",
    bio: "A family advocate with lived experience navigating the challenges of substance use, helping shape programs and resources that truly serve families.",
  },
  {
    name: "Board Member",
    title: "Public Health / Policy",
    initials: "PH",
    color: "from-orange/30 to-orange/10",
    bio: "A public health leader focused on community-level interventions, health equity, and policy reform in substance use and mental health services.",
  },
  {
    name: "Board Member",
    title: "Communications / Media",
    initials: "CM",
    color: "from-teal/30 to-primary/10",
    bio: "A communications strategist experienced in destigmatizing health messaging, storytelling for social change, and building national awareness campaigns.",
  },
  {
    name: "Board Member",
    title: "Nonprofit Leadership",
    initials: "NL",
    color: "from-primary/30 to-sage/10",
    bio: "A nonprofit executive with a track record of scaling mission-driven organizations, building sustainable funding models, and mobilizing communities.",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary to-teal py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Advisory Board
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A multidisciplinary group of experts guiding the mission, strategy,
            and impact of Sam&apos;s OATH.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Guided by Experience</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Sam&apos;s OATH is a movement built on lived experience — but to
            reach millions of families, we need expertise across disciplines.
            Our advisory board brings together leaders in substance use medicine,
            mental health, family advocacy, public health, communications, and
            nonprofit strategy.
          </p>
          <p className="text-gray-500">
            Together, they help ensure that every resource we create, every
            story we share, and every program we build truly serves the families
            who need it most.
          </p>
        </div>
      </SectionWrapper>

      {/* Board Members Grid */}
      <SectionWrapper variant="light">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOARD_MEMBERS.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Photo placeholder */}
                <div className={`h-48 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                  <span className="text-4xl font-bold text-white/60">
                    {member.initials}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-teal mb-3">
                    {member.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-10">
            Board members will be announced as they are confirmed. Check back soon.
          </p>
        </div>
      </SectionWrapper>

      {/* Join / Contact CTA */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-6">Interested in Serving?</h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            We&apos;re building a board that reflects the diversity of families
            affected by substance use and mental health challenges. If you bring
            relevant expertise and share our commitment to openness, we&apos;d
            love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/60 text-sm mt-4">
            Or email us directly at{" "}
            <a href="mailto:board@samsoath.org" className="text-white/80 underline">
              board@samsoath.org
            </a>
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
