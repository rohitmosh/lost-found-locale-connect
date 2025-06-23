
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MapPin, Bell, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const stats = [
    { label: 'Items Found', value: '12', icon: Search, color: 'text-green-600' },
    { label: 'Active Reports', value: '3', icon: Bell, color: 'text-blue-600' },
    { label: 'Community Helps', value: '8', icon: TrendingUp, color: 'text-purple-600' },
  ];

  const recentActivity = [
    { id: 1, type: 'found', item: 'Blue Backpack', location: 'Central Park', time: '2 hours ago' },
    { id: 2, type: 'lost', item: 'Car Keys', location: 'Library', time: '4 hours ago' },
    { id: 3, type: 'found', item: 'Phone Case', location: 'Coffee Shop', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-purple-100 text-lg">
            Ready to help your community find their lost items today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/report-lost"
            className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02]"
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

          <Link
            to="/report-found"
            className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02]"
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
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'found' ? 'bg-green-500' : 'bg-red-500'
                }`} />
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
  );
};

export default Dashboard;
