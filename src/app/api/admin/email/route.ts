import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { brandedEmailHtml, getFromAddress } from "@/lib/email-template";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { alias, to, subject, body, audience, isNewsletter } =
      await request.json();

    if (!alias || !subject || !body) {
      return NextResponse.json(
        { error: "alias, subject, and body are required" },
        { status: 400 }
      );
    }

    const fromAddress = getFromAddress(alias);
    const html = brandedEmailHtml(body, alias, {
      unsubscribe: isNewsletter,
    });

    // Individual email
    if (to && !isNewsletter) {
      await sendEmail({ from: fromAddress, to, subject, html });
      return NextResponse.json({ success: true, sent: 1 });
    }

    // Newsletter / bulk send to audience
    if (isNewsletter) {
      const db = supabaseAdmin();
      let recipients: string[] = [];

      if (audience === "oath" || audience === "all") {
        const { data: oaths } = await db
          .from("oath_submissions")
          .select("email")
          .not("email", "is", null)
          .neq("email", "");
        if (oaths) {
          recipients.push(...oaths.map((r) => r.email).filter(Boolean));
        }
      }

      if (audience === "subscribers" || audience === "all") {
        const { data: subs } = await db
          .from("newsletter_subscribers")
          .select("email")
          .eq("subscribed", true);
        if (subs) {
          recipients.push(...subs.map((r) => r.email).filter(Boolean));
        }
      }

      if (audience === "ambassadors" || audience === "all") {
        const { data: ambos } = await db
          .from("ambassadors")
          .select("email");
        if (ambos) {
          recipients.push(...ambos.map((r) => r.email).filter(Boolean));
        }
      }

      // Deduplicate
      recipients = Array.from(new Set(recipients.map((e) => e.toLowerCase())));

      if (recipients.length === 0) {
        return NextResponse.json(
          { error: "No recipients found for this audience" },
          { status: 400 }
        );
      }

      // Send in batches of 50 (Resend batch limit)
      let sent = 0;
      const batchSize = 50;
      for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        // Send individually to avoid exposing recipients to each other
        await Promise.all(
          batch.map((email) =>
            sendEmail({ from: fromAddress, to: email, subject, html }).catch(
              (err) => console.error(`Failed to send to ${email}:`, err)
            )
          )
        );
        sent += batch.length;
      }

      // Log the campaign
      try {
        await db.from("email_campaigns").insert({
          subject,
          body,
          audience: audience || "all",
          from_alias: alias,
          recipients_count: sent,
          status: "sent",
          sent_at: new Date().toISOString(),
        });
      } catch {
        // Campaign logging is non-critical
      }

      return NextResponse.json({ success: true, sent });
    }

    return NextResponse.json(
      { error: "Provide 'to' for individual email or set isNewsletter for bulk" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Admin email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
