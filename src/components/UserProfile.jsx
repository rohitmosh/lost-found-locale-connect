import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { User as UserIcon, Mail, Phone, Calendar, Shield, TrendingUp, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const UserProfile = ({ showTrustScore = false, userProfile, user }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const displayName = userProfile?.name || user?.user_metadata?.full_name || 'User';
  const displayEmail = userProfile?.email || user?.email || 'Not provided';
  const memberSince = userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'Recently';
  const phoneNumber = userProfile?.phone_number;
  const trustScore = userProfile?.trust_score || 0;
  const userId = user?.id?.slice(-6).toUpperCase() || 'XXXXXX';

  const handleAddPhone = async () => {
    const phone = prompt('Enter your phone number:');
    if (!phone || phone.trim() === '') return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ phone_number: phone.trim() })
        .eq('id', user.id);

      if (error) {
        toast.error('Failed to update phone number');
        console.error('Error updating phone:', error);
      } else {
        toast.success('Phone number updated successfully');
        // Trigger a refresh of the user profile
        window.location.reload();
      }
    } catch (error) {
      toast.error('An error occurred while updating phone number');
      console.error('Error:', error);
    } finally {
      setIsUpdating(false);
    }
  };



  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden w-full border border-purple-200/50 dark:border-purple-900/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      whileHover={{ 
        boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)",
        y: -2
      }}
    >
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {userProfile?.profile_picture ? (
                <img
                  src={userProfile.profile_picture}
                  alt={displayName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-lg">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
              )}
              <motion.div 
                className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-lg shadow-green-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            </motion.div>
            
            <div>
              <motion.h2 
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {displayName}
              </motion.h2>

            </div>
          </div>
          
          <motion.div
            className="flex flex-col items-end space-y-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Trust Score Circle */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex flex-col items-center justify-center border border-white/20 shadow-lg shadow-white/10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="text-2xl font-bold text-white">{trustScore}</div>
              <div className="text-xs text-white/80">Trust Score</div>
            </motion.div>
            
            {/* User ID */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2 border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Shield className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">ID: {userId}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ x: 3 }}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-md shadow-purple-500/10">
              <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{displayEmail}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ x: 3 }}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-md shadow-purple-500/10">
              <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
              {phoneNumber ? (
                <motion.p
                  className="text-sm font-medium text-gray-900 dark:text-white"
                  initial={{ backgroundColor: "rgba(124, 58, 237, 0.1)" }}
                  animate={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  transition={{ duration: 1.5 }}
                >
                  {phoneNumber}
                </motion.p>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs mt-1"
                  onClick={handleAddPhone}
                  disabled={isUpdating}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Phone
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ x: 3 }}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-md shadow-purple-500/10">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Member since</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {memberSince || 'August 2023'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* View Trust Score Details Button */}
        <motion.div 
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('toggleTrustScore'))}
            className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/40 px-6 py-3 rounded-xl transition-all duration-300 text-purple-700 dark:text-purple-300 font-medium shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className={`w-5 h-5 ${showTrustScore ? 'rotate-180' : ''}`} />
            <span>{showTrustScore ? 'Hide Score Details' : 'View Trust Score Details'}</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
