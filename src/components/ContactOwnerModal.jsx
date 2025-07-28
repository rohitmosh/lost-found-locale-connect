import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, Star, Calendar, TrendingUp, Award, Clock, User, CheckCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import TrustScore from './TrustScore';
import VerificationBadges from './VerificationBadges';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

const ContactOwnerModal = ({ isOpen, onClose, ownerData, reportId, reportUserId }) => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [isMarkingResolved, setIsMarkingResolved] = useState(false);

  if (!isOpen || !ownerData) return null;

  // Handle marking item as resolved
  const handleMarkAsResolved = async () => {
    if (!user || !reportId) {
      toast.error('Unable to process request. Please try again.');
      return;
    }

    // Verify user is the owner of the report
    if (user.id !== reportUserId) {
      toast.error('Only the report owner can mark items as resolved.');
      return;
    }

    setIsMarkingResolved(true);

    try {
      // First, check if there's already a resolution process for this report
      const { data: existingResolution } = await supabase.rpc('get_resolution_status', {
        p_report_id: reportId
      });

      if (existingResolution && existingResolution.exists && existingResolution.status === 'completed') {
        toast.error('This item has already been marked as resolved.');
        setIsMarkingResolved(false);
        return;
      }

      // Call the Supabase function to initiate resolution confirmation
      const { data, error } = await supabase.rpc('initiate_resolution_confirmation', {
        p_report_id: reportId,
        p_owner_id: user.id,
        p_owner_notes: 'Item marked as resolved by owner'
      });

      if (error) {
        console.error('Error initiating resolution:', error);
        toast.error('Failed to mark as resolved. Please try again.');
        return;
      }

      if (data && data.success) {
        toast.success('Resolution initiated! The finder will be notified to confirm the return.');

        // Create notification for the finder
        // Note: In a real implementation, we'd need to identify the finder from the context
        // For now, we'll create a notification that can be seen by relevant users
        const { error: notificationError } = await supabase
          .from('notifications')
          .insert({
            user_id: reportUserId, // This would be the finder's ID in a real scenario
            type: 'resolution_pending',
            title: 'Confirm Item Return',
            message: `The owner has marked "${ownerData.name || 'an item'}" as resolved. Please confirm if you successfully returned this item.`,
            related_report_id: reportId
          });

        if (notificationError) {
          console.error('Error creating notification:', notificationError);
          // Don't fail the whole process if notification fails
        }

        // Refresh the page data to reflect the new status
        window.dispatchEvent(new CustomEvent('reportStatusChanged', {
          detail: { reportId, status: 'pending_finder' }
        }));

        onClose();
      } else {
        toast.error(data?.error || 'Failed to mark as resolved');
      }
    } catch (error) {
      console.error('Error marking as resolved:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsMarkingResolved(false);
    }
  };

  // Use actual data from props with minimal fallbacks
  const owner = {
    name: ownerData.name || 'Anonymous User',
    profilePicture: ownerData.profilePicture || null,
    trustScore: ownerData.trustScore || 85,
    memberSince: ownerData.memberSince || 'Recently joined',
    successfulReturns: ownerData.successfulReturns || 0,
    positiveRatings: ownerData.positiveRatings || 0,
    phone: ownerData.phone || 'Not provided',
    email: ownerData.email || 'Not provided',
    lastSeen: ownerData.lastSeen || 'Unknown',
    verifications: {
      community: ownerData.verifications?.community || false,
      phone: ownerData.verifications?.phone || false,
      email: ownerData.verifications?.email || false
    },
    rating: ownerData.rating || 0
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-50 flex items-center justify-center p-4 pb-8"
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ alignItems: 'flex-start', paddingTop: '6rem' }}
      >
        {/* Backdrop */}
        <motion.div
          variants={backdropVariants}
          className={`fixed inset-0 ${isDark ? 'bg-black/70' : 'bg-black/50'} backdrop-blur-sm`}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          variants={modalVariants}
          className={`
            relative w-full max-w-4xl mx-auto
            ${isDark ? 'bg-gray-800/95' : 'bg-white/95'}
            backdrop-blur-md rounded-2xl shadow-2xl
            border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}
            overflow-hidden
            max-h-[calc(100vh-8rem)]
          `}
          style={{ marginTop: '0.5rem', marginBottom: '2rem' }}
        >
          <div className="overflow-y-auto max-h-full">
            {/* Header */}
            <div className="relative p-8 pb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`absolute top-6 right-6 p-2 rounded-full transition-colors
                ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
              `}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Profile Section - Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
              {/* Left Column - Profile Info */}
              <div className="lg:col-span-2 flex items-center space-x-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                  className="relative"
                >
                  {owner.profilePicture ? (
                    <img
                      src={owner.profilePicture}
                      alt={owner.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                  ) : (
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-lg
                      ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'}
                    `}>
                      <User className={`w-10 h-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                  )}
                </motion.div>

                <div className="flex-1">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
                    className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}
                  >
                    {owner.name}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3, ease: "easeOut" }}
                    className="flex items-center space-x-2"
                  >
                    <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Member since {owner.memberSince}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Right Column - Trust Score */}
              <div className="flex justify-center lg:justify-end items-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
                  className="relative group"
                >
                  <TrustScore
                    score={owner.trustScore}
                    size="lg"
                    showLabel={false}
                    showBadges={false}
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-full blur group-hover:from-purple-600/20 group-hover:to-indigo-600/20 transition-all duration-300" />
                </motion.div>
              </div>
            </div>

            {/* Verification Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3, ease: "easeOut" }}
              className="mb-6"
            >
              <VerificationBadges
                verifications={owner.verifications}
                size="md"
                className="justify-center"
              />
            </motion.div>
          </div>



          {/* Stats Section */}
          <div className={`px-8 py-5 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -1 }}
                className={`relative text-center p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} border ${isDark ? 'border-gray-600/50' : 'border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl" />
                <div className="relative">
                  <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {owner.successfulReturns}
                  </div>
                  <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    Successful Returns
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -1 }}
                className={`relative text-center p-3 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} border ${isDark ? 'border-gray-600/50' : 'border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-xl" />
                <div className="relative">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {owner.rating}
                    </span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Community Rating
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className={`px-8 py-5 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ x: 2, scale: 1.01 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl ${isDark ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-300`}
                >
                  <div className={`p-3 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <Phone className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {owner.phone}
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ x: 2, scale: 1.01 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl ${isDark ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-300`}
                >
                  <div className={`p-3 rounded-full ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                    <Mail className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {owner.email}
                  </span>
                </motion.div>
              </div>

              {/* Last Seen */}
              <div className="flex items-center justify-center space-x-2 pt-2">
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-500'} animate-pulse`} />
                <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Active {owner.lastSeen}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 pb-6 pt-4">
            <motion.button
              whileHover={{
                scale: isMarkingResolved ? 1 : 1.01,
                y: isMarkingResolved ? 0 : -1
              }}
              whileTap={{ scale: isMarkingResolved ? 1 : 0.99 }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }}
              onClick={handleMarkAsResolved}
              disabled={isMarkingResolved}
              className="w-full relative flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 group-hover:from-green-400/20 group-hover:to-emerald-400/20 transition-all duration-300" />
              {isMarkingResolved ? (
                <Loader2 className="w-4 h-4 relative z-10 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 relative z-10" />
              )}
              <span className="font-medium relative z-10">
                {isMarkingResolved ? 'Processing...' : 'Mark as Resolved'}
              </span>
            </motion.button>
          </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactOwnerModal;
