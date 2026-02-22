import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Fingerprint,
  Users,
  HeartHandshake,
  Globe,
  Megaphone,
  Sparkles,
  Music,
  Heart,
  BookOpen,
  Briefcase,
  HandHeart,
  ImageIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "About Sam's OATH | A Movement to End Stigma",
  description:
    "Sam's OATH is a national movement to break the silence around substance use and mental health. Learn about the OATH, the mission, and how you can be part of it.",
};

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-20 md:py-28">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            About Sam&apos;s OATH
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            What&apos;s Hidden Doesn&apos;t Heal
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Millions of people face substance use and mental health challenges in
            silence. Sam&apos;s OATH is a movement to change that — replacing
            shame with openness, isolation with community, and silence with
            healing.
          </p>
        </div>
      </section>

      {/* ===== THE OATH ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-12">
          <h2 className="mb-4">The OATH</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four commitments that replace shame with openness, isolation with
            community, and silence with healing. It takes sixty seconds.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Eye,
              letter: "O",
              word: "Openness",
              color: "bg-teal text-white",
              description:
                "We choose to talk about substance use and mental health without shame.",
            },
            {
              icon: Fingerprint,
              letter: "A",
              word: "Authenticity",
              color: "bg-primary text-white",
              description:
                "We share what we've really been through — the truth, not the polished version.",
            },
            {
              icon: Users,
              letter: "T",
              word: "Togetherness",
              color: "bg-sage text-white",
              description:
                "We stand with others who carry this weight. No one should face this alone.",
            },
            {
              icon: HeartHandshake,
              letter: "H",
              word: "Healing",
              color: "bg-orange text-white",
              description:
                "We commit to healing — not perfection. It starts when we stop hiding.",
            },
          ].map((item) => (
            <div
              key={item.letter}
              className="text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3`}
              >
                {item.letter}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.word}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/take-the-oath"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-600 transition-colors"
          >
            Take Sam&apos;s OATH
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ===== TOPIC CARDS ===== */}
      <SectionWrapper variant="light">
        <div className="text-center mb-10">
          <h2 className="mb-4">Learn More</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The movement, the mission, and how it all started.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* The Origin Story */}
          <a
            href="#origin"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/photos/sam-portrait.jpg"
                alt="Sam Sheeder — the person who inspired the movement"
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-lg">The Origin Story</p>
                <p className="text-white/70 text-sm">How one person inspired a movement</p>
              </div>
            </div>
          </a>

          {/* The Moment That Changed Everything */}
          <a
            href="#viral-moment"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48 overflow-hidden bg-primary-50 flex items-center justify-center">
              <div className="text-center px-6">
                <Megaphone className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-gray-900 font-semibold text-lg">The Spark</p>
                <p className="text-gray-500 text-sm mt-1">345K+ people reached, thousands said &ldquo;me too&rdquo;</p>
              </div>
            </div>
          </a>

          {/* The Music */}
          <Link
            href="/music"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48 overflow-hidden bg-orange-50 flex items-center justify-center">
              <div className="text-center px-6">
                <Music className="w-10 h-10 text-orange mx-auto mb-3" />
                <p className="text-gray-900 font-semibold text-lg">The Music</p>
                <p className="text-gray-500 text-sm mt-1">15 original songs on Apple Music</p>
              </div>
            </div>
          </Link>

          {/* Where We're Going */}
          <a
            href="#vision"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48 overflow-hidden bg-sage-50 flex items-center justify-center">
              <div className="text-center px-6">
                <Globe className="w-10 h-10 text-sage mx-auto mb-3" />
                <p className="text-gray-900 font-semibold text-lg">Where We&apos;re Going</p>
                <p className="text-gray-500 text-sm mt-1">The vision for a national movement</p>
              </div>
            </div>
          </a>

          {/* The Founder */}
          <a
            href="#founder"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48 overflow-hidden bg-teal-50 flex items-center justify-center">
              <div className="text-center px-6">
                <Heart className="w-10 h-10 text-teal mx-auto mb-3" />
                <p className="text-gray-900 font-semibold text-lg">The Founder</p>
                <p className="text-gray-500 text-sm mt-1">From silence to a national movement</p>
              </div>
            </div>
          </a>

          {/* Community placeholder */}
          <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
              <div className="text-center px-6">
                <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-900 font-semibold text-lg">Our Community</p>
                <p className="text-gray-400 text-sm mt-1">Stories from people who&apos;ve taken the OATH</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== PEOPLE BEHIND THE MOVEMENT ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-10">
          <h2 className="mb-4">People Behind the Movement</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Substance use and mental health challenges don&apos;t happen in
            isolation. The people closest to you carry the weight too.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Frank",
              role: "Founder",
              image: "/images/photos/frank-headshot.jpg",
              icon: Heart,
              color: "bg-primary-50 text-primary border-primary/20",
              quote: "I stayed silent for years. After losing Sam, I chose a different path.",
            },
            {
              name: "Annie",
              role: "Sam's Sister",
              image: "/images/photos/sam-annie-smile-1.jpg",
              icon: HandHeart,
              color: "bg-teal-50 text-teal border-teal/20",
              quote: "Siblings see things others don't. Our voices deserve to be heard too.",
            },
            {
              name: "Nancy",
              role: "Frank's Wife",
              image: "/images/photos/frank-nancy-sunset.jpg",
              icon: HeartHandshake,
              color: "bg-orange-50 text-orange border-orange/20",
              quote: "She chose this family and never wavered — through every challenge.",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold">{member.name}</p>
                  <p className="text-white/70 text-xs">{member.role}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-500 text-xs leading-relaxed italic line-clamp-3">
                  &ldquo;{member.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Placeholder for community voices */}
        <div className="text-center mt-10 p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 max-w-4xl mx-auto">
          <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            More voices coming soon — people from all walks of life who&apos;ve
            taken Sam&apos;s OATH and chosen openness over silence.
          </p>
        </div>
      </SectionWrapper>

      {/* ===== THE ORIGIN STORY (brief Sam section) ===== */}
      <section id="origin">
        <SectionWrapper variant="light">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
                The Origin Story
              </p>
              <h2 className="mb-6">How It Started</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Sam Sheeder lit up every room he entered. Adventurous, brilliant,
                  and deeply authentic — he had a gift for making anyone feel seen
                  and heard. He loved music, the outdoors, and connecting with
                  people from every walk of life.
                </p>
                <p>
                  Sam also faced the hard and often lonely road of substance use
                  disorder. He never shied away from the truth of his journey,
                  even when the world&apos;s judgment made it harder to seek help.
                  He taught everyone around him that it&apos;s ok not to be ok —
                  and that openness and authenticity matter more than appearances.
                </p>
                <p>
                  After losing Sam, his father Frank made a choice: instead of
                  continuing the silence, he would tell the truth publicly. That
                  act of openness became the spark for Sam&apos;s OATH — a movement
                  built on the values Sam lived by.
                </p>
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
      </section>

      {/* ===== THE VIRAL MOMENT ===== */}
      <section id="viral-moment">
        <SectionWrapper variant="white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
                Proof That People Needed Permission to Talk
              </p>
              <h2 className="mb-4">The Spark</h2>
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
                  <p>
                    One raw, honest LinkedIn post about substance use and mental
                    health — and the silence that surrounds it — reached 345,000
                    people. But what was remarkable wasn&apos;t the number. It was
                    the response.
                  </p>
                  <p>
                    Parents, siblings, partners, and friends who had been
                    carrying the same weight in secret all said the same thing:
                  </p>
                  <blockquote className="border-l-4 border-teal pl-6 my-4 italic text-lg text-gray-700">
                    &ldquo;I thought I was the only one.&rdquo;
                  </blockquote>
                  <p>
                    That moment proved the silence itself was the crisis. When one
                    person spoke openly, thousands felt permission to do the same.
                    That&apos;s the power of the OATH — not one person&apos;s
                    courage, but what happens when people give each other
                    permission to be honest.
                  </p>
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
      </section>

      {/* ===== THE FOUNDER ===== */}
      <section id="founder">
        <SectionWrapper variant="light">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
                  The Founder
                </p>
                <h2 className="mb-6">Frank Sheeder</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Frank spent his career as a lawyer — the person others turned
                    to when they faced their toughest challenges. He built a
                    reputation for solving complex problems and guiding people
                    through their hardest moments. Yet when it came to his own
                    son&apos;s struggle with substance use, he couldn&apos;t fix
                    it. And like so many others, he carried that weight in silence.
                  </p>
                  <p>
                    After losing Sam, Frank made a choice that most people in his
                    situation never make — he spoke publicly about what his family
                    had been going through. Not to draw attention to himself, but
                    because he believed that if his story resonated with even a
                    few people, the silence was the real problem.
                  </p>
                  <p>
                    It resonated with hundreds of thousands. Sam&apos;s OATH grew
                    out of that moment — Frank&apos;s way of turning what he
                    learned into a framework that helps anyone move from isolation
                    to community. He wrote 15 original songs, built this
                    movement, and now works to bring the OATH into workplaces,
                    schools, and communities across the country.
                  </p>
                  <p>
                    His message is simple: you don&apos;t have to do this alone,
                    and you don&apos;t have to be silent anymore.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">
                      Frank Sheeder
                    </h3>
                    <p className="text-teal font-medium text-center text-sm mb-3">
                      Founder &amp; Executive Director
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed text-center">
                      Lawyer, advocate, songwriter, and father. Frank turned a
                      personal loss into a national movement to end the silence
                      around substance use and mental health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ===== THE VISION ===== */}
      <section id="vision">
        <SectionWrapper variant="gradient">
          <div className="text-center text-white mb-12">
            <h2 className="text-white mb-4">Where This Is Going</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Sam&apos;s OATH isn&apos;t a support group or a counseling service
              — it&apos;s a national movement to change how people experience
              substance use and mental health challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: "A Pin in Every Community",
                description:
                  "A national map where every pin proves another person chose community over isolation.",
              },
              {
                icon: Briefcase,
                title: "The OATH in Every Workplace",
                description:
                  "Programs that give employees permission to be honest about what they're going through.",
              },
              {
                icon: Sparkles,
                title: "Compassion Instead of Judgment",
                description:
                  "A world where people facing substance use and mental health challenges are met with support instead of stigma.",
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
      </section>

      {/* ===== GET INVOLVED CTA ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Ready to Be Part of This?</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Every person who takes the OATH makes it easier for the next one.
            You don&apos;t need a platform or a title. You just need sixty
            seconds and the willingness to stop carrying this alone.
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
