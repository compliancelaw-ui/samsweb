"use client";

import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.997 6.124a9.23 9.23 0 0 0-.24-2.19 4.71 4.71 0 0 0-1.05-1.86 4.58 4.58 0 0 0-1.86-1.05A9.23 9.23 0 0 0 18.657.8h-13.3a9.2 9.2 0 0 0-2.19.24 4.58 4.58 0 0 0-1.86 1.05A4.71 4.71 0 0 0 .257 3.93a9.23 9.23 0 0 0-.24 2.19v11.75a9.23 9.23 0 0 0 .24 2.19 4.71 4.71 0 0 0 1.05 1.86 4.58 4.58 0 0 0 1.86 1.05 9.23 9.23 0 0 0 2.19.24h13.3a9.23 9.23 0 0 0 2.19-.24 4.58 4.58 0 0 0 1.86-1.05 4.71 4.71 0 0 0 1.05-1.86 9.23 9.23 0 0 0 .24-2.19V6.124zm-6.46 5.81v5.48a2.56 2.56 0 0 1-.73 1.84 2.45 2.45 0 0 1-1.56.76 2.39 2.39 0 0 1-1.74-.47 2.1 2.1 0 0 1-.68-1.87 2.22 2.22 0 0 1 .93-1.53 3.15 3.15 0 0 1 1.87-.65c.32 0 .63.06.93.17v-3.87l-5.36 1.7v5.13a2.56 2.56 0 0 1-.73 1.84 2.45 2.45 0 0 1-1.56.76 2.39 2.39 0 0 1-1.74-.47 2.1 2.1 0 0 1-.68-1.87 2.22 2.22 0 0 1 .93-1.53 3.15 3.15 0 0 1 1.87-.65c.32 0 .63.06.93.17V9.594a1.67 1.67 0 0 1 .13-.66 1.05 1.05 0 0 1 .49-.47l5.56-1.81a.78.78 0 0 1 .6.04.67.67 0 0 1 .34.56v4.694z" />
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
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

const SOCIAL_ICON_MAP = {
  appleMusic: AppleMusicIcon,
  spotify: SpotifyIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

type SocialKey = keyof typeof SOCIAL_LINKS;

interface SocialFollowButtonsProps {
  variant?: "light" | "dark" | "colored";
  platforms?: SocialKey[];
  size?: "sm" | "md";
}

export function SocialFollowButtons({
  variant = "light",
  platforms,
  size = "md",
}: SocialFollowButtonsProps) {
  const keys = platforms || (Object.keys(SOCIAL_LINKS) as SocialKey[]);

  return (
    <div className="flex flex-wrap gap-3">
      {keys.map((key) => {
        const link = SOCIAL_LINKS[key];
        const Icon = SOCIAL_ICON_MAP[key];
        return (
          <a
            key={key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow on ${link.label}`}
            className={cn(
              "inline-flex items-center justify-center rounded-lg transition-all",
              size === "sm" ? "w-9 h-9" : "w-10 h-10",
              variant === "dark" &&
                "bg-gray-600/50 text-gray-300 hover:bg-gray-500/50 hover:text-white",
              variant === "light" &&
                "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700",
              variant === "colored" &&
                "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            <Icon className={size === "sm" ? "w-4 h-4" : "w-5 h-5"} />
          </a>
        );
      })}
    </div>
  );
}

export function SocialFollowButtonsLabeled({
  platforms,
}: {
  platforms?: SocialKey[];
}) {
  const keys = platforms || (Object.keys(SOCIAL_LINKS) as SocialKey[]);

  return (
    <div className="flex flex-wrap gap-3">
      {keys.map((key) => {
        const link = SOCIAL_LINKS[key];
        const Icon = SOCIAL_ICON_MAP[key];
        return (
          <a
            key={key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow on ${link.label}`}
            className="inline-flex items-center gap-2 bg-white text-gray-700 font-medium px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm"
          >
            <Icon className="w-5 h-5" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
