import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const SimpleHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-purple-100/90 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-300 dark:border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Search className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              FindIt
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader; 