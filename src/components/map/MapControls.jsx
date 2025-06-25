
import React from 'react';
import { ZoomIn, ZoomOut, Maximize, RotateCcw, MapPin } from 'lucide-react';
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
    <div className="absolute top-4 right-4 flex flex-col space-y-3 z-20 animate-fade-in">
      {/* My Location */}
      <Button
        variant="outline"
        size="icon"
        onClick={onMyLocation}
        className="glass border-gray-300 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:glow-purple group"
        title="My Location"
      >
        <MapPin className="h-4 w-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
      </Button>

      {/* Zoom Controls */}
      <div className="flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="glass border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="glass border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>

      {/* Reset View */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleResetView}
        className="glass border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
        title="Reset View"
      >
        <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
      </Button>

      {/* Fullscreen */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleFullscreen}
        className="glass border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
        title="Fullscreen"
      >
        <Maximize className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
      </Button>
    </div>
  );
};

export default MapControls;
