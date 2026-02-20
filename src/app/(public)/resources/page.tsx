import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  MessageSquare,
  ArrowRight,
  Heart,
  BookOpen,
  HandHeart,
  ExternalLink,
  Shield,
  MessageCircle,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CRISIS_RESOURCES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resources & Support",
  description:
    "Find crisis hotlines, support organizations, and resources for families affected by substance use and mental health challenges. You are not alone.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            Help &amp; Support
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            You Are Not Alone
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Whether you&apos;re in crisis, supporting a loved one, or looking
            for guidance — help is available right now. You don&apos;t have to
            figure this out by yourself.
          </p>
        </div>
      </section>

      {/* ===== CRISIS HOTLINES ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-12">
          <h2 className="mb-4">If You Need Help Right Now</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These services are free, confidential, and available 24/7. Please
            reach out — there is no shame in asking for help.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* 988 Suicide & Crisis Lifeline */}
          <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {CRISIS_RESOURCES.suicideHotline.label}
            </h3>
            <p className="text-4xl font-bold text-primary mb-3">
              {CRISIS_RESOURCES.suicideHotline.number}
            </p>
            <p className="text-gray-600 mb-4">
              Call or text 988 — available 24/7 for anyone in suicidal crisis or
              emotional distress.
            </p>
            <a
              href={`tel:${CRISIS_RESOURCES.suicideHotline.number}`}
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Crisis Text Line */}
          <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-teal" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {CRISIS_RESOURCES.crisisText.label}
            </h3>
            <p className="text-lg font-bold text-teal mb-1">
              Text HOME to
            </p>
            <p className="text-4xl font-bold text-teal mb-3">
              {CRISIS_RESOURCES.crisisText.number}
            </p>
            <p className="text-gray-600 mb-4">
              Free, 24/7 crisis support via text message. A trained crisis
              counselor will respond.
            </p>
            <div className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-6 py-3 rounded-lg">
              <MessageSquare className="w-4 h-4" />
              Text for Help
            </div>
          </div>

          {/* Emergency */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-orange" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {CRISIS_RESOURCES.emergency.label}
            </h3>
            <p className="text-4xl font-bold text-orange mb-3">
              {CRISIS_RESOURCES.emergency.number}
            </p>
            <p className="text-gray-600 mb-4">
              If someone is in immediate danger, call 911. You can also go to
              your nearest emergency room.
            </p>
            <a
              href={`tel:${CRISIS_RESOURCES.emergency.number}`}
              className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call 911
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== SUPPORT ORGANIZATIONS ===== */}
      <SectionWrapper variant="light">
        <div className="text-center mb-12">
          <h2 className="mb-4">Support Organizations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These national organizations offer ongoing support, education, and
            community for individuals and families.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: "SAMHSA National Helpline",
              phone: "1-800-662-4357",
              description:
                "Free, confidential, 24/7, 365-day-a-year treatment referral and information service for individuals and families facing mental health and substance use disorders.",
              url: "https://www.samhsa.gov/find-help/national-helpline",
            },
            {
              name: "NAMI (National Alliance on Mental Illness)",
              phone: "1-800-950-NAMI",
              description:
                "The nation's largest grassroots mental health organization. Offers support groups, education programs, and advocacy for individuals and families affected by mental illness.",
              url: "https://www.nami.org",
            },
            {
              name: "Al-Anon / Nar-Anon Family Groups",
              phone: "1-888-425-2666",
              description:
                "Support groups specifically for families and friends of people struggling with substance use. Find strength through shared experience with people who understand.",
              url: "https://al-anon.org",
            },
            {
              name: "The Compassionate Friends",
              phone: "1-877-969-0010",
              description:
                "Support for families who have experienced the death of a child. Local chapters, online support, and resources for bereaved parents, grandparents, and siblings.",
              url: "https://www.compassionatefriends.org",
            },
          ].map((org) => (
            <div
              key={org.name}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {org.name}
              </h3>
              <p className="text-primary font-semibold mb-3">{org.phone}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {org.description}
              </p>
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-teal text-sm font-semibold hover:text-teal-600 transition-colors"
              >
                Visit Website
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== FOR FAMILIES ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Supporting a Loved One</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              If someone you love is struggling with substance use or mental
              health, here are some ways to show up for them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tips */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <HandHeart className="w-6 h-6 text-teal" />
                <h3 className="text-xl font-semibold text-gray-900">
                  How to Help
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Listen without judgment — you don't need to have the answers",
                  "Educate yourself about substance use disorder and mental illness",
                  "Take care of your own mental health — you can't pour from an empty cup",
                  "Set boundaries with love, not anger",
                  "Connect with a support group like Al-Anon or NAMI",
                  "Remember that addiction is a disease, not a choice or moral failing",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-teal rounded-full" />
                    </div>
                    <p className="text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conversation starters */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Conversation Starters
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  "\"I've noticed you've been going through a tough time. I'm here for you.\"",
                  "\"I love you no matter what. I want to understand what you're feeling.\"",
                  "\"You don't have to go through this alone. Can we talk about getting some support?\"",
                  "\"I've been learning about what families like ours go through. I don't want us to be silent anymore.\"",
                  "\"There's no shame in what you're dealing with. I'm not going anywhere.\"",
                ].map((starter) => (
                  <div
                    key={starter}
                    className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary"
                  >
                    <p className="text-gray-700 text-sm italic">{starter}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== RECOMMENDED READING ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Recommended Reading</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Books and articles that have helped families on this journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Beautiful Boy",
                author: "David Sheff",
                description:
                  "A father's powerful account of his son's addiction — honest, heartbreaking, and full of love.",
              },
              {
                title: "Codependent No More",
                author: "Melody Beattie",
                description:
                  "The groundbreaking guide for anyone who loves someone struggling with addiction.",
              },
              {
                title: "It's OK That You're Not OK",
                author: "Megan Devine",
                description:
                  "A compassionate guide to grieving that doesn't try to fix your pain — it honors it.",
              },
              {
                title: "In the Realm of Hungry Ghosts",
                author: "Gabor Mate, M.D.",
                description:
                  "A compassionate look at the roots of addiction from one of the world's leading experts.",
              },
              {
                title: "The Grief Recovery Handbook",
                author: "John W. James & Russell Friedman",
                description:
                  "A practical, action-oriented program for moving beyond loss.",
              },
              {
                title: "More Resources Coming",
                author: "Sam's OATH",
                description:
                  "We're curating a growing list of books, articles, podcasts, and films. Check back or contact us with suggestions.",
              },
            ].map((book) => (
              <div
                key={book.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <BookOpen className="w-8 h-8 text-primary-300 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-teal font-medium mb-2">
                  {book.author}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {book.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FOOTER CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <Heart className="w-10 h-10 mx-auto mb-4 text-white/80" />
          <h2 className="text-white mb-4">
            You Don&apos;t Have to Do This Alone
          </h2>
          <p className="text-white/80 text-xl mb-6 leading-relaxed">
            If you or someone you know is struggling with substance use, mental
            health challenges, or grief — please reach out. Help is available.
            You are worthy of support, and your pain matters.
          </p>
          <p className="text-white/90 text-lg font-semibold mb-10">
            Call or text 988 anytime, day or night.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:988"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Call 988 Now
            </a>
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
            >
              Join the Movement
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
