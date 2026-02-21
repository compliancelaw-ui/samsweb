import { Resend } from "resend";
import { brandedEmailHtml, getFromAddress } from "./email-template";

// Lazy-initialized Resend client — returns null if no API key is configured
let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const ADMIN_EMAIL = "frank@samsoath.org";

// ---------------------------------------------------------------------------
// Generic send (used by admin composer)
// ---------------------------------------------------------------------------

export async function sendEmail(opts: {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}) {
  const resend = getResend();
  if (!resend) throw new Error("Resend is not configured");
  return resend.emails.send(opts);
}

// ---------------------------------------------------------------------------
// OATH Confirmation
// ---------------------------------------------------------------------------

export async function sendOathConfirmation(to: string, name: string) {
  const resend = getResend();
  if (!resend || !to) return;

  try {
    await resend.emails.send({
      from: getFromAddress("hello"),
      to,
      subject: "You took Sam's OATH — thank you",
      html: brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">Thank you, ${name}.</h1>
        <p>
          You just took Sam's OATH — a commitment to openness, authenticity,
          togetherness, and healing. That matters more than you know.
        </p>
        <p>
          Your pin is now on the map. Every pin represents a family or individual
          who chose to break the silence. You're part of something bigger now.
        </p>
        <p>
          Want to do more? Share your story, challenge someone you trust to take
          the OATH, or simply keep talking openly. Every conversation chips away
          at the silence.
        </p>`,
        "hello",
        { cta: { label: "See the Movement Map", href: "https://samsoath.org/map" } }
      ),
    });
  } catch (err) {
    console.error("Failed to send OATH confirmation email:", err);
  }
}

// ---------------------------------------------------------------------------
// Contact Auto-Reply
// ---------------------------------------------------------------------------

export async function sendContactAutoReply(to: string, name: string) {
  const resend = getResend();
  if (!resend || !to) return;

  try {
    await resend.emails.send({
      from: getFromAddress("connect"),
      to,
      subject: "We got your message — Sam's OATH",
      html: brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">Thanks for reaching out, ${name}.</h1>
        <p>
          We received your message and will get back to you as soon as we can.
          If this is urgent, please call the Suicide &amp; Crisis Lifeline at
          <strong>988</strong> or text HOME to <strong>741741</strong>.
        </p>`,
        "connect"
      ),
    });
  } catch (err) {
    console.error("Failed to send contact auto-reply:", err);
  }
}

// ---------------------------------------------------------------------------
// Newsletter Welcome
// ---------------------------------------------------------------------------

export async function sendNewsletterWelcome(to: string, name: string | null) {
  const resend = getResend();
  if (!resend || !to) return;

  const greeting = name ? `Welcome, ${name}.` : "Welcome.";

  try {
    await resend.emails.send({
      from: getFromAddress("hello"),
      to,
      subject: "Welcome to Sam's OATH",
      html: brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">${greeting}</h1>
        <p>
          You're now part of a growing community of families and individuals
          who believe that what's hidden doesn't heal. We'll send you stories,
          updates, and resources — never spam.
        </p>`,
        "hello",
        {
          cta: { label: "Take Sam's OATH", href: "https://samsoath.org/take-the-oath" },
          unsubscribe: true,
        }
      ),
    });
  } catch (err) {
    console.error("Failed to send newsletter welcome:", err);
  }
}

// ---------------------------------------------------------------------------
// Admin Notification (new submission alert)
// ---------------------------------------------------------------------------

export async function notifyAdmin(subject: string, body: string) {
  const resend = getResend();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: getFromAddress("team"),
      to: ADMIN_EMAIL,
      subject: `[Sam's OATH] ${subject}`,
      html: brandedEmailHtml(
        `<p>${body}</p>`,
        "team",
        { cta: { label: "Open Admin Dashboard", href: "https://samsoath.org/admin" } }
      ),
    });
  } catch (err) {
    console.error("Failed to send admin notification:", err);
  }
}
