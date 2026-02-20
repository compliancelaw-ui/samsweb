/**
 * Content filter for story submissions.
 * Screens for triggering words, spam, naming people, and inappropriate content.
 * Returns flags for moderator review — does NOT auto-reject.
 */

export type ContentFlag = {
  type: "triggering" | "names" | "spam" | "inappropriate" | "contact_info";
  severity: "warning" | "review";
  message: string;
  matches: string[];
};

export type FilterResult = {
  flagged: boolean;
  flags: ContentFlag[];
  score: number; // 0 = clean, higher = more flags
};

// Words/phrases that may indicate graphic content requiring moderator review
const TRIGGERING_PATTERNS = [
  // Methods of self-harm (flagged so moderator can ensure safe messaging)
  /\b(overdos(?:e|ed|ing)|hung\s+(?:him|her|them)self|slit|cutting\s+(?:my|their|her|his)\s+wrist)/gi,
  // Graphic substance descriptions
  /\b(shoot(?:ing)?\s+up|inject(?:ed|ing)\s+(?:heroin|meth|fentanyl))/gi,
  // Explicit suicide references (for safe messaging review)
  /\b(kill(?:ed)?\s+(?:my|him|her|them)self|commit(?:ted)?\s+suicide|suicide\s+attempt)/gi,
];

// Patterns that suggest naming specific individuals (who may not have consented)
const NAME_PATTERNS = [
  // "Dr. Smith", "Dr Smith"
  /\bDr\.?\s+[A-Z][a-z]+/g,
  // "Judge/Officer/Detective LastName"
  /\b(?:Judge|Officer|Detective|Sergeant|Deputy|Sheriff|Chief|Commissioner|Counselor|Therapist)\s+[A-Z][a-z]+/g,
  // Facility/rehab names that could identify people
  /\b(?:at|from|went to)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\s+(?:Rehab|Recovery|Treatment|Hospital|Center|Clinic|Facility)/gi,
];

// Spam indicators
const SPAM_PATTERNS = [
  /\b(?:buy\s+now|click\s+here|free\s+(?:money|gift|trial)|act\s+now|limited\s+time)\b/gi,
  /\b(?:viagra|cialis|crypto|bitcoin|nft|forex)\b/gi,
  /(?:https?:\/\/){2,}/g, // Multiple URLs
  /(.)\1{10,}/g, // 10+ repeated characters
  /\b[A-Z\s]{50,}\b/g, // Long ALL CAPS sections
];

// Inappropriate content
const INAPPROPRIATE_PATTERNS = [
  // Hate speech indicators
  /\b(?:racial\s+slur|white\s+supremac|kill\s+all)\b/gi,
  // Explicit profanity (basic filter — moderator handles nuance)
  /\b(?:f+u+c+k+|s+h+i+t+|c+u+n+t+|n+i+g+g+)/gi,
];

// Contact info that shouldn't be in stories (for privacy)
const CONTACT_INFO_PATTERNS = [
  // Phone numbers
  /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  // Email addresses
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
  // Social media handles (could identify people)
  /@[A-Za-z0-9_]{3,}/g,
];

function findMatches(text: string, patterns: RegExp[]): string[] {
  const matches: string[] = [];
  for (const pattern of patterns) {
    // Reset lastIndex for global patterns
    pattern.lastIndex = 0;
    const found = text.match(pattern);
    if (found) {
      matches.push(...found.map((m) => m.trim()));
    }
  }
  return Array.from(new Set(matches)); // Deduplicate
}

export function filterContent(text: string): FilterResult {
  const flags: ContentFlag[] = [];

  // Check triggering content
  const triggeringMatches = findMatches(text, TRIGGERING_PATTERNS);
  if (triggeringMatches.length > 0) {
    flags.push({
      type: "triggering",
      severity: "review",
      message:
        "Contains potentially triggering language. Review to ensure safe messaging guidelines are followed.",
      matches: triggeringMatches,
    });
  }

  // Check for named individuals
  const nameMatches = findMatches(text, NAME_PATTERNS);
  if (nameMatches.length > 0) {
    flags.push({
      type: "names",
      severity: "review",
      message:
        "May reference specific individuals by name/title. Verify consent before publishing.",
      matches: nameMatches,
    });
  }

  // Check for spam
  const spamMatches = findMatches(text, SPAM_PATTERNS);
  if (spamMatches.length > 0) {
    flags.push({
      type: "spam",
      severity: "warning",
      message: "Contains potential spam or promotional content.",
      matches: spamMatches,
    });
  }

  // Check for inappropriate content
  const inappropriateMatches = findMatches(text, INAPPROPRIATE_PATTERNS);
  if (inappropriateMatches.length > 0) {
    flags.push({
      type: "inappropriate",
      severity: "review",
      message: "Contains potentially inappropriate language.",
      matches: inappropriateMatches,
    });
  }

  // Check for contact information
  const contactMatches = findMatches(text, CONTACT_INFO_PATTERNS);
  if (contactMatches.length > 0) {
    flags.push({
      type: "contact_info",
      severity: "warning",
      message:
        "Contains contact information (phone, email, or social handles). Remove for privacy before publishing.",
      matches: contactMatches,
    });
  }

  // Calculate score: review flags = 2 points, warning flags = 1 point
  const score = flags.reduce(
    (total, flag) => total + (flag.severity === "review" ? 2 : 1),
    0
  );

  return {
    flagged: flags.length > 0,
    flags,
    score,
  };
}

/**
 * Quick check for the API route — returns true if content should be flagged for review.
 */
export function shouldFlagForReview(
  title: string,
  content: string
): FilterResult {
  const combined = `${title}\n\n${content}`;
  return filterContent(combined);
}
