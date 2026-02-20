-- ============================================================================
-- Sam's OATH Website - Row Level Security Policies
-- Migration: 002_rls_policies.sql
-- Description: Enable RLS on all tables and define access policies.
--
-- Supabase roles:
--   anon           - unauthenticated public visitors
--   authenticated  - logged-in admin users
-- ============================================================================

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ============================================================================

ALTER TABLE oath_submissions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_submissions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts             ENABLE ROW LEVEL SECURITY;
ALTER TABLE ambassadors            ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns        ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content           ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content_history   ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library          ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log     ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- TABLE: oath_submissions
-- Anyone can INSERT (take the oath)
-- Anyone can SELECT (view map pins)
-- Only authenticated can UPDATE
-- ============================================================================

CREATE POLICY "oath_submissions_insert_public"
  ON oath_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

CREATE POLICY "oath_submissions_select_public"
  ON oath_submissions FOR SELECT
  TO anon, authenticated
  USING (TRUE);

CREATE POLICY "oath_submissions_update_authenticated"
  ON oath_submissions FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "oath_submissions_delete_authenticated"
  ON oath_submissions FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: story_submissions
-- Anyone can INSERT (submit a story)
-- Anon can SELECT only published stories
-- Authenticated can SELECT all, UPDATE all
-- ============================================================================

CREATE POLICY "story_submissions_insert_public"
  ON story_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

CREATE POLICY "story_submissions_select_published"
  ON story_submissions FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "story_submissions_select_authenticated"
  ON story_submissions FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "story_submissions_update_authenticated"
  ON story_submissions FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "story_submissions_delete_authenticated"
  ON story_submissions FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: contact_messages
-- Anyone can INSERT (send a contact message)
-- Only authenticated can SELECT and UPDATE
-- ============================================================================

CREATE POLICY "contact_messages_insert_public"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

CREATE POLICY "contact_messages_select_authenticated"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "contact_messages_update_authenticated"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "contact_messages_delete_authenticated"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: newsletter_subscribers
-- Anyone can INSERT (subscribe)
-- Only authenticated can SELECT
-- ============================================================================

CREATE POLICY "newsletter_subscribers_insert_public"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

CREATE POLICY "newsletter_subscribers_select_authenticated"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "newsletter_subscribers_update_authenticated"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "newsletter_subscribers_delete_authenticated"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: blog_posts
-- Anyone can SELECT where status = 'published'
-- Authenticated can do everything
-- ============================================================================

CREATE POLICY "blog_posts_select_published"
  ON blog_posts FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "blog_posts_select_authenticated"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "blog_posts_insert_authenticated"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "blog_posts_update_authenticated"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "blog_posts_delete_authenticated"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: site_content
-- Anyone can SELECT (public content for rendering pages)
-- Only authenticated can INSERT, UPDATE, DELETE
-- ============================================================================

CREATE POLICY "site_content_select_public"
  ON site_content FOR SELECT
  TO anon, authenticated
  USING (TRUE);

CREATE POLICY "site_content_insert_authenticated"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "site_content_update_authenticated"
  ON site_content FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "site_content_delete_authenticated"
  ON site_content FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: ambassadors
-- Authenticated only (admin-managed)
-- ============================================================================

CREATE POLICY "ambassadors_select_authenticated"
  ON ambassadors FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "ambassadors_insert_authenticated"
  ON ambassadors FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "ambassadors_update_authenticated"
  ON ambassadors FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "ambassadors_delete_authenticated"
  ON ambassadors FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: email_campaigns
-- Authenticated only (admin-managed)
-- ============================================================================

CREATE POLICY "email_campaigns_select_authenticated"
  ON email_campaigns FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "email_campaigns_insert_authenticated"
  ON email_campaigns FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "email_campaigns_update_authenticated"
  ON email_campaigns FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "email_campaigns_delete_authenticated"
  ON email_campaigns FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: site_content_history
-- Authenticated only (admin-managed)
-- ============================================================================

CREATE POLICY "site_content_history_select_authenticated"
  ON site_content_history FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "site_content_history_insert_authenticated"
  ON site_content_history FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "site_content_history_delete_authenticated"
  ON site_content_history FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: media_library
-- Authenticated only (admin-managed)
-- ============================================================================

CREATE POLICY "media_library_select_authenticated"
  ON media_library FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "media_library_insert_authenticated"
  ON media_library FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "media_library_update_authenticated"
  ON media_library FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "media_library_delete_authenticated"
  ON media_library FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================================
-- TABLE: admin_activity_log
-- Authenticated only (admin-managed)
-- ============================================================================

CREATE POLICY "admin_activity_log_select_authenticated"
  ON admin_activity_log FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "admin_activity_log_insert_authenticated"
  ON admin_activity_log FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

-- Typically activity logs are append-only; no update/delete policies.

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
