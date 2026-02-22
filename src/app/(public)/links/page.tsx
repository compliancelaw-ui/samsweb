import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "Links | Sam's OATH",
  description:
    "All the ways to connect with Sam's OATH — take the pledge, share your story, listen to our music, find resources, and join a national movement breaking the silence on substance use and mental health.",
  openGraph: {
    title: "Links | Sam's OATH",
    description:
      "All the ways to connect with Sam's OATH — take the pledge, share your story, listen to our music, and join the movement.",
    url: "https://samsoath.org/links",
  },
};

/* ------------------------------------------------------------------ */
/*  Internal link data                                                 */
/* ------------------------------------------------------------------ */

const LINKS: readonly { label: string; href: string; primary?: boolean; description: string }[] = [
  {
    label: "Take Sam's OATH",
    href: "/take-the-oath",
    primary: true,
    description: "Pledge to break the silence",
  },
  {
    label: "Share Your Story",
    href: "/share-your-story",
    description: "Your voice matters",
  },
  {
    label: "Listen to Our Music",
    href: "/music",
    description: "15 original songs of hope",
  },
  {
    label: "Become an Ambassador",
    href: "/ambassadors",
    description: "Lead the movement locally",
  },
  {
    label: "Resources & Support",
    href: "/resources",
    description: "Help for families and individuals",
  },
  {
    label: "Read Our Blog",
    href: "/blog",
    description: "Stories, insights, and updates",
  },
  {
    label: "Contact Us",
    href: "/contact",
    description: "We are here for you",
  },
  {
    label: "Visit Our Website",
    href: "/",
    description: "samsoath.org",
  },
];

/* ------------------------------------------------------------------ */
/*  Social icon SVGs (brand icons not in Lucide)                       */
/* ------------------------------------------------------------------ */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.997 6.124a9.23 9.23 0 0 0-.24-2.19 4.71 4.71 0 0 0-1.05-1.86 4.58 4.58 0 0 0-1.86-1.05A9.23 9.23 0 0 0 18.657.8h-13.3a9.2 9.2 0 0 0-2.19.24 4.58 4.58 0 0 0-1.86 1.05A4.71 4.71 0 0 0 .257 3.93a9.23 9.23 0 0 0-.24 2.19v11.75a9.23 9.23 0 0 0 .24 2.19 4.71 4.71 0 0 0 1.05 1.86 4.58 4.58 0 0 0 1.86 1.05 9.23 9.23 0 0 0 2.19.24h13.3a9.23 9.23 0 0 0 2.19-.24 4.58 4.58 0 0 0 1.86-1.05 4.71 4.71 0 0 0 1.05-1.86 9.23 9.23 0 0 0 .24-2.19V6.124zm-6.46 5.81v5.48a2.56 2.56 0 0 1-.73 1.84 2.45 2.45 0 0 1-1.56.76 2.39 2.39 0 0 1-1.74-.47 2.1 2.1 0 0 1-.68-1.87 2.22 2.22 0 0 1 .93-1.53 3.15 3.15 0 0 1 1.87-.65c.32 0 .63.06.93.17v-3.87l-5.36 1.7v5.13a2.56 2.56 0 0 1-.73 1.84 2.45 2.45 0 0 1-1.56.76 2.39 2.39 0 0 1-1.74-.47 2.1 2.1 0 0 1-.68-1.87 2.22 2.22 0 0 1 .93-1.53 3.15 3.15 0 0 1 1.87-.65c.32 0 .63.06.93.17V9.594a1.67 1.67 0 0 1 .13-.66 1.05 1.05 0 0 1 .49-.47l5.56-1.81a.78.78 0 0 1 .6.04.67.67 0 0 1 .34.56v4.694z" />
    </svg>
  );
}

const SOCIAL_ICONS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/samsoath",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/samsoath",
    Icon: FacebookIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@samsoath",
    Icon: TikTokIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/samsoath",
    Icon: LinkedInIcon,
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/sams-oath/1862953585",
    Icon: AppleMusicIcon,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LinksPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F8FAFB] via-white to-[#F8FAFB] py-12 px-4">
      <div className="mx-auto max-w-[480px]">

        {/* ===== Header ===== */}
        <div className="text-center mb-10">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <Logo variant="full" className="h-28 w-auto" />
          </div>

          {/* Tagline */}
          <p className="text-lg font-semibold text-[#2E3B4E] mb-2">
            What&apos;s Hidden Doesn&apos;t Heal
          </p>
          <p className="text-[15px] text-gray-500 leading-relaxed max-w-sm mx-auto">
            A national movement of families breaking the silence around
            substance use and mental health.
          </p>
        </div>

        {/* ===== Primary CTA ===== */}
        <div className="mb-4">
          <Link
            href="/take-the-oath"
            className="group relative block w-full rounded-xl bg-teal px-6 py-5 text-center text-lg font-bold text-white shadow-lg shadow-teal/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal/30 active:scale-[0.98]"
          >
            <span className="relative z-10">Take Sam&apos;s OATH</span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal to-[#4ABFBC] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <span className="mt-1 block text-sm font-normal text-white/80 relative z-10">
              Pledge to break the silence
            </span>
          </Link>
        </div>

        {/* ===== Link Buttons ===== */}
        <div className="flex flex-col gap-3 mb-10">
          {LINKS.filter((l) => !l.primary).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group block w-full rounded-xl border border-gray-200 bg-white px-6 py-4 text-center transition-all duration-200 hover:border-teal/40 hover:shadow-md hover:shadow-teal/10 hover:scale-[1.01] active:scale-[0.99]"
            >
              <span className="block text-base font-semibold text-[#2E3B4E] group-hover:text-teal transition-colors duration-200">
                {link.label}
              </span>
              <span className="block text-sm text-gray-400 mt-0.5">
                {link.description}
              </span>
            </Link>
          ))}
        </div>

        {/* ===== Social Icons ===== */}
        <div className="flex justify-center gap-4 mb-10">
          {SOCIAL_ICONS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Follow on ${label}`}
              aria-label={`Follow Sam's OATH on ${label}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-teal hover:text-white hover:scale-110 hover:shadow-md"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* ===== Footer ===== */}
        <div className="text-center">
          <a
            href="https://samsoath.org"
            className="text-sm text-gray-400 hover:text-teal transition-colors duration-200"
          >
            samsoath.org
          </a>
        </div>
      </div>
    </section>
  );
}
