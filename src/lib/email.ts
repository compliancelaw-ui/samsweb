import { Resend } from "resend";

// Lazy-initialized Resend client — returns null if no API key is configured
let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_ADDRESS = "Sam's OATH <hello@samsoath.org>";
const ADMIN_EMAIL = "frank@samsoath.org";

// ---------------------------------------------------------------------------
// OATH Confirmation
// ---------------------------------------------------------------------------

export async function sendOathConfirmation(to: string, name: string) {
  const resend = getResend();
  if (!resend || !to) return;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject: "You took Sam's OATH — thank you",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#2E3B4E;">
          <h1 style="color:#4A6FA5;font-size:24px;">Thank you, ${name}.</h1>
          <p style="font-size:16px;line-height:1.6;color:#4B5563;">
            You just took Sam's OATH — a commitment to openness, authenticity,
            togetherness, and healing. That matters more than you know.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#4B5563;">
            Your pin is now on the map. Every pin represents a family or individual
            who chose to break the silence. You're part of something bigger now.
          </p>
          <div style="margin:24px 0;">
            <a href="https://samsoath.org/map"
               style="display:inline-block;background:#3EABA8;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
              See the Movement Map
            </a>
          </div>
          <p style="font-size:16px;line-height:1.6;color:#4B5563;">
            Want to do more? Share your story, challenge someone you trust to take
            the OATH, or simply keep talking openly. Every conversation chips away
            at the silence.
          </p>
          <p style="font-size:14px;color:#9CA3AF;margin-top:32px;">
            — The Sam's OATH Team<br/>
            <a href="https://samsoath.org" style="color:#4A6FA5;">samsoath.org</a>
          </p>
        </div>
      `,
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
      from: FROM_ADDRESS,
      to,
      subject: "We got your message — Sam's OATH",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#2E3B4E;">
          <h1 style="color:#4A6FA5;font-size:24px;">Thanks for reaching out, ${name}.</h1>
          <p style="font-size:16px;line-height:1.6;color:#4B5563;">
            We received your message and will get back to you as soon as we can.
            If this is urgent, please call the Suicide &amp; Crisis Lifeline at
            <strong>988</strong> or text HOME to <strong>741741</strong>.
          </p>
          <p style="font-size:14px;color:#9CA3AF;margin-top:32px;">
            — The Sam's OATH Team<br/>
            <a href="https://samsoath.org" style="color:#4A6FA5;">samsoath.org</a>
          </p>
        </div>
      `,
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
      from: FROM_ADDRESS,
      to,
      subject: "Welcome to Sam's OATH",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#2E3B4E;">
          <h1 style="color:#4A6FA5;font-size:24px;">${greeting}</h1>
          <p style="font-size:16px;line-height:1.6;color:#4B5563;">
            You're now part of a growing community of families and individuals
            who believe that what's hidden doesn't heal. We'll send you stories,
            updates, and resources — never spam.
          </p>
          <div style="margin:24px 0;">
            <a href="https://samsoath.org/take-the-oath"
               style="display:inline-block;background:#3EABA8;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
              Take Sam's OATH
            </a>
          </div>
          <p style="font-size:14px;color:#9CA3AF;margin-top:32px;">
            — The Sam's OATH Team<br/>
            <a href="https://samsoath.org" style="color:#4A6FA5;">samsoath.org</a>
          </p>
        </div>
      `,
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
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      subject: `[Sam's OATH] ${subject}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#2E3B4E;">
          <p style="font-size:16px;line-height:1.6;color:#4B5563;">${body}</p>
          <div style="margin:24px 0;">
            <a href="https://samsoath.org/admin"
               style="display:inline-block;background:#4A6FA5;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
              Open Admin Dashboard
            </a>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send admin notification:", err);
  }
}
