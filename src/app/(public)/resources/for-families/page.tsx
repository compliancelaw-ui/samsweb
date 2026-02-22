import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  HandHeart,
  MessageCircle,
  Shield,
  Users,
  Phone,
  BookOpen,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Resources for Families | Sam's OATH",
  description:
    "Curated resources for families and loved ones affected by substance use. Support groups, guides, hotlines, and community — because you matter too.",
};

export default function ForFamiliesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            For Families &amp; Loved Ones
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Resources Built for Families Like Yours
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            You didn&apos;t cause it. You can&apos;t cure it. But you
            don&apos;t have to face it alone. This page is for you — the
            parent, the spouse, the sibling, the friend carrying more than
            anyone knows.
          </p>
        </div>
      </section>

      {/* ===== UNDERSTANDING WHAT YOU'RE GOING THROUGH ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-medium text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all resources
          </Link>

          <h2 className="mb-6">Understanding What You&apos;re Going Through</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            When someone you love is struggling with substance use or mental
            health challenges, the weight doesn&apos;t fall on them alone — it
            falls on the entire family. You may feel guilt, anger, fear,
            exhaustion, shame, or all of them at once. These feelings are
            normal, and they are valid.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Substance use disorder is a medical condition — not a choice, not a
            moral failing, and not something you caused. Understanding this is
            the first step toward healing for both your loved one and yourself.
          </p>

          {/* Key truths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: Heart,
                title: "You Are Not to Blame",
                text: "No parent, partner, or sibling causes substance use disorder. It is a complex medical condition influenced by genetics, environment, trauma, and brain chemistry. Let go of the guilt.",
              },
              {
                icon: Shield,
                title: "You Cannot Fix It Alone",
                text: "Recovery requires professional help, community support, and — most importantly — the individual's own willingness. You can support, but you cannot control the outcome.",
              },
              {
                icon: Users,
                title: "You Deserve Support Too",
                text: "Families of people with substance use disorder have higher rates of anxiety, depression, and physical illness. Your health matters. Getting help for yourself is not selfish — it's essential.",
              },
              {
                icon: HandHeart,
                title: "There Is a Path Forward",
                text: "Regardless of where your loved one is on their journey, you can find your own peace. Millions of families have walked this road and found their way to healing.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-teal" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== HOW TO HELP YOUR LOVED ONE ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-4">How to Help Without Losing Yourself</h2>
          <p className="text-lg text-gray-600 mb-8">
            The line between helping and enabling can feel impossibly thin.
            Here&apos;s what actually helps — and what doesn&apos;t.
          </p>

          <div className="space-y-6 mb-10">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Listen Without Judgment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You don&apos;t need to have the answers. Often, the most
                powerful thing you can do is simply be present and listen. Avoid
                sentences that start with &ldquo;You should...&rdquo; or
                &ldquo;Why don&apos;t you just...&rdquo; Instead, try:
                &ldquo;I&apos;m here. I love you. Tell me what you&apos;re
                feeling.&rdquo;
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Set Boundaries with Love
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Boundaries are not punishment — they&apos;re protection. For
                both of you. A boundary might sound like: &ldquo;I love you and
                I will always be here for you, but I cannot give you money when
                I know it&apos;s being used for substances.&rdquo; Setting
                boundaries is one of the hardest and most important things a
                family member can do.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Educate Yourself
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn about substance use disorder as a medical condition.
                Understand how it changes the brain, why willpower alone
                isn&apos;t enough, and what recovery actually looks like. The
                more you understand, the less you&apos;ll blame yourself — and
                the better you&apos;ll be able to support your loved one.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Take Care of You
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You cannot pour from an empty cup. Make space for your own
                therapy, your own support group, your own moments of rest.
                Prioritizing your well-being is not abandoning your loved one —
                it&apos;s making sure you have the strength to keep showing up.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Understand Enabling vs. Helping
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>Helping</strong> supports recovery and growth.{" "}
                <strong>Enabling</strong> removes the natural consequences that
                might motivate change. It&apos;s a painful distinction, and
                sometimes the loving thing to do is the hardest thing to do.
                Support groups like Al-Anon can help you navigate this.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== CONVERSATION STARTERS ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-primary" />
            <h2 className="mb-0">Starting the Conversation</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Talking openly about substance use and mental health within your
            family can feel terrifying. These conversation starters might help.
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                context: "If you're worried about a loved one:",
                line: "\"I've noticed you've been going through a really tough time. I'm not here to judge you — I just want you to know I love you and I'm here.\"",
              },
              {
                context: "If you want to break the family silence:",
                line: "\"I've been learning about what families like ours go through. I don't want us to be silent about this anymore. Can we talk?\"",
              },
              {
                context: "If your child is struggling:",
                line: "\"I love you no matter what. Nothing you tell me will change that. I want to understand what you're feeling so we can figure this out together.\"",
              },
              {
                context: "If a friend is going through it:",
                line: "\"You don't have to have it all figured out to talk to me about what's happening. I'm here to listen, not to fix.\"",
              },
              {
                context: "If you're the one struggling:",
                line: "\"I need to tell you something that's been really hard for me. I'm not looking for you to solve it — I just need you to know.\"",
              },
            ].map((item) => (
              <div
                key={item.context}
                className="bg-primary-50 rounded-lg p-5 border-l-4 border-primary"
              >
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  {item.context}
                </p>
                <p className="text-gray-700 italic">{item.line}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== SUPPORT ORGANIZATIONS FOR FAMILIES ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-4">Organizations for Families</h2>
          <p className="text-lg text-gray-600 mb-8">
            These organizations exist specifically for families and loved ones.
            You deserve the same level of support as the person who is
            struggling.
          </p>
          <div className="space-y-6">
            {[
              {
                name: "Al-Anon Family Groups",
                phone: "1-888-425-2666",
                link: "https://al-anon.org",
                description:
                  "The most established family support program. Free peer support groups — in person and online — for anyone affected by a loved one's drinking or drug use. Built on the principle that families need their own recovery too.",
              },
              {
                name: "Nar-Anon Family Groups",
                phone: "1-800-477-6291",
                link: "https://www.nar-anon.org",
                description:
                  "Similar to Al-Anon but focused specifically on families of people with substance use issues. Free 12-step meetings for family members and friends.",
              },
              {
                name: "NAMI Family-to-Family",
                phone: "1-800-950-6264",
                link: "https://www.nami.org/Support-Education/Mental-Health-Education/NAMI-Family-to-Family",
                description:
                  "Free 8-session educational program for family, significant others, and friends of people with mental health conditions. Taught by trained family members.",
              },
              {
                name: "The Compassionate Friends",
                phone: "1-877-969-0010",
                link: "https://www.compassionatefriends.org",
                description:
                  "Support for families who have experienced the death of a child. Local chapters, online support communities, and resources for bereaved parents, grandparents, and siblings.",
              },
              {
                name: "SAMHSA National Helpline",
                phone: "1-800-662-4357",
                link: "https://www.samhsa.gov/find-help/national-helpline",
                description:
                  "Free, confidential, 24/7, 365-day treatment referral and information. They can help you find local family support services and treatment options.",
              },
            ].map((org) => (
              <div
                key={org.name}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-1">{org.name}</h3>
                <a
                  href={`tel:${org.phone.replace(/[^0-9]/g, "")}`}
                  className="text-primary font-semibold text-sm inline-flex items-center gap-1.5 hover:text-primary-600 transition-colors mb-3"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {org.phone}
                </a>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {org.description}
                </p>
                <a
                  href={org.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal text-sm font-semibold hover:text-teal-600 transition-colors"
                >
                  Visit Website &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== RECOMMENDED READING ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="mb-0">Recommended Reading for Families</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Beautiful Boy",
                author: "David Sheff",
                why: "A father's brutally honest account of his son's addiction. If you're a parent, this book will make you feel seen.",
              },
              {
                title: "Codependent No More",
                author: "Melody Beattie",
                why: "The definitive guide for family members who've lost themselves in someone else's crisis. Practical, compassionate, life-changing.",
              },
              {
                title: "Beyond Addiction",
                author: "Jeffrey Foote, PhD, et al.",
                why: "A science-based guide for families that replaces tough love with compassion — and shows that it works better.",
              },
              {
                title: "Get Your Loved One Sober",
                author: "Robert Meyers, PhD",
                why: "The CRAFT method — a proven approach for families to encourage their loved ones toward treatment without confrontation.",
              },
            ].map((book) => (
              <div
                key={book.title}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900">{book.title}</h3>
                <p className="text-sm text-teal font-medium mb-2">
                  by {book.author}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {book.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">You Matter in This Story Too</h2>
          <p className="text-white/80 text-xl mb-8 leading-relaxed">
            Sam&apos;s OATH exists for families like yours. Take the OATH. Join
            the community. Break the silence not just for your loved one — but
            for yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
            >
              Take Sam&apos;s OATH
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
            >
              Read Family Stories
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
