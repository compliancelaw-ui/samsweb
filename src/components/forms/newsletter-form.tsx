"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { newsletterSchema, type NewsletterFormData } from "@/lib/validators";

const INTERESTS = [
  { value: "movement_updates", label: "Movement updates" },
  { value: "new_stories", label: "New stories" },
  { value: "events_speaking", label: "Events & speaking" },
  { value: "workplace_resources", label: "Workplace resources" },
];

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      interests: [],
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 p-6 bg-teal-50 border border-teal-200 rounded-lg">
        <CheckCircle2 className="w-6 h-6 text-teal flex-shrink-0" />
        <div>
          <p className="font-semibold text-teal-800">You&apos;re signed up!</p>
          <p className="text-sm text-teal-600 mt-1">
            Thank you for joining the Sam&apos;s OATH community. Check your inbox for a welcome message.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Inline fields: email + name + button */}
      <div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="newsletter_email" className="sr-only">
              Email Address
            </label>
            <input
              id="newsletter_email"
              type="email"
              {...register("email")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.email ? "border-red-400" : "border-gray-300"
              )}
              placeholder="your@email.com"
            />
          </div>
          <div className="sm:w-48">
            <label htmlFor="newsletter_first_name" className="sr-only">
              First Name
            </label>
            <input
              id="newsletter_first_name"
              {...register("first_name")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
              placeholder="First name (optional)"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap",
              "bg-teal text-white hover:bg-teal-600 shadow-md hover:shadow-lg",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Mail className="w-5 h-5" />
            )}
            {isSubmitting ? "Signing up..." : "Subscribe"}
          </button>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}
      </div>

      {/* Interest checkboxes */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          I&apos;m interested in <span className="text-gray-400">(optional)</span>
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {INTERESTS.map((interest) => (
            <label key={interest.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={interest.value}
                {...register("interests")}
                className="w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal"
              />
              <span className="text-sm text-gray-600">{interest.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Error */}
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {submitError}
        </div>
      )}

      <p className="text-xs text-gray-400">
        We&apos;ll never share your email or spam you. Unsubscribe anytime.{" "}
        <a href="/privacy" className="underline hover:text-gray-600">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
