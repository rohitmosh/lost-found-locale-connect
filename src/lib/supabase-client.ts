import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or API key. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple function to test the connection
export async function testSupabaseConnection() {
  try {
    // Try to fetch a simple system table
    const { data, error } = await supabase
      .from('pg_tables')
      .select('schemaname, tablename')
      .limit(5);
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      data,
      message: 'Successfully connected to Supabase!'
    };
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return {
      success: false,
      error,
      message: 'Failed to connect to Supabase.'
    };
  }
}