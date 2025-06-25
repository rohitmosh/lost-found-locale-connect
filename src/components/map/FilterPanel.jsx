
import React from 'react';
import { X, Calendar, MapPin, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const categories = [
  'Electronics',
  'Jewelry',
  'Clothing',
  'Documents',
  'Keys',
  'Pets',
  'Personal Items',
  'Accessories',
  'Books',
  'Sports Equipment'
];

const FilterPanel = ({ isOpen, filters, onFiltersChange, onClose }) => {
  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleStatusChange = (status) => {
    onFiltersChange({
      ...filters,
      status
    });
  };

  const handleDateRangeChange = (range) => {
    onFiltersChange({
      ...filters,
      dateRange: range
    });
  };

  const handleRadiusChange = (radius) => {
    onFiltersChange({
      ...filters,
      radius: parseInt(radius)
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      status: 'all',
      dateRange: 'all',
      radius: 5
    });
  };

  return (
    <div 
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 z-30 ${
        isOpen ? 'translate-x-0 w-80' : '-translate-x-full w-0'
      } overflow-hidden`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-purple-600 dark:text-purple-400"
          >
            Clear All
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto h-full pb-16 p-4 space-y-6">
        {/* Status Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Item Status</h3>
          <div className="space-y-2">
            {['all', 'lost', 'found'].map((status) => (
              <label key={status} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={filters.status === status}
                  onChange={() => handleStatusChange(status)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {status === 'all' ? 'All Items' : `${status} Items`}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Categories</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="text-purple-600 focus:ring-purple-500 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Date Range</h3>
          <div className="space-y-2">
            {['all', 'today', 'week', 'month'].map((range) => (
              <label key={range} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  value={range}
                  checked={filters.dateRange === range}
                  onChange={() => handleDateRangeChange(range)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {range === 'all' ? 'All Time' : 
                   range === 'today' ? 'Today' :
                   range === 'week' ? 'This Week' : 'This Month'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance Radius */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Search Radius: {filters.radius} km
          </h3>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={filters.radius}
            onChange={(e) => handleRadiusChange(e.target.value)}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(filters.radius / 10) * 100}%, #e5e7eb ${(filters.radius / 10) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0.5km</span>
            <span>10km</span>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(filters.categories.length > 0 || filters.status !== 'all' || filters.dateRange !== 'all') && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Active Filters</h3>
            <div className="space-y-2">
              {filters.status !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  {filters.status} items
                </span>
              )}
              {filters.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 mr-1 mb-1"
                >
                  {category}
                  <button
                    onClick={() => handleCategoryToggle(category)}
                    className="ml-1 hover:text-purple-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
