
import React from 'react';
import { X, MapPin, Calendar, Tag, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/button';

const ItemPopup = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-96 max-w-[90vw]">
      <div className="glass rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in hover:shadow-3xl transition-all duration-300">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {item.title}
            </h3>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium shadow-md transition-all duration-200 ${
                  item.status === 'Lost'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 shadow-red-500/25'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 shadow-green-500/25'
                }`}
              >
                {item.status}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                {item.distance} away
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-110 group"
          >
            <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
          </Button>
        </div>

        {/* Image */}
        {item.image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {item.description}
          </p>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Tag className="h-4 w-4 text-purple-500" />
              <span>{item.category}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span>Reported on {new Date(item.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <MapPin className="h-4 w-4 text-purple-500" />
              <span>Location: {item.distance} from your location</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-3">
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              size="sm"
            >
              <Phone className="h-4 w-4 mr-2 group-hover:animate-pulse" />
              Contact Owner
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 transform hover:scale-105 group"
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-2 group-hover:bounce" />
              Get Directions
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="flex justify-center space-x-6 pt-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 transform hover:scale-105">
              Report Issue
            </button>
            <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 transform hover:scale-105">
              Save Item
            </button>
            <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 transform hover:scale-105">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10 animate-fade-in"
        onClick={onClose}
      />
    </div>
  );
};

export default ItemPopup;
