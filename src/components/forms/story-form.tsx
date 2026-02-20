"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { storySchema, type StoryFormData } from "@/lib/validators";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

const RELATIONS = [
  { value: "parent", label: "Parent" },
  { value: "sibling", label: "Sibling" },
  { value: "child", label: "Child" },
  { value: "spouse", label: "Spouse" },
  { value: "friend", label: "Friend" },
  { value: "professional", label: "Professional" },
  { value: "self", label: "Self" },
  { value: "other", label: "Other" },
];

export function StoryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      consent_publish: undefined,
      consent_name: false,
    },
  });

  const contentValue = watch("content") || "";

  const onSubmit = async (data: StoryFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      router.push("/thank-you/story");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* About You */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          About You
        </h3>
        <p className="text-gray-500 mb-6">
          Tell us a little about yourself. Only your name will be displayed publicly if you consent.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="author_name"
              {...register("author_name")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.author_name ? "border-red-400" : "border-gray-300"
              )}
              placeholder="Your full name"
            />
            {errors.author_name && (
              <p className="text-red-500 text-sm mt-1">{errors.author_name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="author_email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="author_email"
              type="email"
              {...register("author_email")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.author_email ? "border-red-400" : "border-gray-300"
              )}
              placeholder="your@email.com"
            />
            {errors.author_email && (
              <p className="text-red-500 text-sm mt-1">{errors.author_email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="author_city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              id="author_city"
              {...register("author_city")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
              placeholder="Your city (optional)"
            />
          </div>
          <div>
            <label htmlFor="author_state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              id="author_state"
              {...register("author_state")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors appearance-none"
            >
              <option value="">Select state</option>
              {US_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="author_relation" className="block text-sm font-medium text-gray-700 mb-1">
              Your Relation
            </label>
            <select
              id="author_relation"
              {...register("author_relation")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors appearance-none"
            >
              <option value="">Select relation</option>
              {RELATIONS.map((rel) => (
                <option key={rel.value} value={rel.value}>
                  {rel.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Your Story */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <BookOpen className="w-5 h-5 inline mr-2" />
          Your Story
        </h3>
        <p className="text-gray-500 mb-6">
          Share your experience. Your story can help others feel less alone and inspire change in communities everywhere.
        </p>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Story Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            {...register("title")}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
              errors.title ? "border-red-400" : "border-gray-300"
            )}
            placeholder="Give your story a title"
            maxLength={150}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Your Story <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            {...register("content")}
            rows={10}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors resize-none",
              errors.content ? "border-red-400" : "border-gray-300"
            )}
            placeholder="Tell your story here... What happened? How has it affected you? What do you want others to know?"
            maxLength={10000}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.content ? (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            ) : (
              <span />
            )}
            <p className={cn(
              "text-sm",
              contentValue.length > 9500 ? "text-amber-500" : "text-gray-400"
            )}>
              {contentValue.length.toLocaleString()}/10,000
            </p>
          </div>
        </div>
      </div>

      {/* Consent */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Publishing Consent
        </h3>
        <p className="text-gray-500 mb-6">
          We respect your privacy and will only publish your story with your explicit permission.
        </p>

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("consent_publish")}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal"
            />
            <span className="text-sm text-gray-700">
              I consent to having my story published on samsoath.org <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.consent_publish && (
            <p className="text-red-500 text-sm ml-7">{errors.consent_publish.message}</p>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("consent_name")}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal"
            />
            <span className="text-sm text-gray-700">
              You may display my name with my story
            </span>
          </label>
        </div>
      </div>

      {/* Submit */}
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full flex items-center justify-center gap-3 py-4 px-8 rounded-lg text-lg font-semibold transition-all",
          "bg-teal text-white hover:bg-teal-600 shadow-lg hover:shadow-xl",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting Your Story...
          </>
        ) : (
          <>
            Submit Your Story
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-400">
        By submitting your story, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-gray-600">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
