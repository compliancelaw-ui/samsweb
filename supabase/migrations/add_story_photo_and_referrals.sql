-- Sam's OATH — Combined Migration
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/spqisrxqpqrphkndnlad/sql/new)
-- Safe to run multiple times (all operations use IF NOT EXISTS / IF NULL checks)

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. REFERRAL TRACKING (oath_submissions)
-- ═══════════════════════════════════════════════════════════════════════════

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

-- Create indexes for fast referral lookups
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

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. PHOTO UPLOAD FOR STORIES (story_submissions)
-- ═══════════════════════════════════════════════════════════════════════════

-- Optional photo URL for story submissions
ALTER TABLE story_submissions
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. STORAGE BUCKET FOR UPLOADS
-- ═══════════════════════════════════════════════════════════════════════════
-- NOTE: Storage buckets must be created via the Supabase Dashboard:
--   1. Go to Storage in the sidebar
--   2. Click "New bucket"
--   3. Name: "uploads"
--   4. Check "Public bucket" (so images have public URLs)
--   5. Allowed MIME types: image/jpeg, image/png, image/webp
--   6. Max file size: 5 MB
--
-- Or run this SQL to create the bucket programmatically:
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to uploaded files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Public read access for uploads'
      AND tablename = 'objects'
      AND schemaname = 'storage'
  ) THEN
    CREATE POLICY "Public read access for uploads"
      ON storage.objects
      FOR SELECT
      USING (bucket_id = 'uploads');
  END IF;
END $$;

-- Allow authenticated uploads (service role handles this via API)
-- No additional policy needed since we upload via supabaseAdmin (service role)
