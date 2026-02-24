import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Sparkles,
  Briefcase,
  ArrowRight,
  PenLine,
  Heart,
  Sun,
  Users,
  Quote,
  ChevronRight,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { getPageContent } from "@/lib/cms/get-page-content";

export const metadata: Metadata = {
  title: "About Sam's OATH | A Movement to End the Silence",
  description:
    "Millions carry the weight of substance use and mental health challenges in silence. Sam's OATH is a movement to change that — replacing shame with openness, isolation with community, and silence with healing.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const c = await getPageContent("about");

  return (
    <>
      {/* ===== 1. HERO — Full-bleed photo, mission-focused ===== */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
        {/* Stock photo placeholder — replace with real image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E3B4E] via-[#4A6FA5] to-[#3EABA8]">
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-white/20 flex items-center justify-center">
                <Users className="w-10 h-10" />
              </div>
              <p className="text-sm font-medium max-w-xs">
                Stock photo: Diverse group showing connection and support
                (1920&times;1080)
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[#2E3B4E]/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
              {c["hero.eyebrow"]}
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {c["hero.title"].split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
              {c["hero.subtitle"]}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 2. THE WEIGHT OF SILENCE — The problem (white) ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
                {c["silence.eyebrow"]}
              </p>
              <h2 className="mb-6">{c["silence.title"]}</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {c["silence.body"]}
              </p>
              <div className="bg-[#F8FAFB] rounded-xl p-6 border-l-4 border-orange">
                <p className="text-gray-700 leading-relaxed italic">
                  {c["silence.scenarios"]}
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              {/* Stock photo placeholder — replace with real image */}
              <div className="w-full max-w-md aspect-[4/3] rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center shadow-lg">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">
                    Stock photo: Person in contemplative moment,
                    <br />
                    representing isolation (800&times;600)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== 3. HOW IT STARTED — Compact origin (dark) ===== */}
      <section className="bg-[#2E3B4E] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            <div className="flex-shrink-0">
              <Image
                src="/images/photos/sam-portrait.jpg"
                alt="Sam Sheeder"
                width={3024}
                height={4032}
                className="w-32 h-32 md:w-44 md:h-44 rounded-2xl object-cover shadow-xl border-4 border-white/10"
              />
            </div>
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
                {c["origin.title"]}
              </h2>
              <div className="space-y-4 text-white/85 leading-relaxed">
                <p>{c["origin.body-1"]}</p>
                <p>{c["origin.body-2"]}</p>
              </div>
              <div className="mt-8 relative">
                <Quote className="w-8 h-8 text-teal/30 absolute -top-2 -left-1 rotate-180" />
                <blockquote className="border-l-4 border-teal pl-6 ml-2">
                  <p className="text-lg text-white/90 italic leading-relaxed">
                    {c["origin.quote"]}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-teal">
                    Frank Sheeder, Founder
                  </p>
                </blockquote>
              </div>
              <div className="mt-8 flex items-center gap-3 text-white/50">
                <div className="w-2 h-2 rounded-full bg-teal/50" />
                <p className="text-sm">
                  Samuel Martin Hagood Sheeder &middot; July 11, 1998 &ndash;
                  September 28, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. THE SPARK — The post that proved it (light) ===== */}
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

      {/* ===== 5. WHO THIS IS FOR — Inclusive persona cards (white) ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-12">
          <h2 className="mb-4">{c["personas.title"]}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {c["personas.subtitle"]}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Supporting a Loved One",
              description: c["personas.supporting"],
              icon: Heart,
              topColor: "bg-teal",
              iconColor: "text-teal",
              placeholder:
                "Parent or family member, warm lighting, strength and vulnerability",
            },
            {
              title: "Seeking Hope & Recovery",
              description: c["personas.recovery"],
              icon: Sun,
              iconColor: "text-orange",
              topColor: "bg-orange",
              placeholder:
                "Young person looking forward with hope, outdoor setting",
            },
            {
              title: "Standing With Others",
              description: c["personas.standing"],
              icon: Users,
              iconColor: "text-sage",
              topColor: "bg-sage",
              placeholder:
                "Group of friends or community, showing support and togetherness",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href="/take-the-oath"
              className="group flex flex-col rounded-xl overflow-hidden bg-[#F8FAFB] hover:shadow-lg transition-all h-full border border-gray-100"
            >
              {/* Stock photo placeholder — replace with real images */}
              <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${item.topColor}`} />
                <div className="text-center p-4">
                  <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.iconColor} opacity-30`} />
                  <p className="text-xs text-gray-400">
                    Stock photo: {item.placeholder}
                    <br />
                    (600&times;400)
                  </p>
                </div>
              </div>
              <div className="flex flex-col p-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-auto px-5 py-2 rounded-lg bg-[#4A6FA5]/10 text-[#4A6FA5] text-sm font-semibold group-hover:bg-[#4A6FA5] group-hover:text-white transition-all self-start">
                  Take Sam&apos;s OATH <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== 6. WHY STORIES MATTER — Bridge to action (light) ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
                {c["stories.eyebrow"]}
              </p>
              <h2 className="mb-6">{c["stories.title"]}</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {c["stories.body"]}
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: "They Break Isolation",
                    body: "When you share, someone else realizes they\u2019re not alone.",
                    color: "bg-teal",
                  },
                  {
                    title: "They Reduce Stigma",
                    body: "Every story told normalizes the conversation around substance use and mental health.",
                    color: "bg-primary",
                  },
                  {
                    title: "They Inspire Action",
                    body: "Your story might be the reason someone else reaches out for help or takes Sam\u2019s OATH.",
                    color: "bg-orange",
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${benefit.color} mt-2 flex-shrink-0`}
                    />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {benefit.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/share-your-story"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
                >
                  Share Your Story
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="flex justify-center order-first lg:order-last">
              {/* Stock photo placeholder — replace with real image */}
              <div className="w-full max-w-md aspect-[4/3] rounded-2xl bg-white border-2 border-dashed border-gray-300 flex items-center justify-center shadow-lg">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                    <PenLine className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">
                    Stock photo: People sharing stories
                    <br />
                    in group setting, warm and diverse (800&times;600)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== 7. VISION — Where this is going (gradient) ===== */}
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

      {/* ===== 8. DUAL CTA — Two clear actions (white) ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-6">{c["cta.title"]}</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {c["cta.body"]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-teal-600 transition-colors"
            >
              Take Sam&apos;s OATH
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-600 transition-colors"
            >
              Share Your Story
              <PenLine className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
