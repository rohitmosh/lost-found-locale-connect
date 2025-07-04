import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Check if user exists in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setLoading(false);
            return;
          } catch (e) {
            console.error('Error parsing stored user:', e);
          }
        }
        
        // If we don't have a valid stored user, try to get from API
        try {
          const response = await authService.getCurrentUser();
          if (response.data && response.data.data) {
            setUser(response.data.data);
          }
        } catch (error) {
          console.error('Error getting current user:', error);
          // Clear localStorage if token is invalid
          authService.logout();
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear localStorage if token is invalid
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      if (response.success && response.data && response.data.user) {
        setUser(response.data.user);
      }
      return response;
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    console.log('AuthContext login called with:', credentials);
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      console.log('AuthContext login response:', response);
      
      if (response && response.success && response.data && response.data.user) {
        setUser(response.data.user);
        return response;
      } else {
        console.error('Login response missing user data:', response);
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('AuthContext login error:', error);
      setError(error.response?.data?.error || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.updateProfile(userData);
      if (response.success && response.data) {
        setUser(response.data);
      }
      return response;
    } catch (error) {
      setError(error.response?.data?.error || 'Profile update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.changePassword(passwordData);
      return response;
    } catch (error) {
      setError(error.response?.data?.error || 'Password change failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext; 