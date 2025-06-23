
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Bell } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-violet-300/30 dark:bg-violet-600/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800 rounded-full shadow-lg">
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              🎉 Welcome to your community's Lost & Found platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-gray-900 dark:text-white">
              Never Lose
            </span>
            <span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Hope Again
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Connect with your community to find lost items and help others reunite with their belongings. 
            Powered by real-time updates and smart location mapping.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <Link
              to="/map"
              className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-lg font-semibold rounded-2xl transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-lg"
            >
              Explore Map
            </Link>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16">
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
                className="group p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-purple-100 dark:border-purple-900/50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
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
