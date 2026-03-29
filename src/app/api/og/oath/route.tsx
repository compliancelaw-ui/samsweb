import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * GET /api/og/oath?name=John+Smith
 * Generates a 1200x630 OG image for social sharing after taking Sam's OATH.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "A Friend";
  const date = searchParams.get("date")
    ? new Date(searchParams.get("date")!).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2E3B4E 0%, #4A6FA5 50%, #3EABA8 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Inner card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "24px",
            padding: "48px 64px",
            border: "2px solid rgba(255,255,255,0.2)",
            maxWidth: "1000px",
          }}
        >
          {/* OATH letters */}
          <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
            {[
              { letter: "O", word: "Openness", color: "#3EABA8" },
              { letter: "A", word: "Authenticity", color: "#4A6FA5" },
              { letter: "T", word: "Togetherness", color: "#7AB87A" },
              { letter: "H", word: "Healing", color: "#E8956F" },
            ].map((item) => (
              <div
                key={item.letter}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  {item.letter}
                </div>
                <span
                  style={{
                    color: item.color,
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {item.word}
                </span>
              </div>
            ))}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "8px",
              fontWeight: 500,
            }}
          >
            Sam&apos;s OATH Certificate
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "42px",
              fontWeight: 700,
              color: "white",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            {name}
          </div>

          {/* Commitment text */}
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            chose openness over silence
          </div>

          {/* Date */}
          <div
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "20px",
            }}
          >
            {date}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "16px",
              fontStyle: "italic",
              color: "#3EABA8",
            }}
          >
            What&apos;s hidden doesn&apos;t heal.
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
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
