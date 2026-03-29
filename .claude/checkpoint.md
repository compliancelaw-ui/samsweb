# Checkpoint - 2026-03-29 (SamsOath Session)

## What Was Accomplished

### Google Ad Grants Readiness
- Removed all "Coming Soon" text across site (advisory board, ambassadors, press, families)
- Rewrote Advisory Board page with Sheeder family as founding advisors (Frank, Nancy, Annie, Joey)
- Added EIN 39-5101030 to about, donate, press pages and JSON-LD structured data
- Updated all references from "Sam's OATH Foundation" to "Sam's OATH"
- Updated 501(c)(3) status to "public charity" everywhere
- Verified Google Analytics already wired (G-M6M4ZP7REZ)
- Verified sitemap, robots.txt, meta descriptions, OG tags all solid

### Language & Content Corrections
- Removed all "stigma" language (40+ references) - replaced with openness/silence/community framing
- Fixed cause-of-death language - Sam died in a moped accident, not from substance use
- Fixed story locations: Annie in North Carolina, Frank/Joey/Nancy in Texas (not Dallas)
- Changed "Blog" to "Updates & News" in all user-facing text

### Visual Design
- Generated 8 new inclusive photos via Adobe Firefly with consistent style
- Wired photos into About (hero, silence section, stories section), Workplace (hero), Share Your Story (hero), Get Involved (hero)
- Replaced stock photo placeholders with real generated images

### Homepage Restructure
- Reordered sections for emotional arc: Hero -> Who Was Sam? -> Silence Problem -> OATH Framework -> Frank's Quote -> Movement Map -> Stories -> Activity Ticker -> Single CTA
- Added new "Who Was Sam?" section with portrait and emotional intro
- Added "The Silence Is the Crisis" stats section
- Added emotional hooks to each OATH pillar card
- Reduced CTAs from 8-9 to 4 (hero + closing only)
- Removed redundant Categories section and Stories Promo dark section
- Moved Activity Ticker from top to near-bottom (social proof after content)
- Moved Movement Map up (social proof before the ask)

### Blog Posts
- Created and pushed 4 update posts to Supabase:
  1. "Why We Say the Words Out Loud"
  2. "What Happens When You Take Sam's OATH"
  3. "The Post That Started Everything"
  4. "You Are Not Alone: A Message to Families"

## Hub Updates Needed
- **Frankventure Command Center**: Create a founder video for SamsOath. Frank talking about Sam for 2-3 minutes - highest ROI item for site engagement. See video script below.

## Video Script Todo (for Frankventure Admin Session)

**Task**: Write a 2-3 minute video script for Frank talking about Sam and why he built Sam's OATH.

**Context**: The SamsOath site audit identified founder video as the single highest-impact addition. Movement sites live and die on founder video. It doesn't need to be polished - iPhone with good lighting in a quiet room would work.

**Script guidelines**:
- Open with Sam as a person (not the movement)
- Talk about what substance use disorder did to the family's silence
- The LinkedIn post moment (345K people, "I thought I was the only one")
- What the OATH means and why it's named after Sam
- Close with direct invitation to take the oath
- Tone: conversational, honest, not scripted-sounding. Frank talking to one person.
- Length: 2-3 minutes max
- Filming: iPhone on tripod, natural light, quiet room, casual clothing

**Where it goes on the site**: Homepage (new video section after Frank's quote) and About page.

## Next Steps
- TechSoup verification pending (Google Ad Grants application)
- Generate more inclusive photos as needed for other pages
- Await video production
- Continue building out real user stories and ambassador profiles

## Key Decisions Made
- "Sam's OATH" is the official name (never "Foundation")
- No "stigma" language - use openness/silence/community
- Sam died in a moped accident - never imply substance use was cause of death
- Family locations: Frank/Joey/Nancy in Texas, Annie in North Carolina
- Admin center is being handled in separate Frankventure command center session
- Advisory board starts with family as founding advisors, expanding to outside professionals

## Files Created/Modified This Session
- src/app/(public)/page.tsx (homepage restructure)
- src/app/(public)/advisory-board/page.tsx (complete rewrite)
- src/app/(public)/about/page.tsx (stock photos, partners, EIN, public charity)
- src/app/(public)/ambassadors/page.tsx (coming soon removal)
- src/app/(public)/press/page.tsx (coming soon, Foundation, stigma, cause of death)
- src/app/(public)/families/page.tsx (video coming soon text)
- src/app/(public)/donate/page.tsx (Foundation, EIN, public charity)
- src/app/(public)/donate/thank-you/page.tsx (Foundation)
- src/app/(public)/stories/page.tsx (locations, stigma)
- src/app/(public)/blog/page.tsx (Blog -> Updates)
- src/app/(public)/blog/[slug]/page.tsx (Blog -> Updates)
- src/app/(public)/links/page.tsx (Blog -> Updates)
- src/app/(public)/share-your-story/page.tsx (hero image, stigma)
- src/app/(public)/workplace/page.tsx (hero image, stigma)
- src/app/(public)/get-involved/page.tsx (hero image, stigma)
- src/app/(public)/events/page.tsx (stigma)
- src/app/(public)/take-the-oath/page.tsx (stigma)
- src/app/(public)/contact/page.tsx (stigma)
- src/app/(public)/resources/page.tsx (stigma, Foundation)
- src/app/layout.tsx (Foundation, JSON-LD, public charity)
- src/components/layout/footer.tsx (Foundation, public charity)
- src/components/forms/donation-form.tsx (Foundation, public charity)
- src/lib/cms/content-defaults.ts (stigma, cause of death, blog subtitle)
- src/lib/email.ts (Foundation)
- src/lib/email-drips.ts (Foundation, stigma)
- src/lib/content-calendar.ts (stigma hashtags)
- src/app/api/admin/digest/route.ts (stigma)
- src/app/admin/social/page.tsx (stigma hashtag)
- src/app/admin/blog/page.tsx (stigma in SEO prompt)
- public/images/photos/*.png (8 new Firefly-generated images)
