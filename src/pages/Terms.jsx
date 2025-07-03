
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Users, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SimpleHeader from '../components/SimpleHeader';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <SimpleHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Terms & Conditions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Last updated: January 1, 2025
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span>Welcome to FindIt</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                By using FindIt, you agree to these terms and conditions. Please read them carefully before using our services.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle>1. Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                FindIt is a community-driven platform that helps users report lost items and find lost belongings through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Lost and found item reporting system</li>
                <li>Geographic location-based search functionality</li>
                <li>Community-driven verification and trust scoring</li>
                <li>Real-time notifications and alerts</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>2. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">As a user of FindIt, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Provide accurate and truthful information when reporting items</li>
                <li>Respect other users and maintain appropriate communication</li>
                <li>Not use the platform for fraudulent or illegal activities</li>
                <li>Verify ownership before claiming found items</li>
                <li>Report any suspicious or inappropriate behavior</li>
              </ul>
            </CardContent>
          </Card>

          {/* Trust Score System */}
          <Card>
            <CardHeader>
              <CardTitle>3. Trust Score System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Our trust score system helps build community confidence through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Verification of successful item returns</li>
                <li>Community feedback and ratings</li>
                <li>Account age and activity level</li>
                <li>Response time and communication quality</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                Trust scores are calculated automatically and may affect your visibility in search results.
              </p>
            </CardContent>
          </Card>

          {/* Prohibited Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>4. Prohibited Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">The following activities are strictly prohibited:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Creating false reports or misleading information</li>
                <li>Attempting to claim items that don't belong to you</li>
                <li>Harassment or inappropriate communication with other users</li>
                <li>Using the platform for commercial purposes without authorization</li>
                <li>Attempting to manipulate trust scores or reviews</li>
              </ul>
            </CardContent>
          </Card>

          {/* Liability */}
          <Card>
            <CardHeader>
              <CardTitle>5. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                FindIt acts as a platform to connect users and does not guarantee the return of lost items. 
                We are not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Loss or damage of items during exchanges</li>
                <li>Disputes between users</li>
                <li>Accuracy of user-provided information</li>
                <li>Actions of individual community members</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>6. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                We reserve the right to update these terms at any time. Users will be notified of significant 
                changes via email or platform notifications. Continued use of the service constitutes acceptance 
                of the updated terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>7. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                For questions about these terms, please contact us at{' '}
                <a href="mailto:legal@findit.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
                  legal@findit.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
