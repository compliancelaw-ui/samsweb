import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// SamsOath "Hopeful Twilight" branding
const TEAL = rgb(0.24, 0.67, 0.66); // #3EABA8
const PRIMARY = rgb(0.2, 0.25, 0.45); // deep navy/twilight
const SAGE = rgb(0.48, 0.72, 0.48); // #7AB87A
const ORANGE = rgb(0.91, 0.59, 0.44); // #E8956F
const GOLD = rgb(0.76, 0.6, 0.2);
const WHITE = rgb(1, 1, 1);
const LIGHT_BG = rgb(0.97, 0.97, 0.99);

const OATH_TEXT = [
  "I choose OPENNESS - to speak honestly about what my family",
  "and I have experienced, without shame.",
  "",
  "I choose AUTHENTICITY - to show up as I truly am, not as",
  "the world expects me to be.",
  "",
  "I choose TOGETHERNESS - to stand with others who are",
  "facing these challenges, because no one should face them alone.",
  "",
  "I choose HEALING - to pursue recovery, growth, and hope,",
  "for myself and for those I love.",
];

/**
 * GET /api/export/oath-certificate?name=John+Smith&date=2026-03-26
 * Generates a personalized OATH certificate as a PDF.
 * No auth required - this is for OATH takers to download.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || "A Friend";
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

    // Landscape letter
    const PAGE_W = 792;
    const PAGE_H = 612;
    const page = pdf.addPage([PAGE_W, PAGE_H]);

    // Background
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_W,
      height: PAGE_H,
      color: LIGHT_BG,
    });

    // Decorative border - outer
    const borderInset = 20;
    page.drawRectangle({
      x: borderInset,
      y: borderInset,
      width: PAGE_W - 2 * borderInset,
      height: PAGE_H - 2 * borderInset,
      borderColor: PRIMARY,
      borderWidth: 3,
    });

    // Decorative border - inner
    const innerInset = 30;
    page.drawRectangle({
      x: innerInset,
      y: innerInset,
      width: PAGE_W - 2 * innerInset,
      height: PAGE_H - 2 * innerInset,
      borderColor: TEAL,
      borderWidth: 1,
    });

    // Corner accents (small squares at each inner border corner)
    const corners = [
      { x: innerInset - 3, y: innerInset - 3 },
      { x: PAGE_W - innerInset - 3, y: innerInset - 3 },
      { x: innerInset - 3, y: PAGE_H - innerInset - 3 },
      { x: PAGE_W - innerInset - 3, y: PAGE_H - innerInset - 3 },
    ];
    for (const c of corners) {
      page.drawRectangle({
        x: c.x,
        y: c.y,
        width: 6,
        height: 6,
        color: GOLD,
      });
    }

    let y = PAGE_H - 65;

    // "Certificate of Commitment" header
    const headerText = "Certificate of Commitment";
    const headerWidth = fontBold.widthOfTextAtSize(headerText, 14);
    page.drawText(headerText, {
      x: (PAGE_W - headerWidth) / 2,
      y,
      size: 14,
      font: fontBold,
      color: GOLD,
    });
    y -= 36;

    // "Sam's OATH" title
    const titleText = "Sam's OATH";
    const titleWidth = fontSans.widthOfTextAtSize(titleText, 36);
    page.drawText(titleText, {
      x: (PAGE_W - titleWidth) / 2,
      y,
      size: 36,
      font: fontSans,
      color: PRIMARY,
    });
    y -= 22;

    // Tagline
    const tagline = "What's hidden doesn't heal.";
    const taglineWidth = fontItalic.widthOfTextAtSize(tagline, 12);
    page.drawText(tagline, {
      x: (PAGE_W - taglineWidth) / 2,
      y,
      size: 12,
      font: fontItalic,
      color: TEAL,
    });
    y -= 16;

    // O - A - T - H letters with colors
    const oathLetters = [
      { letter: "O", word: "Openness", color: TEAL },
      { letter: "A", word: "Authenticity", color: PRIMARY },
      { letter: "T", word: "Togetherness", color: SAGE },
      { letter: "H", word: "Healing", color: ORANGE },
    ];

    const letterSpacing = 120;
    const startX = (PAGE_W - letterSpacing * 3) / 2 - 10;
    for (let i = 0; i < oathLetters.length; i++) {
      const lx = startX + i * letterSpacing;
      // Circle
      const circleR = 12;
      page.drawCircle({
        x: lx,
        y: y - 2,
        size: circleR,
        color: oathLetters[i].color,
      });
      // Letter
      const lw = fontSans.widthOfTextAtSize(oathLetters[i].letter, 14);
      page.drawText(oathLetters[i].letter, {
        x: lx - lw / 2,
        y: y - 7,
        size: 14,
        font: fontSans,
        color: WHITE,
      });
      // Word below
      const ww = fontRegular.widthOfTextAtSize(oathLetters[i].word, 9);
      page.drawText(oathLetters[i].word, {
        x: lx - ww / 2,
        y: y - 22,
        size: 9,
        font: fontRegular,
        color: oathLetters[i].color,
      });
    }
    y -= 44;

    // Separator line
    page.drawLine({
      start: { x: 100, y },
      end: { x: PAGE_W - 100, y },
      thickness: 0.5,
      color: TEAL,
    });
    y -= 18;

    // "This certifies that"
    const certText = "This certifies that";
    const certWidth = fontItalic.widthOfTextAtSize(certText, 11);
    page.drawText(certText, {
      x: (PAGE_W - certWidth) / 2,
      y,
      size: 11,
      font: fontItalic,
      color: PRIMARY,
    });
    y -= 28;

    // Name (large, emphasized)
    const nameWidth = fontBold.widthOfTextAtSize(name, 24);
    page.drawText(name, {
      x: (PAGE_W - nameWidth) / 2,
      y,
      size: 24,
      font: fontBold,
      color: PRIMARY,
    });
    y -= 8;

    // Underline the name
    const nameLineStart = (PAGE_W - nameWidth) / 2 - 20;
    const nameLineEnd = (PAGE_W + nameWidth) / 2 + 20;
    page.drawLine({
      start: { x: nameLineStart, y },
      end: { x: nameLineEnd, y },
      thickness: 0.75,
      color: GOLD,
    });
    y -= 18;

    // "has taken Sam's OATH, pledging:"
    const pledgeText = "has taken Sam's OATH, pledging:";
    const pledgeWidth = fontItalic.widthOfTextAtSize(pledgeText, 11);
    page.drawText(pledgeText, {
      x: (PAGE_W - pledgeWidth) / 2,
      y,
      size: 11,
      font: fontItalic,
      color: PRIMARY,
    });
    y -= 22;

    // OATH text
    for (const line of OATH_TEXT) {
      if (line === "") {
        y -= 6;
        continue;
      }
      const lineWidth = fontRegular.widthOfTextAtSize(line, 9);
      page.drawText(line, {
        x: (PAGE_W - lineWidth) / 2,
        y,
        size: 9,
        font: fontRegular,
        color: PRIMARY,
      });
      y -= 13;
    }

    y -= 10;

    // Separator
    page.drawLine({
      start: { x: 200, y },
      end: { x: PAGE_W - 200, y },
      thickness: 0.5,
      color: TEAL,
    });
    y -= 20;

    // Date
    const dateLabel = `Taken on ${dateStr}`;
    const dateLabelWidth = fontRegular.widthOfTextAtSize(dateLabel, 11);
    page.drawText(dateLabel, {
      x: (PAGE_W - dateLabelWidth) / 2,
      y,
      size: 11,
      font: fontRegular,
      color: PRIMARY,
    });
    y -= 22;

    // samsoath.org
    const urlText = "samsoath.org";
    const urlWidth = fontSans.widthOfTextAtSize(urlText, 10);
    page.drawText(urlText, {
      x: (PAGE_W - urlWidth) / 2,
      y,
      size: 10,
      font: fontSans,
      color: TEAL,
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
