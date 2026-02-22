import Link from "next/link";
import { SITE_NAME, CRISIS_RESOURCES } from "@/lib/constants";
import { SocialFollowButtons } from "@/components/ui/social-follow-buttons";
import { Logo } from "@/components/ui/logo";

const takeActionLinks = [
  { href: "/take-the-oath", label: "Take Sam's OATH" },
  { href: "/share-your-story", label: "Share Your Story" },
  { href: "/ambassadors", label: "Become an Ambassador" },
  { href: "/workplace", label: "Workplace Programs" },
];

const learnMoreLinks = [
  { href: "/about", label: "About the Movement" },
  { href: "/stories", label: "Stories" },
  { href: "/map", label: "OATH Map" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Updates" },
  { href: "/press", label: "Press" },
];

const connectLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/music", label: "Listen to the Music" },
];

export function Footer() {
  return (
    <footer className="bg-[#2E3B4E] text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + Mission */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3B4E] rounded-lg">
              <Logo variant="footer" className="h-12 w-auto" />
            </Link>
            <p className="mt-4 text-sm font-medium leading-relaxed text-gray-300">
              What&apos;s hidden doesn&apos;t heal.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">
              <span className="text-white">Our mission:</span> Break the
              silence around substance use and mental health so no family
              carries this weight alone.
            </p>
            {/* Follow Us */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3">
                Follow Us
              </h4>
              <SocialFollowButtons variant="dark" size="sm" />
            </div>
          </div>

          {/* Column 2: Take Action */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Take Action
            </h3>
            <ul className="mt-4 space-y-3">
              {takeActionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3B4E] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Learn More */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Learn More
            </h3>
            <ul className="mt-4 space-y-3">
              {learnMoreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3B4E] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect + Crisis Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h3>
            <ul className="mt-4 space-y-3">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3B4E] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Crisis Resources */}
            <div className="mt-8 rounded-lg border border-gray-600 bg-gray-700/30 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                Crisis Resources
              </h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={`tel:${CRISIS_RESOURCES.suicideHotline.number}`}
                    className="text-sm text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3B4E] rounded"
                  >
                    {CRISIS_RESOURCES.suicideHotline.label}:{" "}
                    <span className="font-semibold text-white">
                      {CRISIS_RESOURCES.suicideHotline.number}
                    </span>
                  </a>
                </li>
                <li>
                  <p className="text-sm text-gray-300">
                    {CRISIS_RESOURCES.crisisText.label}:{" "}
                    <span className="font-semibold text-white">
                      Text {CRISIS_RESOURCES.crisisText.keyword} to{" "}
                      {CRISIS_RESOURCES.crisisText.number}
                    </span>
                  </p>
                </li>
                <li>
                  <a
                    href={`tel:${CRISIS_RESOURCES.emergency.number}`}
                    className="text-sm text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3B4E] rounded"
                  >
                    {CRISIS_RESOURCES.emergency.label}:{" "}
                    <span className="font-semibold text-white">
                      {CRISIS_RESOURCES.emergency.number}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — extra bottom padding so the fixed crisis banner doesn't cover it */}
      <div className="border-t border-gray-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 pb-16 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-300">
            &copy; 2026 {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/terms"
              className="text-sm text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3B4E] rounded"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E3B4E] rounded"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
