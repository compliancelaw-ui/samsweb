"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

interface StoryShareButtonProps {
  slug: string;
  title: string;
  authorName: string;
  className?: string;
}

export function StoryShareButton({
  slug,
  title,
  authorName,
  className,
}: StoryShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${SITE_URL}/stories/${slug}`;
  const shareText = `"${title}" - ${authorName}'s story on Sam's OATH. Every voice breaks the silence a little more.`;

  const handleShare = async () => {
    try {
      // Track the share
      fetch("/api/share-track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content_type: "story",
          content_id: slug,
          platform: "copy-link",
        }),
      }).catch(() => {});

      // Try native share API first (mobile)
      if (navigator.share) {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
        return;
      }

      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // User cancelled share or clipboard failed
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={copied ? "Link copied" : `Share "${title}"`}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal transition-colors",
        copied && "text-teal",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
