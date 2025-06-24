import React from 'react';
import { Helmet } from 'react-helmet';
import AuthHeader from '@/components/AuthHeader';
import FoundItemForm from '@/components/FoundItemForm';
import Footer from '@/components/Footer';

const ReportFoundItem = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Helmet>
        <title>Report Found Item | FindIt</title>
      </Helmet>
      
      <AuthHeader />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <FoundItemForm />
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportFoundItem; 