
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Database, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SimpleHeader from '../components/SimpleHeader';
import Footer from '../components/Footer';

const Privacy = () => {
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
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Privacy Policy
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
                <Eye className="h-5 w-5 text-purple-600" />
                <span>Your Privacy Matters</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                FindIt is committed to protecting your privacy. This policy explains how we collect, use, and 
                protect your personal information when you use our lost and found platform.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span>1. Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Personal Information:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Name and email address when you register</li>
                  <li>Profile information you choose to share</li>
                  <li>Contact details for item recovery coordination</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Item Information:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Descriptions and photos of lost/found items</li>
                  <li>Location data where items were lost or found</li>
                  <li>Date and time information</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Usage Data:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Platform usage patterns and preferences</li>
                  <li>Search queries and interaction history</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Connect lost items with their owners</li>
                <li>Facilitate communication between users</li>
                <li>Calculate and display trust scores</li>
                <li>Send relevant notifications and alerts</li>
                <li>Improve our platform and user experience</li>
                <li>Prevent fraud and maintain platform security</li>
              </ul>
            </CardContent>
          </Card>

          {/* Location Data */}
          <Card>
            <CardHeader>
              <CardTitle>3. Location Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                We collect location data to help match lost items with found items in nearby areas. 
                Location information is:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Only collected when you report an item</li>
                <li>Used to show approximate areas, not exact addresses</li>
                <li>Shared only with potential matches for your items</li>
                <li>Never sold or shared with third parties for marketing</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span>4. Information Sharing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">We share your information only when:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Connecting you with potential matches for lost/found items</li>
                <li>Required by law or legal process</li>
                <li>Necessary to protect the safety of our users</li>
                <li>With your explicit consent</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                <strong>We never sell your personal information to third parties.</strong>
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-yellow-600" />
                <span>5. Data Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                We implement industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Encrypted data transmission and storage</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication systems</li>
                <li>Secure cloud hosting infrastructure</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>6. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Access and download your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of non-essential communications</li>
                <li>Control location sharing preferences</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>7. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                <li>Remember your login and preferences</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized experiences</li>
                <li>Ensure platform security</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                You can control cookie settings through your browser preferences.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>8. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                FindIt is not intended for children under 13. We do not knowingly collect personal 
                information from children under 13. If you believe we have collected such information, 
                please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                For privacy-related questions or to exercise your rights, contact us at{' '}
                <a href="mailto:privacy@findit.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
                  privacy@findit.com
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

export default Privacy;
