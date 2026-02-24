-- ============================================
-- Migration 005: Ads Tracking & UTM Attribution
-- ============================================
-- Run this in Supabase SQL Editor
-- Creates ad_campaigns table and adds UTM columns to all submission tables

-- 1. Ad Campaigns table
CREATE TABLE IF NOT EXISTS ad_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'google',        -- google, meta, tiktok, linkedin, other
  campaign_type TEXT DEFAULT 'search',            -- search, display, social, video, email
  utm_campaign TEXT,                              -- maps to ?utm_campaign= parameter
  utm_source TEXT,                                -- default utm_source for this campaign
  utm_medium TEXT,                                -- default utm_medium for this campaign
  budget NUMERIC(10,2),
  spent NUMERIC(10,2) DEFAULT 0,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'draft',                    -- draft, active, paused, completed
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access on ad_campaigns" ON ad_campaigns FOR ALL USING (true);

-- 2. Add UTM columns to oath_submissions
ALTER TABLE oath_submissions ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE oath_submissions ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE oath_submissions ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE oath_submissions ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE oath_submissions ADD COLUMN IF NOT EXISTS utm_term TEXT;

-- 3. Add UTM columns to story_submissions
ALTER TABLE story_submissions ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE story_submissions ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE story_submissions ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE story_submissions ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE story_submissions ADD COLUMN IF NOT EXISTS utm_term TEXT;

-- 4. Add UTM columns to contact_messages
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS utm_term TEXT;

-- 5. Add UTM columns to newsletter_subscribers
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS utm_term TEXT;

-- 6. Add UTM columns to ambassadors
ALTER TABLE ambassadors ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE ambassadors ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE ambassadors ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE ambassadors ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE ambassadors ADD COLUMN IF NOT EXISTS utm_term TEXT;

-- 7. Index for campaign performance queries
CREATE INDEX IF NOT EXISTS idx_oath_utm_campaign ON oath_submissions(utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_oath_utm_source ON oath_submissions(utm_source) WHERE utm_source IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_story_utm_campaign ON story_submissions(utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_newsletter_utm_campaign ON newsletter_subscribers(utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_ambassador_utm_campaign ON ambassadors(utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_contact_utm_campaign ON contact_messages(utm_campaign) WHERE utm_campaign IS NOT NULL;
