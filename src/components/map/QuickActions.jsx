
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-8 right-8 flex flex-col space-y-4 z-20 animate-fade-in">
      {/* Report Found Item - Green Button */}
      <Button
        size="lg"
        onClick={() => navigate('/report-found')}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-2xl hover:shadow-green-500/50 transition-all duration-500 transform hover:scale-110 hover:-rotate-3 rounded-full w-16 h-16 p-0 group border-2 border-green-400/20 hover:border-green-300/40"
        title="Report Found Item"
      >
        <Plus className="h-8 w-8 group-hover:rotate-90 transition-transform duration-500 drop-shadow-lg" />
      </Button>

      {/* Report Lost Item - Red Button */}
      <Button
        size="lg"
        onClick={() => navigate('/report-lost')}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-500 transform hover:scale-110 hover:rotate-3 rounded-full w-16 h-16 p-0 group border-2 border-red-400/20 hover:border-red-300/40"
        title="Report Lost Item"
      >
        <Search className="h-8 w-8 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 drop-shadow-lg" />
      </Button>
    </div>
  );
};

export default QuickActions;
