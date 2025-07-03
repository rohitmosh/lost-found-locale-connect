
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, MapPin, Calendar, Eye, EyeOff } from 'lucide-react';
import TrustScore from './TrustScore';
import TrustScoreBreakdown from './TrustScoreBreakdown';

const UserProfile = ({ user, isCurrentUser = true }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Mock user data - in real app, this would come from props or API
  const userData = user || {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    trustScore: 85,
    reportsSubmitted: 8,
    itemsFound: 3,
    itemsLost: 2
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 border-4 border-purple-200 hover:scale-105 transition-transform duration-200">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData.name}
                </h2>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar size={16} />
                  <span>Member since {userData.joinDate}</span>
                </div>
              </div>
            </div>
            
            <TrustScore score={userData.trustScore} size="lg" />
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="text-2xl font-bold text-purple-600">{userData.reportsSubmitted}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reports Submitted</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="text-2xl font-bold text-green-600">{userData.itemsFound}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Items Found</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="text-2xl font-bold text-blue-600">{userData.itemsLost}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Items Lost</div>
            </div>
          </div>

          {/* Trust Score Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-purple-600 border-purple-300">
                Verified Member
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-300">
                Community Helper
              </Badge>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex items-center space-x-2 hover:bg-purple-50 dark:hover:bg-gray-800"
            >
              {showBreakdown ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{showBreakdown ? 'Hide' : 'Show'} Score Details</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trust Score Breakdown */}
      {showBreakdown && (
        <div className="animate-fade-in">
          <TrustScoreBreakdown />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
