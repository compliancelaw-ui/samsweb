"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "samsoath-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't already accepted
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-14 left-0 right-0 z-40 px-4 pb-2"
      role="alert"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-3xl rounded-xl bg-white border border-gray-200 shadow-lg p-4 sm:flex sm:items-center sm:gap-4">
        <p className="text-sm text-gray-600 flex-1 mb-3 sm:mb-0">
          We use cookies for analytics to understand how visitors use our site
          and improve the experience. No personal data is sold or shared.{" "}
          <Link
            href="/privacy"
            className="text-primary font-medium hover:text-primary-600 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={handleAccept}
          className="flex-shrink-0 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
