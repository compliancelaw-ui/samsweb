import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/admin/media — list all media items
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin()
      .from("media_library")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin media fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch media" },
        { status: 500 }
      );
    }

    return NextResponse.json({ items: data || [] });
  } catch (error) {
    console.error("Admin media GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/media — add a media record (URL-based, not file upload)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename, file_url, mime_type, alt_text, usage_context, width, height, file_size } = body;

    if (!filename?.trim() || !file_url?.trim()) {
      return NextResponse.json(
        { error: "Filename and file_url are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin()
      .from("media_library")
      .insert({
        filename: filename.trim(),
        original_filename: filename.trim(),
        file_url: file_url.trim(),
        mime_type: mime_type || null,
        alt_text: alt_text?.trim() || null,
        usage_context: usage_context?.trim() || null,
        width: width || null,
        height: height || null,
        file_size: file_size || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Media create error:", error);
      return NextResponse.json(
        { error: "Failed to add media" },
        { status: 500 }
      );
    }

    return NextResponse.json({ item: data }, { status: 201 });
  } catch (error) {
    console.error("Admin media POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/media — update alt text or usage context
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, alt_text, usage_context } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Media ID is required" },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};
    if (alt_text !== undefined) updates.alt_text = alt_text?.trim() || null;
    if (usage_context !== undefined) updates.usage_context = usage_context?.trim() || null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No updates provided" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin()
      .from("media_library")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Media update error:", error);
      return NextResponse.json(
        { error: "Failed to update media" },
        { status: 500 }
      );
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    console.error("Admin media PATCH error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/media — delete a media item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Media ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin()
      .from("media_library")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Media delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete media" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin media DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
