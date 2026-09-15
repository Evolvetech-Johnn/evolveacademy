import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

// Server-only client (service role key bypasses RLS) — never import this in client components.
// Lazily initialized so importing this module doesn't blow up build-time page-data collection
// when env vars aren't loaded yet; it only throws once a query actually runs.
function getSupabase(): SupabaseClient {
  if (client) return client;

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Please define SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY inside .env.local');
  }

  client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
  return client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const real = getSupabase();
    const value = Reflect.get(real, prop);
    return typeof value === 'function' ? value.bind(real) : value;
  },
});
