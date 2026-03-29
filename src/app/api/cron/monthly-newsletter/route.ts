import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail, generateMonthlyNewsletter, type MonthlyNewsletterData } from "@/lib/email";
import { getFromAddress } from "@/lib/email-template";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

// GET /api/cron/monthly-newsletter - Send monthly newsletter to all active subscribers
// Runs on the 1st of each month at 10am ET (14:00 UTC) via Vercel Cron
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (!secret || secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = supabaseAdmin();

    // Gather newsletter content from the database

    // 1. Current challenge (most recent active challenge)
    const { data: currentChallenge } = await db
      .from("challenges")
      .select("title, description, slug")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // 2. Featured story (most recent published + featured, or just most recent published)
    const { data: featuredStory } = await db
      .from("story_submissions")
      .select("author_name, excerpt, slug")
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false })
      .limit(1)
      .single();

    // Build newsletter data with fallbacks
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const now = new Date();
    const monthName = monthNames[now.getMonth()];

    // Conversation starters rotate by month
    const conversationStarters = [
      {
        topic: "How do you check in with the people you love?",
        prompt:
          "This month, try asking someone you care about how they are really doing. Not the surface answer. The real one. Sometimes the simplest question, asked with genuine curiosity, opens a door that has been closed for years.",
      },
      {
        topic: "What does support actually look like?",
        prompt:
          "Supporting a family member through substance use or mental health challenges is not one-size-fits-all. This month, talk to someone you trust about what support looks like for your family. What has helped? What has not?",
      },
      {
        topic: "When did you first learn to stay silent?",
        prompt:
          "Many families learn silence young. Someone told us not to talk about it, and we listened. This month, reflect on where that silence started, and consider what might change if you chose differently now.",
      },
      {
        topic: "Who in your life needs to hear they are not alone?",
        prompt:
          "Chances are, someone in your circle is carrying something they have not shared. This month, be the person who makes it safe to talk. You do not need to have answers. You just need to be willing to listen.",
      },
      {
        topic: "What would your family look like without shame?",
        prompt:
          "Shame thrives in hiding. This month, imagine what your family conversations would sound like if shame were not in the room. Then try having one of those conversations for real.",
      },
      {
        topic: "How do you take care of yourself while caring for someone else?",
        prompt:
          "Families supporting someone through recovery often forget to take care of themselves. This month, do one thing that is just for you. Rest is not selfish. It is essential.",
      },
      {
        topic: "What would you tell your younger self about what your family has been through?",
        prompt:
          "Looking back, many of us wish we had known sooner that we were not alone. This month, write a letter (even if just in your head) to your younger self. What would you say? What do you know now that you wish you knew then?",
      },
      {
        topic: "Who taught you what strength looks like?",
        prompt:
          "We often confuse strength with silence. This month, think about the people in your life who modeled real strength: vulnerability, honesty, asking for help. What can you learn from them?",
      },
      {
        topic: "What is one conversation you have been putting off?",
        prompt:
          "There is usually one conversation we know we need to have but keep avoiding. This month, consider whether now is the time. It does not have to be perfect. It just has to be honest.",
      },
      {
        topic: "How has openness changed your family?",
        prompt:
          "If you have been practicing openness, whether through Sam's OATH or on your own, reflect on what has shifted. Has a relationship changed? Has a conversation surprised you? Share what you have noticed with someone you trust.",
      },
      {
        topic: "What does healing mean to your family?",
        prompt:
          "Healing is not a destination. It looks different for every family. This month, ask someone you love what healing means to them. You might be surprised by the answer, and the conversation itself might be part of it.",
      },
      {
        topic: "How do you keep going when it is hard?",
        prompt:
          "Some months are harder than others. If this is one of those months, know that the Sam's OATH community is here. Reach out, read a story, take the challenge, or simply sit with the knowledge that you are not carrying this alone.",
      },
    ];

    const starterIndex = now.getMonth();
    const conversationStarter = conversationStarters[starterIndex];

    const newsletterData: MonthlyNewsletterData = {
      conversationStarter,
      challenge: currentChallenge
        ? {
            title: currentChallenge.title,
            description: currentChallenge.description || "Join this month's community challenge.",
            href: `https://samsoath.org/challenges`,
          }
        : {
            title: `${monthName} Community Challenge`,
            description:
              "A new challenge is coming soon. Check the challenges page for updates.",
            href: "https://samsoath.org/challenges",
          },
      featuredStory: featuredStory
        ? {
            authorName: featuredStory.author_name,
            excerpt:
              featuredStory.excerpt ||
              "Read this family's story on samsoath.org.",
            href: `https://samsoath.org/stories/${featuredStory.slug}`,
          }
        : {
            authorName: "A Sam's OATH Family",
            excerpt:
              "Every family has a story. Read the ones that have been shared, and consider sharing yours.",
            href: "https://samsoath.org/stories",
          },
      resourceSpotlight: {
        title: "Supporting Someone You Love",
        description:
          "A practical guide for families walking alongside someone through substance use or mental health challenges. Written by people who have been there.",
        href: "https://samsoath.org/resources/guides",
      },
    };

    // Fetch all active newsletter subscribers
    const { data: subscribers, error: subError } = await db
      .from("newsletter_subscribers")
      .select("email, first_name")
      .eq("is_active", true);

    if (subError) {
      console.error("Error fetching newsletter subscribers:", subError);
      return NextResponse.json(
        { error: "Failed to fetch subscribers", details: subError.message },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        sent: 0,
        message: "No active subscribers",
      });
    }

    let sent = 0;
    const errors: string[] = [];

    for (const subscriber of subscribers) {
      try {
        const html = generateMonthlyNewsletter(
          subscriber.first_name || null,
          newsletterData
        );

        await sendEmail({
          from: getFromAddress("hello"),
          to: subscriber.email,
          subject: `${monthName} Update from Sam's OATH`,
          html,
        });

        sent++;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error";
        errors.push(`Failed: ${subscriber.email} - ${message}`);
        console.error(
          `Failed to send newsletter to ${subscriber.email}:`,
          err
        );
      }
    }

    return NextResponse.json({
      success: true,
      total: subscribers.length,
      sent,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Monthly newsletter cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
