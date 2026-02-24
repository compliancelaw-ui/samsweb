// UTM parameter names
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export type UTMData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

// Parse UTM params from URL search params
export function parseUTMFromURL(searchParams: URLSearchParams): UTMData | null {
  // Check if any UTM param exists
  const hasUTM = UTM_PARAMS.some(p => searchParams.get(p));
  if (!hasUTM) return null;

  const data: UTMData = {};
  for (const param of UTM_PARAMS) {
    const value = searchParams.get(param);
    if (value) data[param] = value;
  }
  return data;
}

// Save UTM data to cookie (client-side)
export function saveUTMToCookie(data: UTMData): void {
  const encoded = encodeURIComponent(JSON.stringify(data));
  document.cookie = `utm_data=${encoded}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

// Read UTM data from cookie (client-side)
export function getUTMFromCookie(): UTMData {
  if (typeof document === 'undefined') return {};
  const match = document.cookie.match(/(?:^|;\s*)utm_data=([^;]*)/);
  if (!match) return {};
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return {};
  }
}
