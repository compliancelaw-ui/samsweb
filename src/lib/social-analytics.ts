/**
 * Social media engagement analytics for SamsOath.
 * Fetches page/account-level insights from Facebook, Instagram, and LinkedIn APIs.
 * Gracefully returns null for platforms without credentials.
 *
 * Env vars:
 *   META_SAMSOATH_PAGE_TOKEN, META_SAMSOATH_PAGE_ID, META_SAMSOATH_IG_ACCOUNT_ID
 *   LINKEDIN_SAMSOATH_ACCESS_TOKEN, LINKEDIN_SAMSOATH_ORG_ID
 */

const PRODUCT_KEY = "SAMSOATH";

export interface SocialMetrics {
  platform: string;
  impressions: number;
  clicks: number;
  likes: number;
  shares: number;
  comments: number;
  engagementRate: number;
  period: string;
}

// ---- Credential helpers ----

function getMetaCredentials() {
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

function getLinkedInCredentials() {
  const prefix = `LINKEDIN_${PRODUCT_KEY}`;
  const accessToken = process.env[`${prefix}_ACCESS_TOKEN`];
  const orgId = process.env[`${prefix}_ORG_ID`];
  if (!accessToken || !orgId) return null;
  return { accessToken, orgId };
}

// ---- Facebook Page Insights ----

export async function getFacebookInsights(
  days: number = 30
): Promise<SocialMetrics | null> {
  const creds = getMetaCredentials();
  if (!creds) return null;

  try {
    // Use page/insights endpoint for aggregate metrics
    const since = Math.floor((Date.now() - days * 86400000) / 1000);
    const until = Math.floor(Date.now() / 1000);

    const metrics = [
      "page_impressions",
      "page_post_engagements",
      "page_consumptions",
      "page_fans",
    ].join(",");

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${creds.pageId}/insights?metric=${metrics}&period=day&since=${since}&until=${until}&access_token=${creds.pageToken}`
    );

    if (!res.ok) {
      console.error(`Facebook insights fetch failed: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const elements = data.data || [];

    let impressions = 0;
    let engagements = 0;
    let clicks = 0;

    for (const metric of elements) {
      const values = metric.values || [];
      const total = values.reduce(
        (sum: number, v: { value: number }) => sum + (v.value || 0),
        0
      );

      switch (metric.name) {
        case "page_impressions":
          impressions = total;
          break;
        case "page_post_engagements":
          engagements = total;
          break;
        case "page_consumptions":
          clicks = total;
          break;
      }
    }

    // Facebook page insights doesn't break out likes/shares/comments separately at page level.
    // Approximate: engagements = likes + comments + shares + clicks
    const engagementRate = impressions > 0 ? engagements / impressions : 0;

    return {
      platform: "Facebook",
      impressions,
      clicks,
      likes: Math.max(0, engagements - clicks), // rough approximation
      shares: 0,
      comments: 0,
      engagementRate,
      period: `${days}d`,
    };
  } catch (err) {
    console.error("Facebook insights error:", err);
    return null;
  }
}

// ---- Instagram Account Insights ----

export async function getInstagramInsights(
  days: number = 30
): Promise<SocialMetrics | null> {
  const creds = getMetaCredentials();
  if (!creds?.igAccountId) return null;

  try {
    const since = Math.floor((Date.now() - days * 86400000) / 1000);
    const until = Math.floor(Date.now() / 1000);

    // IG account-level insights
    const metrics = ["impressions", "reach", "profile_views"].join(",");

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${creds.igAccountId}/insights?metric=${metrics}&period=day&since=${since}&until=${until}&access_token=${creds.pageToken}`
    );

    if (!res.ok) {
      console.error(`Instagram insights fetch failed: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const elements = data.data || [];

    let impressions = 0;
    let reach = 0;

    for (const metric of elements) {
      const values = metric.values || [];
      const total = values.reduce(
        (sum: number, v: { value: number }) => sum + (v.value || 0),
        0
      );

      switch (metric.name) {
        case "impressions":
          impressions = total;
          break;
        case "reach":
          reach = total;
          break;
      }
    }

    // Fetch recent media for engagement breakdown
    let likes = 0;
    let comments = 0;

    const mediaRes = await fetch(
      `https://graph.facebook.com/v19.0/${creds.igAccountId}/media?fields=like_count,comments_count,timestamp&limit=50&access_token=${creds.pageToken}`
    );

    if (mediaRes.ok) {
      const mediaData = await mediaRes.json();
      const cutoff = Date.now() - days * 86400000;

      for (const post of mediaData.data || []) {
        if (new Date(post.timestamp).getTime() >= cutoff) {
          likes += post.like_count || 0;
          comments += post.comments_count || 0;
        }
      }
    }

    const engagementRate =
      impressions > 0 ? (likes + comments) / impressions : 0;

    return {
      platform: "Instagram",
      impressions,
      clicks: reach, // reach as proxy for clicks (IG doesn't expose clicks at account level)
      likes,
      shares: 0,
      comments,
      engagementRate,
      period: `${days}d`,
    };
  } catch (err) {
    console.error("Instagram insights error:", err);
    return null;
  }
}

// ---- LinkedIn Organization Analytics ----

export async function getLinkedInAnalytics(
  days: number = 30
): Promise<SocialMetrics | null> {
  const creds = getLinkedInCredentials();
  if (!creds) return null;

  const endMs = Date.now();
  const startMs = endMs - days * 86400000;
  const orgUrn = `urn:li:organization:${creds.orgId}`;

  try {
    const url = new URL(
      "https://api.linkedin.com/v2/organizationalEntityShareStatistics"
    );
    url.searchParams.set("q", "organizationalEntity");
    url.searchParams.set("organizationalEntity", orgUrn);
    url.searchParams.set("timeIntervals.timeGranularityType", "DAY");
    url.searchParams.set("timeIntervals.timeRange.start", String(startMs));
    url.searchParams.set("timeIntervals.timeRange.end", String(endMs));

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${creds.accessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });

    if (!res.ok) {
      console.error(`LinkedIn analytics fetch failed: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const elements = data.elements || [];

    let shares = 0;
    let clicks = 0;
    let impressions = 0;
    let comments = 0;
    let likes = 0;

    for (const el of elements) {
      const stats = el.totalShareStatistics || {};
      shares += stats.shareCount || 0;
      clicks += stats.clickCount || 0;
      impressions += stats.impressionCount || 0;
      comments += stats.commentCount || 0;
      likes += stats.likeCount || 0;
    }

    const engagementRate =
      impressions > 0 ? (clicks + likes + comments) / impressions : 0;

    return {
      platform: "LinkedIn",
      impressions,
      clicks,
      likes,
      shares,
      comments,
      engagementRate,
      period: `${days}d`,
    };
  } catch (err) {
    console.error("LinkedIn analytics error:", err);
    return null;
  }
}

// ---- Get all configured platform metrics ----

export async function getAllSocialMetrics(
  days: number = 30
): Promise<SocialMetrics[]> {
  const results = await Promise.allSettled([
    getFacebookInsights(days),
    getInstagramInsights(days),
    getLinkedInAnalytics(days),
  ]);

  const metrics: SocialMetrics[] = [];
  for (const result of results) {
    if (result.status === "fulfilled" && result.value) {
      metrics.push(result.value);
    }
  }

  return metrics;
}
