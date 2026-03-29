import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { ChallengeJoinForm } from "@/components/challenges/challenge-join-form";
import { Users, Calendar, ArrowRight, Sparkles, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Monthly Challenges | Sam's OATH",
  description:
    "Join our monthly challenges and walk the OATH journey: Openness, Authenticity, Togetherness, Healing. Each month brings a new way to break the silence.",
  alternates: { canonical: "/challenges" },
};

const OATH_PILLARS: Record<string, { label: string; color: string; bgColor: string; textColor: string }> = {
  openness: { label: "Openness", color: "#3EABA8", bgColor: "bg-teal/10", textColor: "text-teal" },
  authenticity: { label: "Authenticity", color: "#4A6FA5", bgColor: "bg-primary/10", textColor: "text-primary" },
  togetherness: { label: "Togetherness", color: "#7AB87A", bgColor: "bg-sage/10", textColor: "text-sage" },
  healing: { label: "Healing", color: "#E8956F", bgColor: "bg-orange/10", textColor: "text-orange" },
};

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface Challenge {
  id: string;
  title: string;
  slug: string;
  description: string;
  challenge_text: string;
  month: number;
  year: number;
  category: string;
  badge_label: string | null;
  badge_color: string;
  is_active: boolean;
  participant_count: number;
}

async function getChallenges() {
  try {
    const db = supabaseAdmin();

    const { data: active } = await db
      .from("challenges")
      .select("*")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    const { data: past } = await db
      .from("challenges")
      .select("*")
      .eq("is_active", false)
      .order("year", { ascending: false })
      .order("month", { ascending: false })
      .limit(6);

    return {
      active: active as Challenge | null,
      past: (past as Challenge[]) || [],
    };
  } catch {
    return { active: null, past: [] };
  }
}

export default async function ChallengesPage() {
  const { active, past } = await getChallenges();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal via-primary to-teal-700 py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-5" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-teal-200 text-sm font-medium mb-4 uppercase tracking-wide">
            Walk the Journey Together
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Monthly Challenges
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Each month, we walk one step of Sam&apos;s OATH together.{" "}
            <span className="font-semibold text-white">O</span>penness leads to{" "}
            <span className="font-semibold text-white">A</span>uthenticity, which builds{" "}
            <span className="font-semibold text-white">T</span>ogetherness, and together we find{" "}
            <span className="font-semibold text-white">H</span>ealing.
          </p>
        </div>
      </section>

      {/* Current Challenge */}
      {active ? (
        <SectionWrapper variant="white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
                This Month&apos;s Challenge
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {active.title}
              </h2>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {MONTH_NAMES[active.month]} {active.year}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {active.participant_count} participant{active.participant_count !== 1 ? "s" : ""}
                </span>
                {active.category && OATH_PILLARS[active.category] && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${OATH_PILLARS[active.category].bgColor} ${OATH_PILLARS[active.category].textColor}`}
                  >
                    {OATH_PILLARS[active.category].label}
                  </span>
                )}
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed text-center mb-8">
              {active.description}
            </p>

            {/* Challenge callout box */}
            <div className="bg-[#F0F4F8] rounded-xl border-l-4 border-teal p-6 md:p-8 mb-8">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-2">The Challenge</p>
                  <p className="text-gray-700 leading-relaxed">{active.challenge_text}</p>
                </div>
              </div>
            </div>

            {/* Badge preview */}
            {active.badge_label && (
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: active.badge_color || "#3EABA8" }}
                >
                  <Sparkles className="w-4 h-4" />
                  Earn: {active.badge_label}
                </div>
              </div>
            )}

            {/* Join form (client component) */}
            <ChallengeJoinForm
              challengeId={active.id}
              participantCount={active.participant_count}
            />
          </div>
        </SectionWrapper>
      ) : (
        <SectionWrapper variant="white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-4">No Active Challenge Right Now</h2>
            <p className="text-gray-600 text-lg mb-6">
              Check back soon for our next monthly challenge. In the meantime,
              you can take Sam&apos;s OATH and join the movement.
            </p>
            <Link
              href="/take-the-oath"
              className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Take Sam&apos;s OATH
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </SectionWrapper>
      )}

      {/* How It Works */}
      <SectionWrapper variant="light">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Three simple steps. No pressure, no judgment, just community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: "1",
              icon: <ArrowRight className="w-6 h-6" />,
              title: "Accept",
              description:
                "Click the button above to accept this month's challenge. Add your name or stay anonymous.",
            },
            {
              step: "2",
              icon: <MessageCircle className="w-6 h-6" />,
              title: "Do It",
              description:
                "Complete the challenge at your own pace. There's no deadline, no checklist, just one meaningful action.",
            },
            {
              step: "3",
              icon: <Share2 className="w-6 h-6" />,
              title: "Share",
              description:
                "Tell someone about it. Share on social media, text a friend, or just sit with the feeling of having done something real.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <div className="w-12 h-12 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Past Challenges */}
      {past.length > 0 && (
        <SectionWrapper variant="white">
          <div className="text-center mb-10">
            <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
              The Journey So Far
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Past Challenges
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {past.map((challenge) => {
              const pillar = OATH_PILLARS[challenge.category];
              return (
                <div
                  key={challenge.id}
                  className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {MONTH_NAMES[challenge.month]} {challenge.year}
                    </span>
                    {pillar && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${pillar.bgColor} ${pillar.textColor}`}
                      >
                        {pillar.label}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {challenge.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400 pt-3 border-t border-gray-100">
                    <Users className="w-3.5 h-3.5" />
                    {challenge.participant_count} participant
                    {challenge.participant_count !== 1 ? "s" : ""}
                    {challenge.badge_label && (
                      <>
                        <span className="mx-1">&middot;</span>
                        <Sparkles className="w-3.5 h-3.5" />
                        {challenge.badge_label}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionWrapper>
      )}

      {/* Bottom CTA */}
      <SectionWrapper variant="gradient">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-white text-3xl font-bold mb-4">
            Ready to Start the Journey?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Every challenge is one step closer to healing. Take Sam&apos;s OATH and
            become part of a community that chooses openness over silence.
          </p>
          <Link
            href="/take-the-oath"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-all hover:shadow-xl"
          >
            Take Sam&apos;s OATH
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
