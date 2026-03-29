/**
 * SamsOath Social Media Content Calendar
 *
 * Weekly themed content schedule for the SamsOath nonprofit.
 * This file is the source of truth for the content calendar.
 * The hub's marketing dashboard reads from its own copy; keep both in sync.
 *
 * IMPORTANT: SamsOath is fully independent (separate nonprofit entity).
 * This calendar is managed here, not in the hub's product calendars.
 */

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ContentType = "image" | "text" | "video" | "story" | "carousel" | "reel";

export interface ContentDaySchedule {
  day: DayOfWeek;
  theme: string;
  tagline: string;
  description: string;
  suggestedTopics: string[];
  contentTypes: ContentType[];
  hashtags: string[];
}

export interface ContentCalendar {
  productKey: string;
  productName: string;
  mission: string;
  coreHashtags: string[];
  schedule: ContentDaySchedule[];
}

// ── Core hashtag library ─────────────────────────────────────────────────────

export const SAMSOATH_HASHTAGS = {
  core: [
    "#SamsOATH",
    "#BreakTheSilence",
    "#SubstanceUseDisorder",
    "#RecoveryIsPossible",
    "#ChooseOpenness",
    "#LanguageMatters",
  ],
  recovery: [
    "#RecoveryIsPossible",
    "#RecoveryStrong",
    "#RecoveryCommunity",
    "#RecoveryWins",
    "#PathToRecovery",
    "#RecoveryJourney",
  ],
  advocacy: [
    "#AdvocacyInAction",
    "#BreakTheSilence",
    "#ChooseOpenness",
    "#SpeakUp",
    "#PolicyChange",
    "#TakeTheOATH",
  ],
  family: [
    "#FamilyRecovery",
    "#CaregiverSupport",
    "#FamilyStrong",
    "#LoveInRecovery",
    "#GriefAndHope",
    "#FamilyHealing",
  ],
  wellness: [
    "#MentalHealth",
    "#WellnessWednesday",
    "#SelfCareMatters",
    "#HealingJourney",
    "#MindBodySpirit",
    "#MentalHealthAwareness",
  ],
  community: [
    "#CommunityStrong",
    "#TogetherWeHeal",
    "#ShareYourStory",
    "#YouAreNotAlone",
    "#SoberCommunity",
    "#StrongerTogether",
  ],
} as const;

// ── Weekly content schedule ──────────────────────────────────────────────────

export const SAMSOATH_CALENDAR: ContentCalendar = {
  productKey: "samsoath",
  productName: "SamsOath",
  mission:
    "Breaking the silence around substance use disorder through advocacy, education, and community.",
  coreHashtags: [...SAMSOATH_HASHTAGS.core],
  schedule: [
    {
      day: "Monday",
      theme: "Movement Monday",
      tagline: "Advocacy actions, calls to action",
      description:
        "Start the week with momentum. Share advocacy actions, policy updates, petitions, or ways the community can take action right now. Encourage followers to do one thing this week to choose openness.",
      suggestedTopics: [
        "Call your representative about [policy]",
        "Sign this petition for treatment funding",
        "Share this post to break the silence",
        "Volunteer opportunities this week",
        "Policy updates affecting SUD treatment",
        "Naloxone access and harm reduction",
        "OATH taker challenge of the week",
      ],
      contentTypes: ["image", "text", "story"],
      hashtags: [
        ...SAMSOATH_HASHTAGS.core.slice(0, 3),
        ...SAMSOATH_HASHTAGS.advocacy.slice(0, 3),
      ],
    },
    {
      day: "Tuesday",
      theme: "Truth Tuesday",
      tagline: "Facts, statistics, myth-busting",
      description:
        "Combat misinformation with facts. Post statistics, debunk myths about substance use disorder, and educate followers on person-first language. Correct common misconceptions with compassion.",
      suggestedTopics: [
        "Myth vs. fact about addiction",
        "Person-first language guide (say 'person with SUD' not 'addict')",
        "Statistics on treatment outcomes",
        "How silence prevents people from seeking help",
        "Brain science of substance use disorder",
        "Comparison: SUD vs. other chronic conditions",
        "Media portrayal vs. reality",
      ],
      contentTypes: ["image", "carousel", "text"],
      hashtags: [
        ...SAMSOATH_HASHTAGS.core.slice(0, 3),
        "#MythBusted",
        "#FactsNotFear",
        "#PersonFirstLanguage",
      ],
    },
    {
      day: "Wednesday",
      theme: "Wellness Wednesday",
      tagline: "Recovery support, self-care, mental health",
      description:
        "Focus on holistic wellness for people in recovery, their families, and supporters. Share self-care practices, mental health resources, and recovery-supportive habits.",
      suggestedTopics: [
        "Self-care practices for people in recovery",
        "Mental health check-in prompts",
        "Meditation or mindfulness exercises",
        "Healthy coping strategies",
        "Therapy and counseling resources",
        "Exercise and recovery connection",
        "Nutrition and wellness in recovery",
      ],
      contentTypes: ["image", "video", "story", "reel"],
      hashtags: [
        ...SAMSOATH_HASHTAGS.core.slice(0, 2),
        ...SAMSOATH_HASHTAGS.wellness.slice(0, 4),
      ],
    },
    {
      day: "Thursday",
      theme: "Throwback Thursday",
      tagline: "Sam's story, family memories, milestones",
      description:
        "Share Sam's story, family memories, and personal milestones that drive the mission. Humanize the cause. Show the person behind the statistics. Celebrate recovery milestones from the community.",
      suggestedTopics: [
        "Sam's story and legacy",
        "Family photos and memories",
        "Why this movement is personal",
        "Community member milestones",
        "Anniversary reflections",
        "Letters to loved ones",
        "Before and after: the power of recovery",
      ],
      contentTypes: ["image", "video", "story", "text"],
      hashtags: [
        ...SAMSOATH_HASHTAGS.core.slice(0, 2),
        "#ThrowbackThursday",
        "#TBT",
        "#RememberingSam",
        "#WhyWeFight",
      ],
    },
    {
      day: "Friday",
      theme: "Family Friday",
      tagline: "Family support resources, caregiver tips",
      description:
        "Dedicated to families affected by substance use disorder. Share resources for family members, caregiver tips, boundary-setting guidance, and support group information. Families need support too.",
      suggestedTopics: [
        "Al-Anon and family support groups",
        "Setting healthy boundaries",
        "How to talk to a loved one about treatment",
        "Self-care for family caregivers",
        "Books and resources for families",
        "Family therapy options",
        "Navigating the holiday season as a family",
      ],
      contentTypes: ["image", "text", "carousel"],
      hashtags: [
        ...SAMSOATH_HASHTAGS.core.slice(0, 2),
        ...SAMSOATH_HASHTAGS.family.slice(0, 4),
      ],
    },
    {
      day: "Saturday",
      theme: "Share Saturday",
      tagline: "OATH taker spotlights, community stories",
      description:
        "Amplify community voices. Feature OATH takers, share community stories, and spotlight people making a difference. User-generated content day. Encourage sharing with a specific prompt.",
      suggestedTopics: [
        "OATH taker spotlight interview",
        "Community member recovery story",
        "Volunteer of the month",
        "Partner organization highlight",
        "Share your 'why' prompt",
        "Recovery community event recap",
        "Repost community member content",
      ],
      contentTypes: ["image", "video", "story", "carousel"],
      hashtags: [
        ...SAMSOATH_HASHTAGS.core.slice(0, 2),
        ...SAMSOATH_HASHTAGS.community.slice(0, 4),
      ],
    },
    {
      day: "Sunday",
      theme: "Strength Sunday",
      tagline: "Hope, recovery wins, inspirational content",
      description:
        "End the week with hope. Share inspirational quotes, recovery wins, messages of strength, and reasons to keep going. Positive, uplifting content to carry into the new week.",
      suggestedTopics: [
        "Recovery win of the week",
        "Inspirational quote with personal reflection",
        "Message of hope to someone struggling",
        "Gratitude practice prompt",
        "Celebrating small victories",
        "Looking ahead with hope",
        "Community affirmation post",
      ],
      contentTypes: ["image", "text", "story"],
      hashtags: [
        ...SAMSOATH_HASHTAGS.core.slice(0, 2),
        ...SAMSOATH_HASHTAGS.recovery.slice(0, 3),
        "#StrengthSunday",
        "#HopeHeals",
      ],
    },
  ],
};

// ── Helper functions ─────────────────────────────────────────────────────────

/** Get today's content theme */
export function getTodayTheme(): ContentDaySchedule {
  const days: DayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = days[new Date().getDay()];
  return SAMSOATH_CALENDAR.schedule.find((d) => d.day === today)!;
}

/** Get all hashtags for a given day (core + day-specific, deduplicated) */
export function getHashtagsForDay(day: DayOfWeek): string[] {
  const daySchedule = SAMSOATH_CALENDAR.schedule.find((d) => d.day === day);
  if (!daySchedule) return [...SAMSOATH_HASHTAGS.core];
  const all = [...SAMSOATH_CALENDAR.coreHashtags, ...daySchedule.hashtags];
  return Array.from(new Set(all));
}

/** Get a random topic suggestion for a given day */
export function getRandomTopic(day: DayOfWeek): string | null {
  const daySchedule = SAMSOATH_CALENDAR.schedule.find((d) => d.day === day);
  if (!daySchedule || daySchedule.suggestedTopics.length === 0) return null;
  const idx = Math.floor(Math.random() * daySchedule.suggestedTopics.length);
  return daySchedule.suggestedTopics[idx];
}
