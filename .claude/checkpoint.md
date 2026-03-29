# Checkpoint - 2026-03-29 (SamsOath Mega-Session)

## Completed This Session

### Google Ad Grants Readiness (all deployed)
- Removed all "Coming Soon" text, stock photo placeholders, fake EIN
- Advisory Board rewritten with Sheeder family as founding advisors
- EIN 39-5101030 added everywhere, "public charity" status updated
- "Sam's OATH Foundation" -> "Sam's OATH" across 12 files
- Removed all "stigma" language (40+ refs), replaced with openness/silence/community
- Fixed cause-of-death language (moped accident, not substance use)
- Story locations fixed (Annie in NC, Frank/Joey/Nancy in TX)
- "Blog" -> "Updates & News"
- Google Analytics already wired (G-M6M4ZP7REZ)

### Homepage Restructure (deployed)
- New structure: Hero -> Who Was Sam? -> Silence Problem stats -> OATH Framework (with emotional hooks) -> Frank's Quote -> Movement Map -> Stories -> Activity Ticker -> Single CTA
- CTAs reduced from 9 to 4
- OATH pillars framed as a journey (O -> A -> T -> H leads to Healing)

### Visual Design (deployed)
- 8 Firefly-generated inclusive photos wired into About, Workplace, Share Your Story, Get Involved
- Dock at golden hour hero for About page
- People-sharing group photo replaced twice for diversity

### Admin Features (deployed)
- Content Calendar page (/admin/calendar)
- Donations Dashboard (/admin/donations)
- Social Publishing with Meta Graph API (/admin/social enhanced)
- Google Ad Grant tab (/admin/ads)
- 4 blog posts pushed to Supabase

### Phase 1: Post-Action Engagement (deployed)
- OathShareSection component: certificate download + social sharing with pre-written platform messages
- SoftEmailCapture component: gentle email capture for anonymous users with privacy assurance
- Enhanced thank-you/oath page: O->A->T->H arc (certificate, sharing, challenge 3, email capture)
- Enhanced thank-you/story page: celebrates Authenticity, tracked social sharing, email capture
- OG image generation (/api/og/oath) for branded social sharing images
- Share event tracking API + migration (share_events table)
- Instagram + TikTok added to floating share buttons site-wide

## Current Task: Phase 2 - Resource Library

Building the resource library infrastructure and first 2 guides:
1. resource_documents database table/migration
2. Admin CRUD at /admin/resources
3. Public pages: /resources/guides and /resources/guides/[slug]
4. Branded multi-page PDF generation system (pdf-lib)
5. First 2 guides: "How to Talk to Your Family" + "What to Do in a Crisis"

## Remaining Phases

- Phase 3: Remaining 5 guides + workplace toolkit
- Phase 4: Challenge system (public-facing, monthly challenges, badges)
- Phase 5: Stories feed redesign (masonry layout, per-story sharing)
- Phase 6: Email drip enhancements (extend to 90 days, monthly newsletter cron)

## Key Decisions

- "Sam's OATH" (never Foundation), EIN 39-5101030, Texas public charity
- No "stigma" language - use openness/silence/community
- Sam died in moped accident - never imply substance use was cause of death
- OATH is a journey: O -> A -> T -> H (not four equal pillars)
- Movement is FOR FAMILIES, not people in recovery
- All content must cite authoritative sources (SAMHSA, NAMI, NIMH)
- Admin features built directly in SamsOath (not Frankventure hub)
- Social accounts need setup (see feature_specs/engagement-platform-plan.md)
- Frank/Joey/Nancy in Texas, Annie in North Carolina

## Feature Spec

Full plan at .claude/feature_specs/engagement-platform-plan.md
