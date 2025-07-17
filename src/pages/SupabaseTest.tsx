import { SupabaseDirectTest } from '../components/SupabaseDirectTest';

export default function SupabaseTest() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      
      <div className="mb-8">
        <SupabaseDirectTest />
      </div>
      
      <div className="bg-white p-6 rounded-md shadow-md">
        <h3 className="text-lg font-medium mb-3">Supabase Connection Information</h3>
        
        <p className="mb-4">
          This page tests the direct connection to your Supabase project using the credentials from your .env.local file.
        </p>
        
        <h4 className="font-medium mt-4">Environment Variables</h4>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
          <li><code>VITE_SUPABASE_URL</code>: The URL of your Supabase project</li>
          <li><code>VITE_SUPABASE_ANON_KEY</code>: The anonymous API key for your Supabase project</li>
        </ul>
        
        <h4 className="font-medium mt-4">Usage in Code</h4>
        <pre className="bg-gray-100 p-3 rounded mt-2 text-sm overflow-auto">
{`// Import the Supabase client
import { supabase } from '../lib/supabase-client';

// Use the client in your components
const { data, error } = await supabase
  .from('your_table')
  .select('*');`}
        </pre>
      </div>
    </div>
  );
}