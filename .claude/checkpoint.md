# Checkpoint - 2026-03-29 (Final)

## Session Complete - Site Is Debut Ready

75 pages deployed across 21 commits. Full engagement platform built.

## Pre-Launch Testing (Frank's action)

- [ ] Take the OATH on mobile - test form, thank-you page, certificate, sharing
- [ ] Submit a test story - check submission and thank-you flow
- [ ] Download a resource guide PDF - verify branding and content
- [ ] Try the challenge join form on /challenges
- [ ] Test mobile experience (nav, images, readability)
- [ ] Read "Who Was Sam?" section aloud - make sure it sounds like Frank
- [ ] Read first blog post - would you post this on LinkedIn?
- [ ] Verify Supabase is on paid plan (free tier will choke under traffic)
- [ ] Verify Vercel is on Pro plan (free tier has bandwidth limits)

## Post-Launch Action Items

- [ ] Film founder video (2-3 min, iPhone, natural light, script outline in feature spec)
- [ ] Write and post LinkedIn announcement linking to samsoath.org/take-the-oath
- [ ] Set up Meta Developer App for social publishing (full checklist below)
- [ ] Wait for TechSoup verification, then apply for Google Ad Grants
- [ ] Get real stories flowing (ask LinkedIn audience to share)

## Social Account Setup

### Meta Developer App (enables publishing from admin)
1. Go to developers.facebook.com, create app (type: Business)
2. Add Facebook Login product
3. Request: pages_manage_posts, pages_read_engagement, instagram_content_publish, instagram_basic
4. Generate long-lived Page Access Token
5. Add env vars to Vercel:
   - META_SAMSOATH_PAGE_TOKEN
   - META_SAMSOATH_PAGE_ID
   - META_SAMSOATH_IG_ACCOUNT_ID

### Other Social
- Create/verify Facebook Page for Sam's OATH
- Convert Instagram @samsoath to Business Account, link to Facebook Page
- TikTok @samsoath profile setup
- Consider LinkedIn company page

## What Was Built This Session

### Public Site (75 pages)
- Homepage restructured around O->A->T->H journey with Sam's story
- Advisory board with Sheeder family as founding advisors
- 11 Firefly-generated inclusive photos across site
- 8 blog posts on Updates page
- 7 downloadable resource guides for families + workplace toolkit
- Monthly challenge system with public page + homepage card
- Stories feed with masonry grid, featured stories, per-story sharing
- Post-oath/story social sharing with pre-written messages + certificates
- OG image generation for social sharing
- Soft email capture for anonymous users
- All language corrected (no stigma, no Foundation, no em-dashes, correct cause of death)

### Admin Features
- Content Calendar, Donations Dashboard, Social Publishing, Google Ad Grant tab
- Resource Library CRUD, Analytics (shares + downloads)
- 8-email drip sequence (0-90 days) following O->A->T->H arc
- Post-story drip sequence (2 emails)
- Monthly newsletter cron + template
- Share event tracking

### Database Tables Created
- share_events (share tracking)
- resource_documents (7 family guides + 1 workplace toolkit)
- challenges + challenge_participants (3 months seeded)
- blog_posts (8 posts)

## Key Decisions (permanent)
- "Sam's OATH" (never Foundation), EIN 39-5101030, Texas public charity
- No "stigma" language - use openness, silence, community
- No em-dashes - use commas, periods, colons, or hyphens
- Sam died in a moped accident - never imply substance use was cause
- OATH is a journey: O -> A -> T -> H (not four equal pillars)
- Movement is FOR FAMILIES, not people in recovery
- All content cites authoritative sources (SAMHSA, NAMI, NIMH)
- Admin features built in SamsOath directly (not Frankventure hub)
- Frank/Joey/Nancy in Texas, Annie in North Carolina

## Feature Spec
Full engagement platform plan at .claude/feature_specs/engagement-platform-plan.md
