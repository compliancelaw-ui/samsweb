import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from "pdf-lib";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// Sam's OATH branding colors
const TEAL = rgb(0.24, 0.67, 0.66); // #3EABA8
const PRIMARY = rgb(0.18, 0.23, 0.31); // #2E3B4E
const SAGE = rgb(0.48, 0.72, 0.48); // #7AB87A
const ORANGE = rgb(0.91, 0.59, 0.44); // #E8956F
const WHITE = rgb(1, 1, 1);
const LIGHT_GRAY = rgb(0.95, 0.95, 0.97);
const GRAY_TEXT = rgb(0.35, 0.35, 0.4);

// Page dimensions (US Letter)
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN_LEFT = 60;
const MARGIN_RIGHT = 60;
const MARGIN_TOP = 72;
const MARGIN_BOTTOM = 72;
const CONTENT_WIDTH = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT;
const HEADER_HEIGHT = 50;
const FOOTER_HEIGHT = 40;

interface Fonts {
  regular: PDFFont;
  bold: PDFFont;
  italic: PDFFont;
  sans: PDFFont;
}

function drawHeader(page: PDFPage, fonts: Fonts, guideTitle: string) {
  const headerY = PAGE_H - MARGIN_TOP + 15;

  // "Sam's OATH" brand
  page.drawText("Sam's OATH", {
    x: MARGIN_LEFT,
    y: headerY,
    size: 12,
    font: fonts.sans,
    color: TEAL,
  });

  // Separator dot
  page.drawText("  |  ", {
    x: MARGIN_LEFT + fonts.sans.widthOfTextAtSize("Sam's OATH", 12),
    y: headerY,
    size: 10,
    font: fonts.regular,
    color: GRAY_TEXT,
  });

  // Guide title (truncated)
  const prefixWidth =
    fonts.sans.widthOfTextAtSize("Sam's OATH", 12) +
    fonts.regular.widthOfTextAtSize("  |  ", 10);
  const maxTitleWidth = CONTENT_WIDTH - prefixWidth;
  let displayTitle = guideTitle;
  while (
    fonts.italic.widthOfTextAtSize(displayTitle, 10) > maxTitleWidth &&
    displayTitle.length > 10
  ) {
    displayTitle = displayTitle.slice(0, -4) + "...";
  }
  page.drawText(displayTitle, {
    x: MARGIN_LEFT + prefixWidth,
    y: headerY,
    size: 10,
    font: fonts.italic,
    color: GRAY_TEXT,
  });

  // Header line
  page.drawLine({
    start: { x: MARGIN_LEFT, y: headerY - 10 },
    end: { x: PAGE_W - MARGIN_RIGHT, y: headerY - 10 },
    thickness: 0.5,
    color: TEAL,
  });
}

function drawFooter(page: PDFPage, fonts: Fonts, pageNum: number) {
  const footerY = MARGIN_BOTTOM - 20;

  // Footer line
  page.drawLine({
    start: { x: MARGIN_LEFT, y: footerY + 15 },
    end: { x: PAGE_W - MARGIN_RIGHT, y: footerY + 15 },
    thickness: 0.5,
    color: TEAL,
  });

  // Left: site and tagline
  const footerText = "samsoath.org | What's hidden doesn't heal.";
  page.drawText(footerText, {
    x: MARGIN_LEFT,
    y: footerY,
    size: 8,
    font: fonts.regular,
    color: GRAY_TEXT,
  });

  // Right: page number
  const pageText = `${pageNum}`;
  const pageTextWidth = fonts.regular.widthOfTextAtSize(pageText, 8);
  page.drawText(pageText, {
    x: PAGE_W - MARGIN_RIGHT - pageTextWidth,
    y: footerY,
    size: 8,
    font: fonts.regular,
    color: GRAY_TEXT,
  });
}

/**
 * Wraps text to fit within maxWidth, returning an array of lines.
 */
function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (font.widthOfTextAtSize(testLine, fontSize) <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * GET /api/resources/[slug]/download
 * Generates a branded PDF of the guide and returns it as a download.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Fetch the resource
    const { data: resource, error } = await supabaseAdmin()
      .from("resource_documents")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error || !resource) {
      return NextResponse.json(
        { error: "Guide not found" },
        { status: 404 }
      );
    }

    // Increment download count (fire and forget)
    supabaseAdmin()
      .from("resource_documents")
      .update({ download_count: (resource.download_count || 0) + 1 })
      .eq("id", resource.id)
      .then(() => {});

    // Create PDF
    const pdf = await PDFDocument.create();
    const fonts: Fonts = {
      regular: await pdf.embedFont(StandardFonts.TimesRoman),
      bold: await pdf.embedFont(StandardFonts.TimesRomanBold),
      italic: await pdf.embedFont(StandardFonts.TimesRomanItalic),
      sans: await pdf.embedFont(StandardFonts.HelveticaBold),
    };
    const sansRegular = await pdf.embedFont(StandardFonts.Helvetica);

    let pageNum = 0;

    const addPage = (): { page: PDFPage; y: number } => {
      pageNum++;
      const page = pdf.addPage([PAGE_W, PAGE_H]);
      // Light background
      page.drawRectangle({
        x: 0,
        y: 0,
        width: PAGE_W,
        height: PAGE_H,
        color: WHITE,
      });
      drawHeader(page, fonts, resource.title);
      drawFooter(page, fonts, pageNum);
      const startY = PAGE_H - MARGIN_TOP - HEADER_HEIGHT;
      return { page, y: startY };
    }

    // ===== COVER PAGE =====
    {
      pageNum++;
      const cover = pdf.addPage([PAGE_W, PAGE_H]);

      // Gradient-like background (two rectangles)
      cover.drawRectangle({
        x: 0,
        y: PAGE_H / 2,
        width: PAGE_W,
        height: PAGE_H / 2,
        color: PRIMARY,
      });
      cover.drawRectangle({
        x: 0,
        y: 0,
        width: PAGE_W,
        height: PAGE_H / 2,
        color: rgb(0.15, 0.19, 0.26),
      });

      // Accent bar at top
      cover.drawRectangle({
        x: 0,
        y: PAGE_H - 8,
        width: PAGE_W,
        height: 8,
        color: TEAL,
      });

      // O A T H colored circles across the page
      const oathColors = [TEAL, SAGE, ORANGE, TEAL];
      const circleY = PAGE_H - 80;
      for (let i = 0; i < 4; i++) {
        cover.drawCircle({
          x: 140 + i * 120,
          y: circleY,
          size: 6,
          color: oathColors[i],
        });
      }

      // "Sam's OATH" title
      let cy = PAGE_H - 220;
      const brandText = "Sam's OATH";
      const brandWidth = fonts.sans.widthOfTextAtSize(brandText, 16);
      cover.drawText(brandText, {
        x: (PAGE_W - brandWidth) / 2,
        y: cy,
        size: 16,
        font: fonts.sans,
        color: TEAL,
      });
      cy -= 12;

      // Tagline
      const tagline = "What's hidden doesn't heal.";
      const taglineWidth = fonts.italic.widthOfTextAtSize(tagline, 11);
      cover.drawText(tagline, {
        x: (PAGE_W - taglineWidth) / 2,
        y: cy,
        size: 11,
        font: fonts.italic,
        color: rgb(0.7, 0.7, 0.75),
      });
      cy -= 60;

      // Guide title
      const titleLines = wrapText(resource.title, fonts.sans, 28, PAGE_W - 120);
      for (const line of titleLines) {
        const lineWidth = fonts.sans.widthOfTextAtSize(line, 28);
        cover.drawText(line, {
          x: (PAGE_W - lineWidth) / 2,
          y: cy,
          size: 28,
          font: fonts.sans,
          color: WHITE,
        });
        cy -= 36;
      }
      cy -= 10;

      // Decorative line
      cover.drawLine({
        start: { x: PAGE_W / 2 - 60, y: cy },
        end: { x: PAGE_W / 2 + 60, y: cy },
        thickness: 2,
        color: TEAL,
      });
      cy -= 30;

      // Description
      if (resource.description) {
        const descLines = wrapText(
          resource.description,
          fonts.italic,
          12,
          PAGE_W - 140
        );
        for (const line of descLines) {
          const lineWidth = fonts.italic.widthOfTextAtSize(line, 12);
          cover.drawText(line, {
            x: (PAGE_W - lineWidth) / 2,
            y: cy,
            size: 12,
            font: fonts.italic,
            color: rgb(0.75, 0.75, 0.8),
          });
          cy -= 18;
        }
      }

      // Footer on cover
      const coverFooter = "samsoath.org";
      const coverFooterWidth = sansRegular.widthOfTextAtSize(coverFooter, 10);
      cover.drawText(coverFooter, {
        x: (PAGE_W - coverFooterWidth) / 2,
        y: 60,
        size: 10,
        font: sansRegular,
        color: TEAL,
      });

      const freeText = "Free Resource - Share Freely";
      const freeWidth = fonts.italic.widthOfTextAtSize(freeText, 9);
      cover.drawText(freeText, {
        x: (PAGE_W - freeWidth) / 2,
        y: 45,
        size: 9,
        font: fonts.italic,
        color: rgb(0.6, 0.6, 0.65),
      });

      drawFooter(cover, fonts, pageNum);
    }

    // ===== CONTENT PAGES =====
    const contentBlocks = resource.content.split("\n\n").filter((b: string) => b.trim());
    let { page: currentPage, y: currentY } = addPage();

    const bodyFontSize = 11;
    const bodyLineHeight = 16;
    const headingFontSize = 18;
    const headingLineHeight = 24;
    const subHeadingFontSize = 14;
    const subHeadingLineHeight = 20;
    const paragraphGap = 12;
    const headingGap = 20;
    const minY = MARGIN_BOTTOM + FOOTER_HEIGHT;

    for (const block of contentBlocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;

      // Check if it's a heading
      if (trimmed.startsWith("## ")) {
        const headingText = trimmed.replace(/^##\s*/, "");
        const headingLines = wrapText(
          headingText,
          fonts.bold,
          headingFontSize,
          CONTENT_WIDTH
        );
        const neededSpace =
          headingGap + headingLines.length * headingLineHeight + paragraphGap;

        if (currentY - neededSpace < minY) {
          ({ page: currentPage, y: currentY } = addPage());
        }

        currentY -= headingGap;

        // Teal accent bar before heading
        currentPage.drawRectangle({
          x: MARGIN_LEFT,
          y: currentY - 2,
          width: 3,
          height: headingLines.length * headingLineHeight + 4,
          color: TEAL,
        });

        for (const line of headingLines) {
          currentPage.drawText(line, {
            x: MARGIN_LEFT + 12,
            y: currentY,
            size: headingFontSize,
            font: fonts.bold,
            color: PRIMARY,
          });
          currentY -= headingLineHeight;
        }
        currentY -= paragraphGap / 2;
        continue;
      }

      if (trimmed.startsWith("### ")) {
        const subText = trimmed.replace(/^###\s*/, "");
        const subLines = wrapText(
          subText,
          fonts.bold,
          subHeadingFontSize,
          CONTENT_WIDTH
        );
        const neededSpace =
          headingGap * 0.7 + subLines.length * subHeadingLineHeight + paragraphGap;

        if (currentY - neededSpace < minY) {
          ({ page: currentPage, y: currentY } = addPage());
        }

        currentY -= headingGap * 0.7;
        for (const line of subLines) {
          currentPage.drawText(line, {
            x: MARGIN_LEFT,
            y: currentY,
            size: subHeadingFontSize,
            font: fonts.bold,
            color: PRIMARY,
          });
          currentY -= subHeadingLineHeight;
        }
        currentY -= paragraphGap / 2;
        continue;
      }

      // Regular paragraph
      const lines = wrapText(trimmed, fonts.regular, bodyFontSize, CONTENT_WIDTH);
      for (const line of lines) {
        if (currentY - bodyLineHeight < minY) {
          ({ page: currentPage, y: currentY } = addPage());
        }
        currentPage.drawText(line, {
          x: MARGIN_LEFT,
          y: currentY,
          size: bodyFontSize,
          font: fonts.regular,
          color: GRAY_TEXT,
        });
        currentY -= bodyLineHeight;
      }
      currentY -= paragraphGap;
    }

    // ===== SOURCES PAGE =====
    const sources: string[] = resource.sources || [];
    if (sources.length > 0) {
      ({ page: currentPage, y: currentY } = addPage());

      // Sources heading
      currentY -= 10;
      currentPage.drawText("Sources", {
        x: MARGIN_LEFT,
        y: currentY,
        size: headingFontSize,
        font: fonts.bold,
        color: PRIMARY,
      });
      currentY -= headingLineHeight;

      currentPage.drawLine({
        start: { x: MARGIN_LEFT, y: currentY + 4 },
        end: { x: PAGE_W - MARGIN_RIGHT, y: currentY + 4 },
        thickness: 0.5,
        color: TEAL,
      });
      currentY -= 16;

      for (let i = 0; i < sources.length; i++) {
        const sourceText = `${i + 1}. ${sources[i]}`;
        const sourceLines = wrapText(
          sourceText,
          fonts.regular,
          9,
          CONTENT_WIDTH
        );
        for (const line of sourceLines) {
          if (currentY - 14 < minY) {
            ({ page: currentPage, y: currentY } = addPage());
          }
          currentPage.drawText(line, {
            x: MARGIN_LEFT,
            y: currentY,
            size: 9,
            font: fonts.regular,
            color: GRAY_TEXT,
          });
          currentY -= 14;
        }
        currentY -= 4;
      }
    }

    // ===== CRISIS RESOURCES (LAST PAGE) =====
    {
      ({ page: currentPage, y: currentY } = addPage());

      // Crisis heading
      currentY -= 10;
      currentPage.drawRectangle({
        x: MARGIN_LEFT,
        y: currentY - 10,
        width: CONTENT_WIDTH,
        height: 40,
        color: LIGHT_GRAY,
      });
      const crisisTitle = "If You or Someone You Know Needs Help Now";
      const crisisTitleWidth = fonts.sans.widthOfTextAtSize(crisisTitle, 16);
      currentPage.drawText(crisisTitle, {
        x: (PAGE_W - crisisTitleWidth) / 2,
        y: currentY,
        size: 16,
        font: fonts.sans,
        color: PRIMARY,
      });
      currentY -= 50;

      const crisisResources = [
        {
          name: "988 Suicide & Crisis Lifeline",
          action: "Call or Text 988",
          description:
            "Free, confidential support 24/7 for anyone in suicidal crisis or emotional distress.",
          color: PRIMARY,
        },
        {
          name: "Crisis Text Line",
          action: "Text HOME to 741741",
          description:
            "Free, 24/7 crisis support via text message with a trained crisis counselor.",
          color: TEAL,
        },
        {
          name: "SAMHSA National Helpline",
          action: "Call 1-800-662-4357",
          description:
            "Free, confidential, 24/7 treatment referral and information service.",
          color: SAGE,
        },
        {
          name: "Emergency Services",
          action: "Call 911",
          description:
            "If someone is in immediate danger, call 911 or go to the nearest emergency room.",
          color: ORANGE,
        },
      ];

      for (const cr of crisisResources) {
        if (currentY - 80 < minY) {
          ({ page: currentPage, y: currentY } = addPage());
        }

        // Color accent
        currentPage.drawRectangle({
          x: MARGIN_LEFT,
          y: currentY - 50,
          width: 4,
          height: 60,
          color: cr.color,
        });

        // Name
        currentPage.drawText(cr.name, {
          x: MARGIN_LEFT + 16,
          y: currentY,
          size: 13,
          font: fonts.bold,
          color: PRIMARY,
        });
        currentY -= 18;

        // Action
        currentPage.drawText(cr.action, {
          x: MARGIN_LEFT + 16,
          y: currentY,
          size: 14,
          font: fonts.sans,
          color: cr.color,
        });
        currentY -= 18;

        // Description
        const descLines = wrapText(
          cr.description,
          fonts.regular,
          10,
          CONTENT_WIDTH - 20
        );
        for (const line of descLines) {
          currentPage.drawText(line, {
            x: MARGIN_LEFT + 16,
            y: currentY,
            size: 10,
            font: fonts.regular,
            color: GRAY_TEXT,
          });
          currentY -= 14;
        }
        currentY -= 20;
      }

      // Bottom message
      currentY -= 10;
      const bottomMsg = "You are not alone. Help is always available.";
      const bottomWidth = fonts.italic.widthOfTextAtSize(bottomMsg, 12);
      currentPage.drawText(bottomMsg, {
        x: (PAGE_W - bottomWidth) / 2,
        y: currentY,
        size: 12,
        font: fonts.italic,
        color: TEAL,
      });

      currentY -= 30;
      const brandMsg = "samsoath.org | What's hidden doesn't heal.";
      const brandMsgWidth = sansRegular.widthOfTextAtSize(brandMsg, 10);
      currentPage.drawText(brandMsg, {
        x: (PAGE_W - brandMsgWidth) / 2,
        y: currentY,
        size: 10,
        font: sansRegular,
        color: PRIMARY,
      });
    }

    // Serialize and return
    const pdfBytes = await pdf.save();
    const safeTitle = resource.title.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50);
    const filename = `SamsOATH_${safeTitle}.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("[resources/download] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
