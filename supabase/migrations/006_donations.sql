-- Donations table for tracking Stripe payments (one-time and recurring)
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  donor_email TEXT,
  donor_name TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  donation_type TEXT NOT NULL CHECK (donation_type IN ('one-time', 'recurring')),
  stripe_session_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'canceled')),
  campaign TEXT DEFAULT 'general'
);

-- Index for looking up by Stripe session
CREATE INDEX IF NOT EXISTS idx_donations_stripe_session ON donations (stripe_session_id);

-- Index for recurring donation lookups
CREATE INDEX IF NOT EXISTS idx_donations_subscription ON donations (stripe_subscription_id);

-- Index for donor email lookups
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations (donor_email);

-- Index for reporting by date
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations (created_at DESC);

-- RLS: only service role can insert/read (no public access)
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- No public policies - all access through service role (supabaseAdmin)
