import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  FileText,
  Users,
  Heart,
  Music,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { IMPACT_STATS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal min-h-[90vh] flex items-center overflow-hidden">
        {/* Photo overlay behind gradient */}
        <div className="absolute inset-0">
          <Image
            src="/images/photos/family-hug.jpg"
            alt="Frank Sheeder with his children Annie and Sam"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/85 via-primary/80 to-teal/75" />
        </div>
        <div className="relative z-10 container-wide text-white">
          <div className="max-w-3xl">
            <p className="text-teal-200 text-lg font-medium mb-4 tracking-wide uppercase">
              A National Movement
            </p>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              What&apos;s Hidden
              <br />
              Doesn&apos;t Heal
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed max-w-2xl">
              Millions of families are struggling with a loved one&apos;s
              substance use and mental health challenges — in silence, shame,
              and isolation. You are not alone.
            </p>
            <p className="text-lg text-white/70 mb-10">
              Sam&apos;s OATH is a movement encouraging families to be open and
              authentic about how these struggles affect them — so they can heal
              together and never feel alone again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/take-the-oath"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
              >
                Take Sam&apos;s OATH
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
        </div>
      </section>

      {/* ===== THE PROBLEM: SILENCE ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">
            So Many People Are Suffering in Silence
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            When someone you love is struggling with substance use or mental
            health, the weight doesn&apos;t just fall on them — it falls on
            the entire family. The guilt. The shame. The whispered
            conversations. The loneliness of going through it without ever
            speaking openly about how it&apos;s affecting{" "}
            <em>you</em>.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Families love and support unconditionally, but they rarely talk
            about what they&apos;re going through themselves. So they carry
            it in silence — and what&apos;s hidden doesn&apos;t heal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">1 in 5</p>
              <p className="text-gray-500">
                American families are affected by substance use disorder
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-teal mb-2">46M</p>
              <p className="text-gray-500">
                adults experience mental illness each year
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">90%</p>
              <p className="text-gray-500">
                of families never talk about it openly
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== THE OATH: THE SOLUTION ===== */}
      <SectionWrapper variant="light" id="what-is-oath">
        <div className="text-center mb-16">
          <h2 className="mb-4">The OATH</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four commitments. Sixty seconds. A lifetime of change.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              letter: "O",
              word: "Openness",
              description:
                "I will talk about substance use and mental health without shame.",
              color: "bg-teal text-white",
            },
            {
              letter: "A",
              word: "Authenticity",
              description:
                "I will be honest about what my family has been through.",
              color: "bg-primary text-white",
            },
            {
              letter: "T",
              word: "Togetherness",
              description:
                "I will stand with others who are carrying this weight.",
              color: "bg-sage text-white",
            },
            {
              letter: "H",
              word: "Healing",
              description:
                "I will choose healing — for myself and for my community.",
              color: "bg-orange text-white",
            },
          ].map((item) => (
            <div
              key={item.letter}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center"
            >
              <div
                className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}
              >
                {item.letter}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.word}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/take-the-oath"
            className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-teal-600 transition-colors"
          >
            Take Sam&apos;s OATH — It Takes 60 Seconds
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ===== THE ORIGIN STORY ===== */}
      <SectionWrapper variant="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
              How This Started
            </p>
            <h2 className="mb-6">
              One Father. One Post. A Movement.
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Sam Sheeder (1998–2025) lit up every room he walked into. He was
              full of adventure and wanderlust — fearless on a skateboard,
              brilliant in conversation, and stubborn enough to drive from
              Florida to California and back just because he turned left. Sam
              never went in straight lines. He reminds us that the joy is in
              the journey.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Sam also faced the hard and often lonely road of substance use
              disorder — with courage and honesty. He taught his family something
              profound: the opposite of addiction is not sobriety, but community.
              They loved him unconditionally, but they never spoke openly about
              how his struggles were affecting <em>them</em>. So they carried it
              in silence.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              After losing Sam on September 28, 2025, his father Frank did
              something most families don&apos;t — he wrote openly on LinkedIn
              about Sam&apos;s life, his struggles, and offered help to anyone
              carrying the same weight. That post reached over 345,000 people.
              Nearly 2,000 reactions. 484 comments — all saying the same thing:
            </p>
            <blockquote className="border-l-4 border-teal pl-6 my-8 italic text-lg text-gray-700">
              &ldquo;I thought I was the only one.&rdquo;
            </blockquote>
            <p className="text-gray-600 mb-6 leading-relaxed">
              That response made Frank realize the silence itself was the
              crisis. He started Sam&apos;s OATH — a movement to encourage
              families to be open and authentic about how a loved one&apos;s
              substance use and mental health challenges affect them, so they
              can heal together and never feel alone.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              Read the full story
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative space-y-6">
            {/* Sam portrait */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/photos/sam-portrait.jpg"
                alt="Sam Sheeder"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Overlapping family photo */}
            <div className="rounded-xl overflow-hidden shadow-lg -mt-20 ml-8 mr-[-1rem] lg:ml-16 lg:mr-[-2rem] border-4 border-white">
              <Image
                src="/images/photos/family-couch.jpg"
                alt="The Sheeder family sharing a laugh"
                width={800}
                height={600}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== IMPACT / SOCIAL PROOF ===== */}
      <SectionWrapper variant="gradient">
        <div className="text-center text-white">
          <h2 className="text-white mb-4">A Movement Growing Every Day</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
            What started as one father&apos;s post about his son became a
            national community of families choosing openness over silence.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">
                {IMPACT_STATS.reached}
              </p>
              <p className="text-white/70">People Reached</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">
                {IMPACT_STATS.reactions}
              </p>
              <p className="text-white/70">Reactions</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">
                {IMPACT_STATS.comments}
              </p>
              <p className="text-white/70">Stories Shared</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">
                {IMPACT_STATS.states}
              </p>
              <p className="text-white/70">States</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== WHAT HAPPENS WHEN YOU TAKE THE OATH ===== */}
      <SectionWrapper variant="white">
        <div className="text-center mb-16">
          <h2 className="mb-4">What Happens When You Take Sam&apos;s OATH</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            It takes 60 seconds. Here&apos;s what you get.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: MapPin,
              title: "Your Pin on the Map",
              description:
                "A color-coded pin appears on our national map — proof that you're not alone.",
            },
            {
              icon: FileText,
              title: "A Personalized Certificate",
              description:
                "Download your OATH certificate to keep or share with your family.",
            },
            {
              icon: Users,
              title: "A Social Badge",
              description:
                "Share on LinkedIn, Instagram, or Facebook to inspire others.",
            },
            {
              icon: Heart,
              title: "A Community",
              description:
                "Join thousands of families who chose openness over silence.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-teal" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== MAP PREVIEW ===== */}
      <SectionWrapper variant="light">
        <div className="text-center mb-12">
          <h2 className="mb-4">See the Movement</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every pin is a family that chose openness. Every color tells a story.
          </p>
        </div>
        {/* Map placeholder - will be replaced with actual Mapbox component */}
        <div className="aspect-[16/9] max-w-5xl mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center">
          <div className="text-center text-gray-400 p-8">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-teal-300" />
            <p className="text-lg font-medium text-gray-500">
              Interactive Map Coming Soon
            </p>
            <p className="text-sm mt-2">
              Color-coded pins showing OATH takers across the nation
            </p>
            <div className="flex gap-6 justify-center mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal" />
                <span className="text-sm text-gray-500">Struggling</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-gray-500">In Memory</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sage" />
                <span className="text-sm text-gray-500">Supporter</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
          >
            Explore the full map
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ===== MUSIC PREVIEW ===== */}
      <SectionWrapper variant="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-orange font-medium mb-2 uppercase tracking-wide text-sm">
              Original Music
            </p>
            <h2 className="mb-6">Songs for the Journey</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Music has a way of saying what words alone can&apos;t. These
              original songs were written for every family that knows the weight
              of silence — and the relief of finally being heard.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              From &ldquo;What&apos;s Hidden Doesn&apos;t Heal&rdquo; to
              &ldquo;Joy Anyway,&rdquo; each track carries a piece of this
              movement&apos;s heart.
            </p>
            <Link
              href="/music"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              <Music className="w-5 h-5" />
              Listen to all 15 tracks
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-orange-50 rounded-2xl p-8">
            <div className="space-y-4">
              {[
                "What's Hidden Doesn't Heal",
                "Joy Anyway",
                "If Love Could Have Saved You",
                "Near to the Broken",
                "Healing is a Slow Song",
              ].map((title, i) => (
                <div
                  key={title}
                  className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary font-semibold text-sm">
                    {i + 1}
                  </div>
                  <p className="font-medium text-gray-800">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== WORKPLACE CTA ===== */}
      <SectionWrapper variant="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-300 font-medium mb-2 uppercase tracking-wide text-sm">
              For Organizations
            </p>
            <h2 className="text-white mb-6">
              Bring the OATH to Your Workplace
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Frank had a good workplace with a strong culture — and he still
              felt alone. He didn&apos;t feel like he could share what his
              family was going through. That should change. Workplaces should
              be safe places for people dealing with these issues in their
              families.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              One in five employees is affected by substance use or mental
              health challenges in their family. When they can&apos;t speak
              up, it affects productivity, absenteeism, and morale. It also
              causes <strong className="text-white">presenteeism</strong> —
              showing up at work but not really being engaged. The person is
              there physically, but their mind and heart are somewhere else
              entirely.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Safe Listener Training for teams and managers",
                "Workplace OATH certification program",
                "Keynote speaking and workshop facilitation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <div className="w-6 h-6 bg-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-teal rounded-full" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/workplace"
              className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="hidden lg:flex flex-col items-center justify-center gap-6">
            <div className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/photos/frank-headshot.jpg"
                alt="Frank Sheeder, Founder of Sam's OATH"
                fill
                className="object-cover"
                sizes="224px"
              />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-teal-300" />
              </div>
              <div>
                <p className="text-white font-semibold">Frank Sheeder</p>
                <p className="text-gray-400 text-sm">Founder, Sam&apos;s OATH</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FRANK & SAM PHOTO STRIP ===== */}
      <section className="relative bg-primary-50 py-12 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/photos/frank-sam-boat.jpg"
                alt="Frank and Sam Sheeder on a boat"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-4">
                &ldquo;The opposite of addiction is not sobriety, but community.
                Sam reminded us daily that it&apos;s ok not to be ok, and that
                joy can be found even on winding roads.&rdquo;
              </p>
              <p className="text-gray-500 font-medium">
                — Frank Sheeder, Sam&apos;s father
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">You Don&apos;t Have to Be Silent Anymore</h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Whether you&apos;re struggling, grieving, or simply standing in
            support — your voice matters. When Frank shared his story,
            hundreds of people reached out to say they&apos;d been carrying
            the same pain in silence. Take Sam&apos;s OATH. Join the movement. Help
            us prove that what&apos;s hidden doesn&apos;t have to stay that
            way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/take-the-oath"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-600 transition-colors"
            >
              Take Sam&apos;s OATH
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-50 transition-colors"
            >
              Read Stories
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
