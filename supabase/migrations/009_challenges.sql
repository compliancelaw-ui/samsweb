-- 009_challenges.sql
-- Monthly challenge system for Sam's OATH

SET ROLE postgres;

CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  challenge_text TEXT NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL DEFAULT 'conversation',
  badge_label TEXT,
  badge_color TEXT DEFAULT '#3EABA8',
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  participant_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS challenge_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_challenge_active ON challenges(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_challenge_month ON challenges(year, month);
CREATE INDEX IF NOT EXISTS idx_cp_challenge ON challenge_participants(challenge_id);

-- Enable RLS
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;

-- Public read for active/past challenges
CREATE POLICY IF NOT EXISTS "challenges_public_read" ON challenges
  FOR SELECT USING (true);

-- Service role full access
CREATE POLICY IF NOT EXISTS "challenges_service_all" ON challenges
  FOR ALL USING (true) WITH CHECK (true);

-- Public insert for participants (joining a challenge)
CREATE POLICY IF NOT EXISTS "participants_public_insert" ON challenge_participants
  FOR INSERT WITH CHECK (true);

-- Public read for participant counts
CREATE POLICY IF NOT EXISTS "participants_public_read" ON challenge_participants
  FOR SELECT USING (true);

-- Service role full access
CREATE POLICY IF NOT EXISTS "participants_service_all" ON challenge_participants
  FOR ALL USING (true) WITH CHECK (true);
