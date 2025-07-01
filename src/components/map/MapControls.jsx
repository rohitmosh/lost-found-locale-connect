import React from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

const ControlButton = ({ icon: Icon, onClick, title, delay = 0 }) => (
  <motion.button
    initial={{ opacity: 0, scale: 0, x: 20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ 
      type: "spring", 
      stiffness: 400, 
      damping: 20,
      delay
    }}
    whileHover={{ 
      scale: 1.1, 
      boxShadow: "0 5px 15px rgba(139, 92, 246, 0.3)",
      backgroundColor: "rgba(139, 92, 246, 0.2)"
    }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 text-gray-400 hover:text-white shadow-lg shadow-black/20 rounded-xl flex items-center justify-center"
    title={title}
  >
    <motion.div
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon className="h-5 w-5" />
    </motion.div>
  </motion.button>
);

const MapControls = ({ map }) => {
  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };

  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  };

  return (
    <div className="absolute top-8 right-8 flex flex-col space-y-3 z-20">
      <ControlButton icon={ZoomIn} onClick={handleZoomIn} title="Zoom In" delay={0.1} />
      <ControlButton icon={ZoomOut} onClick={handleZoomOut} title="Zoom Out" delay={0.2} />
      <ControlButton icon={Maximize} onClick={handleFullscreen} title="Fullscreen" delay={0.3} />
    </div>
  );
};

export default MapControls;
