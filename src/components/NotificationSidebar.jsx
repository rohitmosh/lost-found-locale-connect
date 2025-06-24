import React, { useState } from 'react';
import { Bell, X, ChevronRight, MapPin, Clock } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    title: 'Blue Backpack Found',
    location: 'Central Park',
    time: '2 hours ago',
    read: false,
    description: 'A blue backpack with a laptop inside was found near the fountain.'
  },
  {
    id: 2,
    title: 'Car Keys Found',
    location: 'Library Parking Lot',
    time: '4 hours ago',
    read: false,
    description: 'Toyota car keys with a rabbit foot keychain found in the parking lot.'
  },
  {
    id: 3,
    title: 'Matching Item Alert',
    location: 'Coffee Shop',
    time: '1 day ago',
    read: true,
    description: 'Your reported lost phone case matches an item found at Starbucks.'
  },
  {
    id: 4,
    title: 'Wallet Found',
    location: 'Bus Station',
    time: '2 days ago',
    read: true,
    description: 'A brown leather wallet with ID cards was turned in at the lost and found.'
  }
];

const NotificationSidebar = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div 
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-purple-100 dark:bg-gray-800 border-r border-purple-300 dark:border-purple-900/50 shadow-lg transition-all duration-300 z-40 ${
        isOpen ? 'translate-x-0 w-80' : '-translate-x-full w-0'
      } overflow-hidden`}
    >
      <div className="p-4 border-b border-purple-300 dark:border-purple-900/50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-purple-700 dark:text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-purple-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-xs text-purple-700 dark:text-purple-400 hover:underline"
            >
              Mark all as read
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-full pb-16">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Bell className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-2" />
            <p className="text-gray-600 dark:text-gray-400">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-purple-300 dark:divide-purple-900/50">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-purple-200 dark:hover:bg-purple-900/20 transition-colors cursor-pointer ${
                  notification.read ? 'bg-purple-100 dark:bg-gray-800' : 'bg-purple-200/80 dark:bg-purple-900/10'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <h3 className={`font-medium ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {notification.description}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-2 space-x-3">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{notification.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSidebar; 