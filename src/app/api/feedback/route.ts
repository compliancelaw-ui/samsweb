import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { feedbackSchema } from "@/lib/validators";
import { checkHoneypot } from "@/lib/honeypot";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { notifyAdmin } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Anti-spam
    const honeypotResponse = checkHoneypot(body);
    if (honeypotResponse) return honeypotResponse;

    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const rateCheck = checkRateLimit(
      ip,
      "feedback",
      RATE_LIMITS.contact.max,
      RATE_LIMITS.contact.window
    );
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateCheck.resetIn) } }
      );
    }

    // Validate
    const result = feedbackSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Insert into contact_messages with type "feedback"
    const { error } = await supabaseAdmin()
      .from("contact_messages")
      .insert({
        sender_name: data.name || "Anonymous",
        sender_email: data.email || null,
        message_type: "feedback",
        subject: "Feedback: How can we help?",
        body: [
          `**Role:** ${data.role || "Not specified"}`,
          "",
          `**Biggest challenge:**\n${data.biggest_challenge}`,
          data.what_would_help
            ? `\n**What would help:**\n${data.what_would_help}`
            : "",
          data.anything_else
            ? `\n**Anything else:**\n${data.anything_else}`
            : "",
        ]
          .filter(Boolean)
          .join("\n"),
        priority: "normal",
      });

    if (error) {
      console.error("Feedback insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit feedback" },
        { status: 500 }
      );
    }

    // Notify admin
    notifyAdmin(
      "New feedback submission",
      `<strong>${data.name || "Anonymous"}</strong> shared feedback:<br/><br/><strong>Challenge:</strong> ${data.biggest_challenge.slice(0, 300)}${data.what_would_help ? `<br/><br/><strong>What would help:</strong> ${data.what_would_help.slice(0, 300)}` : ""}`
    );

    return NextResponse.json(
      { message: "Feedback received. Thank you." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
