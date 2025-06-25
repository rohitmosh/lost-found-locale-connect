
import React from 'react';
import { Plus, Search, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-4 right-4 z-10 space-y-3">
      {/* Report Found Item */}
      <button
        onClick={() => navigate('/report-found')}
        className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 hover:scale-110 hover:glow-green group"
        title="Report Found Item"
      >
        <Plus className="h-6 w-6" />
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Report Found Item
        </div>
      </button>

      {/* Report Lost Item */}
      <button
        onClick={() => navigate('/report-lost')}
        className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 hover:scale-110 hover:glow-red group"
        title="Report Lost Item"
      >
        <Search className="h-6 w-6" />
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Report Lost Item
        </div>
      </button>

      {/* My Reports */}
      <button
        onClick={() => navigate('/reports')}
        className="p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-110 hover:glow-purple group"
        title="My Reports"
      >
        <FileText className="h-6 w-6" />
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          My Reports
        </div>
      </button>
    </div>
  );
};

export default QuickActions;
