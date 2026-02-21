// Branded email template system for Sam's OATH
// All outbound emails use this wrapper for consistent look & feel

const COLORS = {
  primary: "#4A6FA5",
  teal: "#3EABA8",
  slate: "#2E3B4E",
  gray: "#4B5563",
  lightGray: "#9CA3AF",
  bg: "#F8FAFB",
  white: "#FFFFFF",
};

// Signatures vary by alias — each conveys a different voice
const SIGNATURES: Record<string, string> = {
  hello: "Warmly,<br/>The Sam's OATH Team",
  connect: "With care,<br/>The Sam's OATH Team",
  share: "With gratitude,<br/>The Sam's OATH Team",
  press: "Best regards,<br/>Sam's OATH Communications",
  workplace: "Best regards,<br/>Sam's OATH Workplace Programs",
  speaking: "Best regards,<br/>Sam's OATH Speaking &amp; Events",
  support: "You're not alone,<br/>The Sam's OATH Team",
  board: "With appreciation,<br/>Sam's OATH Leadership",
  team: "— Sam's OATH Team",
  partnerships: "Best regards,<br/>Sam's OATH Partnerships",
  frank: "With hope,<br/>Frank Sheeder<br/>Founder, Sam's OATH",
};

/**
 * Get the signature for a given alias (the part before @samsoath.org).
 * Falls back to generic team signature.
 */
export function getSignature(alias: string): string {
  return SIGNATURES[alias] || SIGNATURES.hello;
}

/**
 * Get the formatted "From" address for a given alias.
 */
export function getFromAddress(alias: string): string {
  if (alias === "frank") {
    return "Frank Sheeder <frank@samsoath.org>";
  }
  return `Sam's OATH <${alias}@samsoath.org>`;
}

/** All available sending aliases */
export const EMAIL_ALIASES = [
  { value: "hello", label: "hello@", description: "General / Welcome" },
  { value: "connect", label: "connect@", description: "Contact replies" },
  { value: "share", label: "share@", description: "Story submissions" },
  { value: "press", label: "press@", description: "Media inquiries" },
  { value: "workplace", label: "workplace@", description: "Workplace programs" },
  { value: "speaking", label: "speaking@", description: "Speaking & events" },
  { value: "support", label: "support@", description: "Support & resources" },
  { value: "board", label: "board@", description: "Advisory board" },
  { value: "team", label: "team@", description: "Internal / Admin" },
  { value: "partnerships", label: "partnerships@", description: "Partner outreach" },
  { value: "frank", label: "frank@", description: "Frank Sheeder (personal)" },
] as const;

/**
 * Wraps email body content in the branded Sam's OATH template.
 *
 * @param body     - HTML body content (paragraphs, links, etc.)
 * @param alias    - Sending alias (determines signature)
 * @param options  - Optional overrides
 */
export function brandedEmailHtml(
  body: string,
  alias: string,
  options?: {
    /** Custom CTA button */
    cta?: { label: string; href: string };
    /** Override default signature */
    signature?: string;
    /** Include unsubscribe link (for newsletters) */
    unsubscribe?: boolean;
  }
): string {
  const signature = options?.signature || getSignature(alias);
  const ctaHtml = options?.cta
    ? `<div style="margin:28px 0;">
        <a href="${options.cta.href}"
           style="display:inline-block;background:${COLORS.teal};color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">
          ${options.cta.label}
        </a>
      </div>`
    : "";

  const unsubscribeHtml = options?.unsubscribe
    ? `<p style="font-size:12px;color:${COLORS.lightGray};margin-top:16px;">
        You're receiving this because you subscribed to Sam's OATH updates.
        <a href="https://samsoath.org/unsubscribe" style="color:${COLORS.lightGray};text-decoration:underline;">Unsubscribe</a>
      </p>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${COLORS.bg};font-family:system-ui,-apple-system,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="padding:0 0 24px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-bottom:3px solid ${COLORS.teal};padding-bottom:16px;">
                    <span style="font-size:20px;font-weight:700;color:${COLORS.primary};letter-spacing:-0.5px;">Sam's OATH</span>
                    <span style="font-size:13px;color:${COLORS.lightGray};margin-left:12px;font-style:italic;">What's hidden doesn't heal.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:${COLORS.white};border-radius:12px;padding:32px 28px;border:1px solid #E5E7EB;">
              <div style="font-size:16px;line-height:1.7;color:${COLORS.gray};">
                ${body}
              </div>
              ${ctaHtml}
              <div style="margin-top:32px;padding-top:20px;border-top:1px solid #F3F4F6;font-size:15px;line-height:1.6;color:${COLORS.slate};">
                ${signature}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0 0;text-align:center;">
              <p style="font-size:13px;color:${COLORS.lightGray};margin:0 0 8px 0;">
                <a href="https://samsoath.org" style="color:${COLORS.primary};text-decoration:none;font-weight:600;">samsoath.org</a>
              </p>
              <p style="font-size:12px;color:${COLORS.lightGray};margin:0;">
                Openness &middot; Authenticity &middot; Togetherness &middot; Healing
              </p>
              ${unsubscribeHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}
