import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';

export default function SupabaseConnectionCheck() {
  const [connectionStatus, setConnectionStatus] = useState<{
    isConnected: boolean;
    message: string;
    error?: any;
    data?: any;
  }>({ isConnected: false, message: 'Checking connection...' });

  useEffect(() => {
    async function checkConnection() {
      try {
        // Try to fetch a simple system table
        const { data, error } = await supabase
          .from('pg_tables')
          .select('schemaname, tablename')
          .limit(5);
        
        if (error) {
          throw error;
        }
        
        setConnectionStatus({
          isConnected: true,
          message: 'Successfully connected to Supabase!',
          data
        });
      } catch (error) {
        console.error('Error connecting to Supabase:', error);
        setConnectionStatus({
          isConnected: false,
          message: 'Failed to connect to Supabase.',
          error
        });
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Status</h1>
      
      <div className={`p-4 rounded-md shadow-md ${connectionStatus.isConnected ? 'bg-green-50' : 'bg-red-50'}`}>
        <h2 className={`text-xl font-semibold ${connectionStatus.isConnected ? 'text-green-600' : 'text-red-600'}`}>
          {connectionStatus.isConnected ? 'Connected' : 'Not Connected'}
        </h2>
        
        <p className="mt-2">{connectionStatus.message}</p>
        
        {connectionStatus.error && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-red-600">Error Details:</h3>
            <pre className="mt-2 p-3 bg-red-100 rounded-md overflow-auto text-sm">
              {JSON.stringify(connectionStatus.error, null, 2)}
            </pre>
          </div>
        )}
        
        {connectionStatus.isConnected && connectionStatus.data && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-green-600">Connection Verified:</h3>
            <p className="mt-1">Successfully queried database tables.</p>
            <pre className="mt-2 p-3 bg-gray-100 rounded-md overflow-auto text-sm">
              {JSON.stringify(connectionStatus.data, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-4">
          <h3 className="text-lg font-medium">Connection Details:</h3>
          <ul className="mt-2 list-disc list-inside">
            <li>Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? import.meta.env.VITE_SUPABASE_URL.toString().substring(0, 20) + '...' : 'Not set'}</li>
            <li>Project ID: wzyarmpiwlbhdjnaivyo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}