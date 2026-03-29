import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/challenges - return active challenge + past challenges
export async function GET() {
  try {
    const db = supabaseAdmin();

    // Current active challenge
    const { data: active } = await db
      .from("challenges")
      .select("*")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    // Past challenges (not active, ordered by date desc)
    const { data: past } = await db
      .from("challenges")
      .select("*")
      .eq("is_active", false)
      .order("year", { ascending: false })
      .order("month", { ascending: false })
      .limit(6);

    return NextResponse.json({
      active: active || null,
      past: past || [],
    });
  } catch (error) {
    console.error("Challenges GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}

// POST /api/challenges - join a challenge
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challenge_id, email, name } = body;

    if (!challenge_id) {
      return NextResponse.json(
        { error: "challenge_id is required" },
        { status: 400 }
      );
    }

    const db = supabaseAdmin();

    // Verify the challenge exists
    const { data: challenge, error: challengeErr } = await db
      .from("challenges")
      .select("id, participant_count, title")
      .eq("id", challenge_id)
      .maybeSingle();

    if (challengeErr || !challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    // Insert participant
    const { error: insertErr } = await db
      .from("challenge_participants")
      .insert({
        challenge_id,
        email: email?.trim() || null,
        name: name?.trim() || null,
      });

    if (insertErr) {
      console.error("Challenge join insert error:", insertErr);
      return NextResponse.json(
        { error: "Failed to join challenge" },
        { status: 500 }
      );
    }

    // Increment participant count
    const newCount = (challenge.participant_count || 0) + 1;
    await db
      .from("challenges")
      .update({ participant_count: newCount, updated_at: new Date().toISOString() })
      .eq("id", challenge_id);

    return NextResponse.json(
      {
        success: true,
        participant_count: newCount,
        challenge_title: challenge.title,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Challenges POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
