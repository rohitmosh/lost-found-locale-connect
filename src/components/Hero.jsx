
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Bell, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-violet-300/30 dark:bg-violet-600/20 rounded-full blur-3xl animate-float delay-500" />

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-sparkle" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-indigo-400 rounded-full animate-sparkle delay-700" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-sparkle delay-1000" />
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-violet-400 rounded-full animate-sparkle delay-300" />

        {/* Gradient orbs */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-2xl animate-float delay-1500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Enhanced Badge with animation */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-200/90 to-indigo-200/90 dark:from-gray-800/80 dark:to-purple-900/80 backdrop-blur-sm border border-purple-300 dark:border-purple-800 rounded-full shadow-lg hover-glow"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="mr-2"
            >
              🎉
            </motion.span>
            <span className="text-sm font-medium gradient-text">
              Welcome to your community's Lost & Found platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block text-gray-900 dark:text-white hover-lift"
            >
              Lost It?
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="block bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-shift hover-glow"
            >
              Track It. Find It.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-3xl mx-auto text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Connect with your community to find lost items and help others reunite with their belongings.
            Powered by real-time updates and smart location mapping.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden inline-flex items-center gap-2"
              >
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-20"
                >
                  ✨
                </motion.span>
                <span className="relative z-20">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 z-10" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/how-it-works"
                className="group px-8 py-4 glass dark:glass-dark border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-400 text-lg font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center gap-2 hover-glow"
              >
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <HelpCircle className="w-5 h-5" />
                </motion.div>
                How It Works
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/map"
                className="px-8 py-4 glass dark:glass-dark border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-400 text-lg font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center gap-2 hover-glow"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-5 h-5" />
                </motion.div>
                Explore Map
              </Link>
            </motion.div>
          </motion.div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16 pb-32">
            {[
              {
                icon: Search,
                title: 'Smart Search',
                description: 'AI-powered matching to find your items faster'
              },
              {
                icon: MapPin,
                title: 'Geo-Location',
                description: 'Precise location tracking with interactive maps'
              },
              {
                icon: Bell,
                title: 'Real-time Alerts',
                description: 'Instant notifications when items are found'
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 bg-purple-200/90 dark:bg-gray-800/60 backdrop-blur-sm border border-purple-300 dark:border-purple-900/50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
