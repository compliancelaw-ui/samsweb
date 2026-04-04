import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * GET /api/og/story?title=...&author=...&location=...
 * Generates branded OG images for shared stories.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "A Story of Courage";
  const author = searchParams.get("author") || "";
  const location = searchParams.get("location") || "";

  const sharedBy = author
    ? location
      ? `Shared by ${author} from ${location}`
      : `Shared by ${author}`
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(145deg, #2E3B4E 0%, #4A6FA5 40%, #E8956F 100%)",
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
              color: "#E8956F",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Stories
          </div>
        </div>

        {/* Decorative quote mark */}
        <div
          style={{
            fontSize: "120px",
            fontWeight: 800,
            color: "rgba(255,255,255,0.1)",
            lineHeight: 0.8,
            marginBottom: "-20px",
            display: "flex",
          }}
        >
          {"\u201C"}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "38px" : "46px",
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

        {/* Shared by line */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "auto" }}>
          {sharedBy && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#E8956F",
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
              <span
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "18px",
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                {sharedBy}
              </span>
            </div>
          )}
        </div>

        {/* Tagline */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "60px",
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            fontStyle: "italic",
          }}
        >
          What&apos;s hidden doesn&apos;t heal.
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
