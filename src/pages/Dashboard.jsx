import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, TrendingUp, User, Plus, MapPin, ChevronRight, Calendar, Tag, Clock } from 'lucide-react';

import Navbar from '../components/Navbar';
import NotificationSidebar from '../components/NotificationSidebar';
import NotificationButton from '../components/NotificationButton';
import UserProfile from '../components/UserProfile';
import TrustScoreBreakdown from '../components/TrustScoreBreakdown';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 10,
    scale: 0.97,
    rotateX: 1
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      delay: index * 0.05,
      duration: 0.4
    }
  }),
  hover: {
    y: -2,
    scale: 1.01,
    rotateY: 0.5,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [showProfile, setShowProfile] = useState(false);
  const [showTrustScore, setShowTrustScore] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const stats = [
    { 
      label: 'Items Found', 
      value: '12',
      icon: Search, 
      color: 'text-green-600',
      emptyText: 'No items found yet'
    },
    { 
      label: 'Active Reports', 
      value: '3',
      icon: Bell, 
      color: 'text-blue-600',
      emptyText: 'No active reports'
    },
    { 
      label: 'Community Helps', 
      value: '8',
      icon: TrendingUp, 
      color: 'text-purple-600',
      emptyText: 'No resolved reports yet'
    },
  ];

  const recentActivity = [
    { id: 1, type: 'found', item: 'Blue Backpack', location: 'Central Park', time: '2 hours ago' },
    { id: 2, type: 'lost', item: 'Car Keys', location: 'Library', time: '4 hours ago' },
    { id: 3, type: 'found', item: 'Phone Case', location: 'Coffee Shop', time: '1 day ago' },
  ];

  const toggleNotificationSidebar = () => {
    setIsNotificationSidebarOpen(!isNotificationSidebarOpen);
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setUserProfile(data);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  // Listen for trust score toggle event
  useEffect(() => {
    const handleToggleTrustScore = () => {
      setShowTrustScore(!showTrustScore);
    };

    window.addEventListener('toggleTrustScore', handleToggleTrustScore);
    return () => window.removeEventListener('toggleTrustScore', handleToggleTrustScore);
  }, [showTrustScore]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Notification Sidebar */}
      <NotificationSidebar 
        isOpen={isNotificationSidebarOpen} 
        onClose={() => setIsNotificationSidebarOpen(false)} 
      />
      
      {/* Notification Toggle Button (Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <div className="bg-purple-200 dark:bg-gray-800 rounded-full shadow-lg p-1">
          <NotificationButton 
            unreadCount={unreadNotifications} 
            onClick={toggleNotificationSidebar} 
            isOpen={isNotificationSidebarOpen} 
          />
        </div>
      </div>
      
      <div 
        className={`transition-all duration-300 ${
          isNotificationSidebarOpen ? 'ml-80' : 'ml-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top Bar with Notification Button (Desktop) */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <motion.h1 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Dashboard
            </motion.h1>
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <NotificationButton 
                  unreadCount={unreadNotifications} 
                  onClick={toggleNotificationSidebar} 
                  isOpen={isNotificationSidebarOpen} 
                />
              </motion.div>
            </div>
          </div>
          
          {/* Welcome Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              delay: 0.1 
            }}
            whileHover={{ scale: 1.003 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-shadow-lg">
                  Hello, {userProfile?.name?.split(' ')[0] || 'Friend'}! 👋
                </h1>
                <p className="text-purple-100 text-lg">
                  Ready to help your community find their lost items today?
                </p>
              </div>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  const newShowProfile = !showProfile;
                  setShowProfile(newShowProfile);
                  // Close trust score when hiding profile or when opening profile
                  if (!newShowProfile || !showProfile) {
                    setShowTrustScore(false);
                  }
                }}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-colors duration-200 text-sm font-medium flex items-center space-x-2"
              >
                <User size={20} />
                <span>{showProfile ? 'Hide' : 'View'} Profile</span>
              </motion.button>
            </div>
          </motion.div>

          {/* User Profile Section */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <UserProfile showTrustScore={showTrustScore} userProfile={userProfile} user={user} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust Score Breakdown Section */}
          <AnimatePresence>
            {showTrustScore && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                className="mb-8"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  
                  <motion.div
                    className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-purple-200/50 dark:border-purple-900/30"
                    whileHover={{ y: -2 }}
                  >
                    <TrustScoreBreakdown />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <motion.div 
              variants={itemVariants}
              custom={0}
              whileHover="hover"
            >
              <Link
                to="/report-lost"
                className="group p-6 bg-purple-100 dark:bg-gray-800 rounded-3xl border border-purple-300 dark:border-gray-700 hover:shadow-xl hover:shadow-red-500/20 dark:hover:shadow-red-900/20 transition-all duration-300 block hover:glow-red"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Search className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Report Lost Item</h3>
                    <p className="text-gray-600 dark:text-gray-400">Help us help you find your missing item</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              custom={1}
              whileHover="hover"
            >
              <Link
                to="/report-found"
                className="group p-6 bg-purple-100 dark:bg-gray-800 rounded-3xl border border-purple-300 dark:border-gray-700 hover:shadow-xl hover:shadow-green-500/20 dark:hover:shadow-green-900/20 transition-all duration-300 block hover:glow-green"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Report Found Item</h3>
                    <p className="text-gray-600 dark:text-gray-400">Found something? Help reunite it with its owner</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Statistics */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                variants={itemVariants}
                custom={index + 2}
                whileHover="hover"
                className="bg-purple-100 dark:bg-gray-800 p-6 rounded-3xl border border-purple-300 dark:border-gray-700 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-900/30 transition-all duration-300 hover:glow-purple"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <motion.p 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        delay: 0.3 + (index * 0.1)
                      }}
                      className="text-3xl font-bold text-gray-900 dark:text-white"
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-purple-200/80 dark:bg-gray-700 ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <div className="bg-purple-100 dark:bg-gray-800 rounded-3xl border border-purple-300 dark:border-gray-700 p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`flex items-center space-x-4 p-4 bg-purple-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md ${
                    activity.type === 'found' ? 'hover:shadow-green-500/10 hover:border-green-200 hover:glow-green' : 'hover:shadow-red-500/10 hover:border-red-200 hover:glow-red'
                  } transition-all duration-300`}
                >
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      activity.type === 'found' ? 'bg-green-500' : 'bg-red-500'
                    }`} 
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {activity.type === 'found' ? 'Found:' : 'Lost:'} {activity.item}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
