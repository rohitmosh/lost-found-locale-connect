
import React from 'react';
import { X, Bell, MapPin, Clock, User } from 'lucide-react';
import { Button } from './ui/button';

const mockNotifications = [
  {
    id: 1,
    title: 'New Lost Item Nearby',
    description: 'iPhone 14 Pro lost near Central Park',
    time: '5 minutes ago',
    type: 'lost',
    distance: '0.3 km',
    unread: true
  },
  {
    id: 2,
    title: 'Item Found Match',
    description: 'Brown leather wallet found - matches your search',
    time: '1 hour ago',
    type: 'found',
    distance: '1.2 km',
    unread: true
  },
  {
    id: 3,
    title: 'Search Alert',
    description: 'New electronics items in your area',
    time: '3 hours ago',
    type: 'alert',
    distance: '2.1 km',
    unread: false
  }
];

const NotificationSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 glass border-l border-gray-200 dark:border-gray-700 z-50 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Bell className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h2>
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
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {mockNotifications.filter(n => n.unread).length} unread notifications
          </p>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {mockNotifications.length > 0 ? (
            <div className="p-4 space-y-3">
              {mockNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg group animate-fade-in ${
                    notification.unread
                      ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
                      notification.type === 'lost' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                        : notification.type === 'found'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                      {notification.type === 'lost' ? (
                        <MapPin className="h-5 w-5" />
                      ) : notification.type === 'found' ? (
                        <Bell className="h-5 w-5" />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                          {notification.title}
                        </h3>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {notification.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.time}
                        </span>
                        <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                          {notification.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6 animate-fade-in">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No notifications
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                You'll see updates about lost and found items here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            className="w-full border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            Mark All as Read
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;
