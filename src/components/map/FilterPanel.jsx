
import React from 'react';
import { X, Calendar, MapPin } from 'lucide-react';

const FilterPanel = ({ show, filters, setFilters, onClose }) => {
  const categories = [
    'Electronics', 'Jewelry', 'Clothing', 'Documents', 
    'Keys', 'Pets', 'Bags', 'Books', 'Sports', 'Other'
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const toggleCategory = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      status: 'all',
      dateRange: 'all',
      radius: 5,
      searchTerm: ''
    });
  };

  if (!show) return null;

  return (
    <div className="absolute top-20 left-4 z-20 w-80 animate-fade-in">
      <div className="glass rounded-xl p-6 max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-md transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Status</h4>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'lost', label: 'Lost' },
              { value: 'found', label: 'Found' }
            ].map(status => (
              <button
                key={status.value}
                onClick={() => setFilters(prev => ({ ...prev, status: status.value }))}
                className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                  filters.status === status.value
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`p-2 rounded-lg text-xs transition-all duration-200 ${
                  filters.categories.includes(category)
                    ? 'bg-primary/20 text-primary border border-primary/50'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </h4>
          <div className="space-y-2">
            {dateRanges.map(range => (
              <button
                key={range.value}
                onClick={() => setFilters(prev => ({ ...prev, dateRange: range.value }))}
                className={`w-full p-2 rounded-lg text-sm text-left transition-all duration-200 ${
                  filters.dateRange === range.value
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Distance Radius */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Distance Radius
          </h4>
          <div className="space-y-3">
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={filters.radius}
              onChange={(e) => setFilters(prev => ({ ...prev, radius: parseFloat(e.target.value) }))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center text-sm text-muted-foreground">
              {filters.radius} km radius
            </div>
          </div>
        </div>

        {/* Active Filters Count */}
        {(filters.categories.length > 0 || filters.status !== 'all' || filters.dateRange !== 'all' || filters.searchTerm) && (
          <div className="mb-4 p-3 bg-primary/10 rounded-lg">
            <div className="text-sm text-primary mb-2">
              Active filters: {filters.categories.length + (filters.status !== 'all' ? 1 : 0) + (filters.dateRange !== 'all' ? 1 : 0) + (filters.searchTerm ? 1 : 0)}
            </div>
            <div className="flex flex-wrap gap-1">
              {filters.categories.map(cat => (
                <span key={cat} className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Clear All Button */}
        <button
          onClick={clearAllFilters}
          className="w-full p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors text-sm"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
