import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Service role client that bypasses Row Level Security.
// Only use on the server side for trusted operations (e.g., form submissions).
// Lazy-initialized to avoid throwing during build when env vars are empty.
let _supabaseAdmin: SupabaseClient | null = null

export function supabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        global: {
          // Disable Next.js fetch caching — Supabase queries must always hit the DB
          fetch: (url, opts) => fetch(url, { ...opts, cache: 'no-store' }),
        },
      }
    )
  }
  return _supabaseAdmin
}
