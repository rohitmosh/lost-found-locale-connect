
import React from 'react';
import { X, MapPin, Calendar, Tag, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/button';

const ItemPopup = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-96 max-w-[90vw]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'Lost'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                }`}
              >
                {item.status}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.distance} away
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Image */}
        {item.image && (
          <div className="relative h-48">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {item.description}
          </p>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Tag className="h-4 w-4" />
              <span>{item.category}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>Reported on {new Date(item.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>Location: {item.distance} from your location</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Owner
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="flex justify-center space-x-4 pt-2 text-xs text-gray-500 dark:text-gray-400">
            <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Report Issue
            </button>
            <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Save Item
            </button>
            <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 -z-10"
        onClick={onClose}
      />
    </div>
  );
};

export default ItemPopup;
