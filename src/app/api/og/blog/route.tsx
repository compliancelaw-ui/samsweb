import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * GET /api/og/blog?title=...&author=...&date=...
 * Generates branded OG images for blog posts.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "Sam's OATH Updates";
  const author = searchParams.get("author") || "";
  const date = searchParams.get("date") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #2E3B4E 0%, #4A6FA5 60%, #3EABA8 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Top bar: OATH pills + category */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "auto" }}>
          {[
            { letter: "O", color: "#3EABA8" },
            { letter: "A", color: "#4A6FA5" },
            { letter: "T", color: "#7AB87A" },
            { letter: "H", color: "#E8956F" },
          ].map((item) => (
            <div
              key={item.letter}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              {item.letter}
            </div>
          ))}
          <div
            style={{
              marginLeft: "12px",
              color: "#3EABA8",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Updates
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "40px" : "48px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: "24px",
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Author + date row */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "auto" }}>
          {author && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#7AB87A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                {author.charAt(0).toUpperCase()}
              </div>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "18px", fontWeight: 500 }}>
                {author}
              </span>
            </div>
          )}
          {date && (
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
              {date}
            </span>
          )}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "60px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.4)",
            fontWeight: 600,
          }}
        >
          samsoath.org
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
