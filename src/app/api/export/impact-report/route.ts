import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// SamsOath "Hopeful Twilight" branding
const PRIMARY = rgb(0.2, 0.25, 0.45);
const TEAL = rgb(0.24, 0.67, 0.66);
const SAGE = rgb(0.48, 0.72, 0.48);
const ORANGE = rgb(0.91, 0.59, 0.44);
const WHITE = rgb(1, 1, 1);
const GRAY = rgb(0.45, 0.45, 0.45);
const LIGHT_BG = rgb(0.96, 0.97, 0.99);

/**
 * GET /api/export/impact-report
 * Generates an impact report PDF for board/donors.
 * Protected by admin cookie (middleware handles auth).
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin access
    const adminCookie = request.cookies.get("admin-access");
    if (adminCookie?.value !== "granted") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = supabaseAdmin();

    // Query all impact metrics in parallel
    const [
      oathsTotal,
      oathsThisMonth,
      oathsByCategory,
      stateBreakdown,
      ambassadorCount,
      storiesTotal,
      storiesPublished,
      subscriberCount,
    ] = await Promise.all([
      db.from("oath_submissions").select("*", { count: "exact", head: true }),
      db
        .from("oath_submissions")
        .select("*", { count: "exact", head: true })
        .gte(
          "created_at",
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
          ).toISOString(),
        ),
      // Category breakdown
      Promise.all([
        db
          .from("oath_submissions")
          .select("*", { count: "exact", head: true })
          .eq("category", "supporting"),
        db
          .from("oath_submissions")
          .select("*", { count: "exact", head: true })
          .eq("category", "supporter"),
        db
          .from("oath_submissions")
          .select("*", { count: "exact", head: true })
          .eq("category", "hope"),
      ]),
      // States represented
      db.from("oath_submissions").select("state"),
      db
        .from("ambassador_applications")
        .select("*", { count: "exact", head: true }),
      db
        .from("story_submissions")
        .select("*", { count: "exact", head: true }),
      db
        .from("story_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "published"),
      db
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true),
    ]);

    // Count unique states
    const uniqueStates = new Set(
      (stateBreakdown.data || [])
        .map((r: { state: string }) => r.state)
        .filter(Boolean),
    );

    const [supportingCount, supporterCount, hopeCount] = oathsByCategory;

    // Build PDF
    const pdf = await PDFDocument.create();
    const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);

    const PAGE_W = 612;
    const PAGE_H = 792;
    const MARGIN = 50;
    const CONTENT_W = PAGE_W - 2 * MARGIN;
    const page = pdf.addPage([PAGE_W, PAGE_H]);

    let y = PAGE_H;

    // ---- Header Banner ----
    page.drawRectangle({
      x: 0,
      y: PAGE_H - 120,
      width: PAGE_W,
      height: 120,
      color: PRIMARY,
    });

    page.drawText("Sam's OATH", {
      x: MARGIN,
      y: PAGE_H - 45,
      size: 28,
      font: fontBold,
      color: WHITE,
    });
    page.drawText("Impact Report", {
      x: MARGIN,
      y: PAGE_H - 70,
      size: 16,
      font: fontRegular,
      color: TEAL,
    });

    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    page.drawText(`Generated: ${dateStr}`, {
      x: MARGIN,
      y: PAGE_H - 95,
      size: 9,
      font: fontRegular,
      color: rgb(0.7, 0.75, 0.85),
    });

    // Tagline on right
    const tagline = "What's hidden doesn't heal.";
    const taglineW = fontRegular.widthOfTextAtSize(tagline, 11);
    page.drawText(tagline, {
      x: PAGE_W - MARGIN - taglineW,
      y: PAGE_H - 95,
      size: 11,
      font: fontRegular,
      color: rgb(0.7, 0.75, 0.85),
    });

    y = PAGE_H - 150;

    // ---- Key Metrics (big stat cards) ----
    const metrics = [
      {
        value: `${oathsTotal.count || 0}`,
        label: "Total OATH Takers",
        color: TEAL,
      },
      {
        value: `${uniqueStates.size}`,
        label: "States Represented",
        color: PRIMARY,
      },
      {
        value: `${ambassadorCount.count || 0}`,
        label: "Ambassadors",
        color: SAGE,
      },
      {
        value: `${storiesTotal.count || 0}`,
        label: "Stories Submitted",
        color: ORANGE,
      },
    ];

    const cardW = (CONTENT_W - 30) / 4;
    const cardH = 70;
    for (let i = 0; i < metrics.length; i++) {
      const cx = MARGIN + i * (cardW + 10);
      page.drawRectangle({
        x: cx,
        y: y - cardH,
        width: cardW,
        height: cardH,
        color: LIGHT_BG,
        borderColor: metrics[i].color,
        borderWidth: 1.5,
      });

      // Value
      const valW = fontBold.widthOfTextAtSize(metrics[i].value, 24);
      page.drawText(metrics[i].value, {
        x: cx + (cardW - valW) / 2,
        y: y - 32,
        size: 24,
        font: fontBold,
        color: metrics[i].color,
      });

      // Label
      const lblW = fontRegular.widthOfTextAtSize(metrics[i].label, 8);
      page.drawText(metrics[i].label, {
        x: cx + (cardW - lblW) / 2,
        y: y - 52,
        size: 8,
        font: fontRegular,
        color: GRAY,
      });
    }
    y -= cardH + 30;

    // ---- Section: OATH Category Breakdown ----
    page.drawRectangle({
      x: MARGIN,
      y: y - 22,
      width: CONTENT_W,
      height: 24,
      color: PRIMARY,
    });
    page.drawText("OATH Category Breakdown", {
      x: MARGIN + 10,
      y: y - 18,
      size: 11,
      font: fontBold,
      color: WHITE,
    });
    y -= 42;

    const categories = [
      {
        name: "Supporting a Loved One",
        count: supportingCount.count || 0,
        color: TEAL,
      },
      {
        name: "Standing with Others",
        count: supporterCount.count || 0,
        color: SAGE,
      },
      {
        name: "Seeking Hope & Recovery",
        count: hopeCount.count || 0,
        color: ORANGE,
      },
    ];

    const total = categories.reduce((s, c) => s + c.count, 0) || 1;
    const barMaxW = CONTENT_W - 200;

    for (const cat of categories) {
      const pct = Math.round((cat.count / total) * 100);
      const barW = Math.max(2, (cat.count / total) * barMaxW);

      page.drawText(cat.name, {
        x: MARGIN,
        y,
        size: 9,
        font: fontRegular,
        color: PRIMARY,
      });

      // Bar background
      page.drawRectangle({
        x: MARGIN + 160,
        y: y - 2,
        width: barMaxW,
        height: 14,
        color: LIGHT_BG,
      });

      // Bar fill
      page.drawRectangle({
        x: MARGIN + 160,
        y: y - 2,
        width: barW,
        height: 14,
        color: cat.color,
      });

      // Count + percentage
      page.drawText(`${cat.count} (${pct}%)`, {
        x: MARGIN + 170 + barMaxW,
        y,
        size: 9,
        font: fontBold,
        color: PRIMARY,
      });

      y -= 26;
    }

    y -= 10;

    // ---- Section: Monthly Growth ----
    page.drawRectangle({
      x: MARGIN,
      y: y - 22,
      width: CONTENT_W,
      height: 24,
      color: PRIMARY,
    });
    page.drawText("Current Month Snapshot", {
      x: MARGIN + 10,
      y: y - 18,
      size: 11,
      font: fontBold,
      color: WHITE,
    });
    y -= 42;

    const monthMetrics = [
      { label: "New OATH takers this month", value: `${oathsThisMonth.count || 0}` },
      { label: "Published stories", value: `${storiesPublished.count || 0}` },
      { label: "Newsletter subscribers", value: `${subscriberCount.count || 0}` },
    ];

    for (const m of monthMetrics) {
      page.drawText(m.label, {
        x: MARGIN + 8,
        y,
        size: 10,
        font: fontRegular,
        color: PRIMARY,
      });
      page.drawText(m.value, {
        x: MARGIN + CONTENT_W - 60,
        y,
        size: 12,
        font: fontBold,
        color: TEAL,
      });
      y -= 20;
    }

    y -= 10;

    // ---- Section: Geographic Reach ----
    page.drawRectangle({
      x: MARGIN,
      y: y - 22,
      width: CONTENT_W,
      height: 24,
      color: PRIMARY,
    });
    page.drawText("Geographic Reach", {
      x: MARGIN + 10,
      y: y - 18,
      size: 11,
      font: fontBold,
      color: WHITE,
    });
    y -= 42;

    const statesArray = Array.from(uniqueStates).sort() as string[];
    // Display states in rows of 10
    const statesPerRow = 10;
    for (let row = 0; row < Math.ceil(statesArray.length / statesPerRow); row++) {
      const rowStates = statesArray.slice(
        row * statesPerRow,
        (row + 1) * statesPerRow,
      );
      const stateText = rowStates.join("   ");
      page.drawText(stateText, {
        x: MARGIN + 8,
        y,
        size: 10,
        font: fontBold,
        color: PRIMARY,
      });
      y -= 18;
    }

    if (uniqueStates.size >= 50) {
      y -= 4;
      page.drawText("All 50 states represented!", {
        x: MARGIN + 8,
        y,
        size: 10,
        font: fontBold,
        color: TEAL,
      });
      y -= 18;
    }

    // ---- Footer ----
    y -= 20;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_W - MARGIN, y },
      thickness: 0.5,
      color: GRAY,
    });
    y -= 16;

    page.drawText("Sam's OATH  -  samsoath.org", {
      x: MARGIN,
      y,
      size: 9,
      font: fontBold,
      color: TEAL,
    });

    const missionText =
      "A national movement to break silence around substance use and mental health.";
    const missionW = fontRegular.widthOfTextAtSize(missionText, 8);
    page.drawText(missionText, {
      x: PAGE_W - MARGIN - missionW,
      y,
      size: 8,
      font: fontRegular,
      color: GRAY,
    });

    // Serialize
    const pdfBytes = await pdf.save();
    const fileDate = new Date().toISOString().slice(0, 10);
    const filename = `SamsOATH_Impact_Report_${fileDate}.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("[export/impact-report] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate impact report" },
      { status: 500 },
    );
  }
}
