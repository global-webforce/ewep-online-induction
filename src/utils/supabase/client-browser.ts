"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * For Next.js client components: the singleton (getSupabaseClient) is better
 * because Supabase is meant to be a long-lived instance
 * managing session + subscriptions.
 * **/

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
  }
  return supabaseClient;
}
