"use client";

import { useState } from "react";
import { Check, Link as LinkIcon, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const BASE_SHARE_URL = "https://samsoath.org/take-the-oath";
const SHARE_TEXT =
  "I just took Sam's OATH — a 60-second commitment to break the silence around substance use and mental health. I'm challenging you to do the same.";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function getShareChannels(shareUrl: string) {
  return [
    {
      key: "text",
      label: "Text Message",
      icon: MessageCircle,
      color: "bg-sage-50 text-sage hover:bg-sage-100",
      getUrl: () =>
        `sms:?&body=${encodeURIComponent(`${SHARE_TEXT} ${shareUrl}`)}`,
    },
    {
      key: "email",
      label: "Email",
      icon: Mail,
      color: "bg-primary-50 text-primary hover:bg-primary-100",
      getUrl: () =>
        `mailto:?subject=${encodeURIComponent("I took Sam's OATH — will you?")}&body=${encodeURIComponent(`${SHARE_TEXT}\n\n${shareUrl}`)}`,
    },
    {
      key: "facebook",
      label: "Facebook",
      iconSvg: FacebookIcon,
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      getUrl: () =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(SHARE_TEXT)}`,
    },
    {
      key: "x",
      label: "X",
      iconSvg: XIcon,
      color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      getUrl: () =>
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      iconSvg: LinkedInIcon,
      color: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      getUrl: () =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ] as const;
}

export function ChallengeThreeFlow({ referralCode }: { referralCode?: string }) {
  const [sent, setSent] = useState(0);
  const [copied, setCopied] = useState(false);
  const SHARE_URL = referralCode
    ? `${BASE_SHARE_URL}?ref=${referralCode}`
    : BASE_SHARE_URL;
  const channels = getShareChannels(SHARE_URL);

  const handleShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
    setSent((prev) => Math.min(prev + 1, 3));
  };

  const handleTextOrEmail = (url: string) => {
    window.location.href = url;
    setSent((prev) => Math.min(prev + 1, 3));
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${SHARE_TEXT} ${SHARE_URL}`
      );
      setCopied(true);
      setSent((prev) => Math.min(prev + 1, 3));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const allSent = sent >= 3;

  return (
    <div className="max-w-xl mx-auto">
      {/* Challenge Header */}
      <div className="text-center mb-8">
        <p className="text-teal font-semibold text-sm uppercase tracking-wide mb-2">
          Your Next Step
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Challenge 3 People
        </h2>
        <p className="text-gray-600 text-lg">
          Every family that takes Sam&apos;s OATH makes it easier for the next one.
          Share it with three people you trust.
        </p>
      </div>

      {/* Progress Circles */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((num) => {
          const filled = num <= sent;
          return (
            <div
              key={num}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500",
                filled
                  ? "bg-teal text-white scale-110 shadow-lg shadow-teal/30"
                  : "bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300"
              )}
            >
              {filled ? (
                <Check className="w-6 h-6" />
              ) : (
                num
              )}
            </div>
          );
        })}
      </div>

      {/* Status Text */}
      <p className="text-center text-sm mb-6">
        {allSent ? (
          <span className="text-teal font-semibold">
            Challenge complete! You&apos;re helping the movement grow.
          </span>
        ) : (
          <span className="text-gray-500">
            {sent === 0
              ? "Pick a way to share below"
              : `${3 - sent} more to go — keep going!`}
          </span>
        )}
      </p>

      {/* Share Message Preview */}
      <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
        <p className="text-sm text-gray-500 font-medium mb-2">
          Your message:
        </p>
        <p className="text-gray-700 text-sm leading-relaxed italic">
          &ldquo;{SHARE_TEXT}&rdquo;
        </p>
      </div>

      {/* Share Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {channels.map((channel) => {
          const isTextOrEmail =
            channel.key === "text" || channel.key === "email";
          const Icon = "icon" in channel ? channel.icon : channel.iconSvg;

          return (
            <button
              key={channel.key}
              onClick={() =>
                isTextOrEmail
                  ? handleTextOrEmail(channel.getUrl())
                  : handleShare(channel.getUrl())
              }
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                channel.color
              )}
            >
              <Icon className="w-4 h-4" />
              {channel.label}
            </button>
          );
        })}
        <button
          onClick={copyLink}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all",
            copied
              ? "bg-teal-50 text-teal"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
