import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { checkHoneypot } from "@/lib/honeypot";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

const toolkitSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Anti-spam: honeypot check
    const honeypotResponse = checkHoneypot(body);
    if (honeypotResponse) return honeypotResponse;

    // Rate limiting (reuse newsletter limits)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const rateCheck = checkRateLimit(
      ip,
      "toolkit",
      RATE_LIMITS.newsletter.max,
      RATE_LIMITS.newsletter.window
    );
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateCheck.resetIn) } }
      );
    }

    // Validate
    const result = toolkitSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, name } = result.data;

    // Upsert into newsletter_subscribers with source "workplace-toolkit"
    const { error } = await supabaseAdmin()
      .from("newsletter_subscribers")
      .upsert(
        {
          email,
          first_name: name || null,
          source: "workplace-toolkit",
          interests: ["workplace"],
          is_active: true,
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("[workplace/toolkit] Subscriber upsert error:", error);
      // Don't block the download if the subscriber insert fails
    }

    // Return the download URL
    return NextResponse.json(
      {
        message: "Success",
        downloadUrl: "/api/resources/workplace-toolkit/download",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[workplace/toolkit] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
