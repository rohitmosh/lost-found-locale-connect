
import React from 'react';
import { ZoomIn, ZoomOut, Maximize, RotateCcw, Target } from 'lucide-react';
import { Button } from '../ui/button';

const MapControls = ({ map, onMyLocation }) => {
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
    }
  };

  const handleResetView = () => {
    if (map) {
      map.setCenter({ lat: 40.7589, lng: -73.9851 });
      map.setZoom(13);
    }
  };

  return (
    <div className="absolute top-8 right-8 flex flex-col space-y-3 z-20 animate-fade-in">
      {/* My Location */}
      <Button
        variant="outline"
        size="icon"
        onClick={onMyLocation}
        className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border-gray-700/50 text-white hover:bg-gray-700/80 hover:border-purple-500/50 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-110 rounded-xl group"
        title="My Location"
      >
        <Target className="h-5 w-5 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300" />
      </Button>

      {/* Zoom In */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleZoomIn}
        className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border-gray-700/50 text-white hover:bg-gray-700/80 hover:border-gray-500/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 rounded-xl group"
        title="Zoom In"
      >
        <ZoomIn className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
      </Button>

      {/* Zoom Out */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleZoomOut}
        className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border-gray-700/50 text-white hover:bg-gray-700/80 hover:border-gray-500/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 rounded-xl group"
        title="Zoom Out"
      >
        <ZoomOut className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
      </Button>

      {/* Reset View */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleResetView}
        className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border-gray-700/50 text-white hover:bg-gray-700/80 hover:border-gray-500/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 rounded-xl group"
        title="Reset View"
      >
        <RotateCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
      </Button>

      {/* Fullscreen */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleFullscreen}
        className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border-gray-700/50 text-white hover:bg-gray-700/80 hover:border-gray-500/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 rounded-xl group"
        title="Fullscreen"
      >
        <Maximize className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
      </Button>
    </div>
  );
};

export default MapControls;
