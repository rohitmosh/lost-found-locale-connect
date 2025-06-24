import React from 'react';
import { Bell } from 'lucide-react';

const NotificationButton = ({ unreadCount, onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-full transition-colors ${
        isOpen 
          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-purple-600 rounded-full transform translate-x-1 -translate-y-1">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationButton; 