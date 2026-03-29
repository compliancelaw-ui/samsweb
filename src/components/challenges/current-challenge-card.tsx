import Link from "next/link";
import { Users, ArrowRight, Sparkles } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";

const OATH_PILLARS: Record<string, { label: string; bgColor: string; textColor: string }> = {
  openness: { label: "Openness", bgColor: "bg-teal/10", textColor: "text-teal" },
  authenticity: { label: "Authenticity", bgColor: "bg-primary/10", textColor: "text-primary" },
  togetherness: { label: "Togetherness", bgColor: "bg-sage/10", textColor: "text-sage" },
  healing: { label: "Healing", bgColor: "bg-orange/10", textColor: "text-orange" },
};

interface ActiveChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  participant_count: number;
  badge_label: string | null;
}

async function getActiveChallenge(): Promise<ActiveChallenge | null> {
  try {
    const { data } = await supabaseAdmin()
      .from("challenges")
      .select("id, title, description, category, participant_count, badge_label")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    return data as ActiveChallenge | null;
  } catch {
    return null;
  }
}

export async function CurrentChallengeCard() {
  const challenge = await getActiveChallenge();

  if (!challenge) return null;

  const pillar = OATH_PILLARS[challenge.category];

  return (
    <div>
      <div className="text-center mb-8">
        <p className="text-teal font-medium mb-2 uppercase tracking-wide text-sm">
          Monthly Challenge
        </p>
        <h2 className="mb-4">This Month&apos;s Challenge</h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <Link
          href="/challenges"
          className="group block bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-lg transition-all hover:border-teal/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-teal" />
            {pillar && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pillar.bgColor} ${pillar.textColor}`}
              >
                {pillar.label}
              </span>
            )}
            {challenge.badge_label && (
              <span className="text-xs text-gray-400">
                Earn: {challenge.badge_label}
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-teal transition-colors">
            {challenge.title}
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {challenge.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              {challenge.participant_count} participant
              {challenge.participant_count !== 1 ? "s" : ""}
            </span>
            <span className="inline-flex items-center gap-1 text-teal font-semibold text-sm group-hover:gap-2 transition-all">
              Join This Month&apos;s Challenge
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
