"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Mail, Mic, Building2, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactFormData } from "@/lib/validators";

const MESSAGE_TYPES = [
  { value: "general" as const, label: "General", icon: Mail },
  { value: "speaking" as const, label: "Speaking", icon: Mic },
  { value: "workplace" as const, label: "Workplace", icon: Building2 },
  { value: "partnership" as const, label: "Partnership", icon: Handshake },
];

export function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      message_type: "general",
    },
  });

  const selectedType = watch("message_type");

  const showPhone = selectedType === "speaking" || selectedType === "workplace" || selectedType === "partnership";

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      router.push("/thank-you/contact");
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
      {/* Message Type */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          What can we help with?
        </h3>
        <p className="text-gray-500 mb-6">
          Select the category that best fits your message so we can route it to the right person.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MESSAGE_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setValue("message_type", type.value, { shouldValidate: true })}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg border-2 text-center transition-all",
                selectedType === type.value
                  ? "border-teal bg-teal-50 text-teal-700 font-medium"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <type.icon className={cn(
                "w-5 h-5",
                selectedType === type.value ? "text-teal" : "text-gray-400"
              )} />
              <span className="text-sm">{type.label}</span>
            </button>
          ))}
        </div>
        {errors.message_type && (
          <p className="text-red-500 text-sm mt-2">{errors.message_type.message}</p>
        )}
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your Information
        </h3>
        <p className="text-gray-500 mb-6">
          How can we reach you?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="sender_name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="sender_name"
              {...register("sender_name")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.sender_name ? "border-red-400" : "border-gray-300"
              )}
              placeholder="Your full name"
            />
            {errors.sender_name && (
              <p className="text-red-500 text-sm mt-1">{errors.sender_name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="sender_email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="sender_email"
              type="email"
              {...register("sender_email")}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
                errors.sender_email ? "border-red-400" : "border-gray-300"
              )}
              placeholder="your@email.com"
            />
            {errors.sender_email && (
              <p className="text-red-500 text-sm mt-1">{errors.sender_email.message}</p>
            )}
          </div>
        </div>

        {showPhone && (
          <div>
            <label htmlFor="sender_phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="sender_phone"
              type="tel"
              {...register("sender_phone")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors"
              placeholder="(555) 123-4567 (optional)"
            />
          </div>
        )}
      </div>

      {/* Message */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your Message
        </h3>
        <p className="text-gray-500 mb-6">
          Share the details of your inquiry and we&apos;ll get back to you as soon as we can.
        </p>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            {...register("subject")}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors",
              errors.subject ? "border-red-400" : "border-gray-300"
            )}
            placeholder="What is this about?"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="body"
            {...register("body")}
            rows={6}
            className={cn(
              "w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-colors resize-none",
              errors.body ? "border-red-400" : "border-gray-300"
            )}
            placeholder="Tell us more about your inquiry..."
            maxLength={5000}
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
          )}
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
            Sending Message...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-400">
        By sending this message, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-gray-600">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
