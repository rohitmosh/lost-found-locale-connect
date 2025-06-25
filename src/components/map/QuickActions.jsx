
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-6 right-6 flex flex-col space-y-4 z-20 animate-fade-in">
      {/* Report Found Item */}
      <Button
        size="lg"
        onClick={() => navigate('/report-found')}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 rounded-full w-16 h-16 p-0 group hover:glow-green animate-pulse-glow"
        title="Report Found Item"
      >
        <Plus className="h-7 w-7 group-hover:rotate-90 transition-transform duration-300" />
      </Button>

      {/* Report Lost Item */}
      <Button
        size="lg"
        onClick={() => navigate('/report-lost')}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 rounded-full w-16 h-16 p-0 group hover:glow-red"
        title="Report Lost Item"
      >
        <Search className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
      </Button>
    </div>
  );
};

export default QuickActions;
