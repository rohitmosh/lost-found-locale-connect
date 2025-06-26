import React, { useState } from 'react';
import { Bell, X, User, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Updated mock notifications to match the image
const mockNotifications = [
  {
    id: 1,
    type: 'lost',
    title: 'New Lost Item Nearby',
    description: 'iPhone 14 Pro lost near Central Park',
    time: '5 minutes ago',
    distance: '0.3 km',
    read: false,
    icon: 'location'
  },
  {
    id: 2,
    type: 'found',
    title: 'Item Found Match',
    description: 'Brown leather wallet found - matches your search',
    time: '1 hour ago',
    distance: '1.2 km',
    read: false,
    icon: 'bell'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Search Alert',
    description: 'New electronics items in your area',
    time: '3 hours ago',
    distance: '2.1 km',
    read: false,
    icon: 'user'
  }
];

// Icon components based on notification type
const NotificationIcon = ({ type }) => {
  const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center";
  
  if (type === 'lost') {
    return (
      <div className={`${baseClasses} bg-red-900/20`}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </motion.div>
      </div>
    );
  } else if (type === 'found') {
    return (
      <div className={`${baseClasses} bg-green-900/20`}>
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </motion.div>
      </div>
    );
  } else {
    return (
      <div className={`${baseClasses} bg-blue-900/20`}>
        <motion.div
          initial={{ y: 2 }}
          animate={{ y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <User className="w-5 h-5 text-blue-400" />
        </motion.div>
      </div>
    );
  }
};

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

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0.5 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: { 
      x: "-100%", 
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 20 
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-0 left-0 h-full w-80 bg-gray-900/95 border-r border-purple-900/30 shadow-xl shadow-purple-800/20 z-50 overflow-hidden backdrop-blur-sm"
        >
          <div className="p-4 border-b border-purple-900/30 flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center space-x-3"
            >
              <Bell className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="pt-3 px-4 text-gray-400"
          >
            <span>{unreadCount} unread notifications</span>
          </motion.div>

          <div className="overflow-y-auto h-[calc(100%-12rem)] py-2 mt-2">
            <AnimatePresence>
              {notifications.length === 0 ? (
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center justify-center h-full text-center p-4"
                >
                  <Bell className="h-12 w-12 text-gray-600 mb-2" />
                  <p className="text-gray-400">No notifications yet</p>
                </motion.div>
              ) : (
                <motion.div className="space-y-3 px-3">
                  {notifications.map((notification) => (
                    <motion.div 
                      key={notification.id}
                      layout
                      variants={itemVariants}
                      whileHover="hover"
                      className="p-4 bg-gray-800/80 rounded-xl border border-purple-900/30 cursor-pointer relative overflow-hidden group"
                      onClick={() => markAsRead(notification.id)}
                    >
                      {!notification.read && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute top-3 right-3 w-2 h-2 bg-purple-500 rounded-full"
                        />
                      )}
                      
                      <div className="flex space-x-3">
                        <NotificationIcon type={notification.type} />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                              {notification.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            {notification.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{notification.time}</span>
                            </div>
                            <span className="text-purple-400">{notification.distance}</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.1 }}
                        className="absolute inset-0 bg-purple-500 pointer-events-none"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 p-3"
          >
            <motion.button
              onClick={markAllAsRead}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-purple-900/50 text-white hover:bg-purple-800/60 transition-colors border border-purple-800/40 shadow-lg shadow-purple-900/20"
            >
              Mark All as Read
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationSidebar; 