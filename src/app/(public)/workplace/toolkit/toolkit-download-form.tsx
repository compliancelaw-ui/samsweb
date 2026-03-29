"use client";

import { useState, FormEvent } from "react";
import { Download, Loader2 } from "lucide-react";
import { HONEYPOT_FIELD } from "@/lib/honeypot";

export function ToolkitDownloadForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/workplace/toolkit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      const data = await res.json();
      setStatus("success");

      // Trigger download
      if (data.downloadUrl) {
        window.location.href = data.downloadUrl;
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="text-center p-8 bg-teal-50 rounded-xl">
        <Download className="w-10 h-10 text-teal mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your toolkit is downloading!
        </h3>
        <p className="text-gray-600 mb-4">
          If the download didn&apos;t start automatically,{" "}
          <a
            href="/api/resources/workplace-toolkit/download"
            className="text-teal underline hover:text-teal-700"
          >
            click here
          </a>
          .
        </p>
        <p className="text-sm text-gray-500">
          Thank you for bringing Sam&apos;s OATH to your workplace.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot - hidden from humans */}
      <input
        type="text"
        name={HONEYPOT_FIELD}
        autoComplete="off"
        tabIndex={-1}
        className="absolute opacity-0 h-0 w-0 overflow-hidden"
        aria-hidden="true"
      />

      <div>
        <label
          htmlFor="toolkit-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          First Name{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="toolkit-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="toolkit-email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="toolkit-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-colors"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2 bg-teal text-white px-6 py-4 rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Preparing your toolkit...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Download Free Toolkit
          </>
        )}
      </button>
    </form>
  );
}
