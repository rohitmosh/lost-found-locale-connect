import React from 'react';
import Navbar from '../components/Navbar';
import LostItemForm from '../components/LostItemForm';

const ReportLostItem = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Report Lost Item
        </h1>
        
        <LostItemForm />
      </div>
    </div>
  );
};

export default ReportLostItem; 