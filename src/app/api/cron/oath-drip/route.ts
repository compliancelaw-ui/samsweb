import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  sendDripEmail,
  getNextDripDay,
  DRIP_SEQUENCE,
  sendStoryDripEmail,
  getNextStoryDripDay,
  STORY_DRIP_SEQUENCE,
} from "@/lib/email-drips";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// GET /api/cron/oath-drip - Process OATH taker drip emails
// Runs daily at 10am ET (14:00 UTC) via Vercel Cron
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (!secret || secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = supabaseAdmin();

    // Ensure the oath_drip_progress table exists.
    // On first run, this creates the tracking table. Subsequent runs skip it.
    await db.rpc("exec_sql", {
      query: `
        CREATE TABLE IF NOT EXISTS oath_drip_progress (
          id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
          oath_id uuid NOT NULL REFERENCES oaths(id) ON DELETE CASCADE,
          last_drip_day integer NOT NULL DEFAULT -1,
          completed boolean NOT NULL DEFAULT false,
          updated_at timestamptz NOT NULL DEFAULT now(),
          UNIQUE(oath_id)
        );
      `,
    }).then(() => {}, () => {
      // If rpc doesn't exist, the table should be created via migration.
      // Silently continue - the query below will fail if the table doesn't exist.
      console.warn(
        "oath_drip_progress: Could not auto-create table via rpc. " +
        "Ensure the table exists via migration."
      );
    });

    // Fetch all oaths with email + optin that haven't completed the drip sequence
    const { data: oathsNeedingDrip, error: fetchError } = await db
      .from("oaths")
      .select(`
        id,
        first_name,
        email,
        email_optin,
        created_at
      `)
      .not("email", "is", null)
      .eq("email_optin", true)
      .order("created_at", { ascending: true });

    if (fetchError) {
      console.error("Error fetching oaths:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch oaths", details: fetchError.message },
        { status: 500 }
      );
    }

    if (!oathsNeedingDrip || oathsNeedingDrip.length === 0) {
      return NextResponse.json({ success: true, processed: 0, sent: 0 });
    }

    // Fetch existing drip progress
    const oathIds = oathsNeedingDrip.map((o) => o.id);
    const { data: progressRows } = await db
      .from("oath_drip_progress")
      .select("oath_id, last_drip_day, completed")
      .in("oath_id", oathIds);

    // Build a lookup map
    const progressMap = new Map<string, { last_drip_day: number; completed: boolean }>();
    for (const row of progressRows || []) {
      progressMap.set(row.oath_id, {
        last_drip_day: row.last_drip_day,
        completed: row.completed,
      });
    }

    const maxDripDay = Math.max(...DRIP_SEQUENCE.map((d) => d.day));
    let sent = 0;
    let skipped = 0;
    let completed = 0;
    const errors: string[] = [];

    for (const oath of oathsNeedingDrip) {
      if (!oath.email) continue;

      const progress = progressMap.get(oath.id);

      // Skip completed sequences
      if (progress?.completed) {
        skipped++;
        continue;
      }

      const lastDripDay = progress?.last_drip_day ?? null;
      const oathDate = new Date(oath.created_at);
      const nextDay = getNextDripDay(oathDate, lastDripDay);

      if (nextDay === null) {
        // Mark as completed
        if (progress) {
          await db
            .from("oath_drip_progress")
            .update({ completed: true, updated_at: new Date().toISOString() })
            .eq("oath_id", oath.id);
        } else {
          await db.from("oath_drip_progress").insert({
            oath_id: oath.id,
            last_drip_day: maxDripDay,
            completed: true,
            updated_at: new Date().toISOString(),
          });
        }
        completed++;
        continue;
      }

      // Send the drip email
      const success = await sendDripEmail(oath.email, oath.first_name, nextDay);

      if (success) {
        sent++;
        const isComplete = nextDay >= maxDripDay;

        if (progress) {
          await db
            .from("oath_drip_progress")
            .update({
              last_drip_day: nextDay,
              completed: isComplete,
              updated_at: new Date().toISOString(),
            })
            .eq("oath_id", oath.id);
        } else {
          await db.from("oath_drip_progress").insert({
            oath_id: oath.id,
            last_drip_day: nextDay,
            completed: isComplete,
            updated_at: new Date().toISOString(),
          });
        }
      } else {
        errors.push(`Failed: ${oath.id} (day ${nextDay})`);
      }
    }

    // -----------------------------------------------------------------
    // Story submission drip processing
    // -----------------------------------------------------------------

    // Ensure story_drip_progress table exists
    await db.rpc("exec_sql", {
      query: `
        CREATE TABLE IF NOT EXISTS story_drip_progress (
          id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
          story_id uuid NOT NULL REFERENCES story_submissions(id) ON DELETE CASCADE,
          last_drip_day integer NOT NULL DEFAULT -1,
          completed boolean NOT NULL DEFAULT false,
          updated_at timestamptz NOT NULL DEFAULT now(),
          UNIQUE(story_id)
        );
      `,
    }).then(() => {}, () => {
      console.warn(
        "story_drip_progress: Could not auto-create table via rpc. " +
        "Ensure the table exists via migration."
      );
    });

    // Fetch stories with author_email
    const { data: storiesNeedingDrip, error: storyFetchError } = await db
      .from("story_submissions")
      .select("id, author_name, author_email, created_at")
      .not("author_email", "is", null)
      .order("created_at", { ascending: true });

    let storySent = 0;
    let storySkipped = 0;
    let storyCompleted = 0;
    const storyErrors: string[] = [];

    if (storyFetchError) {
      console.error("Error fetching stories for drip:", storyFetchError);
    } else if (storiesNeedingDrip && storiesNeedingDrip.length > 0) {
      const storyIds = storiesNeedingDrip.map((s) => s.id);
      const { data: storyProgressRows } = await db
        .from("story_drip_progress")
        .select("story_id, last_drip_day, completed")
        .in("story_id", storyIds);

      const storyProgressMap = new Map<string, { last_drip_day: number; completed: boolean }>();
      for (const row of storyProgressRows || []) {
        storyProgressMap.set(row.story_id, {
          last_drip_day: row.last_drip_day,
          completed: row.completed,
        });
      }

      const maxStoryDripDay = Math.max(...STORY_DRIP_SEQUENCE.map((d) => d.day));

      for (const story of storiesNeedingDrip) {
        if (!story.author_email) continue;

        const progress = storyProgressMap.get(story.id);

        if (progress?.completed) {
          storySkipped++;
          continue;
        }

        const lastDripDay = progress?.last_drip_day ?? null;
        const storyDate = new Date(story.created_at);
        const nextDay = getNextStoryDripDay(storyDate, lastDripDay);

        if (nextDay === null) {
          if (progress) {
            await db
              .from("story_drip_progress")
              .update({ completed: true, updated_at: new Date().toISOString() })
              .eq("story_id", story.id);
          } else {
            await db.from("story_drip_progress").insert({
              story_id: story.id,
              last_drip_day: maxStoryDripDay,
              completed: true,
              updated_at: new Date().toISOString(),
            });
          }
          storyCompleted++;
          continue;
        }

        const success = await sendStoryDripEmail(
          story.author_email,
          story.author_name,
          nextDay
        );

        if (success) {
          storySent++;
          const isComplete = nextDay >= maxStoryDripDay;

          if (progress) {
            await db
              .from("story_drip_progress")
              .update({
                last_drip_day: nextDay,
                completed: isComplete,
                updated_at: new Date().toISOString(),
              })
              .eq("story_id", story.id);
          } else {
            await db.from("story_drip_progress").insert({
              story_id: story.id,
              last_drip_day: nextDay,
              completed: isComplete,
              updated_at: new Date().toISOString(),
            });
          }
        } else {
          storyErrors.push(`Failed story drip: ${story.id} (day ${nextDay})`);
        }
      }
    }

    const allErrors = [...errors, ...storyErrors];

    return NextResponse.json({
      success: true,
      oath: {
        processed: oathsNeedingDrip.length,
        sent,
        skipped,
        completed,
      },
      story: {
        processed: storiesNeedingDrip?.length || 0,
        sent: storySent,
        skipped: storySkipped,
        completed: storyCompleted,
      },
      errors: allErrors.length > 0 ? allErrors : undefined,
    });
  } catch (error) {
    console.error("OATH drip cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
