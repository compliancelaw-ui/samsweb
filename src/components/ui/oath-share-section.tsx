"use client";

import { useState } from "react";
import { Download, Check, Link as LinkIcon } from "lucide-react";
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

const SHARE_URL = "https://samsoath.org/take-the-oath";

const SHARE_MESSAGES = {
  facebook:
    "I just took Sam's OATH - a commitment to break the silence around substance use and mental health. If your family has been touched by these challenges, you are not alone. Join me: samsoath.org/take-the-oath #SamsOATH",
  linkedin:
    "Today I took Sam's OATH - a public commitment to Openness, Authenticity, Togetherness, and Healing around substance use and mental health. Nearly 50 million Americans face substance use challenges, and most families carry this in silence. Not anymore. samsoath.org/take-the-oath",
  twitter:
    "I took Sam's OATH - 60 seconds to commit to openness about substance use and mental health. What's hidden doesn't heal. samsoath.org/take-the-oath #SamsOATH #BreakTheSilence",
};

interface OathShareSectionProps {
  name: string;
  date: string;
}

export function OathShareSection({ name, date }: OathShareSectionProps) {
  const [copied, setCopied] = useState(false);

  const encodedFb = encodeURIComponent(SHARE_MESSAGES.facebook);
  const encodedLi = encodeURIComponent(SHARE_URL);
  const encodedTw = encodeURIComponent(SHARE_MESSAGES.twitter);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  const certUrl = `/api/export/oath-certificate?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}`;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Certificate Preview & Download */}
      <div className="mb-16">
        <h2 className="text-center mb-2">Your Certificate</h2>
        <p className="text-center text-gray-600 text-lg mb-8">
          You put your name on it. That&apos;s authenticity.
        </p>

        <div className="bg-gradient-to-br from-teal/5 to-primary/5 border-2 border-teal/20 rounded-2xl p-8 md:p-12 text-center mb-6">
          <div className="border border-teal/30 rounded-lg p-6 md:p-8 bg-white/80">
            <p className="text-xs uppercase tracking-[0.3em] text-teal font-medium mb-1">
              Certificate of Commitment
            </p>
            <div className="w-12 h-px bg-teal/40 mx-auto mb-4" />
            <p className="text-sm text-gray-500 mb-1">This certifies that</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {name}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              has taken Sam&apos;s OATH on {date}
            </p>
            <p className="text-xs text-gray-400 italic max-w-sm mx-auto">
              A commitment to Openness, Authenticity, Togetherness, and Healing
              around substance use and mental health
            </p>
          </div>
        </div>

        <div className="text-center">
          <a
            href={certUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-semibold hover:bg-teal-600 shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
            Download Your Certificate
          </a>
        </div>
      </div>

      {/* Social Sharing */}
      <div>
        <h2 className="text-center mb-2">Tell the World</h2>
        <p className="text-center text-gray-600 text-lg mb-8">
          Your openness gives someone else permission to speak up
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodedFb}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook (opens in new window)"
            className="flex items-center gap-3 px-5 py-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <FacebookShareIcon className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900 text-sm">Facebook</p>
              <p className="text-xs text-gray-500 group-hover:text-gray-600">
                Share with your community
              </p>
            </div>
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedLi}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn (opens in new window)"
            className="flex items-center gap-3 px-5 py-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <LinkedInIcon className="w-5 h-5 text-blue-700" />
            <div className="text-left">
              <p className="font-medium text-gray-900 text-sm">LinkedIn</p>
              <p className="text-xs text-gray-500 group-hover:text-gray-600">
                Inspire your professional network
              </p>
            </div>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTw}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X (opens in new window)"
            className="flex items-center gap-3 px-5 py-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all group"
          >
            <XIcon className="w-5 h-5 text-gray-900" />
            <div className="text-left">
              <p className="font-medium text-gray-900 text-sm">X / Twitter</p>
              <p className="text-xs text-gray-500 group-hover:text-gray-600">
                Amplify the message
              </p>
            </div>
          </a>

          <button
            type="button"
            onClick={copyLink}
            aria-label={copied ? "Link copied" : "Copy link to clipboard"}
            className={cn(
              "flex items-center gap-3 px-5 py-4 bg-white border rounded-lg transition-all group text-left",
              copied
                ? "border-teal bg-teal-50"
                : "border-gray-200 hover:border-teal/50 hover:bg-teal-50"
            )}
          >
            {copied ? (
              <Check className="w-5 h-5 text-teal" aria-hidden="true" />
            ) : (
              <LinkIcon className="w-5 h-5 text-teal" aria-hidden="true" />
            )}
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {copied ? "Link Copied!" : "Copy Link"}
              </p>
              <p className="text-xs text-gray-500">
                {copied ? "Paste it anywhere" : "Share it your way"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
