
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../ui/button';

const QuickActions = () => {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col space-y-3 z-20">
      {/* Report Found Item */}
      <Button
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-full w-14 h-14 p-0"
        title="Report Found Item"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Report Lost Item */}
      <Button
        size="lg"
        className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-full w-14 h-14 p-0"
        title="Report Lost Item"
      >
        <Search className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default QuickActions;
