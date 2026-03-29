import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/admin/challenges/manage - list all challenges
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin()
      .from("challenges")
      .select("*")
      .order("year", { ascending: false })
      .order("month", { ascending: false });

    if (error) {
      console.error("Admin challenges fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch challenges" },
        { status: 500 }
      );
    }

    return NextResponse.json({ challenges: data || [] });
  } catch (error) {
    console.error("Admin challenges GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/challenges/manage - create a new challenge
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      challenge_text,
      month,
      year,
      category,
      badge_label,
      badge_color,
      is_active,
    } = body;

    if (!title?.trim() || !description?.trim() || !challenge_text?.trim()) {
      return NextResponse.json(
        { error: "Title, description, and challenge_text are required" },
        { status: 400 }
      );
    }

    if (!month || !year) {
      return NextResponse.json(
        { error: "Month and year are required" },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 100);

    // Check for duplicate slug
    const db = supabaseAdmin();
    const { data: existing } = await db
      .from("challenges")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    // If activating this challenge, deactivate others
    if (is_active) {
      await db
        .from("challenges")
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq("is_active", true);
    }

    const { data, error } = await db
      .from("challenges")
      .insert({
        title: title.trim(),
        slug: finalSlug,
        description: description.trim(),
        challenge_text: challenge_text.trim(),
        month,
        year,
        category: category || "conversation",
        badge_label: badge_label?.trim() || null,
        badge_color: badge_color || "#3EABA8",
        is_active: is_active || false,
      })
      .select()
      .single();

    if (error) {
      console.error("Challenge create error:", error);
      return NextResponse.json(
        { error: "Failed to create challenge" },
        { status: 500 }
      );
    }

    return NextResponse.json({ challenge: data }, { status: 201 });
  } catch (error) {
    console.error("Admin challenges POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/challenges/manage - update a challenge
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Challenge ID is required" },
        { status: 400 }
      );
    }

    const db = supabaseAdmin();
    const updates: Record<string, unknown> = {};

    if (fields.title !== undefined) updates.title = fields.title.trim();
    if (fields.description !== undefined)
      updates.description = fields.description.trim();
    if (fields.challenge_text !== undefined)
      updates.challenge_text = fields.challenge_text.trim();
    if (fields.month !== undefined) updates.month = fields.month;
    if (fields.year !== undefined) updates.year = fields.year;
    if (fields.category !== undefined) updates.category = fields.category;
    if (fields.badge_label !== undefined)
      updates.badge_label = fields.badge_label?.trim() || null;
    if (fields.badge_color !== undefined)
      updates.badge_color = fields.badge_color;
    if (fields.is_active !== undefined) {
      updates.is_active = fields.is_active;
      // If activating, deactivate all others first
      if (fields.is_active) {
        await db
          .from("challenges")
          .update({ is_active: false, updated_at: new Date().toISOString() })
          .neq("id", id)
          .eq("is_active", true);
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No updates provided" },
        { status: 400 }
      );
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await db
      .from("challenges")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Challenge update error:", error);
      return NextResponse.json(
        { error: "Failed to update challenge" },
        { status: 500 }
      );
    }

    return NextResponse.json({ challenge: data });
  } catch (error) {
    console.error("Admin challenges PATCH error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/challenges/manage - delete a challenge
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Challenge ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin()
      .from("challenges")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Challenge delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete challenge" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin challenges DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
