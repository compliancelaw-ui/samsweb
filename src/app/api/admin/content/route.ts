import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/admin/content?page=home — fetch content for a page (or all if no page param)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    let query = supabaseAdmin()
      .from("site_content")
      .select("*");

    if (page) {
      query = query.eq("page_slug", page);
    }

    const { data, error } = await query
      .order("page_slug")
      .order("section_key");

    if (error) {
      console.error("Admin content fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch content" },
        { status: 500 }
      );
    }

    return NextResponse.json({ content: data || [] });
  } catch (error) {
    console.error("Admin content GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/content — upsert content (single or bulk)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Bulk seed: { items: [...] }
    if (body.items && Array.isArray(body.items)) {
      const { data, error } = await supabaseAdmin()
        .from("site_content")
        .upsert(body.items, { onConflict: "page_slug,section_key" })
        .select();

      if (error) {
        console.error("Content bulk upsert error:", error);
        return NextResponse.json(
          { error: "Failed to upsert content" },
          { status: 500 }
        );
      }

      return NextResponse.json({ items: data, count: data.length }, { status: 201 });
    }

    // Single upsert: { page_slug, section_key, content, content_type }
    const { page_slug, section_key, content, content_type } = body;

    if (!page_slug?.trim() || !section_key?.trim()) {
      return NextResponse.json(
        { error: "page_slug and section_key are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin()
      .from("site_content")
      .upsert(
        {
          page_slug: page_slug.trim(),
          section_key: section_key.trim(),
          content: content || "",
          content_type: content_type || "text",
        },
        { onConflict: "page_slug,section_key" }
      )
      .select()
      .single();

    if (error) {
      console.error("Content upsert error:", error);
      return NextResponse.json(
        { error: "Failed to upsert content" },
        { status: 500 }
      );
    }

    return NextResponse.json({ item: data }, { status: 201 });
  } catch (error) {
    console.error("Admin content POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/content — update existing content with versioning
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, content, ai_generated, ai_prompt } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    if (content === undefined || content === null) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Fetch the current record
    const { data: current, error: fetchError } = await supabaseAdmin()
      .from("site_content")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      console.error("Content fetch for versioning error:", fetchError);
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      );
    }

    // Insert the current values into site_content_history
    const { error: historyError } = await supabaseAdmin()
      .from("site_content_history")
      .insert({
        content_id: current.id,
        page_slug: current.page_slug,
        section_key: current.section_key,
        content: current.content,
        version: current.version || 1,
        ai_generated: current.ai_generated || false,
        ai_prompt: current.ai_prompt || null,
      });

    if (historyError) {
      console.error("Content history insert error:", historyError);
      return NextResponse.json(
        { error: "Failed to save content history" },
        { status: 500 }
      );
    }

    // Update the current record
    const { data, error: updateError } = await supabaseAdmin()
      .from("site_content")
      .update({
        content,
        previous_content: current.content,
        version: (current.version || 1) + 1,
        ai_generated: ai_generated ?? false,
        ai_prompt: ai_prompt ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Content update error:", updateError);
      return NextResponse.json(
        { error: "Failed to update content" },
        { status: 500 }
      );
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    console.error("Admin content PATCH error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/content — delete a content entry
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin()
      .from("site_content")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Content delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete content" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin content DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
