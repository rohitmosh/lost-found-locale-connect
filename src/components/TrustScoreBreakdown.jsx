
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Camera, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  UserX,
  Spam,
  MessageCircleX
} from 'lucide-react';

const TrustScoreBreakdown = ({ userStats }) => {
  // Mock data - in real app, this would come from props or API
  const stats = userStats || {
    successfulMatches: 3,
    reportAccuracy: 8,
    quickResponses: 12,
    completeProfiles: 5,
    communityEngagement: 15,
    accountMonths: 6,
    falseReports: 0,
    noShows: 1,
    spamPosts: 0,
    unresponsive: 2
  };

  const positiveMetrics = [
    {
      label: 'Successful Matches',
      value: stats.successfulMatches,
      points: stats.successfulMatches * 10,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Report Accuracy',
      value: stats.reportAccuracy,
      points: stats.reportAccuracy * 5,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Quick Responses',
      value: stats.quickResponses,
      points: stats.quickResponses * 3,
      icon: Clock,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      label: 'Complete Profiles',
      value: stats.completeProfiles,
      points: stats.completeProfiles * 2,
      icon: Camera,
      color: 'text-indigo-600 bg-indigo-100'
    },
    {
      label: 'Community Engagement',
      value: stats.communityEngagement,
      points: stats.communityEngagement * 1,
      icon: MessageSquare,
      color: 'text-cyan-600 bg-cyan-100'
    },
    {
      label: 'Account Longevity',
      value: `${stats.accountMonths} months`,
      points: stats.accountMonths * 1,
      icon: Calendar,
      color: 'text-amber-600 bg-amber-100'
    }
  ];

  const negativeMetrics = [
    {
      label: 'False Reports',
      value: stats.falseReports,
      points: stats.falseReports * -15,
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100'
    },
    {
      label: 'No-Shows',
      value: stats.noShows,
      points: stats.noShows * -5,
      icon: UserX,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      label: 'Spam Posts',
      value: stats.spamPosts,
      points: stats.spamPosts * -3,
      icon: Spam,
      color: 'text-red-600 bg-red-100'
    },
    {
      label: 'Unresponsive',
      value: stats.unresponsive,
      points: stats.unresponsive * -2,
      icon: MessageCircleX,
      color: 'text-gray-600 bg-gray-100'
    }
  ];

  const totalPositive = positiveMetrics.reduce((sum, metric) => sum + metric.points, 0);
  const totalNegative = negativeMetrics.reduce((sum, metric) => sum + metric.points, 0);
  const totalScore = Math.max(0, totalPositive + totalNegative);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          <span>Trust Score Breakdown</span>
          <Badge variant="outline" className="ml-auto text-lg font-bold">
            {totalScore}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Positive Metrics */}
        <div>
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center">
            <CheckCircle size={16} className="mr-2" />
            Positive Actions (+{totalPositive} points)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {positiveMetrics.map((metric, index) => (
              <div 
                key={metric.label}
                className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${metric.color}`}>
                    <metric.icon size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{metric.label}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{metric.value} actions</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  +{metric.points}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Negative Metrics */}
        {totalNegative < 0 && (
          <div>
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center">
              <AlertTriangle size={16} className="mr-2" />
              Deductions ({totalNegative} points)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {negativeMetrics.filter(metric => metric.points < 0).map((metric, index) => (
                <div 
                  key={metric.label}
                  className="flex items-center justify-between p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${metric.color}`}>
                      <metric.icon size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{metric.label}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{metric.value} incidents</p>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-700">
                    {metric.points}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Trust Score</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{totalScore}</span>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustScoreBreakdown;
