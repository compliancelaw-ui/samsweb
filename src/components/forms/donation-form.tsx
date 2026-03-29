"use client";

import { useState } from "react";
import { Loader2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoneypotField } from "@/components/ui/honeypot-field";

const PRESET_AMOUNTS = [25, 50, 100, 250];

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [donationType, setDonationType] = useState<"one-time" | "recurring">(
    "one-time"
  );
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const effectiveAmount = isCustom
    ? parseFloat(customAmount) || 0
    : selectedAmount || 0;

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (effectiveAmount < 1) {
      setSubmitError("Please select or enter a donation amount of at least $1.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const honeypotValue = formData.get("website_url");

      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          donation_type: donationType,
          donor_name: donorName || undefined,
          donor_email: donorEmail || undefined,
          is_anonymous: isAnonymous,
          campaign: "general",
          ...(honeypotValue ? { website_url: honeypotValue } : {}),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Something went wrong");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <HoneypotField />

      {/* Donation type toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Donation frequency
        </label>
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            type="button"
            onClick={() => setDonationType("one-time")}
            className={cn(
              "px-6 py-3 text-sm font-semibold rounded-md transition-all",
              donationType === "one-time"
                ? "bg-white text-teal shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            One-time
          </button>
          <button
            type="button"
            onClick={() => setDonationType("recurring")}
            className={cn(
              "px-6 py-3 text-sm font-semibold rounded-md transition-all",
              donationType === "recurring"
                ? "bg-white text-teal shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Amount selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select an amount
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handlePresetClick(amount)}
              className={cn(
                "py-3 px-4 rounded-lg border-2 text-lg font-semibold transition-all",
                !isCustom && selectedAmount === amount
                  ? "border-teal bg-teal-50 text-teal"
                  : "border-gray-200 text-gray-700 hover:border-teal-200 hover:bg-teal-50/50"
              )}
            >
              ${amount}
            </button>
          ))}
          <button
            type="button"
            onClick={handleCustomClick}
            className={cn(
              "py-3 px-4 rounded-lg border-2 text-lg font-semibold transition-all",
              isCustom
                ? "border-teal bg-teal-50 text-teal"
                : "border-gray-200 text-gray-700 hover:border-teal-200 hover:bg-teal-50/50"
            )}
          >
            Custom
          </button>
        </div>

        {/* Custom amount input */}
        {isCustom && (
          <div className="mt-4 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">
              $
            </span>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max="100000"
              step="1"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Donor info */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="donor_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="donor_name"
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              autoComplete="name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="donor_email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-gray-400">(for receipt)</span>
            </label>
            <input
              id="donor_email"
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              autoComplete="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal"
          />
          <span className="text-sm text-gray-600">
            Make my donation anonymous
          </span>
        </label>
      </div>

      {/* Error */}
      {submitError && (
        <div
          role="alert"
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
        >
          {submitError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || effectiveAmount < 1}
        className={cn(
          "w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all",
          "bg-teal text-white hover:bg-teal-600 shadow-md hover:shadow-lg",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
        ) : (
          <Heart className="w-5 h-5" aria-hidden="true" />
        )}
        {isSubmitting
          ? "Redirecting to checkout..."
          : `Donate $${effectiveAmount.toLocaleString()}${donationType === "recurring" ? "/month" : ""}`}
      </button>

      <p className="text-xs text-gray-400 text-center">
        You will be redirected to Stripe for secure payment processing.
        Sam&apos;s OATH is a 501(c)(3) public charity. Your donation is
        tax-deductible to the extent allowed by law.
      </p>
    </form>
  );
}
