-- ============================================================================
-- Sam's OATH Website - Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Description: Full schema including extensions, enums, tables, indexes,
--              triggers, and utility functions.
-- ============================================================================

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

CREATE TYPE oath_category AS ENUM (
  'struggling',
  'memory',
  'supporter'
);

CREATE TYPE story_status AS ENUM (
  'pending',
  'in_review',
  'approved',
  'rejected',
  'published'
);

CREATE TYPE contact_type AS ENUM (
  'general',
  'speaking',
  'workplace',
  'partnership'
);

CREATE TYPE message_priority AS ENUM (
  'low',
  'normal',
  'high',
  'urgent'
);

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Auto-update updated_at timestamp on row modification
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Return hex color string for a given oath category
CREATE OR REPLACE FUNCTION get_pin_color(cat oath_category)
RETURNS TEXT AS $$
BEGIN
  CASE cat
    WHEN 'struggling' THEN RETURN '#E53E3E';  -- red
    WHEN 'memory'     THEN RETURN '#805AD5';  -- purple
    WHEN 'supporter'  THEN RETURN '#3182CE';  -- blue
    ELSE RETURN '#718096';                     -- gray fallback
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger function: auto-set pin_color on oath_submissions insert
CREATE OR REPLACE FUNCTION set_oath_pin_color()
RETURNS TRIGGER AS $$
BEGIN
  NEW.pin_color = get_pin_color(NEW.category);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Generate a URL-safe slug from arbitrary text
CREATE OR REPLACE FUNCTION generate_slug(input TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
BEGIN
  -- Lowercase
  slug := LOWER(input);
  -- Replace non-alphanumeric characters (except hyphens) with hyphens
  slug := REGEXP_REPLACE(slug, '[^a-z0-9\-]', '-', 'g');
  -- Collapse consecutive hyphens
  slug := REGEXP_REPLACE(slug, '-+', '-', 'g');
  -- Trim leading/trailing hyphens
  slug := TRIM(BOTH '-' FROM slug);
  RETURN slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger function: auto-generate slug and set published_at when a story
-- transitions to 'published' status
CREATE OR REPLACE FUNCTION on_story_published()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status <> 'published') THEN
    -- Generate slug from title if not already set
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
      NEW.slug := generate_slug(NEW.title);
      -- Append a short unique suffix to avoid collisions
      IF EXISTS (SELECT 1 FROM story_submissions WHERE slug = NEW.slug AND id <> NEW.id) THEN
        NEW.slug := NEW.slug || '-' || SUBSTRING(NEW.id::TEXT FROM 1 FOR 8);
      END IF;
    END IF;
    -- Set published_at timestamp
    IF NEW.published_at IS NULL THEN
      NEW.published_at := NOW();
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TABLE 1: oath_submissions
-- ============================================================================

CREATE TABLE oath_submissions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  email             TEXT,
  category          oath_category NOT NULL,
  city              TEXT NOT NULL,
  state             TEXT NOT NULL,
  latitude          DOUBLE PRECISION,
  longitude         DOUBLE PRECISION,
  pin_color         TEXT,
  message           TEXT,
  name_display_type TEXT NOT NULL DEFAULT 'full'
                    CHECK (name_display_type IN ('full', 'first', 'initials', 'anonymous')),
  display_name      TEXT NOT NULL,
  geocoded          BOOLEAN NOT NULL DEFAULT FALSE,
  email_optin       BOOLEAN NOT NULL DEFAULT FALSE,
  ip_address        TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-set pin_color on insert
CREATE TRIGGER trg_oath_set_pin_color
  BEFORE INSERT ON oath_submissions
  FOR EACH ROW
  EXECUTE FUNCTION set_oath_pin_color();

-- Auto-update updated_at
CREATE TRIGGER trg_oath_updated_at
  BEFORE UPDATE ON oath_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- TABLE 2: story_submissions
-- ============================================================================

CREATE TABLE story_submissions (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name      TEXT NOT NULL,
  author_email     TEXT NOT NULL,
  author_city      TEXT,
  author_state     TEXT,
  author_relation  TEXT,
  title            TEXT NOT NULL,
  content          TEXT NOT NULL,
  excerpt          TEXT,
  slug             TEXT UNIQUE,
  photo_url        TEXT,
  status           story_status NOT NULL DEFAULT 'pending',
  reviewer_notes   TEXT,
  reviewed_at      TIMESTAMPTZ,
  published_at     TIMESTAMPTZ,
  is_featured      BOOLEAN NOT NULL DEFAULT FALSE,
  show_on_map      BOOLEAN NOT NULL DEFAULT FALSE,
  latitude         DOUBLE PRECISION,
  longitude        DOUBLE PRECISION,
  consent_publish  BOOLEAN,
  consent_name     BOOLEAN,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-handle publish events
CREATE TRIGGER trg_story_published
  BEFORE INSERT OR UPDATE ON story_submissions
  FOR EACH ROW
  EXECUTE FUNCTION on_story_published();

-- Auto-update updated_at
CREATE TRIGGER trg_story_updated_at
  BEFORE UPDATE ON story_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- TABLE 3: contact_messages
-- ============================================================================

CREATE TABLE contact_messages (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_name  TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_phone TEXT,
  message_type contact_type NOT NULL DEFAULT 'general',
  subject      TEXT NOT NULL,
  body         TEXT NOT NULL,
  metadata     JSONB NOT NULL DEFAULT '{}',
  priority     message_priority NOT NULL DEFAULT 'normal',
  is_read      BOOLEAN NOT NULL DEFAULT FALSE,
  is_archived  BOOLEAN NOT NULL DEFAULT FALSE,
  is_replied   BOOLEAN NOT NULL DEFAULT FALSE,
  replied_at   TIMESTAMPTZ,
  admin_notes  TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE TRIGGER trg_contact_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- TABLE 4: newsletter_subscribers
-- ============================================================================

CREATE TABLE newsletter_subscribers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           TEXT NOT NULL UNIQUE,
  first_name      TEXT,
  interests       JSONB NOT NULL DEFAULT '[]',
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  source          TEXT NOT NULL DEFAULT 'website'
);

-- ============================================================================
-- TABLE 5: blog_posts
-- ============================================================================

CREATE TABLE blog_posts (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title              TEXT NOT NULL,
  slug               TEXT NOT NULL UNIQUE,
  content            TEXT NOT NULL,
  excerpt            TEXT,
  featured_image_url TEXT,
  tags               JSONB NOT NULL DEFAULT '[]',
  status             TEXT NOT NULL DEFAULT 'draft',
  author_name        TEXT NOT NULL DEFAULT 'Frank Sheeder',
  published_at       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE TRIGGER trg_blog_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- TABLE 6: ambassadors
-- ============================================================================

CREATE TABLE ambassadors (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  city         TEXT,
  state        TEXT,
  bio          TEXT,
  photo_url    TEXT,
  social_links JSONB NOT NULL DEFAULT '{}',
  oath_date    DATE,
  status       TEXT NOT NULL DEFAULT 'pending',
  is_featured  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE TRIGGER trg_ambassadors_updated_at
  BEFORE UPDATE ON ambassadors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- TABLE 7: email_campaigns
-- ============================================================================

CREATE TABLE email_campaigns (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  subject       TEXT NOT NULL,
  html_body     TEXT,
  audience      TEXT NOT NULL DEFAULT 'all',
  total_sent    INTEGER NOT NULL DEFAULT 0,
  total_opened  INTEGER NOT NULL DEFAULT 0,
  total_clicked INTEGER NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'draft',
  scheduled_for TIMESTAMPTZ,
  sent_at       TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE TRIGGER trg_campaigns_updated_at
  BEFORE UPDATE ON email_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- TABLE 8: site_content
-- ============================================================================

CREATE TABLE site_content (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug        TEXT NOT NULL,
  section_key      TEXT NOT NULL,
  content_type     TEXT NOT NULL DEFAULT 'text',
  content          TEXT,
  version          INTEGER NOT NULL DEFAULT 1,
  previous_content TEXT,
  ai_generated     BOOLEAN NOT NULL DEFAULT FALSE,
  ai_prompt        TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (page_slug, section_key)
);

-- Auto-update updated_at
CREATE TRIGGER trg_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- TABLE 9: site_content_history
-- ============================================================================

CREATE TABLE site_content_history (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id   UUID NOT NULL REFERENCES site_content(id) ON DELETE CASCADE,
  page_slug    TEXT NOT NULL,
  section_key  TEXT NOT NULL,
  content      TEXT,
  version      INTEGER NOT NULL,
  ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
  ai_prompt    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- TABLE 10: media_library
-- ============================================================================

CREATE TABLE media_library (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename          TEXT NOT NULL,
  original_filename TEXT,
  file_url          TEXT NOT NULL,
  thumbnail_url     TEXT,
  width             INTEGER,
  height            INTEGER,
  file_size         INTEGER,
  mime_type         TEXT,
  alt_text          TEXT,
  usage_context     TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- TABLE 11: admin_activity_log
-- ============================================================================

CREATE TABLE admin_activity_log (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   UUID,
  details     JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- oath_submissions
CREATE INDEX idx_oath_category      ON oath_submissions (category);
CREATE INDEX idx_oath_geocoded      ON oath_submissions (geocoded);
CREATE INDEX idx_oath_created_at    ON oath_submissions (created_at DESC);
CREATE INDEX idx_oath_email         ON oath_submissions (email)    WHERE email IS NOT NULL;
CREATE INDEX idx_oath_state         ON oath_submissions (state);
CREATE INDEX idx_oath_coords        ON oath_submissions (latitude, longitude)
                                    WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- story_submissions
CREATE INDEX idx_story_status       ON story_submissions (status);
CREATE INDEX idx_story_slug         ON story_submissions (slug)    WHERE slug IS NOT NULL;
CREATE INDEX idx_story_created_at   ON story_submissions (created_at DESC);
CREATE INDEX idx_story_published_at ON story_submissions (published_at DESC)
                                    WHERE published_at IS NOT NULL;
CREATE INDEX idx_story_featured     ON story_submissions (is_featured)
                                    WHERE is_featured = TRUE;
CREATE INDEX idx_story_author_email ON story_submissions (author_email);

-- contact_messages
CREATE INDEX idx_contact_type       ON contact_messages (message_type);
CREATE INDEX idx_contact_priority   ON contact_messages (priority);
CREATE INDEX idx_contact_is_read    ON contact_messages (is_read);
CREATE INDEX idx_contact_is_archived ON contact_messages (is_archived);
CREATE INDEX idx_contact_created_at ON contact_messages (created_at DESC);
CREATE INDEX idx_contact_email      ON contact_messages (sender_email);

-- newsletter_subscribers
CREATE INDEX idx_newsletter_active  ON newsletter_subscribers (is_active)
                                    WHERE is_active = TRUE;
CREATE INDEX idx_newsletter_source  ON newsletter_subscribers (source);

-- blog_posts
CREATE INDEX idx_blog_slug          ON blog_posts (slug);
CREATE INDEX idx_blog_status        ON blog_posts (status);
CREATE INDEX idx_blog_published_at  ON blog_posts (published_at DESC)
                                    WHERE published_at IS NOT NULL;
CREATE INDEX idx_blog_created_at    ON blog_posts (created_at DESC);
CREATE INDEX idx_blog_tags          ON blog_posts USING GIN (tags);

-- ambassadors
CREATE INDEX idx_ambassadors_status ON ambassadors (status);
CREATE INDEX idx_ambassadors_email  ON ambassadors (email);
CREATE INDEX idx_ambassadors_featured ON ambassadors (is_featured)
                                      WHERE is_featured = TRUE;

-- email_campaigns
CREATE INDEX idx_campaigns_status   ON email_campaigns (status);
CREATE INDEX idx_campaigns_scheduled ON email_campaigns (scheduled_for)
                                     WHERE scheduled_for IS NOT NULL;
CREATE INDEX idx_campaigns_created_at ON email_campaigns (created_at DESC);

-- site_content
CREATE INDEX idx_site_content_page  ON site_content (page_slug);
CREATE INDEX idx_site_content_type  ON site_content (content_type);

-- site_content_history
CREATE INDEX idx_content_history_content_id ON site_content_history (content_id);
CREATE INDEX idx_content_history_version    ON site_content_history (content_id, version DESC);

-- media_library
CREATE INDEX idx_media_mime_type    ON media_library (mime_type);
CREATE INDEX idx_media_usage        ON media_library (usage_context)
                                    WHERE usage_context IS NOT NULL;
CREATE INDEX idx_media_created_at   ON media_library (created_at DESC);

-- admin_activity_log
CREATE INDEX idx_activity_action    ON admin_activity_log (action);
CREATE INDEX idx_activity_entity    ON admin_activity_log (entity_type, entity_id);
CREATE INDEX idx_activity_created_at ON admin_activity_log (created_at DESC);

-- Text search indexes (using pg_trgm)
CREATE INDEX idx_oath_name_trgm     ON oath_submissions USING GIN (first_name gin_trgm_ops);
CREATE INDEX idx_story_title_trgm   ON story_submissions USING GIN (title gin_trgm_ops);
CREATE INDEX idx_blog_title_trgm    ON blog_posts USING GIN (title gin_trgm_ops);
CREATE INDEX idx_media_alt_trgm     ON media_library USING GIN (alt_text gin_trgm_ops)
                                    WHERE alt_text IS NOT NULL;

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
