import { useState } from 'react';
import { supabase, testSupabaseConnection } from '../lib/supabase-client';

export function SupabaseDirectTest() {
    const [testResult, setTestResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTestConnection = async () => {
        setIsLoading(true);
        try {
            const result = await testSupabaseConnection();
            setTestResult(result);
        } catch (error) {
            setTestResult({
                success: false,
                error,
                message: 'An unexpected error occurred while testing the connection.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h3 className="text-lg font-medium mb-4">Direct Supabase Connection Test</h3>

            <div className="mb-4">
                <button
                    onClick={handleTestConnection}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isLoading ? 'Testing...' : 'Test Direct Connection'}
                </button>
            </div>

            {testResult && (
                <div className={`mt-4 p-3 rounded-md ${testResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className={`font-medium ${testResult.success ? 'text-green-600' : 'text-red-600'}`}>
                        {testResult.message}
                    </p>

                    {testResult.error && (
                        <p className="text-red-500 text-sm mt-1">
                            {testResult.error.message || 'Unknown error'}
                        </p>
                    )}

                    {testResult.success && testResult.data && (
                        <div className="mt-2">
                            <p className="text-sm font-medium">Query Result:</p>
                            <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                                {JSON.stringify(testResult.data, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
                <p>This test uses the Supabase client directly without MCP.</p>
                <p>Connection details:</p>
                <ul className="list-disc pl-4 mt-1">
                    <li>URL: {import.meta.env.VITE_SUPABASE_URL ? import.meta.env.VITE_SUPABASE_URL.toString().substring(0, 20) + '...' : 'Not set'}</li>
                    <li>Project ID: wzyarmpiwlbhdjnaivyo</li>
                </ul>
            </div>
        </div>
    );
}