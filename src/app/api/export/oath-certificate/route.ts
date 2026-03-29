import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// SamsOath "Hopeful Twilight" branding
const TEAL = rgb(0.24, 0.67, 0.66); // #3EABA8
const PRIMARY = rgb(0.29, 0.44, 0.65); // #4A6FA5
const SAGE = rgb(0.48, 0.72, 0.48); // #7AB87A
const ORANGE = rgb(0.91, 0.59, 0.44); // #E8956F
const SLATE = rgb(0.18, 0.23, 0.31); // #2E3B4E
const GOLD = rgb(0.76, 0.6, 0.2);
const WHITE = rgb(1, 1, 1);
const LIGHT_BG = rgb(0.97, 0.97, 0.99);
const GRAY = rgb(0.55, 0.55, 0.6);

/**
 * GET /api/export/oath-certificate?name=John+Smith&date=2026-03-26
 * Generates a personalized OATH certificate as a PDF.
 * No auth required - this is for OATH takers to download.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || "A Friend of Sam";
    const dateParam = searchParams.get("date");
    const dateStr = dateParam
      ? new Date(dateParam).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

    const pdf = await PDFDocument.create();
    const fontBold = await pdf.embedFont(StandardFonts.TimesRomanBold);
    const fontItalic = await pdf.embedFont(StandardFonts.TimesRomanItalic);
    const fontRegular = await pdf.embedFont(StandardFonts.TimesRoman);
    const fontSans = await pdf.embedFont(StandardFonts.HelveticaBold);
    const fontSansReg = await pdf.embedFont(StandardFonts.Helvetica);

    // Landscape letter
    const PAGE_W = 792;
    const PAGE_H = 612;
    const page = pdf.addPage([PAGE_W, PAGE_H]);

    // Background
    page.drawRectangle({
      x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: LIGHT_BG,
    });

    // Decorative border - outer
    page.drawRectangle({
      x: 20, y: 20, width: PAGE_W - 40, height: PAGE_H - 40,
      borderColor: SLATE, borderWidth: 3,
    });

    // Decorative border - inner
    page.drawRectangle({
      x: 30, y: 30, width: PAGE_W - 60, height: PAGE_H - 60,
      borderColor: TEAL, borderWidth: 1,
    });

    // Corner accents
    const corners = [
      { x: 27, y: 27 }, { x: PAGE_W - 33, y: 27 },
      { x: 27, y: PAGE_H - 33 }, { x: PAGE_W - 33, y: PAGE_H - 33 },
    ];
    for (const c of corners) {
      page.drawRectangle({ x: c.x, y: c.y, width: 6, height: 6, color: GOLD });
    }

    // Top color bar
    const barY = PAGE_H - 50;
    const barW = (PAGE_W - 80) / 4;
    [TEAL, PRIMARY, SAGE, ORANGE].forEach((color, i) => {
      page.drawRectangle({
        x: 40 + i * barW, y: barY, width: barW, height: 4, color,
      });
    });

    let y = PAGE_H - 75;

    // "Certificate of Commitment"
    const headerText = "Certificate of Commitment";
    const headerWidth = fontBold.widthOfTextAtSize(headerText, 13);
    page.drawText(headerText, {
      x: (PAGE_W - headerWidth) / 2, y, size: 13, font: fontBold, color: GOLD,
    });
    y -= 32;

    // "Sam's OATH" title
    const titleText = "Sam's OATH";
    const titleWidth = fontSans.widthOfTextAtSize(titleText, 40);
    page.drawText(titleText, {
      x: (PAGE_W - titleWidth) / 2, y, size: 40, font: fontSans, color: SLATE,
    });
    y -= 20;

    // Tagline
    const tagline = "What's hidden doesn't heal.";
    const taglineWidth = fontItalic.widthOfTextAtSize(tagline, 12);
    page.drawText(tagline, {
      x: (PAGE_W - taglineWidth) / 2, y, size: 12, font: fontItalic, color: TEAL,
    });
    y -= 28;

    // O - A - T - H with words and descriptions
    const oathItems = [
      { letter: "O", word: "Openness", color: TEAL, desc: "To speak honestly, without shame" },
      { letter: "A", word: "Authenticity", color: PRIMARY, desc: "To show up as you truly are" },
      { letter: "T", word: "Togetherness", color: SAGE, desc: "To stand with others" },
      { letter: "H", word: "Healing", color: ORANGE, desc: "To pursue growth and hope" },
    ];

    const spacing = 160;
    const startX = (PAGE_W - spacing * 3) / 2;
    for (let i = 0; i < oathItems.length; i++) {
      const item = oathItems[i];
      const cx = startX + i * spacing;

      // Circle
      page.drawCircle({ x: cx, y: y - 2, size: 14, color: item.color });

      // Letter in circle
      const lw = fontSans.widthOfTextAtSize(item.letter, 16);
      page.drawText(item.letter, {
        x: cx - lw / 2, y: y - 8, size: 16, font: fontSans, color: WHITE,
      });

      // Word below circle
      const ww = fontSansReg.widthOfTextAtSize(item.word, 10);
      page.drawText(item.word, {
        x: cx - ww / 2, y: y - 24, size: 10, font: fontSansReg, color: item.color,
      });

      // Description below word
      const dw = fontRegular.widthOfTextAtSize(item.desc, 7);
      page.drawText(item.desc, {
        x: cx - dw / 2, y: y - 35, size: 7, font: fontRegular, color: GRAY,
      });
    }
    y -= 52;

    // Separator
    page.drawLine({
      start: { x: 120, y }, end: { x: PAGE_W - 120, y },
      thickness: 0.5, color: TEAL,
    });
    y -= 16;

    // "This certifies that"
    const certText = "This certifies that";
    const certWidth = fontItalic.widthOfTextAtSize(certText, 11);
    page.drawText(certText, {
      x: (PAGE_W - certWidth) / 2, y, size: 11, font: fontItalic, color: SLATE,
    });
    y -= 32;

    // Name (large)
    const nameSize = name.length > 20 ? 26 : 30;
    const nameWidth = fontBold.widthOfTextAtSize(name, nameSize);
    page.drawText(name, {
      x: (PAGE_W - nameWidth) / 2, y, size: nameSize, font: fontBold, color: SLATE,
    });
    y -= 8;

    // Name underline
    const lineStart = (PAGE_W - nameWidth) / 2 - 20;
    const lineEnd = (PAGE_W + nameWidth) / 2 + 20;
    page.drawLine({
      start: { x: lineStart, y }, end: { x: lineEnd, y },
      thickness: 0.75, color: GOLD,
    });
    y -= 18;

    // "has taken Sam's OATH, pledging to choose"
    const pledgeText = "has taken Sam's OATH, pledging to choose";
    const pledgeWidth = fontItalic.widthOfTextAtSize(pledgeText, 11);
    page.drawText(pledgeText, {
      x: (PAGE_W - pledgeWidth) / 2, y, size: 11, font: fontItalic, color: SLATE,
    });
    y -= 18;

    // Colored pledge words in a row
    const pledgeWords = [
      { word: "Openness", color: TEAL },
      { sep: " · " },
      { word: "Authenticity", color: PRIMARY },
      { sep: " · " },
      { word: "Togetherness", color: SAGE },
      { sep: " · " },
      { word: "Healing", color: ORANGE },
    ] as Array<{ word?: string; color?: ReturnType<typeof rgb>; sep?: string }>;

    let totalPledgeWidth = 0;
    for (const pw of pledgeWords) {
      const text = pw.word || pw.sep || "";
      const font = pw.word ? fontSans : fontRegular;
      totalPledgeWidth += font.widthOfTextAtSize(text, 12);
    }
    let px = (PAGE_W - totalPledgeWidth) / 2;
    for (const pw of pledgeWords) {
      const text = pw.word || pw.sep || "";
      const font = pw.word ? fontSans : fontRegular;
      const color = pw.color || GRAY;
      const w = font.widthOfTextAtSize(text, 12);
      page.drawText(text, { x: px, y, size: 12, font, color });
      px += w;
    }
    y -= 28;

    // Quote
    const quote = '"The opposite of addiction is not sobriety; it is community."';
    const quoteWidth = fontItalic.widthOfTextAtSize(quote, 10);
    page.drawText(quote, {
      x: (PAGE_W - quoteWidth) / 2, y, size: 10, font: fontItalic, color: GRAY,
    });
    y -= 14;
    const quoteAttr = "- Sam Sheeder";
    const qaWidth = fontRegular.widthOfTextAtSize(quoteAttr, 8);
    page.drawText(quoteAttr, {
      x: (PAGE_W - qaWidth) / 2, y, size: 8, font: fontRegular, color: GRAY,
    });
    y -= 28;

    // Separator
    page.drawLine({
      start: { x: 200, y }, end: { x: PAGE_W - 200, y },
      thickness: 0.5, color: TEAL,
    });
    y -= 18;

    // Date
    const dateLabel = `Taken on ${dateStr}`;
    const dateLabelWidth = fontRegular.widthOfTextAtSize(dateLabel, 11);
    page.drawText(dateLabel, {
      x: (PAGE_W - dateLabelWidth) / 2, y, size: 11, font: fontRegular, color: SLATE,
    });
    y -= 20;

    // samsoath.org
    const urlText = "samsoath.org";
    const urlWidth = fontSans.widthOfTextAtSize(urlText, 10);
    page.drawText(urlText, {
      x: (PAGE_W - urlWidth) / 2, y, size: 10, font: fontSans, color: TEAL,
    });

    // Bottom color bar
    [TEAL, PRIMARY, SAGE, ORANGE].forEach((color, i) => {
      page.drawRectangle({
        x: 40 + i * barW, y: 42, width: barW, height: 4, color,
      });
    });

    // Serialize
    const pdfBytes = await pdf.save();
    const safeName = name.replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `SamsOATH_Certificate_${safeName}.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("[export/oath-certificate] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 },
    );
  }
}
