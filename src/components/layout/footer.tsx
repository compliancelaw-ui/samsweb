import Link from "next/link";
import { SITE_NAME, CRISIS_RESOURCES } from "@/lib/constants";

const takeActionLinks = [
  { href: "/take-the-oath", label: "Take the OATH" },
  { href: "/stories", label: "Share Your Story" },
  { href: "/get-involved", label: "Get Involved" },
];

const learnMoreLinks = [
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/map", label: "Map" },
  { href: "/press", label: "Press" },
  { href: "/workplace", label: "Workplaces" },
];

const connectLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/music", label: "Music" },
];

export function Footer() {
  return (
    <footer className="bg-[#2E3B4E] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + Mission */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight">
                Sam&apos;s{" "}
                <span className="text-teal-300">OATH</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              What&apos;s hidden doesn&apos;t heal.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              A national movement to break silence around substance use and
              mental health through Openness, Authenticity, Togetherness, and
              Healing.
            </p>
          </div>

          {/* Column 2: Take Action */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Take Action
            </h3>
            <ul className="mt-4 space-y-3">
              {takeActionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-teal-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Learn More */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Learn More
            </h3>
            <ul className="mt-4 space-y-3">
              {learnMoreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-teal-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect + Crisis Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Connect
            </h3>
            <ul className="mt-4 space-y-3">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-teal-300"
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
                    className="text-sm text-gray-300 transition-colors hover:text-white"
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
                    className="text-sm text-gray-300 transition-colors hover:text-white"
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

      {/* Bottom Bar */}
      <div className="border-t border-gray-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400">
            &copy; 2026 {SITE_NAME} Foundation. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="text-sm text-gray-400 transition-colors hover:text-teal-300"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
