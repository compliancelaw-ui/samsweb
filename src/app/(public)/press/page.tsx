import type { Metadata } from "next";
import Link from "next/link";
import {
  Newspaper,
  Download,
  Camera,
  Quote,
  Mail,
  ArrowRight,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Press & Media",
  description:
    "Press kit, media resources, and story angles for covering Sam's OATH and the movement to break silence around substance use and mental health.",
};

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate to-primary py-24">
        <div className="container-wide text-white text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Press &amp; Media
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Resources for journalists, producers, and media professionals
            covering the movement to break silence around substance use and
            mental health.
          </p>
        </div>
      </section>

      {/* Key Facts */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">Key Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                About Sam&apos;s OATH
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  National movement to break silence around substance use and
                  mental health
                </li>
                <li>
                  OATH stands for Openness, Authenticity, Togetherness, Healing
                </li>
                <li>
                  Founded by Frank Sheeder, inspired by his son Sam&apos;s life
                  and legacy
                </li>
                <li>
                  Tagline: &quot;What&apos;s Hidden Doesn&apos;t Heal&quot;
                </li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                The Problem We&apos;re Addressing
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  Over 100,000 Americans die from drug overdoses each year
                </li>
                <li>
                  Stigma and silence prevent millions of families from seeking
                  help
                </li>
                <li>
                  Most families struggle alone, believing they&apos;re the only
                  ones
                </li>
                <li>
                  The OATH creates a framework for families to break through
                  silence together
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Story Angles */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">Story Angles</h2>
          <div className="space-y-6">
            {[
              {
                title: "A Father's Mission to Break Silence",
                description:
                  "After losing his son to substance use, Frank Sheeder turned his family's pain into a national movement that's helping thousands of families find their voice.",
              },
              {
                title: "The Hidden Epidemic Within the Epidemic",
                description:
                  "While overdose deaths make headlines, the silence and stigma that prevent families from seeking help remains largely unaddressed. Sam's OATH is changing that.",
              },
              {
                title: "Music as Medicine",
                description:
                  "Frank Sheeder wrote 15 original songs about grief, healing, and hope. How music is becoming a bridge for families who can't find the words.",
              },
              {
                title: "Building a Community of Courage",
                description:
                  "An interactive map shows thousands of families across America who've taken the OATH to be open about their struggles. What happens when silence becomes solidarity.",
              },
            ].map((angle) => (
              <div
                key={angle.title}
                className="flex gap-4 p-6 bg-white rounded-lg shadow-sm"
              >
                <Quote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {angle.title}
                  </h3>
                  <p className="text-gray-600">{angle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Press Kit */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">Press Kit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <Download className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Logos &amp; Brand Assets
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                High-resolution logos, color palette, and brand guidelines
              </p>
              <span className="text-sm text-gray-400">Coming soon</span>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <Camera className="w-8 h-8 text-teal mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Photos
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                High-resolution photos of Frank, events, and the movement
              </p>
              <span className="text-sm text-gray-400">Coming soon</span>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <Newspaper className="w-8 h-8 text-orange mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Fact Sheet
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                One-page overview of Sam&apos;s OATH with key stats and quotes
              </p>
              <span className="text-sm text-gray-400">Coming soon</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Media Contact */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="mb-4">Media Contact</h2>
          <p className="text-gray-600 text-lg mb-6">
            For interviews, press inquiries, or to request additional materials,
            please reach out.
          </p>
          <p className="text-gray-900 font-medium mb-2">Frank Sheeder</p>
          <p className="text-gray-600 mb-6">
            Founder, Sam&apos;s OATH
            <br />
            <a
              href="mailto:press@samsoath.org"
              className="text-primary hover:text-primary-600"
            >
              press@samsoath.org
            </a>
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            Send a Message <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
