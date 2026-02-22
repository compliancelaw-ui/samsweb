"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
          <div style={{ maxWidth: "28rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
              We&apos;re sorry — something unexpected happened. Please try again.
            </p>
            <button
              onClick={reset}
              style={{ padding: "0.75rem 1.5rem", backgroundColor: "#3EABA8", color: "white", border: "none", borderRadius: "0.5rem", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
