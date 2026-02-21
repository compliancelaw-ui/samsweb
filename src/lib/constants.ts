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
  hope: {
    label: "I\u2019m in recovery or finding hope",
    color: "#E8956F",
    tailwind: "orange",
  },
} as const;

export const STORY_PIN_COLOR = "#E8956F";

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/map", label: "OATH Map" },
  { href: "/blog", label: "Blog" },
  { href: "/workplace", label: "Workplaces" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/music", label: "Music" },
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
  { title: "What's Hidden Doesn't Heal", theme: "The mission", appleId: "1863071795" },
  { title: "Knot on the Family Tree", theme: "Family bonds", appleId: "1868102833" },
  { title: "I Carry You Through", theme: "Carrying on", appleId: "1869974555" },
  { title: "For Annie", theme: "A sister's perspective", appleId: "1871670671" },
  { title: "Joy Anyway", theme: "Finding hope", appleId: "1868317828" },
  { title: "You Can't Outrun Grief", theme: "The journey", appleId: "1866856646" },
  { title: "My Name is More Than Pain", theme: "Identity beyond struggle", appleId: "" },
  { title: "In the Same Breath", theme: "Living with contradiction", appleId: "1865731326" },
  { title: "If Love Could Have Saved You", theme: "Loss", appleId: "1865599851" },
  { title: "Near to the Broken", theme: "Being present", appleId: "1865581121" },
  { title: "Hole in My Heart the Size of You", theme: "Grief", appleId: "1865580631" },
  { title: "Healing is a Slow Song", theme: "The process", appleId: "1865547862" },
  { title: "Fifteen Seconds", theme: "Moments that matter", appleId: "1873038332" },
  { title: "My Past Don't Get to Drive", theme: "Moving forward", appleId: "1869799649" },
  { title: "Still Water", theme: "Peace", appleId: "1869492686" },
] as const;

export const APPLE_MUSIC_ARTIST_URL = "https://music.apple.com/us/artist/sams-oath/1862953585";

export const SOCIAL_LINKS = {
  appleMusic: {
    url: "https://music.apple.com/us/artist/sams-oath/1862953585",
    label: "Apple Music",
  },
  spotify: {
    url: "https://open.spotify.com/search/Sam%27s%20OATH",
    label: "Spotify",
  },
  youtube: {
    url: "https://www.youtube.com/results?search_query=Sam%27s+OATH+Frank+Sheeder",
    label: "YouTube",
  },
  tiktok: {
    url: "https://www.tiktok.com/@samsoath",
    label: "TikTok",
  },
  instagram: {
    url: "https://www.instagram.com/samsoath",
    label: "Instagram",
  },
  facebook: {
    url: "https://www.facebook.com/samsoath",
    label: "Facebook",
  },
} as const;
