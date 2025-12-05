export { initSupabase, getSupabase, createSupabaseClient } from './client';
export type { Database } from './types';

// Re-export Supabase types for convenience
export type { SupabaseClient, User, Session } from '@supabase/supabase-js';
