import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Search, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const isAuthenticated = !!user;

  // Check if user is on login or register page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };



  const navigation = loading
    ? [
        { name: 'Home', href: '/' },
        { name: 'How It Works', href: '/how-it-works' },
      ]
    : isAuthenticated
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Map', href: '/map' },
        { name: 'Reports', href: '/reports' },
      ]
    : [
        { name: 'Home', href: '/' },
        { name: 'How It Works', href: '/how-it-works' },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to={isAuthenticated ? '/dashboard' : '/'} 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Search className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              FindIt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={handleLogin} // Auto-login for demo purposes
                    className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-purple-100 dark:border-purple-900/50">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-3 px-3 pt-3 border-t border-purple-100 dark:border-purple-900/50">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 text-sm font-medium text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => {
                        handleLogin();
                        setIsOpen(false);
                      }}
                      className="flex-1 px-4 py-2 text-center text-sm font-medium text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-4 py-2 text-center text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
