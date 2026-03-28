import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendDripEmail, getNextDripDay, DRIP_SEQUENCE } from "@/lib/email-drips";

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

    return NextResponse.json({
      success: true,
      processed: oathsNeedingDrip.length,
      sent,
      skipped,
      completed,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("OATH drip cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
