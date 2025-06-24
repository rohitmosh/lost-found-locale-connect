import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const AuthHeader = () => {
  return (
    <header className="bg-purple-100/90 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-300 dark:border-purple-900/50">
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default AuthHeader; 