// OATH Taker Nurture Sequence
// 8-email drip triggered after someone takes Sam's OATH
//
// Story Submission Follow-Up Sequence
// 2-email drip triggered after someone submits a story
//
// Conventions:
// - Person-first language (never "addict," always "person with substance use disorder")
// - Compassionate, non-judgmental tone
// - Crisis resources in every email
// - No emoji

import { brandedEmailHtml, getFromAddress } from "./email-template";
import { sendEmail } from "./email";

// ---------------------------------------------------------------------------
// Drip Definitions
// ---------------------------------------------------------------------------

export interface DripEmail {
  day: number;
  subject: string;
  buildHtml: (name: string) => string;
}

const CRISIS_FOOTER = `
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

export const DRIP_SEQUENCE: DripEmail[] = [
  // Day 0: Welcome
  {
    day: 0,
    subject: "You took a powerful step - Sam's OATH",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">Welcome, ${name}.</h1>
        <p>
          You just took Sam's OATH, a commitment to Openness, Authenticity,
          Togetherness, and Healing. That step matters more than you know.
        </p>
        <p>
          Right now, your pin is on the movement map. Every pin represents
          someone who chose to break the silence around substance use and
          mental health. You are part of something bigger now.
        </p>
        <p>
          Over the next month, we will share stories, resources, and ways
          you can make a real difference. No pressure, no guilt, just a
          community that believes what's hidden doesn't heal.
        </p>
        <p><strong>Here is what comes next:</strong></p>
        <ul style="color:#4B5563;line-height:1.8;">
          <li>In a few days, we will talk about why your words matter</li>
          <li>We will introduce you to others who have taken the OATH</li>
          <li>We will share resources you can bring to your workplace or school</li>
        </ul>
        <p>
          Thank you for standing with us. Every conversation chips away at the
          silence.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "See the Movement Map", href: "https://samsoath.org/map" },
          unsubscribe: true,
        }
      ),
  },

  // Day 3: The power of your words
  {
    day: 3,
    subject: "The power of your words - Sam's OATH",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">Your words carry weight, ${name}.</h1>
        <p>
          When we talk about substance use and mental health, the words
          we choose shape how people feel about themselves and whether they
          seek help. Small shifts in language can open doors that shame has
          kept locked for years.
        </p>
        <p>
          Saying "person with substance use disorder" instead of "addict"
          reminds everyone, including the person struggling, that they are a
          whole human being, not defined by a diagnosis.
        </p>
        <p>
          Saying "they are in recovery" instead of "they are clean" removes
          the implication that someone was dirty to begin with.
        </p>
        <p>
          These are not small things. Research shows that stigmatizing language
          directly reduces the likelihood that a person will seek treatment.
          Your words can literally change whether someone gets help.
        </p>
        <p><strong>One thing you can do today:</strong></p>
        <p>
          Share why you took Sam's OATH. A quick post, a message to a friend,
          a conversation over coffee. You do not need to have all the answers.
          You just need to be willing to talk.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "Share Your Story", href: "https://samsoath.org/share-your-story" },
          unsubscribe: true,
        }
      ),
  },

  // Day 7: You're not alone
  {
    day: 7,
    subject: "You're not alone in this - Sam's OATH",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">You are not alone, ${name}.</h1>
        <p>
          One week ago, you took Sam's OATH. Since then, others across the
          country have done the same. Each one carrying their own story,
          their own reasons, their own hope that things can be different.
        </p>
        <p>
          That is the thing about silence: it convinces us we are the only
          ones. When one person in 484 LinkedIn comments said "I thought I
          was the only one," 483 others felt the same way.
        </p>
        <p>
          You are surrounded by people who understand what it means to love
          someone through substance use, to grieve, to hope, and to refuse
          to be quiet about it.
        </p>
        <p>
          <strong>Want to go deeper?</strong> Consider becoming a Sam's OATH
          Ambassador. Ambassadors bring the movement to their communities
          through events, conversations, and workplace programs. No special
          qualifications needed, just a willingness to keep talking.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "Become an Ambassador", href: "https://samsoath.org/ambassadors" },
          unsubscribe: true,
        }
      ),
  },

  // Day 14: Making a difference
  {
    day: 14,
    subject: "You're making a difference - Sam's OATH",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">Two weeks in, ${name}. Here is what is happening.</h1>
        <p>
          Every person who takes Sam's OATH creates a ripple. A conversation
          at dinner. A post that a colleague sees. A friend who finally feels
          safe enough to say "my family is going through this too."
        </p>
        <p>
          Substance use and mental health challenges affect 1 in 5 adults.
          More than 100,000 people die from overdose every year in the
          United States. Behind every statistic is a family carrying a weight
          they were told to carry alone.
        </p>
        <p>
          You chose differently. And that choice has impact.
        </p>
        <p><strong>Bring Sam's OATH to your workplace or school:</strong></p>
        <ul style="color:#4B5563;line-height:1.8;">
          <li>Safe Listener Training for your team</li>
          <li>Workplace OATH programs that build compassionate culture</li>
          <li>Educational resources for schools and community groups</li>
          <li>Speaking engagements and panel discussions</li>
        </ul>
        <p>
          Every organization that opens this conversation creates a safer
          space for the people inside it.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "Workplace Programs", href: "https://samsoath.org/workplace" },
          unsubscribe: true,
        }
      ),
  },

  // Day 30: One month in
  {
    day: 30,
    subject: "One month of openness - Sam's OATH",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">One month, ${name}. Thank you.</h1>
        <p>
          A month ago, you made a commitment: Openness. Authenticity.
          Togetherness. Healing. Those four words are easy to say. Living
          them is the hard part, and the part that matters.
        </p>
        <p>
          Whether you have shared your story publicly, had a quiet
          conversation with someone who needed to hear it, or simply
          carried the awareness that silence is not the answer, you have
          made a difference.
        </p>
        <p>
          Sam's OATH started because one family decided to stop hiding.
          A LinkedIn post. 345,000 people reached. Hundreds of families
          saying "us too." That is how movements grow: one honest
          conversation at a time.
        </p>
        <p>
          <strong>Renew your commitment today.</strong> Challenge three
          people you trust to take Sam's OATH. Send them to samsoath.org.
          That is all it takes to triple your impact.
        </p>
        <p>
          And if you are able, consider supporting the foundation with a
          donation. Every dollar goes directly toward awareness campaigns,
          community events, and resources for families who need them most.
          Sam's OATH is a 501(c)(3) public charity, and all donations are
          tax-deductible.
        </p>
        <p>
          Thank you for being part of this, ${name}. What is hidden does
          not heal, but together, we are bringing it into the light.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "Support the Movement", href: "https://samsoath.org/donate" },
          unsubscribe: true,
        }
      ),
  },

  // Day 45: This month's challenge (Togetherness focus)
  {
    day: 45,
    subject: "This month's challenge: will you join us?",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">A challenge for you, ${name}.</h1>
        <p>
          Every month, the Sam's OATH community takes on a challenge together.
          It might be starting one honest conversation. It might be sharing a
          resource with someone who needs it. The specifics change, but the
          idea stays the same: we grow when we move together.
        </p>
        <p>
          That is what Togetherness means in the OATH. Not just knowing other
          people care, but acting alongside them. When hundreds of people
          across the country take on the same challenge in the same month,
          something shifts. The silence gets a little smaller.
        </p>
        <p>
          People have already joined this month's challenge. Will you be next?
        </p>
        <p>
          Each challenge is simple, practical, and designed to fit into your
          life. No fundraising goals, no pressure. Just one meaningful action
          you can take this month to keep the conversation going.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "See This Month's Challenge", href: "https://samsoath.org/challenges" },
          unsubscribe: true,
        }
      ),
  },

  // Day 60: Resources for your family (Healing focus)
  {
    day: 60,
    subject: "Free guides written for families like yours",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">${name}, these are for you.</h1>
        <p>
          Two months ago, you took Sam's OATH. Since then, we have been
          building something we wish had existed when our family needed it
          most: a library of practical, honest guides written specifically
          for families.
        </p>
        <p>
          Not clinical pamphlets. Not twelve-step workbooks. Real guidance
          for the real questions families face:
        </p>
        <ul style="color:#4B5563;line-height:1.8;">
          <li><strong>How to Talk to Your Family</strong> - starting the
          conversations that feel impossible but matter most</li>
          <li><strong>Supporting Someone You Love</strong> - what actually
          helps (and what doesn't) when someone you care about is struggling</li>
          <li><strong>What to Do in a Crisis</strong> - a clear, calm guide
          for the moments when everything feels urgent</li>
        </ul>
        <p>
          Healing is not a single moment. It is a path, and having the
          right tools makes that path a little less lonely. Every guide
          is free, downloadable, and written by people who have walked
          this road themselves.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "Browse the Resource Library", href: "https://samsoath.org/resources/guides" },
          unsubscribe: true,
        }
      ),
  },

  // Day 90: Three months of openness (Full OATH reflection)
  {
    day: 90,
    subject: "It's been three months. How has openness changed things?",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">Three months, ${name}. Look how far you have come.</h1>
        <p>
          Ninety days ago, you made a commitment. Four words that carry
          more weight than they seem:
        </p>
        <p style="font-size:18px;font-weight:600;color:#4A6FA5;margin:20px 0;">
          Openness. Authenticity. Togetherness. Healing.
        </p>
        <p>
          <strong>Openness</strong> asked you to stop hiding. To say the
          words out loud instead of carrying them in silence. Whether that
          looked like a social media post or a quiet conversation at your
          kitchen table, you chose to let the light in.
        </p>
        <p>
          <strong>Authenticity</strong> asked you to be honest about what
          your family is going through. Not the polished version. The real
          one. That honesty gave someone else permission to be honest too.
        </p>
        <p>
          <strong>Togetherness</strong> reminded you that you are not doing
          this alone. Every pin on the map, every challenge completed, every
          story shared - that is a community choosing each other.
        </p>
        <p>
          <strong>Healing</strong> is where all of this leads. Not a
          destination, but a direction. Every conversation, every resource
          shared, every hand extended moves us closer.
        </p>
        <p><strong>What comes next is up to you:</strong></p>
        <ul style="color:#4B5563;line-height:1.8;">
          <li><a href="https://samsoath.org/share-your-story" style="color:#3EABA8;text-decoration:none;font-weight:600;">Share your story</a> if you have not yet - your words could be the reason someone else speaks up</li>
          <li><a href="https://samsoath.org/challenges" style="color:#3EABA8;text-decoration:none;font-weight:600;">Take this month's challenge</a> and keep the momentum going</li>
          <li><a href="https://samsoath.org/resources/guides" style="color:#3EABA8;text-decoration:none;font-weight:600;">Download a guide</a> for your family or someone you care about</li>
          <li>Challenge three people you trust to take Sam's OATH at <a href="https://samsoath.org/take-the-oath" style="color:#3EABA8;text-decoration:none;font-weight:600;">samsoath.org</a></li>
        </ul>
        <p>
          And if Sam's OATH has meant something to you, consider making a
          donation to help us reach more families. Every dollar goes directly
          toward awareness, resources, and community programs. Sam's OATH is
          a 501(c)(3) public charity, and all donations are tax-deductible.
        </p>
        <p>
          Thank you for these three months, ${name}. What is hidden does not
          heal, but you are proving every day that openness does.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "Support the Movement", href: "https://samsoath.org/donate" },
          unsubscribe: true,
        }
      ),
  },
];

// ---------------------------------------------------------------------------
// Send a specific drip email
// ---------------------------------------------------------------------------

export async function sendDripEmail(
  to: string,
  name: string,
  dripDay: number
): Promise<boolean> {
  const drip = DRIP_SEQUENCE.find((d) => d.day === dripDay);
  if (!drip) return false;

  try {
    await sendEmail({
      from: getFromAddress("frank"),
      to,
      subject: drip.subject,
      html: drip.buildHtml(name),
    });
    return true;
  } catch (err) {
    console.error(`Failed to send drip day ${dripDay} to ${to}:`, err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Get the next drip day for a given oath creation date
// ---------------------------------------------------------------------------

export function getNextDripDay(
  oathCreatedAt: Date,
  lastDripDay: number | null
): number | null {
  const now = new Date();
  const daysSinceOath = Math.floor(
    (now.getTime() - oathCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  for (const drip of DRIP_SEQUENCE) {
    // Skip drips already sent
    if (lastDripDay !== null && drip.day <= lastDripDay) continue;
    // Check if enough days have passed
    if (daysSinceOath >= drip.day) return drip.day;
  }

  return null; // Sequence complete
}

// ---------------------------------------------------------------------------
// Story Submission Follow-Up Sequence
// ---------------------------------------------------------------------------
// Day 0 is handled by sendStoryConfirmation in email.ts (not repeated here).

export const STORY_DRIP_SEQUENCE: DripEmail[] = [
  // Day 3: Your story matters
  {
    day: 3,
    subject: "Your story matters more than you know",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">${name}, your story matters.</h1>
        <p>
          A few days ago, you shared something deeply personal with us.
          We want you to know: that took real courage. Authenticity always
          does.
        </p>
        <p>
          Research consistently shows that personal stories are one of the
          most powerful tools for changing public attitudes. A single honest
          account from a family member can do more to shift the conversation
          than a thousand statistics. When someone reads your words and
          thinks "that is my family too," the silence loses its grip.
        </p>
        <p>
          Your story is not just your story anymore. It belongs to every
          family that will read it and finally feel less alone.
        </p>
        <p>
          If you have not yet taken Sam's OATH, consider making it official.
          It is a commitment to keep doing exactly what you already did:
          choosing openness over silence.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "Take Sam's OATH", href: "https://samsoath.org/take-the-oath" },
          unsubscribe: true,
        }
      ),
  },

  // Day 14: Stories like yours are changing the conversation
  {
    day: 14,
    subject: "Stories like yours are changing the conversation",
    buildHtml: (name: string) =>
      brandedEmailHtml(
        `<h1 style="color:#4A6FA5;font-size:24px;margin:0 0 16px 0;">The conversation is growing, ${name}.</h1>
        <p>
          Since you shared your story, people have visited the stories page
          on samsoath.org. Each visit is someone looking for connection,
          looking for proof that they are not the only family carrying
          this weight.
        </p>
        <p>
          That is what Togetherness looks like. Not a rally or a hashtag,
          but one person's honesty giving another person permission to
          stop hiding.
        </p>
        <p>
          You have already done the hardest part. Now you can multiply
          your impact by inviting someone you trust to join the movement.
          Send them to samsoath.org and ask them to take the OATH. It takes
          thirty seconds and it changes the way they think about silence.
        </p>
        <p>
          Every voice that joins makes the next person's voice a little
          easier to find.
        </p>
        ${CRISIS_FOOTER}`,
        "frank",
        {
          cta: { label: "Invite Someone to Take the OATH", href: "https://samsoath.org/take-the-oath" },
          unsubscribe: true,
        }
      ),
  },
];

// ---------------------------------------------------------------------------
// Send a story drip email
// ---------------------------------------------------------------------------

export async function sendStoryDripEmail(
  to: string,
  name: string,
  dripDay: number
): Promise<boolean> {
  const drip = STORY_DRIP_SEQUENCE.find((d) => d.day === dripDay);
  if (!drip) return false;

  try {
    await sendEmail({
      from: getFromAddress("frank"),
      to,
      subject: drip.subject,
      html: drip.buildHtml(name),
    });
    return true;
  } catch (err) {
    console.error(`Failed to send story drip day ${dripDay} to ${to}:`, err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Get the next story drip day for a given story submission date
// ---------------------------------------------------------------------------

export function getNextStoryDripDay(
  storyCreatedAt: Date,
  lastDripDay: number | null
): number | null {
  const now = new Date();
  const daysSinceStory = Math.floor(
    (now.getTime() - storyCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  for (const drip of STORY_DRIP_SEQUENCE) {
    if (lastDripDay !== null && drip.day <= lastDripDay) continue;
    if (daysSinceStory >= drip.day) return drip.day;
  }

  return null;
}
