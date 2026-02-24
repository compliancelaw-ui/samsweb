import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Privacy Policy | Sam's OATH",
  description:
    "Read the Sam's OATH privacy policy. Learn how we handle your information when you visit samsoath.org.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container-wide text-white text-center">
          <h1 className="text-white text-4xl font-bold mb-2">
            Privacy Policy
          </h1>
          <p className="text-white/70">
            Last updated: February 2026
          </p>
        </div>
      </section>

      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto prose prose-gray prose-lg">
          <div className="not-prose bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
            <p className="text-teal-800 font-semibold text-lg mb-1">
              We will never share your email address with anyone. Period.
            </p>
            <p className="text-teal-700 text-base">
              Your personal information stays with Sam&apos;s OATH. We never
              sell, rent, or share your data with third parties.
            </p>
          </div>

          <h2>Our Commitment to Your Privacy</h2>
          <p>
            At Sam&apos;s OATH, we understand that the information you share with us
            is deeply personal. Many of our community members are sharing
            experiences related to substance use, mental health, and family
            challenges. We treat your privacy with the care and respect it
            deserves.
          </p>

          <h2>Information We Collect</h2>

          <h3>When You Take Sam's OATH</h3>
          <p>We collect the information you provide in Sam's OATH form:</p>
          <ul>
            <li>
              <strong>Name:</strong> First and last name. You choose how your
              name appears publicly (full name, first name only, initials, or
              anonymous).
            </li>
            <li>
              <strong>Location:</strong> City and state, used to place your pin
              on our movement map. We do not collect your street address.
            </li>
            <li>
              <strong>Category:</strong> Whether you&apos;re supporting a loved
              one, standing as a supporter, or on a journey of hope and
              recovery.
            </li>
            <li>
              <strong>Email (optional):</strong> Only if you choose to provide
              it, and only used for movement updates if you opt in.
            </li>
            <li>
              <strong>Personal message (optional):</strong> Displayed only to
              administrators. Not shared publicly.
            </li>
          </ul>

          <h3>When You Share a Story</h3>
          <p>
            We collect your name, email, location, and the story content you
            submit. Stories are reviewed by our team before being published. You
            may choose whether your name appears with your published story.
          </p>

          <h3>When You Contact Us</h3>
          <p>
            We collect the information you provide in our contact forms,
            including your name, email, and message content. This information is
            used solely to respond to your inquiry.
          </p>

          <h3>When You Subscribe to Our Newsletter</h3>
          <p>
            We collect your email address and optionally your first name. You can
            unsubscribe at any time using the link in every email.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>
            Like most websites, we may collect basic technical information such
            as IP addresses, browser type, and pages visited. We use this
            information to improve the website and ensure security.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To place your pin on the movement map (OATH submissions).</li>
            <li>To review and publish community stories.</li>
            <li>To respond to your messages and inquiries.</li>
            <li>
              To send movement updates and newsletters (only with your consent).
            </li>
            <li>To generate aggregate statistics about the movement.</li>
            <li>To improve the website and user experience.</li>
          </ul>

          <h2>What We Never Do</h2>
          <ul>
            <li>
              <strong>We never sell your information</strong> to third parties.
            </li>
            <li>
              <strong>We never share your email</strong> with other organizations.
            </li>
            <li>
              <strong>We never publish your full name</strong> without your
              explicit consent.
            </li>
            <li>
              <strong>We never display your exact address</strong> — only city
              and state.
            </li>
            <li>
              <strong>We never use your story</strong> for purposes other than
              what you consented to.
            </li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We use industry-standard security measures to protect your
            information, including encrypted connections (HTTPS), secure database
            hosting, and access controls. Only authorized team members can access
            personal information, and they do so only for the purposes described
            in this policy.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>
              <strong>Access</strong> the personal information we hold about you.
            </li>
            <li>
              <strong>Correct</strong> any inaccurate information.
            </li>
            <li>
              <strong>Delete</strong> your information from our systems.
            </li>
            <li>
              <strong>Withdraw consent</strong> for newsletter communications.
            </li>
            <li>
              <strong>Request removal</strong> of your pin from the map.
            </li>
            <li>
              <strong>Request removal</strong> of your published story.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:privacy@samsoath.org"
              className="text-primary hover:text-primary-600"
            >
              privacy@samsoath.org
            </a>
            .
          </p>

          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li>
              <strong>Supabase:</strong> Database hosting (data stored securely
              in the United States)
            </li>
            <li>
              <strong>Mapbox:</strong> Map rendering and geocoding (converts
              city/state to map coordinates)
            </li>
            <li>
              <strong>Vercel:</strong> Website hosting
            </li>
            <li>
              <strong>Resend:</strong> Email delivery
            </li>
          </ul>
          <p>
            Each of these services has their own privacy policies and security
            practices. We have selected them for their strong privacy and
            security standards.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            newsletter subscribers of significant changes. The &quot;last
            updated&quot; date at the top of this page indicates when the policy
            was most recently revised.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy or how we handle
            your information, please contact us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a
                href="mailto:privacy@samsoath.org"
                className="text-primary hover:text-primary-600"
              >
                privacy@samsoath.org
              </a>
            </li>
            <li>
              Or use our{" "}
              <a
                href="/contact"
                className="text-primary hover:text-primary-600"
              >
                contact form
              </a>
            </li>
          </ul>
        </div>
      </SectionWrapper>
    </>
  );
}
