import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, TrendingUp, User, Plus, MapPin, ChevronRight, Calendar, Tag, Clock, RefreshCw, Sparkles, Trophy, Award, Heart, Star } from 'lucide-react';
import EnhancedLoading from '../components/EnhancedLoading';
import { KonamiCode, ClickCounter, FloatingHearts, DeveloperMode, TimeBasedGreeting, MotivationalMessage, CoffeeBreakReminder } from '../components/EasterEggs';

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

/**
 * Dashboard Component - Displays real-time user data from the database
 *
 * Features:
 * - Real user statistics (items found, active reports, community helps)
 * - Recent activity from user's reports
 * - Trust score breakdown with actual metrics
 * - Loading states and empty state handling
 * - Refresh functionality
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showTrustScore, setShowTrustScore] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState([
    {
      label: 'Items Found',
      value: '0',
      icon: Search,
      color: 'text-green-600',
      emptyText: 'No items found yet'
    },
    {
      label: 'Active Reports',
      value: '0',
      icon: Bell,
      color: 'text-blue-600',
      emptyText: 'No active reports'
    },
    {
      label: 'Community Helps',
      value: '0',
      icon: TrendingUp,
      color: 'text-purple-600',
      emptyText: 'No resolved reports yet'
    },
  ]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [trustMetrics, setTrustMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Easter egg states
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);
  const [motivationalTrigger, setMotivationalTrigger] = useState(0);

  const toggleNotificationSidebar = () => {
    setIsNotificationSidebarOpen(!isNotificationSidebarOpen);
  };

  const refreshDashboard = async () => {
    if (user?.id) {
      setLoading(true);
      await Promise.all([
        fetchUserStats(user.id),
        fetchRecentActivity(user.id),
        fetchTrustMetrics(user.id),
        fetchNotifications(user.id)
      ]);
      setLoading(false);
    }
  };

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  // Fetch user statistics
  const fetchUserStats = async (userId) => {
    try {
      // Get user's found items count (reports where user found something)
      const { data: foundItems, error: foundError } = await supabase
        .from('reports')
        .select('id')
        .eq('user_id', userId)
        .eq('report_type', 'found');

      // Get user's active reports count
      const { data: activeReports, error: activeError } = await supabase
        .from('reports')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'active');

      // Get user's community helps (successful matches + resolved reports)
      const { data: trustData, error: trustError } = await supabase
        .from('user_trust_metrics')
        .select('successful_matches, accurate_reports')
        .eq('user_id', userId)
        .single();

      // Get resolved reports count (items that were successfully returned)
      const { data: resolvedReports, error: resolvedError } = await supabase
        .from('reports')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'resolved');

      if (!foundError && !activeError) {
        const successfulMatches = trustData?.successful_matches || 0;
        const resolvedCount = resolvedReports?.length || 0;
        const communityHelps = successfulMatches + resolvedCount;

        setStats([
          {
            label: 'Items Found',
            value: foundItems?.length?.toString() || '0',
            icon: Search,
            color: 'text-green-600',
            emptyText: 'No items found yet'
          },
          {
            label: 'Active Reports',
            value: activeReports?.length?.toString() || '0',
            icon: Bell,
            color: 'text-blue-600',
            emptyText: 'No active reports'
          },
          {
            label: 'Community Helps',
            value: communityHelps.toString(),
            icon: TrendingUp,
            color: 'text-purple-600',
            emptyText: 'No resolved reports yet'
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  // Fetch recent activity
  const fetchRecentActivity = async (userId) => {
    try {
      const { data: reports, error } = await supabase
        .from('reports')
        .select(`
          id,
          title,
          report_type,
          address,
          created_at,
          categories (name)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && reports) {
        const formattedActivity = reports.map(report => ({
          id: report.id,
          type: report.report_type,
          item: report.title,
          location: report.address?.split(',')[0] || 'Unknown location',
          time: formatTimeAgo(report.created_at)
        }));

        setRecentActivity(formattedActivity);
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  // Fetch user trust metrics
  const fetchTrustMetrics = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_trust_metrics')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        setTrustMetrics(data);
      }
    } catch (error) {
      console.error('Error fetching trust metrics:', error);
    }
  };

  // Fetch user notifications
  const fetchNotifications = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select(`
          id,
          type,
          title,
          message,
          is_read,
          created_at,
          related_report_id,
          related_match_id,
          related_user_id,
          reports (
            title,
            report_type,
            address
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && data) {
        const formattedNotifications = data.map(notification => ({
          id: notification.id,
          type: notification.type,
          title: notification.title,
          description: notification.message,
          time: formatTimeAgo(notification.created_at),
          read: notification.is_read,
          relatedReportId: notification.related_report_id,
          relatedMatchId: notification.related_match_id,
          relatedUserId: notification.related_user_id,
          reportTitle: notification.reports?.title,
          reportType: notification.reports?.report_type,
          location: notification.reports?.address?.split(',')[0] || 'Unknown location'
        }));

        setNotifications(formattedNotifications);
        setUnreadNotifications(formattedNotifications.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        setLoading(true);

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setUserProfile(data);
        }

        // Fetch all dashboard data
        await Promise.all([
          fetchUserStats(user.id),
          fetchRecentActivity(user.id),
          fetchTrustMetrics(user.id),
          fetchNotifications(user.id)
        ]);

        setLoading(false);
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

  // Listen for report status changes to refresh dashboard data
  useEffect(() => {
    const handleReportStatusChange = (event) => {
      console.log('Report status changed:', event.detail);
      // Refresh dashboard data when a report status changes
      refreshDashboard();
    };

    window.addEventListener('reportStatusChanged', handleReportStatusChange);
    return () => window.removeEventListener('reportStatusChanged', handleReportStatusChange);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Notification Sidebar */}
      <NotificationSidebar
        isOpen={isNotificationSidebarOpen}
        onClose={() => setIsNotificationSidebarOpen(false)}
        notifications={notifications}
        onNotificationRead={(id) => {
          setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
          ));
          setUnreadNotifications(prev => Math.max(0, prev - 1));
        }}
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
          isNotificationSidebarOpen ? 'ml-[460px]' : 'ml-0'
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
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshDashboard}
                disabled={loading}
                className="p-2 rounded-lg bg-purple-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                title="Refresh Dashboard"
              >
                <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              </motion.button>
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
                  <TimeBasedGreeting userName={userProfile?.name?.split(' ')[0] || 'Friend'} />
                </h1>
                <p className="text-purple-100 text-lg">
                  Ready to help your community find their lost items today?
                </p>
              </div>
              <ClickCounter
                threshold={7}
                onThresholdReached={() => {
                  setShowFloatingHearts(true);
                  setMotivationalTrigger(prev => prev + 1);
                }}
              >
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
              </ClickCounter>
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
                    <TrustScoreBreakdown
                      userStats={trustMetrics ? {
                        successfulMatches: trustMetrics.successful_matches || 0,
                        reportAccuracy: trustMetrics.accurate_reports || 0,
                        quickResponses: trustMetrics.quick_responses || 0,
                        accountMonths: trustMetrics.account_longevity_months || 0,
                        falseReports: trustMetrics.false_reports || 0,
                        noShows: trustMetrics.no_shows || 0,
                        spamPosts: trustMetrics.spam_posts || 0,
                        unresponsive: trustMetrics.unresponsive_incidents || 0
                      } : null}
                      score={userProfile?.trust_score || 0}
                    />
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
            {loading ? (
              // Enhanced loading skeleton for stats
              [1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-purple-100/50 to-indigo-100/50 dark:from-gray-800/50 dark:to-gray-700/50 p-6 rounded-3xl border border-purple-300/50 dark:border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-purple-200 to-indigo-200 dark:from-gray-600 dark:to-gray-500 rounded-full w-24 skeleton animate-shimmer" />
                      <div className="h-8 bg-gradient-to-r from-purple-300 to-indigo-300 dark:from-gray-500 dark:to-gray-400 rounded-lg w-16 skeleton animate-shimmer" />
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-gray-600 dark:to-gray-500 rounded-xl skeleton animate-pulse-glow" />
                  </div>
                </motion.div>
              ))
            ) : (
              stats.map((stat, index) => (
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
              ))
            )}
          </motion.div>

          {/* Recent Activity */}
          <div className="bg-purple-100 dark:bg-gray-800 rounded-3xl border border-purple-300 dark:border-gray-700 p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {loading ? (
                // Enhanced loading skeleton
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-gray-700/30 dark:to-gray-600/30 rounded-xl backdrop-blur-sm border border-purple-200/30 dark:border-gray-600/30"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 animate-pulse-glow"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gradient-to-r from-purple-200 to-indigo-200 dark:from-gray-600 dark:to-gray-500 rounded-full w-3/4 skeleton animate-shimmer" />
                        <div className="h-3 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-full w-1/2 skeleton animate-shimmer" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
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
                ))
              ) : (
                // Empty state
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activity yet</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Start by reporting a lost or found item</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Easter Eggs */}
      <KonamiCode onActivate={() => setDeveloperMode(!developerMode)} />
      <FloatingHearts isActive={showFloatingHearts} />
      <DeveloperMode isActive={developerMode} />
      <MotivationalMessage trigger={motivationalTrigger} />
      <CoffeeBreakReminder />
    </div>
  );
};

export default Dashboard;
