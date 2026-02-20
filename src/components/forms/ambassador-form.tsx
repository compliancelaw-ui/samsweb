"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Star, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ambassadorSchema, type AmbassadorFormData } from "@/lib/validators";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

export function AmbassadorForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [socialLinksText, setSocialLinksText] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AmbassadorFormData>({
    resolver: zodResolver(ambassadorSchema),
    defaultValues: {
      social_links: {},
    },
  });

  const motivationValue = watch("motivation") || "";
  const personalStoryValue = watch("personal_story") || "";

  const onSubmit = async (data: AmbassadorFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Parse social_links from textarea into Record<string, string>
      const parsedLinks: Record<string, string> = {};
      if (socialLinksText.trim()) {
        const lines = socialLinksText
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        lines.forEach((line, index) => {
          // Try to extract platform name from URL, otherwise use index-based key
          try {
            const url = new URL(line.startsWith("http") ? line : `https://${line}`);
            const hostname = url.hostname.replace("www.", "");
            const platform = hostname.split(".")[0];
            const key = parsedLinks[platform] ? `${platform}_${index}` : platform;
            parsedLinks[key] = line;
          } catch {
            parsedLinks[`link_${index + 1}`] = line;
          }
        });
      }

      const submitData = {
        ...data,
        social_links: Object.keys(parsedLinks).length > 0 ? parsedLinks : undefined,
      };

      const response = await fetch("/api/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      router.push("/thank-you/ambassador");
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
          <Star className="w-5 h-5 inline mr-2" />
          About You
        </h3>
        <p className="text-gray-500 mb-6">
          Tell us about yourself. Ambassadors represent Sam&apos;s OATH in their local communities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="ambassador_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="ambassador_name"
              {...register("name")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.name ? "border-red-400" : "border-gray-300"
              )}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="ambassador_email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="ambassador_email"
              type="email"
              {...register("email")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.email ? "border-red-400" : "border-gray-300"
              )}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ambassador_city" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="ambassador_city"
              {...register("city")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.city ? "border-red-400" : "border-gray-300"
              )}
              placeholder="Your city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="ambassador_state" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="ambassador_state"
              {...register("state")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors appearance-none",
                errors.state ? "border-red-400" : "border-gray-300"
              )}
            >
              <option value="">Select state</option>
              {US_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Why Do You Want to Be an Ambassador?
        </h3>
        <p className="text-gray-500 mb-6">
          Tell us what drives you to represent Sam&apos;s OATH in your community. What does this cause mean to you?
        </p>

        <div>
          <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
            Your Motivation <span className="text-red-500">*</span>
          </label>
          <textarea
            id="motivation"
            {...register("motivation")}
            rows={6}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors resize-none",
              errors.motivation ? "border-red-400" : "border-gray-300"
            )}
            placeholder="What motivates you to become an ambassador for this cause?"
            maxLength={2000}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.motivation ? (
              <p className="text-red-500 text-sm">{errors.motivation.message}</p>
            ) : (
              <span />
            )}
            <p className={cn(
              "text-sm",
              motivationValue.length > 1800 ? "text-amber-500" : "text-gray-400"
            )}>
              {motivationValue.length.toLocaleString()}/2,000
            </p>
          </div>
        </div>
      </div>

      {/* Personal Story */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your Personal Story <span className="text-gray-400 text-base font-normal">(optional)</span>
        </h3>
        <p className="text-gray-500 mb-6">
          If you have a personal connection to addiction, mental health, or loss, sharing it can help us understand your perspective.
        </p>

        <div>
          <label htmlFor="personal_story" className="block text-sm font-medium text-gray-700 mb-1">
            Personal Story
          </label>
          <textarea
            id="personal_story"
            {...register("personal_story")}
            rows={5}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors resize-none",
              errors.personal_story ? "border-red-400" : "border-gray-300"
            )}
            placeholder="Share your story if you'd like..."
            maxLength={2000}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.personal_story ? (
              <p className="text-red-500 text-sm">{errors.personal_story.message}</p>
            ) : (
              <span />
            )}
            <p className={cn(
              "text-sm",
              personalStoryValue.length > 1800 ? "text-amber-500" : "text-gray-400"
            )}>
              {personalStoryValue.length.toLocaleString()}/2,000
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <LinkIcon className="w-5 h-5 inline mr-2" />
          Social Media Links <span className="text-gray-400 text-base font-normal">(optional)</span>
        </h3>
        <p className="text-gray-500 mb-6">
          Share your social media profiles so we can learn more about you. Paste one link per line.
        </p>

        <div>
          <label htmlFor="social_links" className="block text-sm font-medium text-gray-700 mb-1">
            Links
          </label>
          <textarea
            id="social_links"
            value={socialLinksText}
            onChange={(e) => setSocialLinksText(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors resize-none"
            placeholder={"https://instagram.com/yourprofile\nhttps://linkedin.com/in/yourprofile\nhttps://twitter.com/yourhandle"}
          />
          <p className="text-xs text-gray-400 mt-1">
            One link per line (Instagram, LinkedIn, Twitter, Facebook, TikTok, etc.)
          </p>
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
            Submitting Application...
          </>
        ) : (
          <>
            Apply to Be an Ambassador
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-400">
        By applying, you agree to our{" "}
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
