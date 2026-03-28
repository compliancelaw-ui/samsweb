import type { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Accessibility Commitment | Sam's OATH",
  description:
    "Sam's OATH is committed to ensuring our website is accessible to all visitors, including people with disabilities. Learn about our WCAG 2.1 AA compliance efforts.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container-wide text-white text-center">
          <h1 className="text-white text-4xl font-bold mb-2">
            Accessibility Commitment
          </h1>
          <p className="text-white/70">
            Last updated: March 2026
          </p>
        </div>
      </section>

      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto prose prose-gray prose-lg">
          <div className="not-prose bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
            <p className="text-teal-800 font-semibold text-lg mb-1">
              Everyone deserves equal access to connection and community.
            </p>
            <p className="text-teal-700 text-base">
              Sam&apos;s OATH is committed to ensuring our website is accessible
              to all visitors, including people with disabilities. Our mission
              is rooted in inclusion, and that commitment extends to the digital
              experience we provide.
            </p>
          </div>

          <h2>Our Accessibility Goal</h2>
          <p>
            We strive to meet or exceed the{" "}
            <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>{" "}
            standards. These guidelines help us ensure that our website is
            perceivable, operable, understandable, and robust for all users,
            regardless of ability or the technology they use to access it.
          </p>

          <h2>What We Do</h2>
          <p>
            We have taken the following steps to support accessibility across
            samsoath.org:
          </p>
          <ul>
            <li>
              <strong>Semantic HTML structure:</strong> We use proper heading
              hierarchy, landmark regions, and meaningful markup so assistive
              technologies can interpret page content accurately.
            </li>
            <li>
              <strong>Keyboard navigation support:</strong> All interactive
              elements, including forms, links, buttons, and menus, can be
              accessed and operated using a keyboard alone.
            </li>
            <li>
              <strong>Screen reader compatibility:</strong> We test with common
              screen readers to ensure content is read aloud in a logical and
              complete manner.
            </li>
            <li>
              <strong>Sufficient color contrast:</strong> Text and interactive
              elements meet WCAG contrast ratio requirements against their
              backgrounds, ensuring readability for people with low vision or
              color vision differences.
            </li>
            <li>
              <strong>Text resizing support:</strong> The site layout responds
              gracefully when users increase text size up to 200% through
              browser settings.
            </li>
            <li>
              <strong>Alt text on images:</strong> All meaningful images include
              descriptive alternative text. Decorative images are marked so
              screen readers skip them appropriately.
            </li>
            <li>
              <strong>Skip-to-content link:</strong> A skip navigation link is
              provided so keyboard users can bypass repeated navigation and go
              directly to the main content.
            </li>
            <li>
              <strong>Form labels and error messages:</strong> All form fields
              have visible labels and associated descriptions. Validation errors
              are communicated clearly with guidance on how to correct them.
            </li>
          </ul>

          <h2>Known Limitations</h2>
          <p>
            We are continuously working to improve our accessibility. There are
            some areas where we recognize limitations and are actively working
            toward solutions:
          </p>
          <ul>
            <li>
              <strong>Interactive map:</strong> Our movement map uses a
              third-party mapping service. While we provide alternative text and
              summary information, the full interactive map experience may not
              be fully accessible to all assistive technologies. We provide a
              text-based alternative for viewing OATH data.
            </li>
            <li>
              <strong>Embedded video content:</strong> Some video content may
              not yet have complete captions or audio descriptions. We are
              working to add these as content is published.
            </li>
            <li>
              <strong>PDF documents:</strong> Older PDF documents may not be
              fully accessible. We are working to remediate existing documents
              and ensure all new documents meet accessibility standards.
            </li>
          </ul>

          <h2>How to Report an Issue</h2>
          <p>
            If you experience any difficulty accessing content on samsoath.org,
            or if you have suggestions for how we can improve accessibility, we
            want to hear from you. Your feedback helps us serve everyone better.
          </p>
          <p>You can reach us by:</p>
          <ul>
            <li>
              Emailing{" "}
              <a
                href="mailto:accessibility@samsoath.org"
                className="text-primary hover:text-primary-600"
              >
                accessibility@samsoath.org
              </a>
            </li>
            <li>
              Using our{" "}
              <Link
                href="/contact"
                className="text-primary hover:text-primary-600"
              >
                contact form
              </Link>{" "}
              and selecting &quot;Accessibility&quot; as the topic
            </li>
          </ul>
          <p>
            When reporting an issue, please include the page URL, a description
            of the problem you encountered, and the assistive technology or
            browser you were using. We will do our best to respond within two
            business days and work toward a resolution.
          </p>

          <h2>Third-Party Content</h2>
          <p>
            Our website includes content and services from third-party
            providers, such as embedded maps, analytics tools, and payment
            processing. While we select partners that share our commitment to
            accessibility, we cannot guarantee full compliance for content we do
            not directly control. If you encounter an accessibility barrier
            related to third-party content on our site, please let us know and
            we will work with the provider or find an alternative solution.
          </p>

          <h2>Our Ongoing Commitment</h2>
          <p>
            Accessibility is not a one-time project. It is an ongoing practice
            that we integrate into our design, development, and content
            processes. We regularly review our site, train our team on
            accessibility best practices, and test with assistive technologies
            to ensure we are meeting the needs of all visitors.
          </p>
          <p>
            Sam&apos;s OATH exists because everyone deserves to be heard and
            supported. That principle guides everything we build, including this
            website.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
