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
  Handshake,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "About Sam's OATH | A Family's Mission to End Stigma",
  description:
    "Sam's OATH began as one family's pain and became a national movement. Learn how we're uniting families to break the silence around addiction and mental health.",
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
            Millions of families face substance use and mental health challenges
            in silence. Sam&apos;s OATH gives them a framework to move from isolation
            to community — and from shame to strength.
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
                "We share what our families have really been through — the truth, not the polished version.",
            },
            {
              icon: Users,
              letter: "T",
              word: "Togetherness",
              color: "bg-sage text-white",
              description:
                "We stand with others who carry this weight. No family should face this alone.",
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
          <h2 className="mb-4">Explore the Story</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a topic to learn more about the movement, the people behind it,
            and what we&apos;re building.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Sam's Story */}
          <a
            href="#sams-story"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/photos/sam-portrait.jpg"
                alt="Sam Sheeder"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-lg">Sam&apos;s Story</p>
                <p className="text-white/70 text-sm">The person behind the mission</p>
              </div>
            </div>
          </a>

          {/* The Viral Moment */}
          <a
            href="#viral-moment"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48 overflow-hidden bg-primary-50 flex items-center justify-center">
              <div className="text-center px-6">
                <Megaphone className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-gray-900 font-semibold text-lg">The Post That Sparked a Movement</p>
                <p className="text-gray-500 text-sm mt-1">345K+ people reached on LinkedIn</p>
              </div>
            </div>
          </a>

          {/* A Father-Son Bond */}
          <a
            href="#father-son"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/images/photos/frank-sam-boat.jpg"
                alt="Frank and Sam Sheeder"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-lg">A Father-Son Bond</p>
                <p className="text-white/70 text-sm">In Sam&apos;s own words</p>
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

          {/* Frank's Journey */}
          <a
            href="#franks-journey"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48 overflow-hidden bg-teal-50 flex items-center justify-center">
              <div className="text-center px-6">
                <Heart className="w-10 h-10 text-teal mx-auto mb-3" />
                <p className="text-gray-900 font-semibold text-lg">From Silence to Advocacy</p>
                <p className="text-gray-500 text-sm mt-1">Frank&apos;s journey from grief to purpose</p>
              </div>
            </div>
          </a>
        </div>
      </SectionWrapper>

      {/* ===== FAMILY PERSPECTIVES CARDS ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-10">
          <h2 className="mb-4">The Family Behind the Movement</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Substance use didn&apos;t happen to just one person in this family.
            Each member carries their own story. Click to hear their perspective.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Frank",
              role: "A Father",
              image: "/images/photos/frank-headshot.jpg",
              icon: Heart,
              color: "bg-primary-50 text-primary border-primary/20",
              quote: "I stayed silent for years. After losing Sam, I chose a different path.",
            },
            {
              name: "Annie",
              role: "A Sister",
              image: "/images/photos/sam-annie-smile-1.jpg",
              icon: HandHeart,
              color: "bg-teal-50 text-teal border-teal/20",
              quote: "Siblings see things parents don't. Our grief deserves to be heard too.",
            },
            {
              name: "Joey",
              role: "A Brother",
              image: "/images/photos/sam-joey-reading.jpg",
              icon: Users,
              color: "bg-sage-50 text-sage border-sage/20",
              quote: "The everyday stuff — reading, riding, boating — turns out to be everything.",
            },
            {
              name: "Nancy",
              role: "A Stepmother",
              image: "/images/photos/frank-nancy-sunset.jpg",
              icon: HeartHandshake,
              color: "bg-orange-50 text-orange border-orange/20",
              quote: "She chose Sam. She chose this family. She never wavered.",
            },
            {
              name: "Rony",
              role: "Chosen Family",
              image: "/images/photos/sam-rony.jpg",
              icon: Handshake,
              color: "bg-primary-50 text-primary border-primary/20",
              quote: "The bonds we choose can be just as deep as the ones we're born into.",
            },
          ].map((member) => (
            <Link
              key={member.name}
              href="/families"
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all text-center"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
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
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/families"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
          >
            Read their full stories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ===== SAM'S STORY (detail) ===== */}
      <section id="sams-story">
        <SectionWrapper variant="white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
                The Person Behind the Mission
              </p>
              <h2 className="mb-4">Sam&apos;s Story</h2>
              <p className="text-sm text-gray-400 font-medium mb-6">
                Samuel Martin Hagood Sheeder &middot; July 11, 1998 – September 28, 2025
              </p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Sam&apos;s presence lit up every room. He was handsome, full of
                  adventure and wanderlust, and his brilliance shone in both mind and
                  spirit. He could strike up a conversation with anyone — from CEOs
                  to those experiencing homelessness — making them feel seen and heard.
                </p>
                <p>
                  Music was a thread that ran through Sam&apos;s life. He was
                  fearless and had a need for speed — running, biking, skateboarding,
                  boating, riding anything with a motor. He loved connecting with
                  nature. He once drove from Florida to Georgia to help a friend and
                  ended up in Annapolis months later — after turning left to
                  California and back, camping the whole way.
                </p>
                <p>
                  Sam faced the hard and often lonely road of substance use disorder
                  with courage and honesty. He never shied away from the truth of his
                  journey, even when the world&apos;s judgment made it harder to seek
                  help or healing. He refused to let stigma define him.
                </p>
                <p>
                  His family — his father Frank, his stepmother Nancy, his sister
                  Annie, his brother Joey, and his chosen brother Rony — loved him
                  unconditionally. But they never spoke openly about how Sam&apos;s
                  struggles affected <em>them</em>. They carried that weight in
                  silence. Sam reminded them daily that it&apos;s ok not to be ok.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/photos/sam-portrait.jpg"
                  alt="Sam Sheeder"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/photos/family-hug.jpg"
                    alt="Annie, Frank, and Sam Sheeder"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/photos/family-beach-sunset.jpg"
                    alt="The Sheeder family at the beach"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ===== THE VIRAL MOMENT ===== */}
      <section id="viral-moment">
        <SectionWrapper variant="light">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
                The Moment Everything Changed
              </p>
              <h2 className="mb-4">The Post That Started a Movement</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto lg:mx-0 w-full">
                <Image
                  src="/images/photos/frank-linkedin-post.png"
                  alt="Frank Sheeder's viral LinkedIn post about Sam that reached 345,000 people"
                  width={600}
                  height={900}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    After losing Sam, Frank did something most parents in his situation
                    never do — he told the truth publicly. In one raw, unfiltered
                    LinkedIn post, he told the world what his family had been carrying
                    in silence for years.
                  </p>
                  <p>
                    The response was staggering. Parents, siblings, spouses, and
                    friends who had been carrying the same weight in secret all said
                    the same thing:
                  </p>
                  <blockquote className="border-l-4 border-teal pl-6 my-4 italic text-lg text-gray-700">
                    &ldquo;I thought I was the only one.&rdquo;
                  </blockquote>
                  <p>
                    That single moment proved that the silence itself was the crisis.
                    When one person spoke openly, thousands felt permission to do the
                    same.
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

      {/* ===== FATHER-SON BOND ===== */}
      <section id="father-son">
        <SectionWrapper variant="white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
                In Sam&apos;s Own Words
              </p>
              <h2 className="mb-4">A Son&apos;s Love for His Father</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto lg:mx-0 w-full">
                <Image
                  src="/images/photos/sam-instagram-post.png"
                  alt="Sam Sheeder's Instagram post about his father Frank"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Sam posted this about his dad on Instagram — long before anyone
                    knew the struggles that lay ahead. It shows the bond between
                    father and son that would eventually become the foundation for
                    this entire movement.
                  </p>
                  <p>
                    Sam admired his father&apos;s leadership, his problem-solving
                    instincts, and his relentless love for the family. Years later,
                    those words carry a different weight. Frank committed himself to
                    this movement — and Sam&apos;s belief in his father is a reminder
                    that the people we love see the best in us, even when we can&apos;t
                    see it ourselves.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/photos/frank-sam-boat.jpg"
                      alt="Frank and Sam Sheeder"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/photos/frank-sam-concert.jpg"
                      alt="Frank and Sam at a concert"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ===== FRANK'S JOURNEY ===== */}
      <section id="franks-journey">
        <SectionWrapper variant="light">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
                  Frank&apos;s Journey
                </p>
                <h2 className="mb-6">From Silence to Advocacy</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    For years, Frank Sheeder did what most parents in his situation
                    do — he stayed quiet. He loved Sam unconditionally, but he never
                    spoke openly about how Sam&apos;s substance use and mental health
                    struggles affected the family. The silence felt like protection.
                    But silence doesn&apos;t protect. It isolates.
                  </p>
                  <p>
                    After losing Sam, Frank channeled his grief into something
                    powerful. He began writing and speaking openly — not just about
                    Sam, but about the epidemic of silence that surrounds substance
                    use and mental health in America. He wrote 15 original songs
                    under the name &ldquo;Sam&apos;s OATH&rdquo; on Apple Music,
                    each one carrying a piece of the journey from pain to purpose.
                  </p>
                  <p>
                    Today, Frank works to bring the OATH into workplaces, schools,
                    and communities across the country. His message is simple: you
                    don&apos;t have to do this alone, and you don&apos;t have to be
                    silent anymore.
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
                      Father, advocate, songwriter, speaker. A seasoned business
                      leader who turned grief into a national movement.
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/photos/family-couch.jpg"
                      alt="Frank, Annie, and Sam sharing a laugh"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
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
              Sam&apos;s OATH isn&apos;t a support group — it&apos;s a national
              movement to change how families experience substance use and mental
              health.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: "A Pin in Every Community",
                description:
                  "A national map where every pin proves another family chose community over isolation.",
              },
              {
                icon: Briefcase,
                title: "The OATH in Every Workplace",
                description:
                  "Safe Listener Training and corporate programs that give employees permission to be honest.",
              },
              {
                icon: Sparkles,
                title: "Compassion Instead of Judgment",
                description:
                  "A world where families affected by substance use are met with support instead of stigma.",
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
            Every family that takes the OATH makes it easier for the next one.
            You don&apos;t need a platform or a title. You just need sixty
            seconds and the willingness to stop carrying this alone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/take-the-oath"
              className="flex flex-col items-center gap-2 p-6 bg-teal-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <Heart className="w-8 h-8 text-teal" />
              <span className="font-semibold text-gray-900">Take the OATH</span>
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
              <span className="text-sm text-gray-500">Join the team</span>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
