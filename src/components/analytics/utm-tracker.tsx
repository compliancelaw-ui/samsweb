"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { parseUTMFromURL, saveUTMToCookie } from "@/lib/utm";

export function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmData = parseUTMFromURL(searchParams);
    if (utmData) {
      saveUTMToCookie(utmData);
    }
  }, [searchParams]);

  return null;
}
