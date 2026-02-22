"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Copy,
  RefreshCw,
  Loader2,
  Check,
  Hash,
  Clock,
  CalendarDays,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Platform definitions                                               */
/* ------------------------------------------------------------------ */

type Platform = "linkedin" | "instagram" | "tiktok" | "facebook" | "x";

interface PlatformMeta {
  label: string;
  charLimit: number;
  color: string;
  bg: string;
  activeBg: string;
  icon: React.ReactNode;
  toneHint: string;
}

const PLATFORMS: Record<Platform, PlatformMeta> = {
  linkedin: {
    label: "LinkedIn",
    charLimit: 3000,
    color: "text-[#0A66C2]",
    bg: "bg-[#0A66C2]/5",
    activeBg: "bg-[#0A66C2]/10 border-[#0A66C2]/40",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    toneHint: "Professional, thought-leadership oriented. Use paragraph breaks.",
  },
  instagram: {
    label: "Instagram",
    charLimit: 2200,
    color: "text-[#E1306C]",
    bg: "bg-[#E1306C]/5",
    activeBg: "bg-[#E1306C]/10 border-[#E1306C]/40",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0z" />
      </svg>
    ),
    toneHint: "Conversational, emotionally resonant. Emojis welcome. Hashtags at the end.",
  },
  tiktok: {
    label: "TikTok",
    charLimit: 2200,
    color: "text-gray-900",
    bg: "bg-gray-100",
    activeBg: "bg-gray-200 border-gray-400",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
    toneHint: "Casual, hook-driven, visual storytelling. First line is the hook. Short sentences.",
  },
  facebook: {
    label: "Facebook",
    charLimit: 5000,
    color: "text-[#1877F2]",
    bg: "bg-[#1877F2]/5",
    activeBg: "bg-[#1877F2]/10 border-[#1877F2]/40",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    toneHint: "Community-focused, storytelling style. Can be longer form.",
  },
  x: {
    label: "X (Twitter)",
    charLimit: 280,
    color: "text-gray-900",
    bg: "bg-gray-100",
    activeBg: "bg-gray-200 border-gray-400",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    toneHint: "Punchy, concise, action-oriented. Every character counts.",
  },
};

const PLATFORM_ORDER: Platform[] = ["linkedin", "instagram", "tiktok", "facebook", "x"];

/* ------------------------------------------------------------------ */
/*  Post types                                                         */
/* ------------------------------------------------------------------ */

interface PostType {
  key: string;
  label: string;
  description: string;
  promptTemplate: string;
}

const POST_TYPES: PostType[] = [
  {
    key: "movement",
    label: "Movement Update",
    description: "Recent OATH stats & milestones",
    promptTemplate:
      "Write a post celebrating recent momentum in the Sam's OATH movement. Reference growing numbers of people taking the OATH, the power of community, and encourage others to join. Make it feel like a movement milestone.",
  },
  {
    key: "story",
    label: "Story Spotlight",
    description: "Highlight a community story",
    promptTemplate:
      "Write a post spotlighting a community member's story of breaking silence around substance use or mental health. Make it feel personal and hopeful without naming real individuals. Encourage others to share their story.",
  },
  {
    key: "challenge",
    label: "Challenge Callout",
    description: "Encourage people to take the OATH",
    promptTemplate:
      "Write a challenge post encouraging people to take Sam's OATH at samsoath.org. Make it feel urgent but hopeful. The OATH stands for Openness, Authenticity, Togetherness, and Healing. Challenge readers to take the OATH and tag 3 people.",
  },
  {
    key: "bts",
    label: "Behind the Scenes",
    description: "Personal / founder perspective",
    promptTemplate:
      "Write a behind-the-scenes post from a founder's perspective about building a movement around substance use awareness. Make it personal, vulnerable, and hopeful. Reference the tagline 'What's hidden doesn't heal.'",
  },
];

/* ------------------------------------------------------------------ */
/*  Hashtags                                                           */
/* ------------------------------------------------------------------ */

const SUGGESTED_HASHTAGS = [
  "#SamsOATH",
  "#WhatsHiddenDoesntHeal",
  "#BreakTheSilence",
  "#TakeTheSilenceOff",
  "#MyOATH",
  "#3PeopleChallenge",
  "#SubstanceUseAwareness",
  "#MentalHealthMatters",
  "#FamilySupport",
  "#EndTheStigma",
  "#OATHMovement",
  "#AddictionRecovery",
  "#RecoveryIsPossible",
  "#GriefSupport",
  "#OverdoseAwareness",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AdminSocialPage() {
  const [platform, setPlatform] = useState<Platform>("linkedin");
  const [postType, setPostType] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const activePlatform = PLATFORMS[platform];
  const charLimit = activePlatform.charLimit;

  /* ---- helpers ---- */

  const charColor =
    charCount === 0
      ? "text-gray-400"
      : charCount <= charLimit * 0.8
        ? "text-emerald-600"
        : charCount <= charLimit
          ? "text-amber-600"
          : "text-red-600";

  const charBarWidth = Math.min((charCount / charLimit) * 100, 100);
  const charBarColor =
    charCount <= charLimit * 0.8
      ? "bg-emerald-500"
      : charCount <= charLimit
        ? "bg-amber-500"
        : "bg-red-500";

  /* ---- generate ---- */

  const handleGenerate = async () => {
    const typeObj = POST_TYPES.find((t) => t.key === postType);
    const basePrompt = typeObj?.promptTemplate || "";
    const topic = customPrompt.trim()
      ? customPrompt.trim()
      : basePrompt || "Share a meaningful update about the Sam's OATH movement.";

    const fullPrompt = `Write a ${activePlatform.label} post about: ${topic}. Keep within ${charLimit} characters. Tone guidance: ${activePlatform.toneHint} Include relevant hashtags from: ${SUGGESTED_HASHTAGS.join(" ")}. Return ONLY the post text, no commentary.`;

    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullPrompt,
          type: "blog",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      const text = data.text || "";
      setGeneratedPost(text);
      setCharCount(text.length);
    } catch (err) {
      console.error("Social post generation failed:", err);
      alert("Failed to generate post. Make sure the Anthropic API key is configured.");
    } finally {
      setLoading(false);
    }
  };

  /* ---- copy ---- */

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = generatedPost;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /* ---- insert hashtag ---- */

  const insertHashtag = (tag: string) => {
    if (generatedPost.includes(tag)) return;
    const updated = generatedPost ? `${generatedPost} ${tag}` : tag;
    setGeneratedPost(updated);
    setCharCount(updated.length);
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Social Post Generator
        </h2>
        <p className="text-gray-500 mt-1">
          Create ready-to-post content for your social channels.
        </p>
      </div>

      {/* Platform selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Platform
        </label>
        <div className="flex flex-wrap gap-3">
          {PLATFORM_ORDER.map((key) => {
            const p = PLATFORMS[key];
            const isActive = platform === key;
            return (
              <button
                key={key}
                onClick={() => setPlatform(key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                  isActive
                    ? `${p.activeBg} ${p.color}`
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                )}
              >
                <span className={isActive ? p.color : "text-gray-400"}>
                  {p.icon}
                </span>
                {p.label}
                <span className="text-xs opacity-60">
                  {p.charLimit.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Post type quick-action buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Post Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {POST_TYPES.map((type) => {
            const isActive = postType === type.key;
            return (
              <button
                key={type.key}
                onClick={() => setPostType(isActive ? null : type.key)}
                className={cn(
                  "text-left p-4 rounded-lg border transition-all",
                  isActive
                    ? "bg-primary-50 border-primary/30 ring-1 ring-primary/20"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                )}
              >
                <p
                  className={cn(
                    "font-medium text-sm",
                    isActive ? "text-primary" : "text-gray-900"
                  )}
                >
                  {type.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom prompt + generate */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <label
            htmlFor="custom-prompt"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Custom Instructions / Topic{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id="custom-prompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={3}
            placeholder="E.g. &quot;Announce that we hit 1,000 OATHs this week&quot; or &quot;Promote the new language guide resource&quot;"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-y"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerate}
            disabled={loading || (!postType && !customPrompt.trim())}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Generating..." : "Generate"}
          </button>
          {!postType && !customPrompt.trim() && (
            <p className="text-xs text-gray-400">
              Select a post type or enter custom instructions to generate.
            </p>
          )}
        </div>
      </div>

      {/* Generated content area */}
      {(generatedPost || loading) && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Platform header bar */}
          <div
            className={cn(
              "flex items-center gap-2 px-6 py-3 border-b border-gray-100",
              activePlatform.bg
            )}
          >
            <span className={activePlatform.color}>{activePlatform.icon}</span>
            <span
              className={cn(
                "text-sm font-medium",
                activePlatform.color
              )}
            >
              {activePlatform.label} Post
            </span>
            <span className="ml-auto text-xs text-gray-400">
              {activePlatform.charLimit.toLocaleString()} char limit
            </span>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                  <p className="text-sm text-gray-500">
                    Generating your {activePlatform.label} post...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {generatedPost}
                </p>

                {/* Character count bar */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={cn("text-xs font-medium", charColor)}>
                      {charCount.toLocaleString()} / {charLimit.toLocaleString()} characters
                    </span>
                    {charCount > charLimit && (
                      <span className="text-xs text-red-600 font-medium">
                        {(charCount - charLimit).toLocaleString()} over limit
                      </span>
                    )}
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        charBarColor
                      )}
                      style={{ width: `${charBarWidth}%` }}
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      copied
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hashtag suggestions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-purple-50 rounded-lg p-2">
            <Hash className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Suggested Hashtags
            </h3>
            <p className="text-xs text-gray-500">
              Click to add to your generated post.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_HASHTAGS.map((tag) => {
            const inPost = generatedPost.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => insertHashtag(tag)}
                disabled={!generatedPost || inPost}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  inPost
                    ? "bg-emerald-100 text-emerald-700 cursor-default"
                    : generatedPost
                      ? "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                      : "bg-gray-50 text-gray-400 cursor-not-allowed"
                )}
              >
                {inPost && <Check className="inline h-3 w-3 mr-1 -mt-0.5" />}
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Posting Schedule Guide */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-teal-50 rounded-lg p-2">
            <Clock className="h-5 w-5 text-teal" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Best Times to Post
            </h3>
            <p className="text-xs text-gray-500">
              Optimal posting windows by platform for maximum reach.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              platform: "LinkedIn",
              best: "Tue–Thu, 7–8 AM & 12 PM",
              freq: "3–5x per week",
              tip: "Morning posts before work perform best. Avoid weekends.",
            },
            {
              platform: "Instagram",
              best: "Mon–Fri, 11 AM–1 PM & 7–9 PM",
              freq: "4–7x per week (feed + stories)",
              tip: "Reels get 2x reach. Stories keep engagement up between posts.",
            },
            {
              platform: "TikTok",
              best: "Tue–Thu, 10 AM–12 PM & 7–9 PM",
              freq: "1–3x per day for growth",
              tip: "First 3 seconds decide everything. Hook immediately.",
            },
            {
              platform: "Facebook",
              best: "Wed–Fri, 9 AM–12 PM",
              freq: "3–5x per week",
              tip: "Groups and shares drive the algorithm. Ask questions.",
            },
            {
              platform: "X (Twitter)",
              best: "Mon–Fri, 8–10 AM & 6–9 PM",
              freq: "1–5x per day",
              tip: "Threads perform well. Quote-tweet your own posts to resurface.",
            },
          ].map((item) => (
            <div
              key={item.platform}
              className="p-4 rounded-lg border border-gray-100 bg-gray-50"
            >
              <p className="font-semibold text-sm text-gray-900">{item.platform}</p>
              <p className="text-xs text-teal-700 font-medium mt-1">{item.best}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.freq}</p>
              <p className="text-xs text-gray-400 mt-2 italic">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Posting Calendar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-orange-50 rounded-lg p-2">
            <CalendarDays className="h-5 w-5 text-orange" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Suggested Weekly Schedule
            </h3>
            <p className="text-xs text-gray-500">
              A repeatable content calendar to build consistency.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { day: "Monday", theme: "Movement Monday", content: "Share OATH stats, milestones, or a movement update", platforms: "LinkedIn, Instagram" },
            { day: "Tuesday", theme: "Story Tuesday", content: "Spotlight a community story or personal reflection", platforms: "Instagram, Facebook, TikTok" },
            { day: "Wednesday", theme: "Wisdom Wednesday", content: "Language guide tip, resource share, or educational post", platforms: "LinkedIn, X, Instagram" },
            { day: "Thursday", theme: "Throwback / BTS", content: "Behind-the-scenes, throwback photo, or founder perspective", platforms: "Instagram, TikTok, Facebook" },
            { day: "Friday", theme: "Challenge Friday", content: "Challenge 3 people to take the OATH or share the movement", platforms: "All platforms" },
            { day: "Saturday", theme: "Music Saturday", content: "Share a song, lyric, or music update from Apple Music", platforms: "Instagram, TikTok" },
            { day: "Sunday", theme: "Rest & Reflect", content: "Lighter post — gratitude, hope, or a quiet reflection", platforms: "Instagram, Facebook" },
          ].map((item) => (
            <div
              key={item.day}
              className="p-4 rounded-lg border border-gray-100 bg-gray-50"
            >
              <p className="font-semibold text-sm text-gray-900">{item.day}</p>
              <p className="text-xs text-primary font-medium mt-0.5">{item.theme}</p>
              <p className="text-xs text-gray-600 mt-2">{item.content}</p>
              <p className="text-xs text-gray-400 mt-1">{item.platforms}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
