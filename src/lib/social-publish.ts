/**
 * Social media publishing - Meta Graph API (Facebook + Instagram) + LinkedIn.
 * Simplified from the Frankventure hub for SamsOath.
 *
 * Env vars:
 *   META_SAMSOATH_PAGE_TOKEN - Facebook Page access token
 *   META_SAMSOATH_PAGE_ID    - Facebook Page ID
 *   META_SAMSOATH_IG_ACCOUNT_ID - Instagram Business Account ID
 *   LINKEDIN_SAMSOATH_ACCESS_TOKEN - LinkedIn OAuth access token
 *   LINKEDIN_SAMSOATH_ORG_ID - LinkedIn Organization ID
 */

export type SocialPlatform = "Facebook" | "Instagram" | "LinkedIn";

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

// -- LinkedIn --

interface LinkedInCredentials {
  accessToken: string;
  orgId: string;
}

function getLinkedInCredentials(): LinkedInCredentials | null {
  const prefix = `LINKEDIN_${PRODUCT_KEY}`;
  const accessToken = process.env[`${prefix}_ACCESS_TOKEN`];
  const orgId = process.env[`${prefix}_ORG_ID`];
  if (!accessToken || !orgId) return null;
  return { accessToken, orgId };
}

export async function publishToLinkedIn(
  text: string
): Promise<PublishResult> {
  const creds = getLinkedInCredentials();
  if (!creds)
    return { ok: false, error: "LinkedIn credentials not configured" };

  try {
    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${creds.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: `urn:li:organization:${creds.orgId}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text },
            shareMediaCategory: "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return { ok: false, error: `LinkedIn API error (${res.status}): ${error}` };
    }

    const data = await res.json();
    const postId = data.id || data["X-RestLi-Id"];
    return {
      ok: true,
      postId: postId || undefined,
      url: postId ? `https://www.linkedin.com/feed/update/${postId}` : undefined,
    };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export function getConfiguredPlatforms(): SocialPlatform[] {
  const metaPrefix = `META_${PRODUCT_KEY}`;
  const liPrefix = `LINKEDIN_${PRODUCT_KEY}`;
  const platforms: SocialPlatform[] = [];
  if (
    process.env[`${metaPrefix}_PAGE_TOKEN`] &&
    process.env[`${metaPrefix}_PAGE_ID`]
  ) {
    platforms.push("Facebook");
  }
  if (
    process.env[`${metaPrefix}_PAGE_TOKEN`] &&
    process.env[`${metaPrefix}_IG_ACCOUNT_ID`]
  ) {
    platforms.push("Instagram");
  }
  if (
    process.env[`${liPrefix}_ACCESS_TOKEN`] &&
    process.env[`${liPrefix}_ORG_ID`]
  ) {
    platforms.push("LinkedIn");
  }
  return platforms;
}
