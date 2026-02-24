"use client";

import { useState, useCallback } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SocialShare } from "@/components/ui/social-share";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Pre-written share messages                                         */
/* ------------------------------------------------------------------ */

const SHARE_MESSAGES = [
  "I just took Sam's OATH \u2014 a commitment to break the silence around substance use and mental health. Join me: samsoath.org",
  "What's hidden doesn't heal. I'm standing with @SamsOATH. Take Sam's OATH: samsoath.org",
] as const;

/* ------------------------------------------------------------------ */
/*  Message card sub-component                                         */
/* ------------------------------------------------------------------ */

function MessageCard({ message }: { message: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = message;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [message]);

  return (
    <div className="rounded-lg border border-primary-100 bg-white p-5 shadow-sm">
      <p className="text-gray-700 text-base leading-relaxed mb-4">
        &ldquo;{message}&rdquo;
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2",
          copied
            ? "bg-sage-50 text-sage-600 border border-sage-200"
            : "bg-primary-50 text-primary hover:bg-primary-100 border border-primary-100"
        )}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy message
          </>
        )}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ShareBanner component                                              */
/* ------------------------------------------------------------------ */

interface ShareBannerProps {
  className?: string;
}

export function ShareBanner({ className }: ShareBannerProps) {
  return (
    <SectionWrapper variant="light" className={className}>
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <div className="mb-8">
          <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-5">
            <Share2 className="w-7 h-7 text-teal" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Take Sam&apos;s OATH &amp; Share
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Silence ends when we speak up. Share Sam&apos;s OATH with your
            network and help more families feel seen.
          </p>
        </div>

        {/* Social share buttons */}
        <div className="mb-10">
          <SocialShare
            url="https://samsoath.org"
            title="Sam's OATH — Break the Silence"
            description="A commitment to break the silence around substance use and mental health."
            variant="inline"
            className="justify-center"
          />
        </div>

        {/* Pre-written messages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Or copy a ready-made message
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SHARE_MESSAGES.map((message) => (
              <MessageCard key={message} message={message} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
