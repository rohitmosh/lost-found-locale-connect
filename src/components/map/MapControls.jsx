
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
    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
      {/* My Location */}
      <Button
        variant="outline"
        size="icon"
        onClick={onMyLocation}
        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg"
        title="My Location"
      >
        <MapPin className="h-4 w-4" />
      </Button>

      {/* Zoom Controls */}
      <div className="flex flex-col space-y-1">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Reset View */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleResetView}
        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg"
        title="Reset View"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>

      {/* Fullscreen */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleFullscreen}
        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg"
        title="Fullscreen"
      >
        <Maximize className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MapControls;
