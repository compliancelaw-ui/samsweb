import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using the Sam's OATH website and participating in the movement.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container-wide text-white text-center">
          <h1 className="text-white text-4xl font-bold mb-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-white/70">Last updated: March 28, 2026</p>
        </div>
      </section>

      <SectionWrapper variant="white">
        <div className="max-w-3xl mx-auto prose prose-gray prose-lg">
          <h2>Welcome to Sam&apos;s OATH</h2>
          <p>
            By using the Sam&apos;s OATH website (samsoath.org), submitting
            content, or participating in any of our programs, you agree to these
            terms and conditions. Please read them carefully.
          </p>

          <h2>1. About Sam&apos;s OATH</h2>
          <p>
            Sam&apos;s OATH is a 501(c)(3) public charity and national
            movement to break silence around substance use and mental health in
            families. We provide a platform for people to take Sam&apos;s OATH
            (Openness, Authenticity, Togetherness, Healing), share their stories,
            and connect with a community of support. Sam&apos;s OATH is not a
            treatment provider, crisis service, or substitute for professional
            help.
          </p>

          <h2>2. Taking Sam&apos;s OATH</h2>
          <p>
            Sam&apos;s OATH is a personal pledge of commitment to openness,
            authenticity, togetherness, and healing. Taking the OATH is a
            symbolic act of solidarity. It is not a contract, membership
            agreement, or binding obligation. You may withdraw your OATH
            submission at any time.
          </p>
          <p>When you take Sam&apos;s OATH, you agree that:</p>
          <ul>
            <li>
              The information you provide (name, city, state, category) is
              accurate.
            </li>
            <li>
              Your city and state will be displayed on our public movement map.
              Map locations are approximate (city-level) and do not represent
              your exact address or precise location.
            </li>
            <li>
              Your name will appear on the map according to your display
              preference (full name, first name only, initials, or anonymous).
            </li>
            <li>
              You may request removal of your information at any time by
              contacting us.
            </li>
          </ul>

          <h2>3. Sharing Stories</h2>
          <p>When you submit a story, you agree that:</p>
          <ul>
            <li>
              Your story is your own experience, told truthfully and in good
              faith.
            </li>
            <li>
              You will not name specific individuals (other than yourself and
              your own family members who have consented) in a way that could
              identify or harm them.
            </li>
            <li>
              Sam&apos;s OATH may edit your story for clarity, length, or
              sensitivity before publication, and will notify you of significant
              changes.
            </li>
            <li>
              You grant Sam&apos;s OATH a non-exclusive license to publish your
              story on our website and in movement-related materials.
            </li>
            <li>
              You may request removal of your published story at any time.
            </li>
            <li>
              Stories are reviewed by our moderation team before publication.
              We reserve the right to decline to publish any submission.
            </li>
          </ul>

          <h3>Story Guidelines</h3>
          <p>
            Stories submitted to Sam&apos;s OATH should reflect the spirit of
            the movement. We do not publish stories that:
          </p>
          <ul>
            <li>Contain hate speech, threats, or harassment.</li>
            <li>Name individuals without their consent in a negative context.</li>
            <li>Include graphic descriptions of self-harm or substance use.</li>
            <li>Promote specific treatment facilities or products.</li>
            <li>Contain spam, advertising, or unrelated content.</li>
            <li>Violate any person&apos;s privacy or legal rights.</li>
          </ul>

          <h2>4. Newsletter &amp; Communications</h2>
          <p>
            If you opt in to receive our newsletter or email communications:
          </p>
          <ul>
            <li>
              We will only send content related to the Sam&apos;s OATH movement.
            </li>
            <li>
              <strong>
                We will never share your email address with any third party.
              </strong>
            </li>
            <li>You may unsubscribe at any time via the link in every email.</li>
            <li>
              We use your email solely for Sam&apos;s OATH communications.
            </li>
          </ul>

          <h2>5. Donations</h2>
          <p>
            Sam&apos;s OATH is a 501(c)(3) tax-exempt public charity.
            Donations made through the website are processed by Stripe, Inc.
            We do not store your payment card information. By making a donation,
            you acknowledge:
          </p>
          <ul>
            <li>
              Donations are tax-deductible to the extent allowed by law. You
              will receive a confirmation email that may serve as a receipt for
              tax purposes. Consult your tax advisor regarding deductibility.
            </li>
            <li>
              Donations are voluntary and non-refundable, except in cases of
              billing error. Contact info@samsoath.org for billing inquiries.
            </li>
            <li>
              Your use of Stripe is subject to{" "}
              <a
                href="https://stripe.com/legal"
                className="text-primary hover:text-primary-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe&apos;s Terms of Service
              </a>.
            </li>
            <li>
              Donation amounts and donor information (name and email) are stored
              securely. We do not publish donor names or amounts without
              explicit consent.
            </li>
          </ul>

          <h2>5b. Ambassador Program</h2>
          <p>
            The Sam&apos;s OATH Ambassador Program allows individuals to
            represent and promote the movement in their communities. By applying
            to or participating in the Ambassador Program, you agree that:
          </p>
          <ul>
            <li>
              You will represent Sam&apos;s OATH and its values (Openness,
              Authenticity, Togetherness, Healing) with integrity.
            </li>
            <li>
              Personal information you provide in your application (name, email,
              location, motivation) will be reviewed by the Sam&apos;s OATH team
              and stored securely.
            </li>
            <li>
              Ambassador status is voluntary and may be revoked by either party
              at any time.
            </li>
            <li>
              Ambassadors are not employees, contractors, or agents of
              Sam&apos;s OATH. The Ambassador role is an unpaid, voluntary
              position.
            </li>
            <li>
              Sam&apos;s OATH may feature your name, city, and ambassador
              activities on the website and in movement materials, with your
              consent.
            </li>
          </ul>

          <h2>6. User Conduct</h2>
          <p>When using our website, you agree not to:</p>
          <ul>
            <li>
              Submit false, misleading, or harmful information.
            </li>
            <li>
              Use the website for any commercial or promotional purpose.
            </li>
            <li>
              Attempt to access restricted areas of the website.
            </li>
            <li>
              Interfere with the website&apos;s operation or security.
            </li>
            <li>
              Scrape, harvest, or collect other users&apos; information.
            </li>
          </ul>

          <h2>7. Not a Crisis Service</h2>
          <p>
            <strong>
              Sam&apos;s OATH is a movement and community platform, not a crisis
              service, treatment provider, counseling service, or substitute for
              professional help of any kind.
            </strong>{" "}
            We do not provide medical advice, mental health treatment, substance
            use treatment, or clinical services. Content on this website,
            including stories, resources, and community materials, is for
            informational and inspirational purposes only.
          </p>
          <p>
            If you or someone you know is in immediate danger or experiencing a
            mental health or substance use crisis:
          </p>
          <ul>
            <li>
              <strong>Call 988</strong> (Suicide &amp; Crisis Lifeline)
            </li>
            <li>
              <strong>Text HOME to 741741</strong> (Crisis Text Line)
            </li>
            <li>
              <strong>Call 911</strong> for emergencies
            </li>
            <li>
              <strong>SAMHSA Helpline: 1-800-662-4357</strong> (Substance Abuse
              and Mental Health Services Administration, free, confidential,
              24/7)
            </li>
          </ul>
          <p>
            Nothing on this website should delay or replace seeking professional
            help. Sam&apos;s OATH is not liable for any actions taken or not
            taken based on content found on this site.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on the Sam&apos;s OATH website, including text, images,
            music references, design, and the Sam&apos;s OATH framework, is the property
            of Sam&apos;s OATH and is protected by copyright. You may share
            links to our content and use our shareable graphics for
            movement-related purposes. You may not reproduce, modify, or
            distribute our content for commercial purposes without permission.
          </p>

          <h2>9. Music</h2>
          <p>
            The music featured on our website is available through third-party
            streaming platforms (Apple Music, Spotify, etc.). Streaming is
            subject to each platform&apos;s own terms of service. Sam&apos;s
            OATH embeds players for convenience but does not host or distribute
            the music directly.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            Sam&apos;s OATH provides this website and its content &quot;as
            is.&quot; We make no warranties about the completeness, accuracy,
            or reliability of any information on the site. Sam&apos;s OATH is
            not liable for any decisions made or actions taken based on content
            published on this website. User-submitted stories represent the
            views and experiences of their authors, not of Sam&apos;s OATH.
          </p>

          <h2>11. Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            website after changes constitutes acceptance of the updated terms.
            We will notify newsletter subscribers of significant changes.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These terms are governed by the laws of the United States. Any
            disputes will be resolved in the state of Maryland.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about these terms, please contact us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a
                href="mailto:info@samsoath.org"
                className="text-primary hover:text-primary-600"
              >
                info@samsoath.org
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
