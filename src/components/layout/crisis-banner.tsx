"use client";

import { useState } from "react";
import { Phone, X } from "lucide-react";
import { CRISIS_RESOURCES } from "@/lib/constants";

export function CrisisBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#276A68]"
      role="complementary"
      aria-label="Crisis resources"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white">
          <span className="font-semibold">Need help now?</span>

          <a
            href={`tel:${CRISIS_RESOURCES.suicideHotline.number}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-white/25"
          >
            <Phone className="h-3.5 w-3.5" />
            {CRISIS_RESOURCES.suicideHotline.label}:{" "}
            {CRISIS_RESOURCES.suicideHotline.number}
          </a>

          <span className="hidden text-teal-200 sm:inline">|</span>

          <span className="text-sm text-teal-100">
            {CRISIS_RESOURCES.crisisText.label}: Text{" "}
            <span className="font-semibold">
              {CRISIS_RESOURCES.crisisText.keyword}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {CRISIS_RESOURCES.crisisText.number}
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="flex-shrink-0 rounded-full p-1 text-teal-200 transition-colors hover:bg-white/15 hover:text-white"
          aria-label="Dismiss crisis resources banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
