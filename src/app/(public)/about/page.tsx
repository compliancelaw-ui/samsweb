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
  Quote,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "About Sam's OATH",
  description:
    "Learn about Sam's OATH — a national movement to break silence around substance use and mental health. Discover the story behind the OATH and the family that started it all.",
};

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
            About Sam&apos;s OATH
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            What&apos;s Hidden Doesn&apos;t Heal
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Sam&apos;s OATH is a national movement empowering families to break
            the silence around substance use and mental health — because no one
            should have to carry this weight alone.
          </p>
        </div>
      </section>

      {/* ===== THE OATH EXPLAINED ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-16">
          <h2 className="mb-4">The OATH Explained</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four letters. Four commitments. A framework for families ready to
            move from silence to strength.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Eye,
              letter: "O",
              word: "Openness",
              color: "bg-teal text-white",
              iconBg: "bg-teal-50",
              iconColor: "text-teal",
              description:
                "We choose to talk about substance use and mental health without shame. Silence protects stigma — openness dismantles it. When we speak honestly, we give others permission to do the same.",
            },
            {
              icon: Fingerprint,
              letter: "A",
              word: "Authenticity",
              color: "bg-primary text-white",
              iconBg: "bg-primary-50",
              iconColor: "text-primary",
              description:
                "We share what our families have really been through — not the polished version, but the truth. Authenticity builds trust, and trust builds community. Your real story is your most powerful tool.",
            },
            {
              icon: Users,
              letter: "T",
              word: "Togetherness",
              color: "bg-sage text-white",
              iconBg: "bg-sage-50",
              iconColor: "text-sage",
              description:
                "We stand with others who carry this weight. No family should face substance use disorder or mental illness alone. Together, we are stronger than any stigma, and louder than any silence.",
            },
            {
              icon: HeartHandshake,
              letter: "H",
              word: "Healing",
              color: "bg-orange text-white",
              iconBg: "bg-orange-50",
              iconColor: "text-orange",
              description:
                "We commit to healing — not perfection. Healing is messy, nonlinear, and deeply personal. But it starts when we stop hiding. We choose healing for ourselves, our families, and our communities.",
            },
          ].map((item) => (
            <div
              key={item.letter}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center border border-gray-100"
            >
              <div
                className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}
              >
                {item.letter}
              </div>
              <div
                className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}
              >
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.word}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== SAM'S STORY ===== */}
      <SectionWrapper variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
              The Story Behind the Movement
            </p>
            <h2 className="mb-6">Sam&apos;s Story</h2>
            <p className="text-sm text-gray-400 font-medium mb-6">
              Samuel Martin Hagood Sheeder &middot; July 11, 1998 – September 28, 2025
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Sam&apos;s presence lit up every room. He was handsome, full of
              adventure and wanderlust, and his brilliance shone in both mind and
              spirit. He could strike up a conversation with anyone — from CEOs
              to those experiencing homelessness — making them feel seen and heard.
              He was a natural debater with wit, charm, and perspective. He could
              rig up or fix anything. He was also stubborn, headstrong, and
              determined to do things his way. Those qualities were his greatest
              strength and his biggest challenge.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Music was a thread that ran through Sam&apos;s life. He was
              fearless and had a need for speed — running, biking, skateboarding,
              boating, riding anything with a motor. He loved connecting with
              nature. He once drove from Florida to Georgia to help a friend and
              ended up in Annapolis months later — after turning left to
              California and back, camping the whole way. Sam never went in
              straight lines, and he reminds us that the joy is in the journey.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Sam faced the hard and often lonely road of substance use disorder
              with courage and honesty. He never shied away from the truth of his
              journey, even when the world&apos;s judgment made it harder to seek
              help or healing. To speak openly of addiction is rare — to do so
              with the generosity of spirit Sam showed is extraordinary. He
              refused to let stigma define him.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              His family — his father Frank, his stepmother Nancy, his sister
              Annie, his brother Joey, and his chosen brother Rony — loved him
              unconditionally. But they never spoke openly about how Sam&apos;s
              struggles affected <em>them</em>. They carried that weight in
              silence. Sam reminded them daily that it&apos;s ok not to be ok,
              and that joy can be found even on winding roads.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              When Sam passed away on September 28, 2025, his father Frank made
              a decision that would change everything. Instead of retreating into
              silence, Frank wrote openly on LinkedIn about Sam&apos;s life, his
              struggles, and offered help to anyone carrying the same weight.
              That post reached over 345,000 people. Nearly 2,000 reactions.
              484 comments. All saying the same thing:
            </p>
            <blockquote className="border-l-4 border-teal pl-6 my-8 italic text-lg text-gray-700">
              &ldquo;I thought I was the only one.&rdquo;
            </blockquote>
            <p className="text-gray-600 leading-relaxed">
              Frank realized the silence itself was the crisis. Sam&apos;s OATH
              was born from that revelation — a movement built on the belief that
              what&apos;s hidden doesn&apos;t heal, and that the opposite of
              addiction is not sobriety, but community.
            </p>
          </div>
          <div className="space-y-6">
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

      {/* ===== THE VIRAL MOMENT — LINKEDIN POST ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
              The Moment Everything Changed
            </p>
            <h2 className="mb-4">The Post That Started a Movement</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Frank had never shared personal matters on LinkedIn. But on this day, he felt called to.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto lg:mx-0 w-full">
              <Image
                src="/images/photos/frank-linkedin-post.png"
                alt="Frank Sheeder's viral LinkedIn post about Sam that reached 345,000 people"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="relative bg-gray-50 rounded-2xl p-8 md:p-10">
                <Quote className="w-10 h-10 text-primary-200 mb-4" />
                <blockquote className="text-gray-700 text-lg leading-relaxed italic">
                  <p className="mb-4">
                    &ldquo;Sam lived with courage, honesty, and an open heart. He
                    faced life&apos;s challenges — including substance use disorder —
                    with a strength and candor that taught us the opposite of
                    addiction is not sobriety, but community.
                  </p>
                  <p className="mb-4">
                    He reminded us daily that it&apos;s ok not to be ok, and that
                    joy can be found even on winding roads.
                  </p>
                  <p>
                    For anyone facing these struggles, know that you are seen and
                    supported. My heart is with you, and I am always open to
                    listen with compassion and without judgment.&rdquo;
                  </p>
                </blockquote>
                <p className="mt-6 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  — Frank Sheeder, LinkedIn
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
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

      {/* ===== THE BOND — SAM'S INSTAGRAM POST ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
              In Sam&apos;s Own Words
            </p>
            <h2 className="mb-4">A Son&apos;s Love for His Father</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto lg:mx-0 w-full">
              <Image
                src="/images/photos/sam-instagram-post.png"
                alt="Sam Sheeder's Instagram post about his father Frank"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="relative bg-gray-50 rounded-2xl p-8 md:p-10">
                <Quote className="w-10 h-10 text-primary-200 mb-4" />
                <blockquote className="text-gray-700 text-lg leading-relaxed italic">
                  <p className="mb-4">
                    &ldquo;This is my dad, Frank. He is the coolest guy I (and
                    probably you) know. Dad, thank you for showing me by example
                    that I can achieve whatever I commit myself to.
                  </p>
                  <p className="mb-4">
                    Your leadership, support and love for our family has provided
                    so many &lsquo;once in a lifetime&rsquo; moments and
                    memories that we hold dear to our hearts. I admire your
                    ability to solve any problem and your passion for learning
                    new things.
                  </p>
                  <p>
                    You inspire me to be a better version of
                    myself.&rdquo;
                  </p>
                </blockquote>
                <p className="mt-6 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  — Sam Sheeder, Instagram
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
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

      {/* ===== FROM SILENCE TO ADVOCACY ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-2 uppercase tracking-wide text-sm">
              Frank&apos;s Journey
            </p>
            <h2 className="mb-4">From Silence to Advocacy</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-6 text-gray-600 leading-relaxed">
              <p>
                For years, Frank Sheeder did what most parents in his situation
                do — he stayed quiet. He loved Sam unconditionally, but he never
                spoke openly about how Sam&apos;s substance use and mental health
                struggles affected the family. They went through it in silence,
                shame, guilt, and distress.
              </p>
              <p>
                Frank had a good workplace with a strong culture — but even
                there, he didn&apos;t feel he could share what his family was
                going through. The silence felt like protection. But silence
                doesn&apos;t protect. It isolates. It convinces you that
                you&apos;re the only family going through this, that you&apos;ve
                failed in some unique way. It keeps you from finding the very
                people who understand what you&apos;re carrying.
              </p>
              <p>
                After losing Sam on September 28, 2025, Frank channeled his
                grief into something powerful. He wrote openly on LinkedIn — and
                the post went viral, reaching more than 345,000 people. Nearly
                2,000 reactions. 484 comments. People flooded him with messages,
                all saying the same thing: &ldquo;I thought I was the
                only one.&rdquo;
              </p>
              <p>
                That moment of recognition changed everything. Frank realized
                this wasn&apos;t about starting a support group. This was a
                movement. He began writing and speaking openly — not just about
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
            <div className="lg:col-span-2 space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/photos/family-couch.jpg"
                  alt="Frank, Annie, and Sam sharing a laugh"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== THE VISION ===== */}
      <SectionWrapper variant="gradient">
        <div className="text-center text-white mb-16">
          <h2 className="text-white mb-4">The Vision</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            This is a movement, not a support group — and here is where
            it&apos;s headed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Globe,
              title: "National Scale",
              description:
                "We envision a map filled with pins from every state — proof that millions of families are choosing openness over silence. Every pin represents a family that refused to hide.",
            },
            {
              icon: Megaphone,
              title: "Breaking Silence Everywhere",
              description:
                "From living rooms to boardrooms, from schools to state legislatures — we're bringing the conversation about substance use and mental health out of the shadows and into the open.",
            },
            {
              icon: Sparkles,
              title: "A Culture Shift",
              description:
                "We're working toward a world where families affected by substance use and mental health challenges are met with compassion instead of judgment, and support instead of stigma.",
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

      {/* ===== THE TEAM ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-16">
          <h2 className="mb-4">The People Behind the Movement</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sam&apos;s OATH is built by people who know this pain firsthand —
            and who believe no family should face it alone.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Frank's bio */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/images/photos/frank-headshot.jpg"
                    alt="Frank Sheeder, Founder of Sam's OATH"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                  Frank Sheeder
                </h3>
                <p className="text-teal font-medium mb-4">
                  Founder &amp; Executive Director
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Frank is a father, advocate, songwriter, and speaker. After
                  losing his son Sam to substance use disorder, he turned his
                  grief into a national movement. A seasoned business leader,
                  Frank brings decades of experience in building organizations
                  and rallying communities around a shared mission.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  He is the songwriter behind all 15 tracks on the Sam&apos;s
                  OATH album on Apple Music, and a passionate advocate for
                  bringing mental health conversations into the workplace.
                </p>
              </div>
            </div>
          </div>

          {/* Future team placeholder */}
          <div className="text-center bg-gray-50 rounded-2xl p-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Growing the Team
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-6">
              As Sam&apos;s OATH grows, so will our team. We&apos;re building a
              network of advocates, counselors, and community leaders who share
              our vision of a world without silence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              Interested in joining us?
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FINAL CTA ===== */}
      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Be Part of the Movement</h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            You don&apos;t need a title or a platform to make a difference. All
            you need is the willingness to stop hiding. Take the OATH and join
            thousands of families choosing openness over silence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-600 transition-colors"
            >
              Take the OATH
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/share-your-story"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-50 transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
