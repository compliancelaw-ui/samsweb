"use client";

import { useEffect, useCallback } from "react";
import { LogOut } from "lucide-react";

const SAFE_REDIRECT_URL = "https://www.google.com";

/**
 * EscapeButton — a "Quick Exit" safety component for sensitive sites.
 *
 * When activated (click or ESC key) it:
 *   1. Blanks the page content immediately
 *   2. Replaces the current history entry with a benign URL
 *   3. Redirects to google.com
 *
 * This is a standard pattern on substance-use and mental-health sites,
 * allowing visitors to hide the page quickly if someone walks in.
 */
export function EscapeButton() {
  const escape = useCallback(() => {
    // 1. Blank the page instantly so nothing is visible while the redirect loads
    if (typeof document !== "undefined") {
      document.body.style.display = "none";
      document.title = "";
    }

    // 2. Replace the current history entry so the Back button won't return here
    if (typeof window !== "undefined") {
      window.location.replace(SAFE_REDIRECT_URL);
    }
  }, []);

  // Listen for the ESC key globally
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        escape();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [escape]);

  return (
    <button
      type="button"
      onClick={escape}
      aria-label="Quick exit — leave this site immediately (or press Escape)"
      title="Quick exit (ESC)"
      className="fixed bottom-3 right-3 z-[60] inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50/90 px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm backdrop-blur transition-all hover:bg-red-100 hover:text-red-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 sm:bottom-4 sm:right-4"
    >
      <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Quick Exit</span>
    </button>
  );
}
