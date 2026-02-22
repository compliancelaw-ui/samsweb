"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, BookOpen, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { storySchema, type StoryFormData } from "@/lib/validators";
import { HoneypotField } from "@/components/ui/honeypot-field";

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

const CONVERSATION_PROMPTS = [
  "The moment I realized my family wasn\u2019t the only one\u2026",
  "What silence looked like in our house\u2026",
  "If I could tell another family one thing, it would be\u2026",
  "The hardest part no one talks about is\u2026",
  "What I wish someone had told me\u2026",
  "Recovery looks different for everyone \u2014 for us, it means\u2026",
];

export function StoryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
      let photoUrl: string | undefined;

      if (photoFile) {
        const formData = new FormData();
        formData.append("file", photoFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          throw new Error("Failed to upload photo. Please try again.");
        }
        const uploadData = await uploadRes.json();
        photoUrl = uploadData.url;
      }

      const response = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, photo_url: photoUrl }),
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
      <HoneypotField />
      {/* About You */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          About You
        </h3>
        <p className="text-gray-500 mb-6">
          Full name, first name only, or initials are all fine — if you leave
          the name blank, you&apos;ll appear as &ldquo;A Friend.&rdquo; Only
          your chosen display name is shown publicly if you consent.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="author_name"
              {...register("author_name")}
              aria-required="true"
              aria-describedby={errors.author_name ? "author_name-error" : undefined}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.author_name ? "border-red-400" : "border-gray-300"
              )}
              placeholder="Full name, first name, or initials"
            />
            {errors.author_name && (
              <p id="author_name-error" role="alert" className="text-red-500 text-sm mt-1">{errors.author_name.message}</p>
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
              aria-required="true"
              aria-describedby={errors.author_email ? "author_email-error" : undefined}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.author_email ? "border-red-400" : "border-gray-300"
              )}
              placeholder="your@email.com"
            />
            {errors.author_email && (
              <p id="author_email-error" role="alert" className="text-red-500 text-sm mt-1">{errors.author_email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="author_city" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="author_city"
              {...register("author_city")}
              aria-required="true"
              aria-describedby={errors.author_city ? "author_city-error" : undefined}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.author_city ? "border-red-400" : "border-gray-300"
              )}
              placeholder="Your city"
            />
            {errors.author_city && (
              <p id="author_city-error" role="alert" className="text-red-500 text-sm mt-1">{errors.author_city.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="author_state" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="author_state"
              {...register("author_state")}
              aria-required="true"
              aria-describedby={errors.author_state ? "author_state-error" : undefined}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors appearance-none",
                errors.author_state ? "border-red-400" : "border-gray-300"
              )}
            >
              <option value="">Select state</option>
              {US_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            {errors.author_state && (
              <p id="author_state-error" role="alert" className="text-red-500 text-sm mt-1">{errors.author_state.message}</p>
            )}
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
          <BookOpen className="w-5 h-5 inline mr-2" aria-hidden="true" />
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
            aria-required="true"
            aria-describedby={errors.title ? "title-error" : undefined}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
              errors.title ? "border-red-400" : "border-gray-300"
            )}
            placeholder="Give your story a title"
            maxLength={150}
          />
          {errors.title && (
            <p id="title-error" role="alert" className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Conversation Prompts */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">
            Not sure where to start? Click a prompt to get going:
          </p>
          <div className="flex flex-wrap gap-2">
            {CONVERSATION_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  const current = watch("content") || "";
                  if (!current.trim()) {
                    setValue("content", prompt + "\n\n", { shouldValidate: false });
                  }
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors border border-teal-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Your Story <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            {...register("content")}
            aria-required="true"
            aria-describedby={errors.content ? "content-error" : undefined}
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
              <p id="content-error" role="alert" className="text-red-500 text-sm">{errors.content.message}</p>
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

        {/* Photo Upload */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Add a photo to accompany your story — yourself, your family, or
            something meaningful to your journey. Photos are reviewed before publishing.
          </p>
          {photoPreview ? (
            <div className="relative inline-block">
              <img
                src={photoPreview}
                alt="Preview"
                className="max-h-48 max-w-full rounded-lg shadow-sm"
              />
              <button
                type="button"
                aria-label="Remove selected photo"
                onClick={() => {
                  setPhotoFile(null);
                  setPhotoPreview(null);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                &times;
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal hover:bg-teal-50/30 transition-colors">
              <Camera className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="text-sm text-gray-500">
                Choose a photo (JPG, PNG, or WebP, max 5 MB)
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 5 * 1024 * 1024) {
                      setSubmitError("Photo must be under 5 MB.");
                      return;
                    }
                    setPhotoFile(file);
                    setPhotoPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          )}
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
              I grant Sam&apos;s OATH permission to publish my story on
              samsoath.org and share it on social media to help raise awareness.
              I understand my story will be reviewed before publication.{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.consent_publish && (
            <p id="consent_publish-error" role="alert" className="text-red-500 text-sm ml-7">{errors.consent_publish.message}</p>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("consent_name")}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal"
            />
            <span className="text-sm text-gray-700">
              I give permission to display my name alongside my published story.
              If unchecked, your story will be attributed to &ldquo;A Friend.&rdquo;
            </span>
          </label>
        </div>
      </div>

      {/* Submit */}
      {submitError && (
        <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
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
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            Submitting Your Story...
          </>
        ) : (
          <>
            Submit Your Story
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-400">
        By submitting your story, you agree to our{" "}
        <a href="/terms" className="underline hover:text-gray-600">
          Terms &amp; Conditions
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-gray-600">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
