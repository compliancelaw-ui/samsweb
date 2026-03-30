import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  Megaphone,
  Heart,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Language Guide | Words That Heal | Sam's OATH",
  description:
    "A practical guide to compassionate language for talking about substance use and mental health. Simple swaps that put the person first and make it safer to ask for help.",
  alternates: { canonical: "/resources/language-guide" },
};

const LANGUAGE_PAIRS = [
  {
    category: "Talking About People",
    intro: "Every person is more than a diagnosis. These swaps put the person first.",
    items: [
      { instead: "Addict", say: "A person dealing with substance use" },
      { instead: "Junkie", say: "A person who uses drugs" },
      { instead: "Alcoholic", say: "A person with alcohol use disorder" },
      { instead: "Former addict", say: "A person in recovery" },
      { instead: "Drug baby", say: "A baby born with neonatal abstinence syndrome" },
      { instead: "Crazy / Insane", say: "A person experiencing mental health challenges" },
    ],
  },
  {
    category: "Talking About Conditions",
    intro: "Substance use disorder is a medical condition, not a moral failure. The language should reflect that.",
    items: [
      { instead: "Drug abuse / Substance abuse", say: "Substance use disorder" },
      { instead: "Drug habit", say: "Substance use disorder" },
      { instead: "Drug problem", say: "Substance use disorder" },
      { instead: "Addiction", say: "Substance use disorder (in clinical settings)" },
    ],
  },
  {
    category: "Talking About Recovery",
    intro: "Recovery is a journey, not a judgment. These words remove the moral weight.",
    items: [
      { instead: "Clean / Dirty", say: "In recovery / Actively using" },
      { instead: "Clean urine / Dirty urine", say: "Negative / Positive test result" },
      { instead: "Relapse", say: "Recurrence or return to use" },
      { instead: "On the wagon / Off the wagon", say: "In recovery / Experiencing a recurrence" },
    ],
  },
  {
    category: "Talking About Treatment",
    intro: "Treatment language should be medical, not judgmental.",
    items: [
      { instead: "Medication-assisted treatment (MAT)", say: "Medications for addiction treatment" },
      { instead: "Opioid replacement / Substitution", say: "Opioid agonist therapy" },
      { instead: "Detox (as complete treatment)", say: "Medically managed withdrawal + continuing care" },
    ],
  },
  {
    category: "Talking About Difficult Situations",
    intro: "Some common phrases cause more pain than we realize.",
    items: [
      { instead: "Enabling", say: "Supporting (be specific about what you mean)" },
      { instead: "Rock bottom", say: "Avoid entirely. It implies someone must suffer before getting help." },
      { instead: "Committed suicide", say: "Died by suicide" },
      { instead: "Failed suicide attempt", say: "Survived a suicide attempt" },
    ],
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://samsoath.org" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://samsoath.org/resources" },
    { "@type": "ListItem", position: 3, name: "Language Guide", item: "https://samsoath.org/resources/language-guide" },
  ],
};

export default function LanguageGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            Words That Heal
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            How to Talk About Substance Use and Mental Health
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            The words we choose shape how people see themselves, and whether
            they feel safe enough to ask for help. Here are simple swaps
            that make a real difference.
          </p>
        </div>
      </section>

      {/* ===== WHY LANGUAGE MATTERS ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-medium text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all resources
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <Megaphone className="w-6 h-6 text-primary" />
            <h2 className="mb-0">Why This Matters</h2>
          </div>

          <div className="space-y-4 text-lg text-gray-600 leading-relaxed mb-8">
            <p>
              When we call someone an &ldquo;addict,&rdquo; we reduce a whole
              person to a single condition. When we say someone is
              &ldquo;clean,&rdquo; we imply they were somehow dirty before.
              These words carry moral weight that has no place in a conversation
              about health.
            </p>
            <p>
              Research published in the <em>Journal of Substance Abuse
              Treatment</em> found that when healthcare providers read patient
              files using stigmatizing labels, they were more likely to
              recommend punishment over treatment. Language changes how people
              are treated, literally.
            </p>
            <p>
              This is not about being politically correct. It is about being
              accurate, compassionate, and effective. When we change how we
              talk, we make it safer for people to ask for help.
            </p>
          </div>

          {/* Key principle callout */}
          <div className="bg-teal-50 border-l-4 border-teal rounded-r-xl p-6 mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-teal flex-shrink-0" />
              <h3 className="text-lg font-semibold text-gray-900 mb-0">
                The Simple Rule: Person First
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              Instead of defining someone by their condition, name the person
              first. That is the whole idea.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                Instead of <span className="line-through text-red-400">&ldquo;an addict&rdquo;</span>,
                say <span className="font-semibold text-teal">&ldquo;a person dealing with substance use.&rdquo;</span>
              </p>
              <p className="text-gray-600">
                Instead of <span className="line-through text-red-400">&ldquo;a mentally ill person&rdquo;</span>,
                say <span className="font-semibold text-teal">&ldquo;a person experiencing mental health challenges.&rdquo;</span>
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              They are someone&apos;s child, parent, friend, and neighbor first.
              The condition is something they are dealing with, not who they are.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== LANGUAGE GUIDE TABLE ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-4">The Complete Guide</h2>
          <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Simple swaps for families, workplaces, schools, media, and anyone
            who wants to talk about these issues with care.
          </p>

          <div className="space-y-8">
            {LANGUAGE_PAIRS.map((section) => (
              <div key={section.category}>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {section.category}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{section.intro}</p>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
                    <div className="px-6 py-3 font-bold text-gray-500 uppercase text-xs tracking-wider">
                      Instead of...
                    </div>
                    <div className="px-6 py-3 font-bold text-teal uppercase text-xs tracking-wider">
                      Say this...
                    </div>
                  </div>
                  {/* Rows */}
                  {section.items.map((item, idx) => (
                    <div
                      key={item.instead}
                      className={`grid grid-cols-2 items-center ${
                        idx < section.items.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="px-6 py-4 flex items-center gap-3">
                        <span
                          className="text-red-400 text-lg leading-none"
                          aria-hidden="true"
                        >
                          &times;
                        </span>
                        <span className="text-gray-500 line-through decoration-red-300/50 text-sm">
                          {item.instead}
                        </span>
                      </div>
                      <div className="px-6 py-4 flex items-center gap-3">
                        <ArrowRightLeft className="w-4 h-4 text-teal flex-shrink-0" />
                        <span className="text-gray-900 font-medium text-sm">
                          {item.say}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-10 bg-primary-50 rounded-xl p-6 text-center">
            <p className="text-gray-700 leading-relaxed">
              Language is always evolving, and no guide is perfect. What matters
              most is the intention to see <strong>people</strong>, not labels.
              When in doubt, ask someone how they prefer to be referred to. The
              willingness to learn is what counts.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== PUTTING IT INTO PRACTICE ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-6">Putting It Into Practice</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                At Home
              </h3>
              <p className="text-gray-600 leading-relaxed">
                How you talk about substance use and mental health at your
                dinner table shapes how your children and family members think
                about it. If your family is directly affected, person-first
                language helps your loved one feel seen as a whole person, not
                defined by what they are going through.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                At Work
              </h3>
              <p className="text-gray-600 leading-relaxed">
                If you are an employer, manager, or HR professional, the
                language in your policies and conversations directly impacts
                whether employees feel safe asking for help. Use
                &ldquo;substance use disorder&rdquo; instead of &ldquo;substance
                abuse&rdquo; in all documentation.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                On Social Media
              </h3>
              <p className="text-gray-600 leading-relaxed">
                When you share articles, comment on stories, or post about
                these issues, your language reaches people you may never meet.
                A single comment using person-first language can model a better
                conversation for everyone who sees it.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                In the Media
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Journalists and content creators shape public perception. The
                AP Stylebook now recommends &ldquo;substance use
                disorder&rdquo; over &ldquo;substance abuse&rdquo; and
                &ldquo;died by suicide&rdquo; over &ldquo;committed
                suicide.&rdquo; Language shifts start with those who shape the
                narrative.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">
            When We Change Our Words, We Change the Conversation
          </h2>
          <p className="text-white/90 text-xl mb-8 leading-relaxed">
            Take Sam&apos;s OATH and commit to Openness, Authenticity,
            Togetherness, and Healing, starting with the words you use.
          </p>
          <Link
            href="/take-the-oath"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
          >
            Take Sam&apos;s OATH
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
