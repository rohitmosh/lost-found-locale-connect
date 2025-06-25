
import React from 'react';
import { MapPin, Navigation, Layers, Maximize2 } from 'lucide-react';

const MapControls = ({ onMyLocation, userLocation }) => {
  return (
    <div className="absolute bottom-20 right-4 z-10 space-y-2">
      {/* My Location Button */}
      <button
        onClick={onMyLocation}
        disabled={!userLocation}
        className={`p-3 glass rounded-lg transition-all duration-200 ${
          userLocation 
            ? 'hover:bg-primary/10 hover:glow-purple text-foreground' 
            : 'opacity-50 cursor-not-allowed text-muted-foreground'
        }`}
        title="Go to my location"
      >
        <Navigation className="h-5 w-5" />
      </button>

      {/* Layer Toggle */}
      <button
        className="p-3 glass rounded-lg hover:bg-primary/10 transition-all duration-200 hover:glow-purple"
        title="Map layers"
      >
        <Layers className="h-5 w-5" />
      </button>

      {/* Fullscreen */}
      <button
        className="p-3 glass rounded-lg hover:bg-primary/10 transition-all duration-200 hover:glow-purple"
        title="Fullscreen"
      >
        <Maximize2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default MapControls;
