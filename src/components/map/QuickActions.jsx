import React from 'react';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-8 right-8 flex flex-col space-y-4 z-20">
      {/* Report Found Item - Green Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 15,
          delay: 0.2
        }}
        whileHover={{ 
          scale: 1.1, 
          rotate: -3,
          boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/report-found')}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-2xl shadow-green-500/30 w-16 h-16 rounded-full flex items-center justify-center border-2 border-green-400/20"
        title="Report Found Item"
      >
        <motion.div
          animate={{ rotate: 0 }}
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="h-8 w-8 drop-shadow-lg" />
        </motion.div>
      </motion.button>

      {/* Report Lost Item - Red Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 15,
          delay: 0.3
        }}
        whileHover={{ 
          scale: 1.1, 
          rotate: 3,
          boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)"
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/report-lost')}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-2xl shadow-red-500/30 w-16 h-16 rounded-full flex items-center justify-center border-2 border-red-400/20"
        title="Report Lost Item"
      >
        <motion.div
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ duration: 0.3 }}
        >
          <Search className="h-8 w-8 drop-shadow-lg" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default QuickActions;
