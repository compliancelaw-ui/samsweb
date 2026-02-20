import Link from "next/link";
import { ArrowRight, MapPin, FileText, Users, Heart, Music, ChevronRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { IMPACT_STATS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary to-teal min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-black/20" />
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
              Millions of families are struggling with substance use and mental
              health — in silence. You are not alone.
            </p>
            <p className="text-lg text-white/70 mb-10">
              Sam&apos;s OATH is a movement of families choosing openness over
              silence, connection over shame, and healing over hiding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/take-the-oath"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
              >
                Take the OATH
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
            You Shouldn&apos;t Have to Carry This Alone
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            If someone you love is struggling — or if you&apos;ve lost someone
            — you know the weight of silence. The whispered conversations. The
            shame that keeps families from reaching out. The loneliness of
            thinking you&apos;re the only one.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            You&apos;re not. Not even close.
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
            Take the OATH — It Takes 60 Seconds
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
              When Frank Sheeder lost his son Sam to substance use disorder, he
              did something most families don&apos;t — he talked about it.
              Publicly.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              His LinkedIn post about Sam reached over 345,000 people. Nearly
              2,000 reacted. Hundreds left comments sharing their own stories of
              hidden pain. Families from 22 states said the same thing:
            </p>
            <blockquote className="border-l-4 border-teal pl-6 my-8 italic text-lg text-gray-700">
              &ldquo;I thought I was the only one.&rdquo;
            </blockquote>
            <p className="text-gray-600 mb-6 leading-relaxed">
              That post became Sam&apos;s OATH — a movement built on the
              conviction that what&apos;s hidden doesn&apos;t heal, and no
              family should have to struggle in silence.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              Read the full story
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            {/* Photo placeholder - will be replaced with actual photos */}
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary-100 to-teal-100 flex items-center justify-center">
              <div className="text-center text-gray-400 p-8">
                <Heart className="w-16 h-16 mx-auto mb-4 text-primary-300" />
                <p className="text-sm">Photo of Sam</p>
                <p className="text-xs mt-1">
                  We&apos;ll place your photo here
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== IMPACT / SOCIAL PROOF ===== */}
      <SectionWrapper variant="gradient">
        <div className="text-center text-white">
          <h2 className="text-white mb-4">A Movement Growing Every Day</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
            What started as one family&apos;s story has become a national
            community.
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
          <h2 className="mb-4">What Happens When You Take the OATH</h2>
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
            <p className="text-gray-300 mb-6 leading-relaxed">
              One in five employees is affected by substance use or mental
              health challenges. Most suffer in silence because they don&apos;t
              feel safe speaking up at work.
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
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-white/5 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-white/5 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
                  <Users className="w-16 h-16 text-teal-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FINAL CTA ===== */}
      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">You Don&apos;t Have to Be Silent Anymore</h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Whether you&apos;re struggling, grieving, or simply standing in
            support — your voice matters. Take the OATH. Join the movement.
            Help us prove that what&apos;s hidden doesn&apos;t have to stay
            that way.
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
