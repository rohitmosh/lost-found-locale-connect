import React from 'react';
import { X, Calendar, MapPin, Filter, Check, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      radius: parseFloat(radius)
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

  const slideVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 30, 
        stiffness: 300,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: { 
      x: "-100%", 
      opacity: 0,
      transition: { 
        type: "spring", 
        damping: 30, 
        stiffness: 300,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-[64px] left-0 h-[calc(100vh-64px)] bg-gray-900/95 backdrop-blur-md border-r border-gray-700 shadow-2xl shadow-purple-900/20 z-50 w-80 overflow-hidden"
        >
          <motion.div 
            variants={itemVariants}
            className="p-4 border-b border-gray-700 flex justify-between items-center"
          >
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Filters</h2>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05, color: "#c084fc" }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFilters}
                className="text-xs text-gray-400 hover:text-purple-400 flex items-center space-x-1 py-1 px-2 rounded-md hover:bg-purple-500/10 transition-colors"
              >
                <Trash className="h-3 w-3" />
                <span>Clear All</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-700/70 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>

          <div className="overflow-y-auto h-full pb-16 p-4 space-y-6">
            {/* Status Filter */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                <motion.div 
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Filter className="h-4 w-4 mr-2 text-purple-400" />
                </motion.div>
                Item Status
              </h3>
              <div className="space-y-2">
                {['all', 'lost', 'found'].map((status) => (
                  <label key={status} className="flex items-center space-x-2 cursor-pointer group">
                    <motion.div 
                      animate={{ scale: filters.status === status ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: filters.status === status ? Infinity : 0, repeatDelay: 2 }}
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        filters.status === status 
                          ? 'bg-purple-600 border-purple-400 shadow-glow-sm shadow-purple-500/50' 
                          : 'border-gray-600 group-hover:border-gray-500'
                      }`}
                    >
                      {filters.status === status && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10, stiffness: 300 }}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={filters.status === status}
                      onChange={() => handleStatusChange(status)}
                      className="sr-only"
                    />
                    <span className={`text-sm capitalize transition-colors ${
                      filters.status === status 
                        ? 'text-white font-medium' 
                        : 'text-gray-400 group-hover:text-gray-300'
                    }`}>
                      {status === 'all' ? 'All Items' : `${status} Items`}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Categories Filter */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-medium text-white mb-3">Categories</h3>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {categories.map((category) => (
                  <motion.label 
                    key={category} 
                    className={`flex items-center space-x-2 cursor-pointer rounded-lg p-2 transition-all ${
                      filters.categories.includes(category)
                        ? 'bg-purple-900/30 border border-purple-700/50 shadow-sm shadow-purple-800/30'
                        : 'hover:bg-gray-800/50 border border-transparent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      filters.categories.includes(category) 
                        ? 'bg-purple-600 border-purple-400' 
                        : 'border-gray-600'
                    }`}>
                      {filters.categories.includes(category) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10, stiffness: 300 }}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <span className={`text-sm ${
                      filters.categories.includes(category) 
                        ? 'text-white' 
                        : 'text-gray-400'
                    }`}>
                      {category}
                    </span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Date Range Filter */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                Date Range
              </h3>
              <div className="space-y-2">
                {['all', 'today', 'week', 'month'].map((range) => (
                  <label key={range} className="flex items-center space-x-2 cursor-pointer group">
                    <motion.div 
                      animate={{ scale: filters.dateRange === range ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: filters.dateRange === range ? Infinity : 0, repeatDelay: 2 }}
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        filters.dateRange === range 
                          ? 'bg-purple-600 border-purple-400 shadow-glow-sm shadow-purple-500/50' 
                          : 'border-gray-600 group-hover:border-gray-500'
                      }`}
                    >
                      {filters.dateRange === range && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10, stiffness: 300 }}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                    <input
                      type="radio"
                      name="dateRange"
                      value={range}
                      checked={filters.dateRange === range}
                      onChange={() => handleDateRangeChange(range)}
                      className="sr-only"
                    />
                    <span className={`text-sm capitalize transition-colors ${
                      filters.dateRange === range 
                        ? 'text-white font-medium' 
                        : 'text-gray-400 group-hover:text-gray-300'
                    }`}>
                      {range === 'all' ? 'All Time' : 
                       range === 'today' ? 'Today' :
                       range === 'week' ? 'This Week' : 'This Month'}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Distance Radius */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-white flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                  Search Radius
                </h3>
                <span className="text-sm text-purple-400 font-medium">{filters.radius} km</span>
              </div>
              
              <div className="mt-4 mb-6 relative">
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={filters.radius}
                  onChange={(e) => handleRadiusChange(e.target.value)}
                  className="w-full h-2 appearance-none cursor-pointer bg-transparent"
                  style={{
                    WebkitAppearance: 'none',
                    appearance: 'none'
                  }}
                />
                <div 
                  className="absolute top-1/2 left-0 h-1 rounded-full -translate-y-1/2 bg-purple-900/50"
                  style={{ width: '100%' }}
                ></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 rounded-full -translate-y-1/2 bg-purple-600"
                  style={{ width: `${(filters.radius / 10) * 100}%` }}
                ></div>
                <div 
                  className="absolute top-1/2 left-0 w-4 h-4 bg-purple-600 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-purple-500/30 cursor-pointer"
                  style={{ left: `${(filters.radius / 10) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5km</span>
                <span>10km</span>
              </div>
            </motion.div>

            {/* Active Filters Summary */}
            {(filters.categories.length > 0 || filters.status !== 'all' || filters.dateRange !== 'all') && (
              <motion.div 
                variants={itemVariants}
                className="mt-6 pt-4 border-t border-gray-700"
              >
                <h3 className="text-sm font-medium text-white mb-3">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.status !== 'all' && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-2 py-1 rounded-lg text-xs bg-purple-900/30 text-purple-400 border border-purple-700/50"
                    >
                      {filters.status} items
                      <button
                        onClick={() => handleStatusChange('all')}
                        className="ml-1 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  )}
                  {filters.dateRange !== 'all' && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-2 py-1 rounded-lg text-xs bg-purple-900/30 text-purple-400 border border-purple-700/50"
                    >
                      {filters.dateRange === 'today' ? 'Today' : 
                       filters.dateRange === 'week' ? 'This Week' : 'This Month'}
                      <button
                        onClick={() => handleDateRangeChange('all')}
                        className="ml-1 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  )}
                  <AnimatePresence>
                    {filters.categories.map((category) => (
                      <motion.span
                        key={category}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center px-2 py-1 rounded-lg text-xs bg-purple-900/30 text-purple-400 border border-purple-700/50"
                      >
                        {category}
                        <button
                          onClick={() => handleCategoryToggle(category)}
                          className="ml-1 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
