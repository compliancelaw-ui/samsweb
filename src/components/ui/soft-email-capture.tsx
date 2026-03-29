"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SoftEmailCaptureProps {
  className?: string;
  heading?: string;
  subtext?: string;
  source?: string;
}

export function SoftEmailCapture({
  className,
  heading = "Stay Connected",
  subtext = "We'd love to share resources and stories with you. We never share your information and you can unsubscribe anytime.",
  source,
}: SoftEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          first_name: firstName.trim() || undefined,
          interests: ["movement_updates"],
          ...(source ? { source } : {}),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={cn("max-w-lg mx-auto text-center", className)}>
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-8">
          <CheckCircle2 className="w-10 h-10 text-teal mx-auto mb-3" aria-hidden="true" />
          <p className="text-lg font-semibold text-teal-800">
            You&apos;re in. Welcome to the community.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("max-w-lg mx-auto", className)}>
      <div className="relative bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss email signup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {heading}
          </h3>
          <p className="text-gray-600 text-sm">
            {subtext}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="soft-capture-email" className="sr-only">
              Email Address
            </label>
            <input
              id="soft-capture-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
            />
          </div>

          <div>
            <label htmlFor="soft-capture-name" className="sr-only">
              First Name (optional)
            </label>
            <input
              id="soft-capture-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              placeholder="First name (optional)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all",
              "bg-teal text-white hover:bg-teal-600 shadow-md hover:shadow-lg",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                Joining...
              </>
            ) : (
              "Join the Community"
            )}
          </button>

          {error && (
            <p role="alert" className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Your email is never shared. Period.
        </p>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="block mx-auto mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
