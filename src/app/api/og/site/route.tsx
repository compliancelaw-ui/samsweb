import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * GET /api/og/site
 * Generates the default OG image for samsoath.org social sharing.
 * Branded with OATH colors and logo text.
 */
export async function GET() {
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
        {/* OATH letters */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "32px" }}>
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
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "28px",
                  fontWeight: 700,
                }}
              >
                {item.letter}
              </div>
              <span
                style={{
                  color: "rgba(255,255,255,0.7)",
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
            fontSize: "52px",
            fontWeight: 800,
            color: "white",
            marginBottom: "12px",
            letterSpacing: "-1px",
          }}
        >
          Sam&apos;s OATH
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "22px",
            fontStyle: "italic",
            color: "#3EABA8",
            marginBottom: "24px",
          }}
        >
          What&apos;s hidden doesn&apos;t heal.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          A national movement breaking the silence around substance use and mental health.
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
