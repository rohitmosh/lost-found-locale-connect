import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { User as UserIcon, Mail, Phone, Calendar, MapPin, Shield } from 'lucide-react';

const UserProfile = () => {
  const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    profilePicture: null,
  };

  const firstName = 'Alex';
  const memberSince = 'January 1, 2024';
  const location = 'San Francisco';
  const userId = 'user001';
  const phoneNumber = '+1 123-456-7890';

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
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
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
                {user.name}
              </motion.h2>
              <motion.div
                className="flex items-center mt-1 text-purple-100"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{location}</span>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            className="flex flex-col items-end"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</p>
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
              <motion.p 
                className="text-sm font-medium text-gray-900 dark:text-white"
                initial={{ backgroundColor: "rgba(124, 58, 237, 0.1)" }}
                animate={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                transition={{ duration: 1.5 }}
              >
                {phoneNumber || 'Not provided'}
              </motion.p>
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
          
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ x: 3 }}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-md shadow-purple-500/10">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Current location</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{location}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
