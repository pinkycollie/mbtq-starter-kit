import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

let supabaseClient: SupabaseClient<Database> | null = null;

/**
 * Initialize Supabase client with environment variables
 * Call this once at application startup
 * 
 * Note: In browser environments, only import.meta.env is available (Vite).
 * The process.env fallback is for Node.js/server-side environments only.
 */
export function initSupabase(supabaseUrl?: string, supabaseKey?: string): SupabaseClient<Database> {
  const url = supabaseUrl || import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = supabaseKey || import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase URL and Anon Key are required. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }

  supabaseClient = createClient<Database>(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return supabaseClient;
}

/**
 * Get the initialized Supabase client
 * Throws error if not initialized
 */
export function getSupabase(): SupabaseClient<Database> {
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized. Call initSupabase() first.');
  }
  return supabaseClient;
}

/**
 * Create Supabase client directly (for server-side or non-standard usage)
 */
export function createSupabaseClient(supabaseUrl: string, supabaseKey: string): SupabaseClient<Database> {
  return createClient<Database>(supabaseUrl, supabaseKey);
}
