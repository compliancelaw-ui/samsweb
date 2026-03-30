"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { feedbackSchema, type FeedbackFormData } from "@/lib/validators";
import { HoneypotField } from "@/components/ui/honeypot-field";

const ROLE_OPTIONS = [
  { value: "family", label: "Family member of someone affected" },
  { value: "person_in_recovery", label: "Person on my own journey" },
  { value: "professional", label: "Healthcare or social work professional" },
  { value: "supporter", label: "Movement supporter" },
  { value: "other", label: "Other" },
] as const;

export function FeedbackForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const honeypotInput = document.getElementById("website_url") as HTMLInputElement | null;
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypotInput?.value || "" }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to submit feedback");
      }

      router.push("/thank-you/feedback");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <HoneypotField />

      {/* Role (optional) */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
          Which best describes you? <span className="text-gray-400">(optional)</span>
        </label>
        <select
          id="role"
          {...register("role")}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        >
          <option value="">Select one...</option>
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Biggest challenge */}
      <div>
        <label htmlFor="biggest_challenge" className="block text-sm font-medium text-gray-700 mb-2">
          What is the biggest challenge you face right now?
          <span className="text-red-500 ml-1">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Whether it is finding the right words, knowing where to turn, feeling
          alone in this, or something else entirely, we want to understand.
        </p>
        <textarea
          id="biggest_challenge"
          {...register("biggest_challenge")}
          rows={4}
          aria-required="true"
          aria-describedby={errors.biggest_challenge ? "biggest_challenge-error" : undefined}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-y"
          placeholder="In your own words..."
        />
        {errors.biggest_challenge && (
          <p id="biggest_challenge-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.biggest_challenge.message}
          </p>
        )}
      </div>

      {/* What would help */}
      <div>
        <label htmlFor="what_would_help" className="block text-sm font-medium text-gray-700 mb-2">
          What would help most? <span className="text-gray-400">(optional)</span>
        </label>
        <p className="text-sm text-gray-500 mb-2">
          A guide? A local group? A conversation starter? Something we have not
          thought of? Tell us what you wish existed.
        </p>
        <textarea
          id="what_would_help"
          {...register("what_would_help")}
          rows={3}
          aria-describedby={errors.what_would_help ? "what_would_help-error" : undefined}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-y"
          placeholder="If Sam's OATH could build one thing for you..."
        />
        {errors.what_would_help && (
          <p id="what_would_help-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.what_would_help.message}
          </p>
        )}
      </div>

      {/* Anything else */}
      <div>
        <label htmlFor="anything_else" className="block text-sm font-medium text-gray-700 mb-2">
          Anything else on your mind? <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="anything_else"
          {...register("anything_else")}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-y"
          placeholder="We are listening."
        />
      </div>

      {/* Contact info (optional) */}
      <div className="rounded-lg border border-gray-200 p-6 bg-gray-50">
        <p className="text-sm font-medium text-gray-700 mb-4">
          Want us to follow up? <span className="text-gray-400">(completely optional)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {submitError && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Share Feedback
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
