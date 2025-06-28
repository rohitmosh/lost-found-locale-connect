import React from 'react';
import { X, MapPin, Calendar, Tag, Phone, MapIcon, Share, Flag, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const ItemPopup = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300 
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-96 max-w-[90vw]"
      >
        <div className="bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 overflow-hidden hover:shadow-purple-500/20 transition-all duration-300">
          {/* Header */}
          <div className={`p-5 border-b border-gray-700 flex justify-between items-start ${
            item.status === 'Lost' 
              ? 'bg-gradient-to-r from-red-900/30 to-red-800/10' 
              : 'bg-gradient-to-r from-green-900/30 to-green-800/10'
          }`}>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium shadow-md transition-all duration-200 ${
                    item.status === 'Lost'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-red-500/25'
                      : 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-green-500/25'
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-xs text-gray-400 bg-gray-700/80 px-2 py-1 rounded-md">
                  {item.distance} away
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/70 text-gray-400 hover:text-white rounded-full transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Image */}
          {item.image && (
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-5 space-y-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              {item.description}
            </p>

            {/* Details */}
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3 text-sm text-gray-400 p-2 bg-gray-700/50 rounded-lg"
                whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.15)' }}
              >
                <Tag className="h-4 w-4 text-purple-400" />
                <span>{item.category}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-sm text-gray-400 p-2 bg-gray-700/50 rounded-lg"
                whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.15)' }}
              >
                <Calendar className="h-4 w-4 text-purple-400" />
                <span>Reported on {new Date(item.date).toLocaleDateString()}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-sm text-gray-400 p-2 bg-gray-700/50 rounded-lg"
                whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.15)' }}
              >
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>Location: {item.distance} from your location</span>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-3">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 px-4 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Owner
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-xl border border-gray-600 hover:border-purple-500/50 shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <MapIcon className="h-4 w-4 mr-2" />
                Get Directions
              </motion.button>
            </div>

            {/* Additional Actions */}
            <div className="flex justify-between pt-3 text-xs text-gray-500 border-t border-gray-700">
              <motion.button 
                whileHover={{ scale: 1.1, y: -1, color: '#c084fc' }}
                className="flex items-center space-x-1 transition-all duration-200"
              >
                <Flag className="h-3 w-3" />
                <span>Report</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, y: -1, color: '#c084fc' }}
                className="flex items-center space-x-1 transition-all duration-200"
              >
                <Bookmark className="h-3 w-3" />
                <span>Save</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, y: -1, color: '#c084fc' }}
                className="flex items-center space-x-1 transition-all duration-200"
              >
                <Share className="h-3 w-3" />
                <span>Share</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
          onClick={onClose}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ItemPopup;
