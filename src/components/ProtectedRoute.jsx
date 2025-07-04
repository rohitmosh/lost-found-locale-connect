import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const [localUser, setLocalUser] = useState(null);
  const [checkingLocal, setCheckingLocal] = useState(true);

  // Check localStorage for user data
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        setLocalUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    setCheckingLocal(false);
  }, []);
  
  // If authentication is still loading, show loading state
  if (loading || checkingLocal) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-indigo-900/10">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to login page
  if (!user && !localUser) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated, render the child routes
  console.log('User authenticated, rendering protected content');
  return <Outlet />;
};

export default ProtectedRoute; 