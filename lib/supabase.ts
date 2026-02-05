import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getCurrentUserIdToken } from './firebase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

/** Get Supabase client. Uses Firebase id token for RLS (auth.jwt()->>'sub'). */
export async function getSupabase(): Promise<SupabaseClient | null> {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: async (url, options?: RequestInit) => {
          const token = await getCurrentUserIdToken();
          const headers = new Headers(options?.headers);
          if (token) headers.set('Authorization', `Bearer ${token}`);
          return fetch(url, { ...options, headers });
        },
      },
    });
  }
  return client;
}

/** Call after Firebase auth state changes so the client is recreated with new token. */
export function resetSupabaseClient(): void {
  client = null;
}
