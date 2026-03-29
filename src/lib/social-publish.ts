/**
 * Social media publishing - Meta Graph API (Facebook + Instagram).
 * Simplified from the Frankventure hub for SamsOath.
 *
 * Env vars:
 *   META_SAMSOATH_PAGE_TOKEN - Facebook Page access token
 *   META_SAMSOATH_PAGE_ID    - Facebook Page ID
 *   META_SAMSOATH_IG_ACCOUNT_ID - Instagram Business Account ID
 */

export type SocialPlatform = "Facebook" | "Instagram";

const PRODUCT_KEY = "SAMSOATH";

interface MetaCredentials {
  pageToken: string;
  pageId: string;
  igAccountId: string | null;
}

function getMetaCredentials(): MetaCredentials | null {
  const prefix = `META_${PRODUCT_KEY}`;
  const pageToken = process.env[`${prefix}_PAGE_TOKEN`];
  const pageId = process.env[`${prefix}_PAGE_ID`];
  if (!pageToken || !pageId) return null;
  return {
    pageToken,
    pageId,
    igAccountId: process.env[`${prefix}_IG_ACCOUNT_ID`] ?? null,
  };
}

export interface PublishResult {
  ok: boolean;
  postId?: string;
  url?: string;
  error?: string;
}

export async function publishToFacebook(text: string): Promise<PublishResult> {
  const creds = getMetaCredentials();
  if (!creds)
    return { ok: false, error: "Facebook credentials not configured" };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${creds.pageId}/feed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          access_token: creds.pageToken,
        }),
      }
    );
    const data = await res.json();
    if (data.id) {
      return {
        ok: true,
        postId: data.id,
        url: `https://facebook.com/${data.id}`,
      };
    }
    return {
      ok: false,
      error: data.error?.message ?? "Unknown Facebook error",
    };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export async function publishToInstagram(
  caption: string,
  imageUrl: string
): Promise<PublishResult> {
  const creds = getMetaCredentials();
  if (!creds?.igAccountId)
    return { ok: false, error: "Instagram credentials not configured" };

  try {
    // Step 1: Create media container (requires image)
    const createRes = await fetch(
      `https://graph.facebook.com/v19.0/${creds.igAccountId}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption,
          image_url: imageUrl,
          access_token: creds.pageToken,
        }),
      }
    );
    const createData = await createRes.json();
    if (!createData.id) {
      return {
        ok: false,
        error: createData.error?.message ?? "Failed to create IG media",
      };
    }

    // Step 2: Publish
    const publishRes = await fetch(
      `https://graph.facebook.com/v19.0/${creds.igAccountId}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: createData.id,
          access_token: creds.pageToken,
        }),
      }
    );
    const publishData = await publishRes.json();
    if (publishData.id) {
      return { ok: true, postId: publishData.id };
    }
    return {
      ok: false,
      error: publishData.error?.message ?? "Unknown IG error",
    };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export function getConfiguredPlatforms(): SocialPlatform[] {
  const prefix = `META_${PRODUCT_KEY}`;
  const platforms: SocialPlatform[] = [];
  if (
    process.env[`${prefix}_PAGE_TOKEN`] &&
    process.env[`${prefix}_PAGE_ID`]
  ) {
    platforms.push("Facebook");
  }
  if (
    process.env[`${prefix}_PAGE_TOKEN`] &&
    process.env[`${prefix}_IG_ACCOUNT_ID`]
  ) {
    platforms.push("Instagram");
  }
  return platforms;
}
