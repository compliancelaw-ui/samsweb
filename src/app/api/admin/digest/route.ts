import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// Content calendar themes
const CONTENT_CALENDAR: Record<
  number,
  { theme: string; description: string; topics: string[]; hashtags: string[] }
> = {
  1: {
    theme: "Movement Monday",
    description:
      "Highlight the OATH movement — milestones, new oath-takers, community growth.",
    topics: [
      "Share how many people have taken Sam's OATH this month",
      "Spotlight a city or state where oath-takers are growing",
      "Post a quote about breaking silence and tag the movement",
      "Share a brief story about why you started Sam's OATH",
    ],
    hashtags: ["#MovementMonday", "#SamsOATH", "#BreakTheSilence"],
  },
  2: {
    theme: "Story Tuesday",
    description:
      "Share a community story or invite people to share theirs.",
    topics: [
      "Feature a recently published community story from the site",
      "Invite followers to share their story at samsoath.org/share-your-story",
      "Post a 'Did you know?' about how sharing stories reduces stigma",
      "Share a brief personal reflection about a story that moved you",
    ],
    hashtags: ["#StoryTuesday", "#ShareYourStory", "#SamsOATH"],
  },
  3: {
    theme: "Resource Wednesday",
    description:
      "Point people toward helpful resources — family guides, language tips, grief support.",
    topics: [
      "Share the Language Guide: samsoath.org/resources/language-guide",
      "Highlight the For Families resource page",
      "Post a tip from the Grief & Loss resource section",
      "Share a helpline number with a supportive message",
    ],
    hashtags: ["#ResourceWednesday", "#SubstanceUseAwareness", "#SamsOATH"],
  },
  4: {
    theme: "Thoughtful Thursday",
    description:
      "Share a thought-provoking insight, statistic, or reflection on stigma.",
    topics: [
      "Post a striking statistic about substance use or mental health stigma",
      "Share a reflection on what it means to live openly and honestly",
      "Ask a question that invites conversation (e.g., 'What would change if we stopped whispering?')",
      "Highlight how language shapes how we see substance use and recovery",
    ],
    hashtags: ["#ThoughtfulThursday", "#EndTheStigma", "#SamsOATH"],
  },
  5: {
    theme: "Feature Friday",
    description:
      "Spotlight music, an ambassador, or a partner. Celebrate the people in the movement.",
    topics: [
      "Feature a Sam's OATH original song from Apple Music",
      "Spotlight an ambassador and their impact",
      "Share a blog post or press mention",
      "Celebrate a community milestone or partnership",
    ],
    hashtags: ["#FeatureFriday", "#SamsOATHMusic", "#SamsOATH"],
  },
  6: {
    theme: "Weekend Reflection",
    description:
      "A personal, quieter tone. Reflect on Sam, family, hope, or healing.",
    topics: [
      "Share a personal memory or lesson learned from Sam",
      "Post a photo or moment that represents hope to you",
      "Write a short reflection on what the OATH means to you personally",
      "Encourage followers to take a moment of honesty with someone they love",
    ],
    hashtags: ["#WeekendReflection", "#HopeAndHealing", "#SamsOATH"],
  },
  0: {
    theme: "Weekend Reflection",
    description:
      "A personal, quieter tone. Reflect on Sam, family, hope, or healing.",
    topics: [
      "Share a personal memory or lesson learned from Sam",
      "Post a photo or moment that represents hope to you",
      "Write a short reflection on what the OATH means to you personally",
      "Encourage followers to take a moment of honesty with someone they love",
    ],
    hashtags: ["#WeekendReflection", "#HopeAndHealing", "#SamsOATH"],
  },
};

// Optimal posting times by platform
const POSTING_TIMES = [
  { platform: "Instagram", times: "11 AM - 1 PM and 7 - 9 PM ET" },
  { platform: "Facebook", times: "9 - 11 AM ET" },
  { platform: "LinkedIn", times: "7 - 8 AM and 12 PM ET" },
  { platform: "X / Twitter", times: "8 - 10 AM and 6 - 9 PM ET" },
];

function buildEmailHtml(
  dayName: string,
  dateStr: string,
  calendar: {
    theme: string;
    description: string;
    topics: string[];
    hashtags: string[];
  }
): string {
  // Pick a random topic suggestion to highlight
  const topicIndex = new Date().getDate() % calendar.topics.length;
  const highlightedTopic = calendar.topics[topicIndex];

  const topicListHtml = calendar.topics
    .map(
      (t, i) =>
        `<li style="padding: 8px 0; border-bottom: 1px solid #eef1f5;${
          i === topicIndex ? " background: #f0f7f7; padding-left: 8px; border-radius: 4px;" : ""
        }">${i === topicIndex ? "<strong>" : ""}${t}${i === topicIndex ? "</strong>" : ""}</li>`
    )
    .join("\n");

  const postingTimesHtml = POSTING_TIMES.map(
    (p) =>
      `<tr>
        <td style="padding: 6px 12px; font-weight: 600; color: #2E3B4E;">${p.platform}</td>
        <td style="padding: 6px 12px; color: #555;">${p.times}</td>
      </tr>`
  ).join("\n");

  const hashtagsHtml = calendar.hashtags
    .map(
      (h) =>
        `<span style="display: inline-block; background: #e8f4f4; color: #3EABA8; padding: 4px 10px; border-radius: 12px; margin: 3px 4px; font-size: 14px; font-weight: 500;">${h}</span>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sam's OATH — Posting Reminder</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFB;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4A6FA5, #3EABA8); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">Sam's OATH</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 15px;">Weekly Posting Reminder</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background: #ffffff; padding: 32px 24px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">

              <!-- Greeting -->
              <p style="margin: 0 0 20px; color: #2E3B4E; font-size: 16px; line-height: 1.6;">
                Good morning, Frank! It's <strong>${dayName}, ${dateStr}</strong>.
              </p>

              <!-- Today's theme -->
              <div style="background: #f0f7f7; border-left: 4px solid #3EABA8; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <h2 style="margin: 0 0 6px; color: #4A6FA5; font-size: 20px;">${calendar.theme}</h2>
                <p style="margin: 0; color: #555; font-size: 15px; line-height: 1.5;">${calendar.description}</p>
              </div>

              <!-- Suggested topics -->
              <h3 style="margin: 0 0 12px; color: #2E3B4E; font-size: 16px;">Post Ideas for Today</h3>
              <ul style="margin: 0 0 24px; padding-left: 0; list-style: none; color: #333; font-size: 15px; line-height: 1.5;">
                ${topicListHtml}
              </ul>

              <!-- Hashtags -->
              <h3 style="margin: 0 0 10px; color: #2E3B4E; font-size: 16px;">Suggested Hashtags</h3>
              <div style="margin-bottom: 24px;">
                ${hashtagsHtml}
              </div>

              <!-- Posting times -->
              <h3 style="margin: 0 0 10px; color: #2E3B4E; font-size: 16px;">Best Times to Post</h3>
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 24px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background: #f8f9fb;">
                    <th style="padding: 8px 12px; text-align: left; color: #4A6FA5; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Platform</th>
                    <th style="padding: 8px 12px; text-align: left; color: #4A6FA5; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Optimal Window</th>
                  </tr>
                </thead>
                <tbody>
                  ${postingTimesHtml}
                </tbody>
              </table>

              <!-- Quick tip -->
              <div style="background: #fdf8f4; border: 1px solid #E8956F; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="margin: 0; color: #2E3B4E; font-size: 14px; line-height: 1.5;">
                  <strong style="color: #E8956F;">Quick tip:</strong> Posts with a personal story or question get 2-3x more engagement than links alone. Try starting with "${highlightedTopic.toLowerCase().includes("share") ? "a personal anecdote" : "a question for your audience"}" today.
                </p>
              </div>

              <!-- CTA -->
              <div style="text-align: center; margin-bottom: 8px;">
                <a href="https://samsoath.org/admin" style="display: inline-block; background: #4A6FA5; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">Go to Admin Dashboard</a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #2E3B4E; padding: 20px 24px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px; line-height: 1.6;">
                This is an automated reminder from <a href="https://samsoath.org" style="color: #3EABA8; text-decoration: none;">samsoath.org</a><br>
                Sent every weekday at 8:00 AM ET
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// GET /api/admin/digest — Weekly social media posting reminder for Frank
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (!secret || secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Determine today's content calendar entry
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ...
    const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
    const dateStr = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const calendar = CONTENT_CALENDAR[dayOfWeek];

    // Build the email
    const subject = `${calendar.theme} — Your Sam's OATH Posting Reminder for ${dayName}`;
    const html = buildEmailHtml(dayName, dateStr, calendar);

    // Send via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Sam's OATH <reminders@samsoath.org>",
      to: "frank@samsoath.org",
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      theme: calendar.theme,
      day: dayName,
    });
  } catch (error) {
    console.error("Digest API error:", error);
    return NextResponse.json(
      { error: "Failed to send posting reminder" },
      { status: 500 }
    );
  }
}
