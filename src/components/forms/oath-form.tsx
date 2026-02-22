"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, Heart, Users, Shield, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoneypotField } from "@/components/ui/honeypot-field";

const oathSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  category: z.enum(["supporting", "supporter", "hope"], {
    error: "Please select a category",
  }),
  city: z.string().min(1, "City is required"),
  state: z
    .string()
    .min(2, "Please enter a valid state abbreviation")
    .max(2, "Use 2-letter state code")
    .transform((val) => val.toUpperCase()),
  message: z.string().max(500).optional(),
  name_display_type: z.enum(["full", "first", "initials", "anonymous"]),
  email_optin: z.boolean(),
});

type OathFormData = z.infer<typeof oathSchema>;

const CATEGORIES = [
  {
    value: "supporting" as const,
    label: "Supporting a loved one",
    description: "Someone you care about is facing substance use or mental health challenges",
    icon: Heart,
    color: "border-teal bg-teal-50 text-teal-700",
    selectedColor: "border-teal bg-teal text-white",
  },
  {
    value: "supporter" as const,
    label: "Standing with you",
    description: "You believe no one should face these challenges in silence",
    icon: Users,
    color: "border-sage bg-sage-50 text-sage-700",
    selectedColor: "border-sage bg-sage text-white",
  },
  {
    value: "hope" as const,
    label: "I\u2019m in recovery or finding hope",
    description: "You\u2019re on a journey of healing and want to share that hope with others",
    icon: Sun,
    color: "border-orange bg-orange-50 text-orange-700",
    selectedColor: "border-orange bg-orange text-white",
  },
];

const NAME_OPTIONS = [
  { value: "full", label: "Full name", example: "John Smith" },
  { value: "first", label: "First name only", example: "John" },
  { value: "initials", label: "Initials", example: "J.S." },
  { value: "anonymous", label: "Anonymous", example: "A Friend" },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

export function OathForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referredBy = searchParams.get("ref");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OathFormData>({
    resolver: zodResolver(oathSchema),
    defaultValues: {
      name_display_type: "first",
      email_optin: false,
      category: undefined,
    },
  });

  const selectedCategory = watch("category");
  const nameDisplayType = watch("name_display_type");

  const onSubmit = async (data: OathFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/oath", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, referred_by: referredBy || undefined }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      const result = await response.json();
      const refCode = result.referral_code || result.id?.toString().slice(0, 8);
      router.push(`/thank-you/oath?id=${result.id}&category=${result.category}&ref=${refCode}`);
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
      {/* STEP 1: Category Selection */}
      <div>
        <h3 id="category-label" className="text-xl font-semibold text-gray-900 mb-2">
          I&apos;m taking this OATH...
        </h3>
        <p className="text-gray-500 mb-6">Select the one that fits you best.</p>

        <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-labelledby="category-label">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setValue("category", cat.value, { shouldValidate: true })}
                className={cn(
                  "flex items-start gap-4 p-5 rounded-lg border-2 text-left transition-all",
                  isSelected ? cat.selectedColor : cat.color,
                  "hover:shadow-md"
                )}
              >
                <cat.icon aria-hidden="true" className={cn("w-6 h-6 mt-0.5 flex-shrink-0", isSelected ? "text-white" : "")} />
                <div>
                  <p className="font-semibold text-base">{cat.label}</p>
                  <p className={cn("text-sm mt-1", isSelected ? "text-white/80" : "opacity-70")}>
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.category && (
          <p id="category-error" role="alert" className="text-red-500 text-sm mt-2">{errors.category.message}</p>
        )}
      </div>

      {/* STEP 2: Your Name */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your Name
        </h3>
        <p className="text-gray-500 mb-6">
          Full name, first name only, or initials are all welcome. Choose how
          your name appears on the map — or go anonymous and you&apos;ll appear
          as &ldquo;A Friend.&rdquo;
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="first_name"
              {...register("first_name")}
              aria-required="true"
              aria-describedby={errors.first_name ? "first_name-error" : undefined}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.first_name ? "border-red-400" : "border-gray-300"
              )}
              placeholder="First name"
            />
            {errors.first_name && (
              <p id="first_name-error" role="alert" className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              id="last_name"
              {...register("last_name")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
              placeholder="Last name (optional)"
            />
          </div>
        </div>

        {/* Privacy: How name displays */}
        <div>
          <label id="name-display-label" className="block text-sm font-medium text-gray-700 mb-3">
            <Shield aria-hidden="true" className="w-4 h-4 inline mr-1" />
            How should your name appear on the map?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="radiogroup" aria-labelledby="name-display-label">
            {NAME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={nameDisplayType === opt.value}
                onClick={() => setValue("name_display_type", opt.value as OathFormData["name_display_type"])}
                className={cn(
                  "p-3 rounded-lg border text-center transition-all text-sm",
                  nameDisplayType === opt.value
                    ? "border-teal bg-teal-50 text-teal-700 font-medium"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                <p className="font-medium">{opt.label}</p>
                <p className="text-xs mt-1 opacity-60">{opt.example}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 3: Location */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your Location
        </h3>
        <p className="text-gray-500 mb-6">
          Your city and state are used to place your pin on the map.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              {...register("city")}
              aria-required="true"
              aria-describedby={errors.city ? "city-error" : undefined}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.city ? "border-red-400" : "border-gray-300"
              )}
              placeholder="Your city"
            />
            {errors.city && (
              <p id="city-error" role="alert" className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              {...register("state")}
              aria-required="true"
              aria-describedby={errors.state ? "state-error" : undefined}
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
              <p id="state-error" role="alert" className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* STEP 4: Optional Message */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          A Personal Message <span className="text-gray-400 text-base font-normal">(optional)</span>
        </h3>
        <p className="text-gray-500 mb-4">
          If you&apos;d like, share a few words about why you&apos;re taking this OATH.
        </p>
        <textarea
          {...register("message")}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors resize-none"
          placeholder="I'm taking this OATH because..."
          maxLength={500}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* STEP 5: Email (Optional) */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Stay Connected <span className="text-gray-400 text-base font-normal">(optional)</span>
        </h3>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
              errors.email ? "border-red-400" : "border-gray-300"
            )}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <label className="flex items-start gap-3 mt-4 cursor-pointer">
          <input
            type="checkbox"
            {...register("email_optin")}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal"
          />
          <span className="text-sm text-gray-600">
            Send me stories from the community and movement updates. We&apos;ll never
            share your email or spam you. Unsubscribe anytime.
          </span>
        </label>
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
            <Loader2 aria-hidden="true" className="w-5 h-5 animate-spin" />
            Taking Sam&apos;s OATH...
          </>
        ) : (
          <>
            Take Sam&apos;s OATH
            <ArrowRight aria-hidden="true" className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-400">
        By taking the OATH, you agree to our{" "}
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
