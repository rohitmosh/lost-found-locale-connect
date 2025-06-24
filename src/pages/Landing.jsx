import React from 'react';
import SimpleHeader from '../components/SimpleHeader';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SimpleHeader />
      <Hero />
      <Footer />
    </div>
  );
};

export default Landing;
