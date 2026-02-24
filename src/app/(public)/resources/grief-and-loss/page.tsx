import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Phone,
  MessageSquare,
  Users,
  BookOpen,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CRISIS_RESOURCES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Grief & Loss Resources | Losing a Loved One to Substance Use | Sam's OATH",
  description:
    "Support for families grieving a loved one lost to overdose or substance use. You are not alone in this grief. Resources, community, and comfort.",
  alternates: { canonical: "/resources/grief-and-loss" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://samsoath.org",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Resources",
      item: "https://samsoath.org/resources",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Grief & Loss",
      item: "https://samsoath.org/resources/grief-and-loss",
    },
  ],
};

export default function GriefAndLossPage() {
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
            Grief &amp; Loss
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            For Those Carrying the Weight of Loss
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            If you&apos;ve lost someone you love to substance use, overdose, or
            suicide — this page is for you. Your grief is real, it is valid, and
            you do not have to carry it alone.
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-medium text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all resources
          </Link>

          <h2 className="mb-6">Your Grief Is Different — And That&apos;s OK</h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed mb-10">
            <p>
              Losing someone to substance use, overdose, or suicide carries a
              kind of grief that the world doesn&apos;t always know how to hold.
              People may say the wrong things. They may avoid talking about your
              loved one at all. You may feel anger alongside your sadness —
              anger at the disease, at the system, at yourself, at them.
            </p>
            <p>
              This is sometimes called <strong>disenfranchised grief</strong> —
              grief that society doesn&apos;t fully acknowledge or validate.
              When someone dies from cancer, people bring casseroles. When
              someone dies from an overdose, people sometimes go quiet. That
              silence is its own wound.
            </p>
            <p>
              We want you to know: your grief matters. Your loved one mattered.
              And the way they died does not diminish the love you shared or the
              life they lived.
            </p>
          </div>

          {/* Common experiences */}
          <div className="bg-primary-50 rounded-xl p-8 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What You Might Be Feeling
            </h3>
            <p className="text-gray-600 mb-6">
              If any of these sound familiar, you are not alone. These are
              normal responses to an abnormal loss.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Guilt — wondering if you could have done more or said something different",
                "Anger — at the disease, at the person, at yourself, at God, at the world",
                "Shame — feeling like you can't talk about how your loved one died",
                "Relief — and then guilt about feeling relieved",
                "Isolation — feeling like nobody understands what you're going through",
                "Ambiguous grief — grieving someone you lost long before they died",
                "Trauma — replaying the phone call, the hospital, the moment you found out",
                "Fear — worried the same thing could happen to another family member",
              ].map((feeling) => (
                <div
                  key={feeling}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {feeling}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== WHAT HELPS ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-6">What Helps</h2>
          <p className="text-lg text-gray-600 mb-8">
            Grief doesn&apos;t have a timeline or a checklist. But these are
            things that families who&apos;ve walked this road say have made a
            difference.
          </p>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Talk About Them
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Say their name. Share their stories — not just the hard parts,
                but the funny ones, the beautiful ones, the ordinary Tuesday
                ones. Your loved one was a whole person, and they deserve to be
                remembered that way. If the people around you go quiet when you
                bring them up, find people who won&apos;t.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Find Your People
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Grief support groups — especially ones designed for families
                who&apos;ve lost someone to substance use — can be
                transformative. Being in a room (virtual or in-person) with
                people who truly understand is one of the most healing
                experiences. Organizations like The Compassionate Friends and
                grief-specific Al-Anon meetings can be lifelines.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Let Go of the Guilt
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This is perhaps the hardest thing. The &ldquo;what ifs&rdquo;
                can consume you. But substance use disorder is a powerful,
                complex medical condition. You did not cause it. You could not
                have cured it. And your love — even when it wasn&apos;t enough
                to save them — was never wasted.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Seek Professional Help
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Grief counseling and therapy — particularly with someone who
                understands substance use-related loss — can provide tools for
                processing the complex emotions that come with this kind of
                grief. EMDR therapy can be especially helpful for traumatic
                loss. You deserve professional support.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Honor Them in a Way That Feels Right
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Some families create memorial funds. Some plant trees. Some
                write. Some join movements like Sam&apos;s OATH to ensure other
                families don&apos;t have to carry this weight in silence. There
                is no wrong way to honor someone you love. Do what brings you
                even a small piece of peace.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== WHAT TO SAY / NOT SAY ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-4">
            For Friends and Family: What to Say (and What Not to Say)
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            If someone you know has lost a loved one to substance use, here are
            some guidelines for being present.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What helps */}
            <div>
              <h3 className="text-lg font-semibold text-teal mb-4">
                What Helps to Hear
              </h3>
              <div className="space-y-3">
                {[
                  "\"I'm so sorry. I don't know what to say, but I'm here.\"",
                  "\"Tell me about them. I want to know who they were.\"",
                  "\"There are no words, but I love you and I'm not going anywhere.\"",
                  "\"You don't have to be strong right now.\"",
                  "\"I'm bringing dinner Tuesday. You don't need to reply.\"",
                ].map((phrase) => (
                  <div
                    key={phrase}
                    className="bg-teal-50 rounded-lg p-4 border-l-4 border-teal"
                  >
                    <p className="text-gray-700 text-sm italic">{phrase}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What hurts */}
            <div>
              <h3 className="text-lg font-semibold text-red-500 mb-4">
                What Hurts to Hear
              </h3>
              <div className="space-y-3">
                {[
                  "\"Everything happens for a reason.\"",
                  "\"At least they're not suffering anymore.\"",
                  "\"They made their choice.\"",
                  "\"You need to move on.\"",
                  "\"I know how you feel.\" (Unless you truly do.)",
                ].map((phrase) => (
                  <div
                    key={phrase}
                    className="bg-red-50 rounded-lg p-4 border-l-4 border-red-300"
                  >
                    <p className="text-gray-700 text-sm italic">{phrase}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== SUPPORT ORGANIZATIONS ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="mb-0">Organizations That Understand This Grief</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                name: "The Compassionate Friends",
                phone: "1-877-969-0010",
                link: "https://www.compassionatefriends.org",
                description:
                  "Support for bereaved parents, grandparents, and siblings after the death of a child. Local chapters, online groups, and an annual national conference.",
              },
              {
                name: "Grief Recovery After a Substance Passing (GRASP)",
                link: "https://grfriendsresource.wixsite.com/grasp",
                description:
                  "Founded by families who lost loved ones to substance use. Peer support groups, online forums, and resources specifically for substance use-related loss.",
              },
              {
                name: "Alliance of Hope for Suicide Loss Survivors",
                link: "https://allianceofhope.org",
                description:
                  "Online community for people who have lost someone to suicide. Forum-based peer support with professional moderation.",
              },
              {
                name: "Bereaved Parents of the USA",
                phone: "1-800-273-8255",
                link: "https://bereavedparentsusa.org",
                description:
                  "Support and community for bereaved parents. Monthly meetings, annual gatherings, and online resources.",
              },
            ].map((org) => (
              <div
                key={org.name}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-1">{org.name}</h3>
                {org.phone && (
                  <a
                    href={`tel:${org.phone.replace(/[^0-9]/g, "")}`}
                    className="text-primary font-semibold text-sm inline-flex items-center gap-1.5 hover:text-primary-600 transition-colors mb-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {org.phone}
                  </a>
                )}
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
            <h2 className="mb-0">Books for Grieving Families</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "It's OK That You're Not OK",
                author: "Megan Devine",
                why: "A compassionate guide that doesn't try to fix your grief — it honors it. Written for anyone who has been told to 'move on' too soon.",
              },
              {
                title: "The Grief Recovery Handbook",
                author: "John W. James & Russell Friedman",
                why: "A practical, action-oriented program for moving beyond loss. Helps you identify unresolved grief and take concrete steps toward healing.",
              },
              {
                title: "Bearing the Unbearable",
                author: "Joanne Cacciatore",
                why: "For parents who have lost a child. Raw, honest, and deeply compassionate. Validated by both lived experience and clinical research.",
              },
              {
                title: "Beautiful Boy",
                author: "David Sheff",
                why: "A father's account of loving a son through addiction. Even if your story ended differently, this book will make you feel understood.",
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

      {/* ===== CRISIS RESOURCES ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="mb-4">If You&apos;re in Crisis Right Now</h2>
          <p className="text-lg text-gray-600 mb-8">
            Grief can sometimes feel unbearable. If you are having thoughts of
            harming yourself, please reach out immediately. You matter, and
            help is available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:988"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call {CRISIS_RESOURCES.suicideHotline.number}
            </a>
            <a
              href="sms:741741&body=HOME"
              className="inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-teal-600 transition-colors shadow-md hover:shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              Text HOME to 741741
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== CTA ===== */}
      <SectionWrapper variant="gradient">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">Their Life Mattered. So Does Yours.</h2>
          <p className="text-white/80 text-xl mb-8 leading-relaxed">
            Sam&apos;s OATH began with loss — and the belief that no family
            should carry that loss in silence. Take Sam's OATH in your loved
            one&apos;s memory and join a community that understands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
            >
              Take Sam's OATH in Their Memory
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
