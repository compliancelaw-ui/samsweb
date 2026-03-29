"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Sparkles,
  Hash,
  Play,
  Image,
  FileText,
  Video,
  Layers,
  Film,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import {
  getTodayTheme,
  SAMSOATH_CALENDAR,
  SAMSOATH_HASHTAGS,
  type ContentType,
  type DayOfWeek,
} from "@/lib/content-calendar";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DAY_ORDER: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const JS_DAY_MAP: Record<number, DayOfWeek> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const THEME_COLORS: Record<DayOfWeek, { bg: string; border: string; badge: string; text: string }> = {
  Monday: { bg: "bg-blue-50", border: "border-blue-400", badge: "bg-blue-100 text-blue-700", text: "text-blue-700" },
  Tuesday: { bg: "bg-amber-50", border: "border-amber-400", badge: "bg-amber-100 text-amber-700", text: "text-amber-700" },
  Wednesday: { bg: "bg-green-50", border: "border-green-400", badge: "bg-green-100 text-green-700", text: "text-green-700" },
  Thursday: { bg: "bg-purple-50", border: "border-purple-400", badge: "bg-purple-100 text-purple-700", text: "text-purple-700" },
  Friday: { bg: "bg-rose-50", border: "border-rose-400", badge: "bg-rose-100 text-rose-700", text: "text-rose-700" },
  Saturday: { bg: "bg-teal-50", border: "border-teal-400", badge: "bg-teal-100 text-teal-700", text: "text-teal-700" },
  Sunday: { bg: "bg-orange-50", border: "border-orange-400", badge: "bg-orange-100 text-orange-700", text: "text-orange-700" },
};

const CONTENT_TYPE_ICON: Record<ContentType, React.ElementType> = {
  image: Image,
  text: FileText,
  video: Video,
  story: Layers,
  carousel: Film,
  reel: Play,
};

const CONTENT_TYPE_STYLE: Record<ContentType, string> = {
  image: "bg-sky-100 text-sky-700",
  text: "bg-gray-100 text-gray-700",
  video: "bg-red-100 text-red-700",
  story: "bg-violet-100 text-violet-700",
  carousel: "bg-indigo-100 text-indigo-700",
  reel: "bg-pink-100 text-pink-700",
};

const HASHTAG_CATEGORY_META: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  core: { label: "Core", icon: Sparkles, color: "text-teal-600" },
  recovery: { label: "Recovery", icon: MessageCircle, color: "text-green-600" },
  advocacy: { label: "Advocacy", icon: Play, color: "text-blue-600" },
  family: { label: "Family", icon: Layers, color: "text-rose-600" },
  wellness: { label: "Wellness", icon: Hash, color: "text-emerald-600" },
  community: { label: "Community", icon: CalendarDays, color: "text-purple-600" },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CalendarPage() {
  const todayTheme = useMemo(() => getTodayTheme(), []);
  const todayName = JS_DAY_MAP[new Date().getDay()];
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["core"]));

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const todayColors = THEME_COLORS[todayName];

  return (
    <div className="space-y-8">
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <CalendarDays className="h-7 w-7 text-teal-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
          <p className="text-sm text-gray-500">
            Weekly themed schedule for SamsOath social content
          </p>
        </div>
      </div>

      {/* ── Today's Theme hero ──────────────────────────────────────── */}
      <div
        className={cn(
          "rounded-xl border-2 p-6 shadow-sm",
          todayColors.bg,
          todayColors.border
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Today&apos;s Theme
            </p>
            <h2 className={cn("text-xl font-bold", todayColors.text)}>
              {todayTheme.theme}
            </h2>
            <p className="text-sm font-medium text-gray-700 mt-1">
              {todayTheme.tagline}
            </p>
            <p className="text-sm text-gray-600 mt-3 max-w-2xl leading-relaxed">
              {todayTheme.description}
            </p>

            {/* Suggested topics */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Suggested Topics
              </p>
              <ul className="space-y-1.5">
                {todayTheme.suggestedTopics.slice(0, 3).map((topic, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-teal-500 flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/admin/social"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors self-start whitespace-nowrap"
            )}
          >
            <Sparkles className="h-4 w-4" />
            Generate Post
          </Link>
        </div>
      </div>

      {/* ── Weekly Grid ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DAY_ORDER.map((dayName) => {
            const schedule = SAMSOATH_CALENDAR.schedule.find(
              (d) => d.day === dayName
            )!;
            const isToday = dayName === todayName;
            const colors = THEME_COLORS[dayName];

            return (
              <div
                key={dayName}
                className={cn(
                  "bg-white rounded-xl border shadow-sm p-5 flex flex-col transition-all",
                  isToday
                    ? `ring-2 ${colors.border} ring-offset-2`
                    : "border-gray-200 hover:shadow-md"
                )}
              >
                {/* Day + theme */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider",
                      isToday ? colors.text : "text-gray-400"
                    )}
                  >
                    {dayName}
                    {isToday && (
                      <span className="ml-1.5 text-[10px] bg-teal-600 text-white px-1.5 py-0.5 rounded-full uppercase">
                        Today
                      </span>
                    )}
                  </span>
                </div>
                <h3 className={cn("text-base font-bold", colors.text)}>
                  {schedule.theme}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 mb-3">
                  {schedule.tagline}
                </p>

                {/* Content type badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {schedule.contentTypes.map((ct) => {
                    const Icon = CONTENT_TYPE_ICON[ct];
                    return (
                      <span
                        key={ct}
                        className={cn(
                          "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full",
                          CONTENT_TYPE_STYLE[ct]
                        )}
                      >
                        <Icon className="h-3 w-3" />
                        {ct}
                      </span>
                    );
                  })}
                </div>

                {/* Top 3 topics */}
                <ul className="space-y-1 mb-3 flex-1">
                  {schedule.suggestedTopics.slice(0, 3).map((topic, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-600 flex items-start gap-1.5"
                    >
                      <span className="text-gray-300 mt-px">&#8226;</span>
                      <span className="line-clamp-2">{topic}</span>
                    </li>
                  ))}
                </ul>

                {/* Hashtags */}
                <p className="text-[11px] text-gray-400 leading-snug line-clamp-2">
                  {schedule.hashtags.slice(0, 4).join("  ")}
                </p>

                {/* Generate link */}
                <Link
                  href="/admin/social"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate Post
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Hashtag Library ─────────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          <Hash className="h-5 w-5 inline mr-1.5 text-gray-400" />
          Hashtag Library
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(SAMSOATH_HASHTAGS).map(([key, tags]) => {
            const meta = HASHTAG_CATEGORY_META[key];
            const isOpen = expandedCategories.has(key);
            const Icon = meta?.icon || Hash;

            return (
              <div
                key={key}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(key)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={cn("h-4 w-4", meta?.color || "text-gray-500")}
                    />
                    <span className="text-sm font-semibold text-gray-800 capitalize">
                      {meta?.label || key}
                    </span>
                    <span className="text-xs text-gray-400">
                      {tags.length} tags
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
