// Simple script to check Supabase connection
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '.env.local') });

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\x1b[31m%s\x1b[0m', '❌ ERROR: Missing Supabase credentials in .env.local file');
  console.log('Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env.local file');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
  console.log('\x1b[36m%s\x1b[0m', '🔍 Checking Supabase connection...');
  console.log(`URL: ${supabaseUrl}`);
  console.log(`Project ID: ${supabaseUrl.split('//')[1].split('.')[0]}`);
  
  try {
    // Try to get the list of tables in the public schema
    const { data, error } = await supabase.rpc('get_schema_info');
    
    if (error) {
      // If RPC fails, try a simpler health check
      const { error: healthError } = await supabase.from('_pgrst_health').select('*').limit(1);
      
      if (healthError) {
        throw healthError;
      } else {
        console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS: Connected to Supabase!');
        console.log('\x1b[32m%s\x1b[0m', '📊 Health check successful');
        return true;
      }
    }
    
    console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS: Connected to Supabase!');
    console.log('\x1b[32m%s\x1b[0m', '📊 Successfully retrieved schema information');
    
    if (data && data.length > 0) {
      console.log('\nSchema information:');
      console.table(data.slice(0, 3)); // Show only first 3 rows
    }
    
    return true;
  } catch (error) {
    // Try one more approach - just check auth service
    try {
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (!authError) {
        console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS: Connected to Supabase!');
        console.log('\x1b[32m%s\x1b[0m', '📊 Authentication service is working');
        return true;
      }
      
      throw authError || error;
    } catch (finalError) {
      console.error('\x1b[31m%s\x1b[0m', '❌ ERROR: Failed to connect to Supabase');
      console.error('\x1b[31m%s\x1b[0m', `Error message: ${finalError.message}`);
      if (finalError.code) {
        console.error('\x1b[31m%s\x1b[0m', `Error code: ${finalError.code}`);
      }
      return false;
    }
  }
}

// Run the check
checkConnection()
  .then(isConnected => {
    if (isConnected) {
      console.log('\x1b[32m%s\x1b[0m', '\n🎉 Your Supabase project is successfully connected!');
    } else {
      console.log('\x1b[31m%s\x1b[0m', '\n❌ Your Supabase project is NOT connected.');
      console.log('Please check your credentials and try again.');
    }
  })
  .catch(err => {
    console.error('\x1b[31m%s\x1b[0m', 'An unexpected error occurred:');
    console.error(err);
  });