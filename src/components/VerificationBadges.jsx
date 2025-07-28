import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, Users, Shield } from 'lucide-react';

const VerificationBadges = ({ 
  verifications = {
    community: false,
    phone: false,
    email: false
  },
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      badge: 'px-2 py-1 text-xs',
      icon: 'w-3 h-3',
      gap: 'gap-1'
    },
    md: {
      badge: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4',
      gap: 'gap-2'
    },
    lg: {
      badge: 'px-4 py-2 text-base',
      icon: 'w-5 h-5',
      gap: 'gap-3'
    }
  };

  const badges = [
    {
      key: 'community',
      label: 'Community Verified',
      icon: Users,
      verified: verifications.community,
      colors: {
        verified: 'bg-green-100 text-green-700 border-green-200 shadow-green-500/20 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50',
        unverified: 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
      }
    },
    {
      key: 'phone',
      label: 'Phone Verified',
      icon: Phone,
      verified: verifications.phone,
      colors: {
        verified: 'bg-blue-100 text-blue-700 border-blue-200 shadow-blue-500/20 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50',
        unverified: 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
      }
    },
    {
      key: 'email',
      label: 'Email Verified',
      icon: Mail,
      verified: verifications.email,
      colors: {
        verified: 'bg-purple-100 text-purple-700 border-purple-200 shadow-purple-500/20 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50',
        unverified: 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700/50 dark:text-gray-400 dark:border-gray-600'
      }
    }
  ];

  return (
    <div className={`flex flex-wrap ${sizeClasses[size].gap} ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        const isVerified = badge.verified;
        const colors = isVerified ? badge.colors.verified : badge.colors.unverified;
        
        return (
          <motion.div
            key={badge.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            className={`
              ${sizeClasses[size].badge}
              ${colors}
              border rounded-full font-medium
              flex items-center ${sizeClasses[size].gap}
              transition-all duration-300
              ${isVerified ? 'shadow-lg hover:shadow-xl' : ''}
              ${isVerified ? 'animate-glow-pulse' : ''}
              cursor-default
            `}
          >
            {isVerified ? (
              <CheckCircle className={`${sizeClasses[size].icon} fill-current`} />
            ) : (
              <Icon className={`${sizeClasses[size].icon} opacity-60`} />
            )}
            <span className="font-semibold">{badge.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default VerificationBadges;
