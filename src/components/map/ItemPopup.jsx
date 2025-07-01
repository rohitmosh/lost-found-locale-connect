import React, { useEffect, useRef } from 'react';
import { X, MapPin, Calendar, Tag, Phone, MapIcon, Share, Flag, Bookmark, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ItemPopup = ({ item, onClose }) => {
  const { isDark } = useTheme();
  
  if (!item) return null;

  // Format date to match reports page
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 400,
          mass: 0.8
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-96 max-w-[90vw]"
        style={{
          top: '10%', // Position much higher in the viewport
          transform: 'translate(-50%, -10%)'
        }}
      >
        <div className={`${isDark ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300 ${
          item.status === 'Lost' 
            ? isDark ? 'border-red-800/50' : 'border-red-400/50'
            : isDark ? 'border-green-800/50' : 'border-green-400/50'
        }`}>
          {/* Status Badge */}
          <div className="relative">
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-medium ${
              item.status === 'Lost'
                ? isDark ? 'bg-red-900/80 text-red-200' : 'bg-red-500/80 text-white'
                : isDark ? 'bg-green-900/80 text-green-200' : 'bg-green-500/80 text-white'
            }`}>
              {item.status}
            </div>
            
            {/* Status Tag - Right Side */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-sm font-medium ${
              item.status === 'Active'
                ? isDark ? 'bg-amber-900/80 text-amber-200' : 'bg-amber-500/80 text-white'
                : item.status === 'Resolved'
                  ? isDark ? 'bg-green-900/80 text-green-200' : 'bg-green-500/80 text-white'
                  : isDark ? 'bg-purple-900/80 text-purple-200' : 'bg-purple-500/80 text-white'
            }`}>
              Active
            </div>
          </div>

          {/* Header */}
          <div className="pt-14 px-5 pb-5">
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
              {item.title}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-2`}>
              {item.description}
            </p>
          </div>

          {/* Location & Date Info */}
          <div className="px-5 pb-4 space-y-2">
            <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              <MapPin className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <span>{item.location?.address || "Location details unavailable"}</span>
            </div>
            
            <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              <Clock className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <span>{item.status} {formatDate(item.date)}</span>
            </div>
            
            {/* Contact Methods */}
            <div className="flex items-center text-sm text-purple-400 mt-1">
              <Phone className="h-4 w-4 mr-2" />
              <span>Contact via Phone</span>
            </div>
          </div>

          {/* Item ID */}
          <div className={`px-5 pb-5 flex justify-between items-center border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-3`}>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {item.status === 'Lost' ? 'LF-' : 'FI-'}2024-{Math.floor(Math.random() * 900000) + 100000}
            </span>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 ${isDark ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-500'} transition-colors`}
              >
                <MapIcon className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 ${isDark ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-500'} transition-colors`}
              >
                <Share className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-2 ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors`}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-5 pb-5 pt-2">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Owner
            </motion.button>
          </div>
        </div>

        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'} backdrop-blur-[10px] -z-10`}
          onClick={onClose}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ItemPopup;
