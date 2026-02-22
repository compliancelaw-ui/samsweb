-- Add referral tracking columns to oath_submissions
-- Run this in Supabase SQL Editor

-- Unique referral code for each oath taker (used in share links)
ALTER TABLE oath_submissions
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- Who referred this person (their referral_code)
ALTER TABLE oath_submissions
ADD COLUMN IF NOT EXISTS referred_by TEXT;

-- Auto-generate referral codes for existing rows that don't have one
UPDATE oath_submissions
SET referral_code = SUBSTRING(id::text, 1, 8)
WHERE referral_code IS NULL;

-- Create index for fast referral lookups
CREATE INDEX IF NOT EXISTS idx_oath_referral_code ON oath_submissions(referral_code);
CREATE INDEX IF NOT EXISTS idx_oath_referred_by ON oath_submissions(referred_by);

-- Function to auto-generate referral code on new inserts
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := SUBSTRING(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code
DROP TRIGGER IF EXISTS set_referral_code ON oath_submissions;
CREATE TRIGGER set_referral_code
  BEFORE INSERT ON oath_submissions
  FOR EACH ROW
  EXECUTE FUNCTION generate_referral_code();
