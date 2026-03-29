"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SHARE_MESSAGES = {
  facebook:
    "I just shared my family's story with Sam's OATH - a movement breaking the silence around substance use and mental health. If you've been carrying something in silence, you're not alone. samsoath.org #SamsOATH",
  linkedin:
    "Today I shared my story with Sam's OATH. Substance use and mental health challenges affect millions of families, and most suffer in silence. I chose to speak up. If your family has been touched by these challenges, there is a community waiting for you. samsoath.org",
  x: "I shared my story with @SamsOATH. What's hidden doesn't heal. samsoath.org #SamsOATH #BreakTheSilence",
};

function trackShare(platform: string) {
  // Fire and forget
  fetch("/api/share-track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content_type: "story",
      platform,
    }),
  }).catch(() => {
    // Intentionally silent - tracking should never block the user
  });
}

export function StoryShareButtons() {
  const [copied, setCopied] = useState(false);

  const siteUrl = "https://samsoath.org";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      trackShare("copy-link");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  const buttonBase =
    "inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(SHARE_MESSAGES.facebook)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook (opens in new window)"
        onClick={() => trackShare("facebook")}
        className={cn(buttonBase, "bg-blue-50 text-blue-700 hover:bg-blue-100")}
      >
        <FacebookShareIcon className="w-4 h-4" />
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn (opens in new window)"
        onClick={() => trackShare("linkedin")}
        className={cn(buttonBase, "bg-blue-50 text-blue-800 hover:bg-blue-100")}
      >
        <LinkedInIcon className="w-4 h-4" />
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_MESSAGES.x)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (opens in new window)"
        onClick={() => trackShare("x")}
        className={cn(buttonBase, "bg-gray-100 text-gray-900 hover:bg-gray-200")}
      >
        <XIcon className="w-4 h-4" />
        X / Twitter
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link to clipboard"}
        className={cn(
          buttonBase,
          copied
            ? "bg-teal-50 text-teal"
            : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal"
        )}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" aria-hidden="true" />
            Copied!
          </>
        ) : (
          <>
            <LinkIcon className="w-4 h-4" aria-hidden="true" />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
