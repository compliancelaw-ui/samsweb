export const SITE_NAME = "Sam's OATH";
export const SITE_URL = "https://samsoath.org";
export const SITE_DESCRIPTION =
  "A national movement to break silence around substance use and mental health. Take the OATH: Openness, Authenticity, Togetherness, Healing.";
export const SITE_TAGLINE = "What's hidden doesn't heal.";

export const OATH_CATEGORIES = {
  struggling: {
    label: "For someone I love who is struggling",
    color: "#3EABA8",
    tailwind: "teal",
  },
  memory: {
    label: "In memory of someone I lost",
    color: "#4A6FA5",
    tailwind: "primary",
  },
  supporter: {
    label: "As a supporter of this movement",
    color: "#7AB87A",
    tailwind: "sage",
  },
} as const;

export const STORY_PIN_COLOR = "#E8956F";

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/map", label: "Map" },
  { href: "/music", label: "Music" },
  { href: "/blog", label: "Blog" },
  { href: "/workplace", label: "Workplaces" },
  { href: "/get-involved", label: "Get Involved" },
] as const;

export const CRISIS_RESOURCES = {
  suicideHotline: { number: "988", label: "Suicide & Crisis Lifeline" },
  crisisText: { number: "741741", keyword: "HELLO", label: "Crisis Text Line" },
  emergency: { number: "911", label: "Emergency" },
} as const;

export const IMPACT_STATS = {
  reached: "345K+",
  reactions: "1,934",
  comments: "484",
  states: "22+",
} as const;

export const MUSIC_TRACKS = [
  { title: "What's Hidden Doesn't Heal", theme: "The mission" },
  { title: "Knot on the Family Tree", theme: "Family bonds" },
  { title: "I Carry You Through", theme: "Carrying on" },
  { title: "For Annie", theme: "A sister's perspective" },
  { title: "Joy Anyway", theme: "Finding hope" },
  { title: "You Can't Outrun Grief", theme: "The journey" },
  { title: "My Name is More Than Pain", theme: "Identity beyond struggle" },
  { title: "In the Same Breath", theme: "Living with contradiction" },
  { title: "If Love Could Have Saved You", theme: "Loss" },
  { title: "Near to the Broken", theme: "Being present" },
  { title: "Hole in My Heart the Size of You", theme: "Grief" },
  { title: "Healing is a Slow Song", theme: "The process" },
  { title: "Fifteen Seconds", theme: "Moments that matter" },
  { title: "My Past Don't Get to Drive", theme: "Moving forward" },
  { title: "Still Water", theme: "Peace" },
] as const;
