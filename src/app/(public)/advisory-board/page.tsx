import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  Brain,
  HeartHandshake,
  Globe,
  Megaphone,
  Building,
  CheckCircle,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Advisory Board | Sam's OATH",
  description:
    "Sam's OATH is building a multidisciplinary advisory board of experts in substance use medicine, mental health, family advocacy, and community building. Learn how to get involved.",
  alternates: { canonical: "/advisory-board" },
};

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
    title: "Family Advocacy",
    icon: HeartHandshake,
    description:
      "Lived experience navigating the challenges families face, with insight into what resources and support actually help.",
    color: "bg-sage/10 text-sage border-sage/20",
    iconColor: "text-sage",
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
      "Destigmatizing health messaging, storytelling for social change, and building national awareness campaigns.",
    color: "bg-teal/10 text-teal border-teal/20",
    iconColor: "text-teal",
  },
  {
    title: "Nonprofit Leadership",
    icon: Building,
    description:
      "Scaling mission-driven organizations, building sustainable funding models, and mobilizing communities for lasting impact.",
    color: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
  },
];

const CRITERIA = [
  "Demonstrated expertise or lived experience in one of the six focus areas",
  "Commitment to reducing stigma around substance use and mental health",
  "Willingness to serve in an advisory capacity (quarterly meetings, ad-hoc guidance)",
  "Alignment with Sam's OATH values of openness, honesty, and compassion",
  "Ability to represent diverse perspectives, communities, and backgrounds",
];

export default function AdvisoryBoardPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary to-teal py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-3">
            Coming Soon
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Advisory Board
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            We are assembling a multidisciplinary group of experts and advocates
            to guide the mission, strategy, and impact of Sam&apos;s OATH.
          </p>
        </div>
      </section>

      {/* Vision */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Why an Advisory Board</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            Sam&apos;s OATH was born from a family&apos;s experience with loss,
            love, and the failures of stigma. But reaching millions of families
            requires more than one perspective. It requires the combined
            expertise of people who understand the clinical, emotional, policy,
            and communication dimensions of substance use and mental health.
          </p>
          <p className="text-gray-500">
            The advisory board will shape our programs, validate our resources,
            and ensure that everything we build genuinely serves the families who
            need it most.
          </p>
        </div>
      </SectionWrapper>

      {/* Expertise Areas */}
      <SectionWrapper variant="light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Expertise We Are Seeking</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We are looking for advisors across six disciplines, each critical
              to building a movement that is both credible and compassionate.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERTISE_AREAS.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
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

      {/* Quote from Frank */}
      <SectionWrapper variant="dark">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-white/90 mb-6">
            &ldquo;When we lost Sam, we learned that stigma doesn&apos;t just
            hurt the person struggling. It isolates entire families. The
            advisory board we&apos;re building will bring together people who
            understand that truth from every angle, so we can fight stigma with
            science, with stories, and with real support.&rdquo;
          </blockquote>
          <p className="text-white/60 font-medium">
            Frank Sheeder, Founder of Sam&apos;s OATH
          </p>
        </div>
      </SectionWrapper>

      {/* Criteria */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="mb-4">Board Membership Criteria</h2>
            <p className="text-gray-500">
              We are looking for advisors who bring both expertise and heart to
              this work.
            </p>
          </div>
          <ul className="space-y-4">
            {CRITERIA.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      {/* CTA: Nominate / Express Interest */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">Nominate a Board Member</h2>
          <p className="text-xl text-white/80 mb-4 leading-relaxed">
            Know someone who would be a strong fit? We welcome nominations,
            including self-nominations. If you or someone you know has the
            expertise and passion to help guide Sam&apos;s OATH, we want to hear
            from you.
          </p>
          <p className="text-white/70 mb-8">
            You can also express interest in serving on the board yourself. Tell
            us about your background, your connection to the mission, and which
            area of expertise you would bring.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
          >
            Express Interest or Nominate
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/60 text-sm mt-4">
            Or email us directly at{" "}
            <a
              href="mailto:board@samsoath.org"
              className="text-white/80 underline"
            >
              board@samsoath.org
            </a>
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
