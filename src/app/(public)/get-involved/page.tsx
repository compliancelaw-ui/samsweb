import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Users,
  Award,
  Mail,
  Megaphone,
  HandHeart,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { getPageContent } from "@/lib/cms/get-page-content";

export const metadata: Metadata = {
  title: "Get Involved | Join the Fight Against Stigma",
  description:
    "There are many ways to join the Sam's OATH movement. Volunteer, share your story, or bring programs to your community. Every action matters.",
};

export default async function GetInvolvedPage() {
  const c = await getPageContent("get-involved");

  return (
    <>
      {/* Hero — split with image */}
      <section className="bg-gradient-to-br from-teal to-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                {c["hero.title"]}
              </h1>
              <p className="text-xl text-white/80">
                {c["hero.subtitle"]}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/photos/frank-annie-sam-outdoors.jpg"
                alt="Frank, Annie, and Sam outdoors together"
                width={4032}
                height={3024}
                className="w-full h-auto rounded-2xl shadow-lg max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">{c["paths.title"]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Take the OATH */}
            <Link
              href="/take-the-oath"
              className="group p-8 bg-teal-50 rounded-xl border border-teal-100 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-teal rounded-xl flex items-center justify-center mb-5">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal transition-colors">
                Take Sam&apos;s OATH
              </h3>
              <p className="text-gray-600">
                {c["oath-card.description"]}
              </p>
              <span className="inline-flex items-center gap-1 text-teal font-medium text-sm mt-4">
                Get started <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Share Your Story */}
            <Link
              href="/share-your-story"
              className="group p-8 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-orange rounded-xl flex items-center justify-center mb-5">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange transition-colors">
                Share Your Story
              </h3>
              <p className="text-gray-600">
                {c["story-card.description"]}
              </p>
              <span className="inline-flex items-center gap-1 text-orange font-medium text-sm mt-4">
                Share now <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Become an Ambassador */}
            <Link
              href="/ambassadors"
              className="group p-8 bg-primary-50 rounded-xl border border-primary-100 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-5">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                Become an Ambassador
              </h3>
              <p className="text-gray-600">
                {c["ambassador-card.description"]}
              </p>
              <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Spread the Word */}
            <div className="p-8 bg-sage-50 rounded-xl border border-sage-100">
              <div className="w-14 h-14 bg-sage rounded-xl flex items-center justify-center mb-5">
                <Megaphone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Spread the Word
              </h3>
              <p className="text-gray-600">
                {c["spread-card.description"]}
              </p>
              <div className="flex gap-3 mt-4">
                <span className="text-sage-600 font-medium text-sm">
                  @samsoath on all platforms
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* For Organizations */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-4">{c["orgs.title"]}</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            {c["orgs.subtitle"]}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/workplace"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <HandHeart className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Workplace Training
              </h3>
              <p className="text-sm text-gray-600">
                Safe Listener Training and corporate OATH programs
              </p>
            </Link>
            <Link
              href="/contact"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <Megaphone className="w-8 h-8 text-teal mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Speaking Engagements
              </h3>
              <p className="text-sm text-gray-600">
                Invite Frank to speak at your event or conference
              </p>
            </Link>
            <Link
              href="/contact"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <Users className="w-8 h-8 text-sage mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Partnerships</h3>
              <p className="text-sm text-gray-600">
                Partner with us to amplify the movement
              </p>
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Newsletter — split layout */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/images/photos/family-beach-sunset.jpg"
                alt="Family together at beach during sunset"
                width={5712}
                height={4284}
                className="w-full h-auto rounded-2xl shadow-md"
              />
            </div>
            <div>
              <Mail className="w-10 h-10 text-teal mb-4" />
              <h2 className="mb-4">{c["newsletter.title"]}</h2>
              <p className="text-gray-600 text-lg mb-8">
                {c["newsletter.body"]}
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
