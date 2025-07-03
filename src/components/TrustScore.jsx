
import React from 'react';
import { Shield, Star, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrustScore = ({ score = 85, size = 'md', showLabel = true, className = '' }) => {
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
    lg: 'w-20 h-20 text-xl',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} ${getScoreColor(score)} rounded-full flex items-center justify-center font-bold border-2 border-current/20 hover:scale-105 transition-transform duration-200`}>
        <Shield size={iconSizes[size]} className="absolute opacity-10" />
        <span className="relative z-10">{score}</span>
      </div>
      
      {showLabel && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900 dark:text-white">Trust Score</span>
            <Badge variant="outline" className={`${getScoreColor(score)} border-current/30`}>
              {getScoreLevel(score)}
            </Badge>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span>Community Verified</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustScore;
