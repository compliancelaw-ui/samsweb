CREATE TABLE IF NOT EXISTS resource_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'families',
  content TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  sources JSONB NOT NULL DEFAULT '[]',
  tags JSONB NOT NULL DEFAULT '[]',
  download_count INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resource_slug ON resource_documents(slug);
CREATE INDEX IF NOT EXISTS idx_resource_category ON resource_documents(category);
CREATE INDEX IF NOT EXISTS idx_resource_published ON resource_documents(is_published) WHERE is_published = TRUE;
