import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Bell, Heart } from 'lucide-react';

const EnhancedLoading = ({ 
  message = "Loading...", 
  type = "default", 
  size = "md",
  showIcons = true 
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const containerSizes = {
    sm: "p-4",
    md: "p-8",
    lg: "p-12",
    xl: "p-16"
  };

  const icons = [Search, MapPin, Bell, Heart];

  // Floating dots animation
  const FloatingDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-purple-500 rounded-full"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  // Spinning ring animation
  const SpinningRing = () => (
    <div className={`relative ${sizeClasses[size]}`}>
      <motion.div
        className="absolute inset-0 border-4 border-purple-200 dark:border-purple-800 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 border-2 border-transparent border-b-purple-400 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  // Pulsing icons animation
  const PulsingIcons = () => (
    <div className="flex space-x-4">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-6 h-6 text-purple-500" />
        </motion.div>
      ))}
    </div>
  );

  // Wave animation
  const WaveAnimation = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-8 bg-gradient-to-t from-purple-400 to-purple-600 rounded-full"
          animate={{
            scaleY: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  // Morphing shapes
  const MorphingShapes = () => (
    <div className="relative w-16 h-16">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full"
        animate={{
          borderRadius: ["50%", "25%", "50%"],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-2 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"
        animate={{
          borderRadius: ["25%", "50%", "25%"],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );

  const renderAnimation = () => {
    switch (type) {
      case "dots":
        return <FloatingDots />;
      case "ring":
        return <SpinningRing />;
      case "icons":
        return showIcons ? <PulsingIcons /> : <SpinningRing />;
      case "wave":
        return <WaveAnimation />;
      case "morph":
        return <MorphingShapes />;
      default:
        return <SpinningRing />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`flex flex-col items-center justify-center ${containerSizes[size]} text-center`}
    >
      {/* Animation */}
      <div className="mb-6">
        {renderAnimation()}
      </div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 dark:text-gray-400 font-medium"
      >
        {message}
      </motion.p>

      {/* Shimmer effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent dark:via-purple-900/20 -skew-x-12"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

// Skeleton loader component
export const SkeletonLoader = ({ className = "", lines = 3, showAvatar = false }) => (
  <div className={`animate-pulse ${className}`}>
    {showAvatar && (
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full skeleton"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded skeleton w-2/3"></div>
        </div>
      </div>
    )}
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton mb-3 ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export default EnhancedLoading;
