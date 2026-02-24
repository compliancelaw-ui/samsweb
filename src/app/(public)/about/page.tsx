import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  HeartHandshake,
  Globe,
  Sparkles,
  Heart,
  BookOpen,
  Briefcase,
  HandHeart,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { getPageContent } from "@/lib/cms/get-page-content";

export const metadata: Metadata = {
  title: "About Sam's OATH | A Movement to End Stigma",
  description:
    "Sam's OATH is a national movement to break the silence around substance use and mental health. Learn about Sam's OATH, the mission, and how you can be part of it.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const c = await getPageContent("about");

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-20 md:py-28">
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

      {/* ===== THE ORIGIN STORY ===== */}
      <SectionWrapper variant="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
              {c["origin.eyebrow"]}
            </p>
            <h2 className="mb-6">{c["origin.title"]}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{c["origin.body-1"]}</p>
              <p>{c["origin.body-2"]}</p>
              <p>{c["origin.body-3"]}</p>
              <p className="text-sm text-gray-400">
                Samuel Martin Hagood Sheeder &middot; July 11, 1998 – September 28, 2025
              </p>
            </div>
          </div>
          <div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/photos/sam-portrait.jpg"
                alt="Sam Sheeder"
                width={600}
                height={750}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== THE VIRAL MOMENT ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
              {c["spark.eyebrow"]}
            </p>
            <h2 className="mb-4">{c["spark.title"]}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto lg:mx-0 w-full">
              <Image
                src="/images/photos/frank-linkedin-post.png"
                alt="A LinkedIn post about substance use and mental health that reached 345,000 people"
                width={600}
                height={900}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{c["spark.body-1"]}</p>
                <p>{c["spark.body-2"]}</p>
                <blockquote className="border-l-4 border-teal pl-6 my-4 italic text-lg text-gray-700">
                  &ldquo;{c["spark.quote"]}&rdquo;
                </blockquote>
                <p>{c["spark.body-3"]}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary">345K+</p>
                  <p className="text-xs text-gray-500 mt-1">People Reached</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-teal">1,933</p>
                  <p className="text-xs text-gray-500 mt-1">Reactions</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-orange">484</p>
                  <p className="text-xs text-gray-500 mt-1">Comments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== THE PEOPLE ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="mb-4">{c["people.title"]}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {c["people.subtitle"]}
            </p>
          </div>

          {/* Frank — expanded founder card */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-12">
            <div className="lg:col-span-3">
              <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
                {c["founder.eyebrow"]}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{c["founder.title"]}</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{c["founder.body-1"]}</p>
                <p>{c["founder.body-2"]}</p>
                <p>{c["founder.body-3"]}</p>
                <p>{c["founder.body-4"]}</p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg">
                    <Image
                      src="/images/photos/frank-headshot.jpg"
                      alt="Frank Sheeder, Founder of Sam's OATH"
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 text-center mb-1">
                  Frank Sheeder
                </h4>
                <p className="text-teal font-medium text-center text-sm mb-3">
                  Founder &amp; Executive Director
                </p>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  {c["founder.bio"]}
                </p>
              </div>
            </div>
          </div>

          {/* Annie & Nancy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                name: "Annie",
                role: "Sam\u2019s Sister",
                image: "/images/photos/sam-annie-smile-1.jpg",
                icon: HandHeart,
                quote: c["people.annie-quote"],
              },
              {
                name: "Nancy",
                role: "Frank\u2019s Wife",
                image: "/images/photos/frank-nancy-sunset.jpg",
                icon: HeartHandshake,
                quote: c["people.nancy-quote"],
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-semibold">{member.name}</p>
                    <p className="text-white/70 text-xs">{member.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== THE VISION ===== */}
      <SectionWrapper variant="gradient">
        <div className="text-center text-white mb-12">
          <h2 className="text-white mb-4">{c["vision.title"]}</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {c["vision.subtitle"]}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Globe,
              title: "A Pin in Every Community",
              description: c["vision.pin-description"],
            },
            {
              icon: Briefcase,
              title: "Sam's OATH in Every Workplace",
              description: c["vision.workplace-description"],
            },
            {
              icon: Sparkles,
              title: "Compassion Instead of Judgment",
              description: c["vision.compassion-description"],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== GET INVOLVED CTA ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">{c["cta.title"]}</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {c["cta.body"]}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/take-the-oath"
              className="flex flex-col items-center gap-2 p-6 bg-teal-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <Heart className="w-8 h-8 text-teal" />
              <span className="font-semibold text-gray-900">Take Sam&apos;s OATH</span>
              <span className="text-sm text-gray-500">60 seconds</span>
            </Link>
            <Link
              href="/share-your-story"
              className="flex flex-col items-center gap-2 p-6 bg-primary-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="font-semibold text-gray-900">Share Your Story</span>
              <span className="text-sm text-gray-500">Your voice matters</span>
            </Link>
            <Link
              href="/get-involved"
              className="flex flex-col items-center gap-2 p-6 bg-sage-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <Users className="w-8 h-8 text-sage" />
              <span className="font-semibold text-gray-900">Get Involved</span>
              <span className="text-sm text-gray-500">Join the movement</span>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
