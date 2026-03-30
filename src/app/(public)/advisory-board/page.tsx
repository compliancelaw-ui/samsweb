import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Stethoscope,
  Brain,
  HeartHandshake,
  Globe,
  Megaphone,
  Heart,
  Users,
  HandHeart,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Advisory Board | Sam's OATH",
  description:
    "Meet the founding advisory board of Sam's OATH - family members with lived experience guiding a national movement to break the silence around substance use and mental health.",
  alternates: { canonical: "/advisory-board" },
};

const FOUNDING_ADVISORS = [
  {
    name: "Frank Sheeder",
    role: "Founder & Executive Director",
    relationship: "Sam's Father",
    icon: Heart,
    color: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
    image: "/images/photos/frank-headshot.jpg",
    bio: "Attorney, songwriter, and the driving force behind Sam's OATH. After Sam's passing, Frank channeled his family's experience into a national movement, writing 15 original songs and building the platform that connects families across all 50 states. His viral LinkedIn post reached 345,000 people and proved that families everywhere are waiting for permission to speak openly.",
    expertise: "Nonprofit Leadership, Communications, Legal",
  },
  {
    name: "Nancy Sheeder",
    role: "Founding Advisor",
    relationship: "Sam's Stepmother",
    icon: HeartHandshake,
    color: "bg-orange/10 text-orange border-orange/20",
    iconColor: "text-orange",
    image: "/images/photos/frank-nancy-sunset.jpg",
    bio: "A partner in both life and mission, Nancy brings the perspective of a stepparent navigating the complexities of blended family dynamics during crisis. Her insight shapes how Sam's OATH speaks to the full spectrum of family relationships affected by substance use.",
    expertise: "Family Advocacy, Community Building",
  },
  {
    name: "Annie Sheeder",
    role: "Founding Advisor",
    relationship: "Sam's Sister",
    icon: HandHeart,
    color: "bg-teal/10 text-teal border-teal/20",
    iconColor: "text-teal",
    image: "/images/photos/sam-annie-smile-1.jpg",
    bio: "Annie knows firsthand what it means to love a sibling through substance use disorder. Her perspective ensures that Sam's OATH speaks to the siblings, friends, and peers who often carry this weight in silence, unsure how to help or where to turn.",
    expertise: "Sibling & Peer Advocacy, Youth Perspective",
  },
  {
    name: "Joey Sheeder",
    role: "Founding Advisor",
    relationship: "Sam's Brother",
    icon: Users,
    color: "bg-sage/10 text-sage border-sage/20",
    iconColor: "text-sage",
    image: "/images/photos/sam-joey-reading.jpg",
    bio: "As Sam's younger brother, Joey represents the next generation of advocates. His perspective helps Sam's OATH reach younger audiences and ensures the movement speaks authentically to people growing up in families affected by substance use and mental health challenges.",
    expertise: "Youth Advocacy, Next-Generation Outreach",
  },
];

const EXPERTISE_AREAS = [
  {
    title: "Substance Use Medicine",
    icon: Stethoscope,
    description:
      "Clinical expertise in evidence-based treatment, harm reduction, and the evolving science of substance use disorders.",
    color: "bg-teal/10 text-teal border-teal/20",
    iconColor: "text-teal",
  },
  {
    title: "Mental Health / Psychology",
    icon: Brain,
    description:
      "Family therapy, trauma-informed care, and the intersection of mental health and substance use in adolescents and adults.",
    color: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
  },
  {
    title: "Public Health / Policy",
    icon: Globe,
    description:
      "Community-level interventions, health equity, and policy reform in substance use prevention and mental health services.",
    color: "bg-orange/10 text-orange border-orange/20",
    iconColor: "text-orange",
  },
  {
    title: "Communications / Media",
    icon: Megaphone,
    description:
      "Normalizing honest conversation about health, storytelling for social change, and building national awareness campaigns.",
    color: "bg-sage/10 text-sage border-sage/20",
    iconColor: "text-sage",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary to-teal py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/90 mb-3">
            Guided by Lived Experience
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Advisory Board
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Sam&apos;s OATH is guided by the people who lived it - a founding
            family that turned loss into a movement, supported by advisors who
            bring professional expertise to the mission.
          </p>
        </div>
      </section>

      {/* Vision */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Why an Advisory Board</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Sam&apos;s OATH was born from a family&apos;s experience with loss,
            love, and the cost of silence. Our founding advisors bring the
            most important credential there is: they lived it. They know what
            families go through because they went through it themselves.
          </p>
          <p className="text-gray-500">
            As we grow, we are expanding the board to include clinical,
            policy, and communications experts who will help us reach every
            family that needs us.
          </p>
        </div>
      </SectionWrapper>

      {/* Founding Advisors */}
      <SectionWrapper variant="light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Founding Advisors</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The Sheeder family founded Sam&apos;s OATH to honor Sam and
              the openness he lived by. Each member brings a different
              perspective on what families experience and what they need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUNDING_ADVISORS.map((advisor) => (
              <div
                key={advisor.name}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">
                      {advisor.name}
                    </h3>
                    <p className="text-white/90 text-sm">{advisor.relationship}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-8 h-8 rounded-lg ${advisor.color} flex items-center justify-center`}
                    >
                      <advisor.icon className={`w-4 h-4 ${advisor.iconColor}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {advisor.role}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {advisor.bio}
                  </p>
                  <p className="text-xs text-gray-400">
                    Focus: {advisor.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Quote from Frank */}
      <SectionWrapper variant="dark">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-white/90 mb-6">
            &ldquo;When we lost Sam, we learned that silence doesn&apos;t just
            hurt the person struggling. It isolates entire families. Our board
            starts with the people who know that truth firsthand, and we are
            growing it to include people who can help us replace silence with
            openness, with stories, and with real support.&rdquo;
          </blockquote>
          <p className="text-white/90 font-medium">
            Frank Sheeder, Founder of Sam&apos;s OATH
          </p>
        </div>
      </SectionWrapper>

      {/* Expanding Expertise */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Expanding Our Expertise</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We are actively seeking advisors in these disciplines to
              complement our founding team&apos;s lived experience with
              professional expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EXPERTISE_AREAS.map((area) => (
              <div
                key={area.title}
                className="bg-[#F8FAFB] rounded-xl border border-gray-100 p-6"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${area.color} flex items-center justify-center mb-4`}
                >
                  <area.icon className={`w-6 h-6 ${area.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA: Nominate / Express Interest */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">Join the Advisory Board</h2>
          <p className="text-xl text-white/90 mb-4 leading-relaxed">
            Know someone who would be a strong fit? We welcome nominations,
            including self-nominations. If you or someone you know has the
            expertise and passion to help guide Sam&apos;s OATH, we want to hear
            from you.
          </p>
          <p className="text-white/90 mb-8">
            We are especially interested in professionals with clinical,
            policy, or communications backgrounds who share our commitment to
            ending the silence around substance use and mental health.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
          >
            Express Interest or Nominate
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/90 text-sm mt-4">
            Or email us directly at{" "}
            <a
              href="mailto:board@samsoath.org"
              className="text-white/90 underline"
            >
              board@samsoath.org
            </a>
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
