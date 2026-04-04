"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

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

interface PageShareButtonsProps {
  variant?: "inline" | "floating";
  text?: string;
}

export function PageShareButtons({
  variant = "inline",
  text = "Join the movement to break silence around substance use and mental health.",
}: PageShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : SITE_URL;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${text} ${shareUrl}`);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  if (variant === "floating") {
    return (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2" aria-label="Share this page" role="group">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook (opens in new window)"
          className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <FacebookShareIcon className="w-4 h-4" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (opens in new window)"
          className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <XIcon className="w-4 h-4" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn (opens in new window)"
          className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-blue-700 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <LinkedInIcon className="w-4 h-4" />
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link to clipboard"}
          className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-teal hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {copied ? <Check className="w-4 h-4 text-teal" aria-hidden="true" /> : <LinkIcon className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 mr-1">
        <Share2 className="w-4 h-4 inline mr-1" aria-hidden="true" />
        Share:
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook (opens in new window)"
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all",
          "bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        <FacebookShareIcon className="w-3.5 h-3.5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (opens in new window)"
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all",
          "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        <XIcon className="w-3.5 h-3.5" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn (opens in new window)"
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all",
          "bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        <LinkedInIcon className="w-3.5 h-3.5" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link to clipboard"}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all",
          copied
            ? "bg-teal-50 text-teal"
            : "bg-gray-100 text-gray-500 hover:bg-teal-50 hover:text-teal",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />}
      </button>
    </div>
  );
}

export function ShareCallToAction() {
  return (
    <div className="bg-gradient-to-r from-teal-50 to-primary-50 rounded-xl p-6 text-center">
      <Share2 className="w-8 h-8 mx-auto mb-3 text-teal" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Help Us Reach More Families
      </h3>
      <p className="text-gray-600 text-sm mb-4 max-w-md mx-auto">
        Every share breaks the silence a little more. Help us reach families who
        are carrying this weight alone.
      </p>
      <div className="flex justify-center">
        <PageShareButtons />
      </div>
    </div>
  );
}
