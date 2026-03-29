import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/admin/resources - list all resources (admin sees all, including unpublished)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin()
      .from("resource_documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin resources fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch resources" },
        { status: 500 }
      );
    }

    return NextResponse.json({ resources: data || [] });
  } catch (error) {
    console.error("Admin resources GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/resources - create a new resource
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, content, sources, tags, seo_title, seo_description } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 100);

    // Check for duplicate slug
    const { data: existing } = await supabaseAdmin()
      .from("resource_documents")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const resourceData: Record<string, unknown> = {
      title: title.trim(),
      slug: finalSlug,
      description: description?.trim() || null,
      category: category || "families",
      content: content?.trim() || "",
      sources: sources || [],
      tags: tags || [],
      seo_title: seo_title?.trim() || null,
      seo_description: seo_description?.trim() || null,
    };

    const { data, error } = await supabaseAdmin()
      .from("resource_documents")
      .insert(resourceData)
      .select()
      .single();

    if (error) {
      console.error("Resource create error:", error);
      return NextResponse.json(
        { error: "Failed to create resource" },
        { status: 500 }
      );
    }

    return NextResponse.json({ resource: data }, { status: 201 });
  } catch (error) {
    console.error("Admin resources POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/resources - update a resource
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json({ error: "Resource ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (fields.title !== undefined) updates.title = fields.title.trim();
    if (fields.description !== undefined) updates.description = fields.description?.trim() || null;
    if (fields.category !== undefined) updates.category = fields.category;
    if (fields.content !== undefined) updates.content = fields.content.trim();
    if (fields.sources !== undefined) updates.sources = fields.sources;
    if (fields.tags !== undefined) updates.tags = fields.tags;
    if (fields.is_published !== undefined) updates.is_published = fields.is_published;
    if (fields.seo_title !== undefined) updates.seo_title = fields.seo_title?.trim() || null;
    if (fields.seo_description !== undefined) updates.seo_description = fields.seo_description?.trim() || null;
    if (fields.cover_image_url !== undefined) updates.cover_image_url = fields.cover_image_url?.trim() || null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin()
      .from("resource_documents")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Resource update error:", error);
      return NextResponse.json(
        { error: "Failed to update resource" },
        { status: 500 }
      );
    }

    return NextResponse.json({ resource: data });
  } catch (error) {
    console.error("Admin resources PATCH error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/resources - delete a resource
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Resource ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin()
      .from("resource_documents")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Resource delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete resource" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin resources DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
