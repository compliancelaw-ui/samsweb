import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/admin/content/history?id={content_id} — fetch version history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin()
      .from("site_content_history")
      .select("*")
      .eq("content_id", id)
      .order("version", { ascending: false });

    if (error) {
      console.error("Content history fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch content history" },
        { status: 500 }
      );
    }

    return NextResponse.json({ history: data || [] });
  } catch (error) {
    console.error("Admin content history GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
