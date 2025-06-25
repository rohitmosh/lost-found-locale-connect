
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-pulse"></div>
        
        {/* Inner spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
      </div>
      
      <div className="ml-4 text-muted-foreground">
        <p className="text-lg font-medium">Loading map...</p>
        <p className="text-sm">Initializing Google Maps</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
