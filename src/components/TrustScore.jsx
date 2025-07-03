import React from 'react';
import { Shield, Star, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrustScore = ({ score = 103, size = 'md', showLabel = true, showBadges = true, className = '' }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLevel = (score) => {
    if (score >= 90) return 'Trusted';
    if (score >= 70) return 'Reliable';
    if (score >= 50) return 'Active';
    return 'New';
  };

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-20 h-20 text-2xl',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const starSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  // If we're not showing badges, use a different layout
  if (showLabel && !showBadges) {
    return (
      <div className={`${className} flex items-center justify-between w-full`}>
        <div className="flex items-center">
          <div className="text-gray-900 dark:text-white font-medium text-lg">Trust Score</div>
          <Star size={starSizes[size]} className="fill-yellow-400 text-yellow-400 ml-2" />
        </div>
        
        <div className={`${sizeClasses[size]} bg-white dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 border-2 border-current/10 transition-transform duration-200 relative ml-4`}>
          <Shield size={iconSizes[size]} className="absolute opacity-10" />
          <span className="relative z-10">{score}</span>
        </div>
      </div>
    );
  }
  
  // Original layout for when badges are shown
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} ${getScoreColor(score)} rounded-full flex items-center justify-center font-bold border-2 border-current/20 hover:scale-105 transition-transform duration-200 relative`}>
        <Shield size={iconSizes[size]} className="absolute opacity-10" />
        <span className="relative z-10">{score}</span>
      </div>
      
      {showLabel && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900 dark:text-white">Trust Score</span>
            {showBadges && (
              <Badge variant="outline" className={`${getScoreColor(score)} border-current/30`}>
                {getScoreLevel(score)}
              </Badge>
            )}
          </div>
          {showBadges && (
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span>Community Verified</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrustScore;
