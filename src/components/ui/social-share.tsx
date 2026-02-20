"use client";

import { useState, useCallback } from "react";
import { Link, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  SVG brand icons (Lucide doesn't ship brand/logo icons)            */
/* ------------------------------------------------------------------ */

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  variant?: "inline" | "floating";
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function openPopup(href: string) {
  const width = 600;
  const height = 400;
  const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - height) / 2);
  window.open(
    href,
    "share",
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SocialShare({
  url,
  title,
  description: _description,
  variant = "inline",
  className,
}: SocialShareProps) {
  // _description is accepted for forward-compatibility (e.g. OpenGraph enrichment)
  void _description;
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleLinkedIn = useCallback(() => {
    openPopup(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    );
  }, [encodedUrl]);

  const handleFacebook = useCallback(() => {
    openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);
  }, [encodedUrl]);

  const handleTwitter = useCallback(() => {
    openPopup(
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    );
  }, [encodedUrl, encodedTitle]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const isFloating = variant === "floating";

  const buttonBase =
    "inline-flex items-center justify-center rounded-lg border border-primary-100 bg-white text-gray-600 shadow-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2";

  const buttonSize = isFloating ? "h-11 w-11" : "h-10 gap-2 px-4 text-sm";

  const iconSize = isFloating ? "h-5 w-5" : "h-4 w-4";

  return (
    <div
      className={cn(
        isFloating
          ? "fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3"
          : "flex flex-wrap items-center gap-3",
        className
      )}
      role="group"
      aria-label="Share this page"
    >
      {/* LinkedIn */}
      <button
        type="button"
        onClick={handleLinkedIn}
        className={cn(buttonBase, buttonSize, "hover:text-[#0A66C2]")}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <LinkedInIcon className={iconSize} />
        {!isFloating && <span>LinkedIn</span>}
      </button>

      {/* Facebook */}
      <button
        type="button"
        onClick={handleFacebook}
        className={cn(buttonBase, buttonSize, "hover:text-[#1877F2]")}
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <FacebookIcon className={iconSize} />
        {!isFloating && <span>Facebook</span>}
      </button>

      {/* X (Twitter) */}
      <button
        type="button"
        onClick={handleTwitter}
        className={cn(buttonBase, buttonSize, "hover:text-gray-900")}
        aria-label="Share on X (Twitter)"
        title="Share on X (Twitter)"
      >
        <XIcon className={iconSize} />
        {!isFloating && <span>X</span>}
      </button>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopyLink}
        className={cn(
          buttonBase,
          buttonSize,
          copied
            ? "border-sage-200 bg-sage-50 text-sage-600"
            : "hover:text-primary"
        )}
        aria-label={copied ? "Link copied" : "Copy link to clipboard"}
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? (
          <>
            <Check className={iconSize} />
            {!isFloating && <span>Copied!</span>}
          </>
        ) : (
          <>
            <Link className={iconSize} />
            {!isFloating && <span>Copy link</span>}
          </>
        )}
      </button>
    </div>
  );
}
