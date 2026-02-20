import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Download,
  Camera,
  Quote,
  Mail,
  ArrowRight,
  Music,
  MapPin,
  Users,
  Heart,
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

      {/* At a Glance */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-10">At a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-teal-50 rounded-xl">
              <p className="text-3xl font-bold text-teal">345K+</p>
              <p className="text-sm text-gray-600 mt-1">People Reached</p>
            </div>
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <p className="text-3xl font-bold text-primary">15</p>
              <p className="text-sm text-gray-600 mt-1">Original Songs</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <p className="text-3xl font-bold text-orange">484</p>
              <p className="text-sm text-gray-600 mt-1">Comments on Viral Post</p>
            </div>
            <div className="text-center p-6 bg-sage-50 rounded-xl">
              <p className="text-3xl font-bold text-sage">50</p>
              <p className="text-sm text-gray-600 mt-1">States Represented</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                About Sam&apos;s OATH
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  A 501(c)(3) nonprofit national movement to break silence around
                  substance use and mental health
                </li>
                <li>
                  OATH stands for <strong>O</strong>penness, <strong>A</strong>uthenticity,{" "}
                  <strong>T</strong>ogetherness, <strong>H</strong>ealing
                </li>
                <li>
                  Founded in 2025 by Frank Sheeder after the death of his son,
                  Samuel Martin Hagood Sheeder (1998&ndash;2025)
                </li>
                <li>
                  Tagline: &ldquo;What&apos;s Hidden Doesn&apos;t Heal&rdquo;
                </li>
                <li>Website: samsoath.org</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                The Problem We Address
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  Over 100,000 Americans die from drug overdoses each year (CDC)
                </li>
                <li>
                  1 in 5 U.S. adults experiences mental illness annually (NAMI)
                </li>
                <li>
                  Stigma and silence prevent millions of families from seeking help
                </li>
                <li>
                  Most families struggle alone, believing they&apos;re the only ones
                </li>
                <li>
                  The OATH gives families a framework to break through silence together
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* The Origin Story */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">The Origin Story</h2>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                Sam Sheeder (1998&ndash;2025) lit up every room he walked into. He was
                handsome, adventurous, and could strike up a conversation with anyone
                &mdash; from CEOs to those experiencing homelessness &mdash; making them
                feel seen and heard. He faced the hard road of substance use disorder
                with extraordinary courage and honesty, refusing to let stigma define him.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                After Sam passed away on September 28, 2025, his father Frank made a
                decision that changed everything. Instead of retreating into silence,
                Frank wrote openly on LinkedIn about Sam&apos;s life, his struggles, and
                his love. That post reached <strong>345,000 people</strong>. Nearly{" "}
                <strong>2,000 reactions</strong>. <strong>484 comments</strong>. All
                saying the same thing: &ldquo;I thought I was the only one.&rdquo;
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Frank realized the silence itself was the crisis. Sam&apos;s OATH was born
                from that revelation &mdash; a movement built on the belief that what&apos;s
                hidden doesn&apos;t heal, and that the opposite of addiction is not
                sobriety, but community.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Frank Sheeder Bio */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">Founder Bio</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/photos/frank-headshot.jpg"
                  alt="Frank Sheeder, Founder & Executive Director of Sam's OATH"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                Frank Sheeder
              </h3>
              <p className="text-teal font-medium mb-4">
                Founder &amp; Executive Director, Sam&apos;s OATH Foundation
              </p>
              <div className="text-gray-600 space-y-3 text-sm leading-relaxed">
                <p>
                  Frank Sheeder is a father, advocate, songwriter, and speaker. After
                  losing his son Sam to substance use disorder in 2025, he channeled his
                  grief into a national movement to break the silence that surrounds
                  families affected by substance use and mental health challenges.
                </p>
                <p>
                  A seasoned business leader with decades of experience building
                  organizations and leading teams, Frank brings the same strategic
                  thinking and relentless energy to Sam&apos;s OATH. He is the songwriter
                  behind all 15 original tracks on the Sam&apos;s OATH album, available
                  on Apple Music, Spotify, YouTube, and all major streaming platforms.
                </p>
                <p>
                  Frank&apos;s LinkedIn post about Sam reached over 345,000 people and
                  became one of the platform&apos;s most-engaged personal posts on
                  substance use and mental health. He speaks to organizations, schools,
                  and communities about breaking silence in the workplace and at home.
                </p>
                <p className="text-xs text-gray-400 mt-4">
                  Available for interviews, keynotes, panels, and podcast appearances.
                  Contact: press@samsoath.org
                </p>
              </div>
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
                icon: Heart,
                title: "A Father's Mission to Break Silence",
                description:
                  "After losing his son to substance use, Frank Sheeder turned his family's pain into a national movement. His LinkedIn post reached 345,000 people — all saying 'I thought I was the only one.' Now he's building the infrastructure so no family has to struggle in silence.",
              },
              {
                icon: Users,
                title: "The Hidden Epidemic Within the Epidemic",
                description:
                  "While overdose deaths make headlines, the silence and stigma that prevent families from seeking help remains largely unaddressed. Sam's OATH is the first national framework giving families language and community to talk openly about substance use and mental health.",
              },
              {
                icon: Music,
                title: "Music as Medicine: 15 Songs of Grief and Hope",
                description:
                  "Frank Sheeder wrote 15 original songs about loss, healing, and family. From 'What's Hidden Doesn't Heal' to 'Joy Anyway,' the music gives voice to emotions families struggle to express. All tracks are on Apple Music, Spotify, and streaming platforms.",
              },
              {
                icon: MapPin,
                title: "A Map of Courage: Visualizing the Movement",
                description:
                  "An interactive map on samsoath.org shows families across all 50 states who've taken the OATH to be open about their struggles. Each pin represents a family that refused to hide. The color-coded system shows whether they're supporting someone struggling, honoring someone lost, or standing as allies.",
              },
              {
                icon: Newspaper,
                title: "Workplace Silence: The Crisis Behind Closed Doors",
                description:
                  "Frank had a great workplace — but even there, he never felt he could share what his family was going through. Sam's OATH is bringing the conversation into corporate America through Safe Listener Training and workplace OATH programs.",
              },
            ].map((angle) => (
              <div
                key={angle.title}
                className="flex gap-4 p-6 bg-white rounded-lg shadow-sm"
              >
                <angle.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {angle.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{angle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Key Quotes */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">Key Quotes</h2>
          <div className="space-y-6">
            {[
              {
                quote:
                  "Sam lived with courage, honesty, and an open heart. He faced life's challenges — including substance use disorder — with a strength and candor that taught us the opposite of addiction is not sobriety, but community.",
                attribution: "Frank Sheeder, from the viral LinkedIn post",
              },
              {
                quote:
                  "He reminded us daily that it's ok not to be ok, and that joy can be found even on winding roads.",
                attribution: "From Sam's obituary",
              },
              {
                quote:
                  "We never doubted for a moment that Sam loved each of us with his whole heart, in his own language, and as best as he could.",
                attribution: "Sheeder family",
              },
              {
                quote:
                  "What's hidden doesn't heal. The silence itself is the crisis.",
                attribution: "Frank Sheeder, Founder of Sam's OATH",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-8">
                <Quote className="w-8 h-8 text-primary-200 mb-3" />
                <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-4">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <p className="text-sm text-gray-500 font-medium">
                  &mdash; {item.attribution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Press Kit Downloads */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-10">Press Kit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg text-center shadow-sm">
              <Download className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Logos &amp; Brand Assets
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                High-resolution logos, color palette, and brand guidelines
              </p>
              <span className="text-sm text-gray-400">Coming soon</span>
            </div>
            <div className="p-6 bg-white rounded-lg text-center shadow-sm">
              <Camera className="w-8 h-8 text-teal mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Photos
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                High-resolution photos of Frank, Sam, family, and the movement
              </p>
              <span className="text-sm text-gray-400">Coming soon</span>
            </div>
            <div className="p-6 bg-white rounded-lg text-center shadow-sm">
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
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="mb-4">Media Contact</h2>
          <p className="text-gray-600 text-lg mb-6">
            For interviews, press inquiries, or to request additional materials,
            please reach out.
          </p>
          <p className="text-gray-900 font-medium mb-2">Frank Sheeder</p>
          <p className="text-gray-600 mb-1">
            Founder &amp; Executive Director, Sam&apos;s OATH Foundation
          </p>
          <p className="text-gray-600 mb-6">
            <a
              href="mailto:press@samsoath.org"
              className="text-primary hover:text-primary-600 font-medium"
            >
              press@samsoath.org
            </a>
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Available for interviews, keynote speeches, panel discussions,
            podcast appearances, and corporate speaking engagements.
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
