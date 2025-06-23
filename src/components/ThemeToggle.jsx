
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 ${className}`}
      aria-label="Toggle theme"
    >
      <div className="relative">
        <Sun 
          className={`h-5 w-5 transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
