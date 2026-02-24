import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Users,
  ArrowRight,
  Music,
  HandHeart,
  Camera,
  Play,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { getPageContent } from "@/lib/cms/get-page-content";

export const metadata: Metadata = {
  title: "Family Perspectives | Substance Use & Mental Health Support",
  description:
    "You didn't cause it, you can't cure it, but you don't have to face it alone. Stories and support for families affected by substance use and mental health.",
  alternates: { canonical: "/families" },
};

export default async function FamiliesPage() {
  const c = await getPageContent("families");

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange to-primary py-24 md:py-32">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-orange-200 text-lg font-medium mb-4 tracking-wide uppercase">
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

      {/* ===== INTRODUCTION ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6">{c["intro.title"]}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {c["intro.body-1"]}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              {c["intro.body-2"]}
            </p>
            <blockquote className="border-l-4 border-orange pl-6 my-8 italic text-lg text-gray-700">
              {c["intro.quote"]}
            </blockquote>
            <p className="text-gray-600 text-lg leading-relaxed">
              {c["intro.body-3"]}
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/photos/family-beach-sunset.jpg"
              alt="The Sheeder family at sunset"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ===== EARLY CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">{c["cta-early.title"]}</h2>
          <p className="text-white/80 text-lg mb-8">
            {c["cta-early.body"]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Take Sam&apos;s OATH
            </Link>
            <Link
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Share Your Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FRANK: A FATHER ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/photos/frank-sam-concert.jpg"
                alt="Frank and Sam at a concert"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />A Father&apos;s Perspective
              </div>
              <h2 className="mb-6">Frank</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{c["frank.body-1"]}</p>
                <p>{c["frank.body-2"]}</p>
                <p>{c["frank.body-3"]}</p>
                <p>{c["frank.body-4"]}</p>
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
                <Music className="w-4 h-4 text-primary" />
                <span>
                  Listen to Frank&apos;s music on the{" "}
                  <Link
                    href="/music"
                    className="text-primary font-medium hover:text-primary-600 transition-colors"
                  >
                    Sam&apos;s OATH album
                  </Link>
                </span>
              </div>
            </div>
          </div>
          {/* Additional Frank photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/frank-sam-boat.jpg"
                alt="Frank and Sam Sheeder"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/frank-sam-lighthouse.jpg"
                alt="Frank and Sam boating"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          {/* Frank video placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 border border-gray-200 flex items-center justify-center group cursor-pointer hover:bg-gray-900/10 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold text-gray-900">Frank&apos;s Story</p>
                <p className="text-sm text-gray-500">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== ANNIE: A SISTER ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal px-4 py-2 rounded-full text-sm font-medium mb-4">
                <HandHeart className="w-4 h-4" />A Sister&apos;s Perspective
              </div>
              <h2 className="mb-6">Annie</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{c["annie.body-1"]}</p>
                <p>{c["annie.body-2"]}</p>
                <p>{c["annie.body-3"]}</p>
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
                <Music className="w-4 h-4 text-teal" />
                <span>
                  Listen to &ldquo;For Annie&rdquo; on the{" "}
                  <Link
                    href="/music"
                    className="text-teal font-medium hover:text-teal-600 transition-colors"
                  >
                    Sam&apos;s OATH album
                  </Link>
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/photos/sam-annie-smile-1.jpg"
                  alt="Sam making his sister Annie smile"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <p className="text-white text-sm italic">
                    One of Frank&apos;s favorite photos &mdash; Sam making Annie
                    smile
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/photos/sam-annie-smile-2.jpg"
                  alt="Sam and Annie sharing a moment"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          {/* Additional Annie photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/sam-annie-siblings.jpg"
                alt="Sam and Annie Sheeder"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/sam-annie-fall.jpg"
                alt="Sam and Annie in autumn"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/sam-annie-dog.jpg"
                alt="Sam and Annie with their dog"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          {/* Annie video placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 border border-gray-200 flex items-center justify-center group cursor-pointer hover:bg-gray-900/10 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-teal" />
                </div>
                <p className="font-semibold text-gray-900">Annie&apos;s Story</p>
                <p className="text-sm text-gray-500">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== JOEY: A BROTHER ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/photos/sam-joey-reading.jpg"
                alt="Sam and Joey reading together"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-sage-50 text-sage px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Users className="w-4 h-4" />A Brother&apos;s Perspective
              </div>
              <h2 className="mb-6">Joey</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{c["joey.body-1"]}</p>
                <p>{c["joey.body-2"]}</p>
                <p>{c["joey.body-3"]}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/photos/sam-joey-atv.jpg"
                alt="Sam and Joey on an ATV"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md bg-sage-50 flex items-center justify-center p-8">
              <blockquote className="text-center">
                <p className="text-sage-700 text-lg italic leading-relaxed">
                  &ldquo;The everyday stuff &mdash; reading, riding, boating
                  &mdash; turns out to be everything.&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
          {/* Joey video placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 border border-gray-200 flex items-center justify-center group cursor-pointer hover:bg-gray-900/10 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-sage" />
                </div>
                <p className="font-semibold text-gray-900">Joey&apos;s Story</p>
                <p className="text-sm text-gray-500">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== NANCY: A STEPMOTHER ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />A Stepmother&apos;s Perspective
              </div>
              <h2 className="mb-6">Nancy</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{c["nancy.body-1"]}</p>
                <p>{c["nancy.body-2"]}</p>
                <p>{c["nancy.body-3"]}</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/photos/frank-nancy-sunset.jpg"
                  alt="Frank and Nancy Sheeder"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <p className="text-white text-sm italic">
                    Frank and Nancy &mdash; partners in life and in this mission
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Nancy video placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/5 border border-gray-200 flex items-center justify-center group cursor-pointer hover:bg-gray-900/10 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="w-8 h-8 text-orange" />
                </div>
                <p className="font-semibold text-gray-900">Nancy&apos;s Story</p>
                <p className="text-sm text-gray-500">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FAMILY PHOTO GALLERY ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Camera className="w-4 h-4" />
              Family Moments
            </div>
            <h2 className="mb-4">{c["gallery.title"]}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {c["gallery.subtitle"]}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "/images/photos/family-couch.jpg",
                alt: "Frank, Annie, and Sam laughing together",
                caption: "Frank, Annie, and Sam",
              },
              {
                src: "/images/photos/family-hug.jpg",
                alt: "The Sheeder family",
                caption: "Annie, Frank, and Sam",
              },
              {
                src: "/images/photos/sam-annie-smile-1.jpg",
                alt: "Sam making his sister Annie smile",
                caption: "Sam and Annie",
              },
              {
                src: "/images/photos/frank-sam-boat.jpg",
                alt: "Frank and Sam Sheeder",
                caption: "Frank and Sam",
              },
              {
                src: "/images/photos/sam-joey-reading.jpg",
                alt: "Sam and Joey reading together",
                caption: "Sam and Joey",
              },
              {
                src: "/images/photos/sam-rony.jpg",
                alt: "Sam and his chosen brother Rony",
                caption: "Sam and Rony",
              },
              {
                src: "/images/photos/frank-nancy-sunset.jpg",
                alt: "Frank and Nancy Sheeder",
                caption: "Frank and Nancy",
              },
              {
                src: "/images/photos/sam-annie-siblings.jpg",
                alt: "Sam and Annie Sheeder",
                caption: "Sam and Annie",
              },
              {
                src: "/images/photos/family-beach-sunset.jpg",
                alt: "The Sheeder family at sunset",
                caption: "The Sheeder family",
              },
            ].map((photo) => (
              <div
                key={photo.src}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={450}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== CTA ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="w-10 h-10 text-orange mx-auto mb-4" />
          <h2 className="mb-4">{c["cta.title"]}</h2>
          <p className="text-gray-600 text-lg mb-4">
            {c["cta.body-1"]}
          </p>
          <p className="text-gray-600 text-lg mb-8">
            {c["cta.body-2"]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 bg-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Share Your Story <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors"
            >
              <Users className="w-4 h-4" />
              Take Sam&apos;s OATH
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
