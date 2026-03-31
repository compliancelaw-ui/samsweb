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
      subject: "You took Sam's OATH. Now help someone else break the silence.",
      html: brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:28px;margin:0 0 20px 0;">You did something that matters, ${name}.</h1>
        <p style="font-size:17px;line-height:1.7;">
          You just committed to four things that most people never say out loud. Here is what you pledged:
        </p>

        <div style="margin:24px 0;padding:20px 24px;background:#F0FAFA;border-radius:12px;border-left:4px solid #3EABA8;">
          <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#3EABA8;">
            <span style="display:inline-block;width:28px;height:28px;background:#3EABA8;color:white;border-radius:50%;text-align:center;line-height:28px;font-size:14px;margin-right:8px;">O</span>
            Openness
          </p>
          <p style="margin:0;color:#4B5563;font-size:14px;">To speak honestly about what your family has experienced, without shame.</p>
        </div>

        <div style="margin:24px 0;padding:20px 24px;background:#EEF2F9;border-radius:12px;border-left:4px solid #4A6FA5;">
          <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#4A6FA5;">
            <span style="display:inline-block;width:28px;height:28px;background:#4A6FA5;color:white;border-radius:50%;text-align:center;line-height:28px;font-size:14px;margin-right:8px;">A</span>
            Authenticity
          </p>
          <p style="margin:0;color:#4B5563;font-size:14px;">To show up as you truly are, not as the world expects you to be.</p>
        </div>

        <div style="margin:24px 0;padding:20px 24px;background:#F0F7F0;border-radius:12px;border-left:4px solid #7AB87A;">
          <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#7AB87A;">
            <span style="display:inline-block;width:28px;height:28px;background:#7AB87A;color:white;border-radius:50%;text-align:center;line-height:28px;font-size:14px;margin-right:8px;">T</span>
            Togetherness
          </p>
          <p style="margin:0;color:#4B5563;font-size:14px;">To stand with others who are facing these challenges, because no one should face them alone.</p>
        </div>

        <div style="margin:24px 0;padding:20px 24px;background:#FDF4F0;border-radius:12px;border-left:4px solid #E8956F;">
          <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#E8956F;">
            <span style="display:inline-block;width:28px;height:28px;background:#E8956F;color:white;border-radius:50%;text-align:center;line-height:28px;font-size:14px;margin-right:8px;">H</span>
            Healing
          </p>
          <p style="margin:0;color:#4B5563;font-size:14px;">To pursue recovery, growth, and hope, for yourself and for those you love.</p>
        </div>

        <p style="font-size:17px;line-height:1.7;margin-top:28px;">
          Your pin is on the map. You are standing with families across the country who chose openness over silence.
        </p>

        <div style="margin:32px 0;padding:24px;background:#2E3B4E;border-radius:12px;text-align:center;">
          <p style="color:white;font-size:18px;font-weight:700;margin:0 0 8px;">
            Now do the most important thing:
          </p>
          <p style="color:#9CA3AF;font-size:15px;margin:0 0 20px;">
            Tell three people about Sam's OATH. The movement grows one honest conversation at a time.
          </p>
          <div style="margin:0 0 16px;">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsamsoath.org%2Ftake-the-oath&quote=I%20just%20took%20Sam%27s%20OATH%20-%20a%20commitment%20to%20break%20the%20silence%20around%20substance%20use%20and%20mental%20health.%20Join%20me." style="display:inline-block;padding:10px 20px;background:#4267B2;color:white;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;margin:4px;">Share on Facebook</a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fsamsoath.org%2Ftake-the-oath" style="display:inline-block;padding:10px 20px;background:#0A66C2;color:white;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;margin:4px;">Share on LinkedIn</a>
          </div>
          <div>
            <a href="https://twitter.com/intent/tweet?text=I%20took%20Sam%27s%20OATH%20-%2060%20seconds%20to%20commit%20to%20openness%20about%20substance%20use%20and%20mental%20health.%20What%27s%20hidden%20doesn%27t%20heal.%20samsoath.org%2Ftake-the-oath%20%23SamsOATH" style="display:inline-block;padding:10px 20px;background:#1DA1F2;color:white;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;margin:4px;">Share on X</a>
            <a href="https://samsoath.org/take-the-oath" style="display:inline-block;padding:10px 20px;background:#3EABA8;color:white;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;margin:4px;">Copy Link to Share</a>
          </div>
        </div>

        <p style="font-size:15px;color:#4B5563;">
          Someone in your life is carrying this weight in silence right now. Your share might be the reason they realize they are not alone.
        </p>`,
        "frank",
        { cta: { label: "Download Your Certificate", href: `https://samsoath.org/api/export/oath-certificate?name=${encodeURIComponent(name)}` } }
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
      subject: "We got your message - Sam's OATH",
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
          updates, and resources. Never spam.
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
// Story Submission Confirmation
// ---------------------------------------------------------------------------

export async function sendStoryConfirmation(to: string, name: string) {
  const resend = getResend();
  if (!resend || !to) return;

  try {
    await resend.emails.send({
      from: getFromAddress("share"),
      to,
      subject: "We received your story - Sam's OATH",
      html: brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">Thank you, ${name}.</h1>
        <p>
          Your story has been received. Sharing takes real courage, and we
          don't take that lightly.
        </p>
        <p>
          Our team will review your submission within a few days. Once approved,
          it will be published on the site so others can find strength in your
          words. We'll let you know when it's live.
        </p>
        <p>
          In the meantime, you can read stories from others who have chosen to
          break the silence.
        </p>`,
        "share",
        { cta: { label: "Read Other Stories", href: "https://samsoath.org/stories" } }
      ),
    });
  } catch (err) {
    console.error("Failed to send story confirmation email:", err);
  }
}

// ---------------------------------------------------------------------------
// Ambassador Application Confirmation
// ---------------------------------------------------------------------------

export async function sendAmbassadorConfirmation(to: string, name: string) {
  const resend = getResend();
  if (!resend || !to) return;

  try {
    await resend.emails.send({
      from: getFromAddress("hello"),
      to,
      subject: "Your ambassador application - Sam's OATH",
      html: brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">Thank you for applying, ${name}.</h1>
        <p>
          We received your application to become a Sam's OATH Ambassador.
          We're grateful for your willingness to represent this movement in
          your community.
        </p>
        <p>
          Our team reviews every application personally. We'll be in touch
          soon to discuss next steps.
        </p>`,
        "hello",
        { cta: { label: "Explore Sam's OATH", href: "https://samsoath.org" } }
      ),
    });
  } catch (err) {
    console.error("Failed to send ambassador confirmation email:", err);
  }
}

// ---------------------------------------------------------------------------
// Donation Thank You
// ---------------------------------------------------------------------------

export async function sendDonationThankYou(
  to: string,
  name: string | null,
  amountCents: number,
  isRecurring: boolean
) {
  const resend = getResend();
  if (!resend || !to) return;

  const greeting = name ? `Thank you, ${name}.` : "Thank you.";
  const amount = `$${(amountCents / 100).toFixed(2)}`;
  const recurringNote = isRecurring
    ? `<p>Your monthly gift of ${amount} will continue to make a difference each month. You can manage your subscription at any time through the link in your Stripe receipt.</p>`
    : "";

  try {
    await resend.emails.send({
      from: getFromAddress("hello"),
      to,
      subject: "Thank you for your donation - Sam's OATH",
      html: brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">${greeting}</h1>
        <p>
          Your generous donation of ${amount} helps us break the silence around
          substance use and mental health. Every dollar goes directly toward
          awareness campaigns, community events, and support resources for
          families who need them most.
        </p>
        ${recurringNote}
        <p>
          Sam's OATH is a 501(c)(3) public charity.
          Your donation is tax-deductible to the extent allowed by law.
          You will receive a receipt from Stripe for your records.
        </p>
        <p>
          Because of supporters like you, no family has to carry this weight alone.
        </p>`,
        "hello",
        { cta: { label: "See the Movement", href: "https://samsoath.org/map" } }
      ),
    });
  } catch (err) {
    console.error("Failed to send donation thank-you email:", err);
  }
}

// ---------------------------------------------------------------------------
// Monthly Newsletter
// ---------------------------------------------------------------------------

export interface MonthlyNewsletterData {
  conversationStarter: {
    topic: string;
    prompt: string;
  };
  challenge: {
    title: string;
    description: string;
    href: string;
  };
  featuredStory: {
    authorName: string;
    excerpt: string;
    href: string;
  };
  resourceSpotlight: {
    title: string;
    description: string;
    href: string;
  };
}

export function generateMonthlyNewsletter(
  name: string | null,
  data: MonthlyNewsletterData
): string {
  const greeting = name ? `Hi ${name},` : "Hi there,";

  const sectionStyle =
    'margin:24px 0;padding:20px;background:#F8FAFB;border-radius:8px;border-left:4px solid #3EABA8;';
  const sectionTitleStyle =
    'margin:0 0 8px;font-size:16px;font-weight:700;color:#4A6FA5;';
  const linkStyle =
    'color:#3EABA8;text-decoration:none;font-weight:600;';

  const crisisFooter = `
  <div style="margin-top:32px;padding:16px 20px;background:#F8FAFB;border-radius:8px;border-left:4px solid #3EABA8;">
    <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#2E3B4E;">
      If you or someone you know is in crisis:
    </p>
    <p style="margin:0;font-size:13px;color:#4B5563;line-height:1.6;">
      Suicide &amp; Crisis Lifeline: <strong>988</strong> (call or text)<br/>
      Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong><br/>
      SAMHSA National Helpline: <strong>1-800-662-4357</strong> (free, confidential, 24/7)
    </p>
  </div>`;

  return brandedEmailHtml(
    `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">${greeting}</h1>
    <p>
      Here is what the Sam's OATH community is talking about, doing, and
      building this month. Every section below is something you can bring
      to your family, your workplace, or your next honest conversation.
    </p>

    <div style="${sectionStyle}">
      <p style="${sectionTitleStyle}">This Month's Conversation Starter</p>
      <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#2E3B4E;">
        ${data.conversationStarter.topic}
      </p>
      <p style="margin:0;font-size:14px;color:#4B5563;line-height:1.6;">
        ${data.conversationStarter.prompt}
      </p>
    </div>

    <div style="${sectionStyle}">
      <p style="${sectionTitleStyle}">Challenge of the Month</p>
      <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#2E3B4E;">
        ${data.challenge.title}
      </p>
      <p style="margin:0 0 12px;font-size:14px;color:#4B5563;line-height:1.6;">
        ${data.challenge.description}
      </p>
      <a href="${data.challenge.href}" style="${linkStyle}">Join the Challenge</a>
    </div>

    <div style="${sectionStyle}">
      <p style="${sectionTitleStyle}">Featured Story</p>
      <p style="margin:0 0 8px;font-size:14px;color:#4B5563;line-height:1.6;">
        <em>"${data.featuredStory.excerpt}"</em>
      </p>
      <p style="margin:0 0 12px;font-size:13px;color:#9CA3AF;">
        - ${data.featuredStory.authorName}
      </p>
      <a href="${data.featuredStory.href}" style="${linkStyle}">Read the Full Story</a>
    </div>

    <div style="${sectionStyle}">
      <p style="${sectionTitleStyle}">Resource Spotlight</p>
      <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#2E3B4E;">
        ${data.resourceSpotlight.title}
      </p>
      <p style="margin:0 0 12px;font-size:14px;color:#4B5563;line-height:1.6;">
        ${data.resourceSpotlight.description}
      </p>
      <a href="${data.resourceSpotlight.href}" style="${linkStyle}">Download the Guide</a>
    </div>

    ${crisisFooter}`,
    "hello",
    {
      unsubscribe: true,
    }
  );
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
