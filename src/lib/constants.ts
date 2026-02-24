export const SITE_NAME = "Sam's OATH";
export const SITE_URL = "https://samsoath.org";
export const SITE_DESCRIPTION =
  "A national movement to break silence around substance use and mental health. Take Sam's OATH: Openness, Authenticity, Togetherness, Healing.";
export const SITE_TAGLINE = "What's hidden doesn't heal.";

export const OATH_CATEGORIES = {
  supporting: {
    label: "Supporting a loved one",
    color: "#3EABA8",
    tailwind: "teal",
  },
  supporter: {
    label: "Standing with you",
    color: "#7AB87A",
    tailwind: "sage",
  },
  hope: {
    label: "I\u2019m in recovery or finding hope",
    color: "#E8956F",
    tailwind: "orange",
  },
} as const;

export const STORY_PIN_COLOR = "#4A6FA5";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/take-the-oath", label: "Take Sam's OATH" },
  { href: "/map", label: "Map" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Updates" },
  { href: "/workplace", label: "Workplaces" },
  { href: "/music", label: "Music" },
] as const;

export const CRISIS_RESOURCES = {
  suicideHotline: { number: "988", label: "Suicide & Crisis Lifeline" },
  crisisText: { number: "741741", keyword: "HELLO", label: "Crisis Text Line" },
  emergency: { number: "911", label: "Emergency" },
} as const;

export const IMPACT_STATS = {
  reached: "345K+",
  reactions: "2,000+",
  comments: "484",
  states: "50",
} as const;

export const MUSIC_TRACKS = [
  { title: "What's Hidden Doesn't Heal", theme: "The mission", lyric: "What you bury doesn\u2019t disappear \u2014 it just grows roots in the dark.", appleId: "1863071795" },
  { title: "I Carry You Through", theme: "Carrying on", lyric: "When your legs give out, I\u2019ll carry the weight for both of us.", appleId: "1869974555" },
  { title: "Healing is a Slow Song", theme: "The process", lyric: "You don\u2019t rush a wound that took years to make.", appleId: "1865547862" },
  { title: "Hole in My Heart the Size of You", theme: "Grief", lyric: "There\u2019s a space where you used to be, and nothing else fits.", appleId: "1865580631" },
  { title: "Joy Anyway", theme: "Finding hope", lyric: "Even in the wreckage, something stubborn keeps blooming.", appleId: "1868317828" },
  { title: "In the Same Breath", theme: "Living with contradiction", lyric: "I can miss you and move forward in the same breath.", appleId: "1865731326" },
  { title: "My Name is More Than Pain", theme: "Identity beyond struggle", lyric: "I am more than the worst thing that ever happened to me.", appleId: "1873038332" },
  { title: "You Can't Outrun Grief", theme: "The journey", lyric: "No matter how fast you run, it\u2019s already there when you arrive.", appleId: "1866856646" },
  { title: "If Love Could Have Saved You", theme: "Loss", lyric: "If love were enough, you\u2019d still be here.", appleId: "1865599851" },
  { title: "Near to the Broken", theme: "Being present", lyric: "The Lord is near to the brokenhearted.", appleId: "1865581121" },
  { title: "Knot on the Family Tree", theme: "Family bonds", lyric: "Every family has a knot \u2014 ours just pulled tighter.", appleId: "1868102833" },
  { title: "My Past Don't Get to Drive", theme: "Moving forward", lyric: "I\u2019ve been through hell, but it doesn\u2019t get to steer.", appleId: "1869799649" },
  { title: "Still Water", theme: "Peace", lyric: "After the storm, there is a stillness that holds everything.", appleId: "1869492686" },
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
