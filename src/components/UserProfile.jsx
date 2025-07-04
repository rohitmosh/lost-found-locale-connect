import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import TrustScore from './TrustScore';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full">
      <div className="flex items-center mb-6">
        <div className="relative">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-purple-500" />
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div className="ml-4 flex-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          <div className="mt-2">
            <TrustScore score={user.trustScore || 0} size="sm" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/profile/settings')}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <Settings className="w-4 h-4 mr-2" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
