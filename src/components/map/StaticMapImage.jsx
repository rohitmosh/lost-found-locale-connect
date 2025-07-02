import React from 'react';
import { MapPin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const StaticMapImage = ({ location, width = 300, height = 200 }) => {
  const { isDark } = useTheme();
  
  if (!location || !location.lat || !location.lng) {
    return (
      <div 
        className="bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="text-center">
          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">No location data</p>
        </div>
      </div>
    );
  }

  // Format coordinates properly
  const lat = typeof location.lat === 'function' ? location.lat() : location.lat;
  const lng = typeof location.lng === 'function' ? location.lng() : location.lng;
  
  // Use standard OpenStreetMap
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01}%2C${lat-0.01}%2C${lng+0.01}%2C${lat+0.01}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700" style={{ width: `${width}px`, height: `${height}px` }}>
      <iframe
        title="Location Map"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ 
          border: 0,
          filter: isDark ? 'invert(85%) hue-rotate(180deg) brightness(0.85) contrast(0.85) saturate(0.8)' : 'none'
        }}
        src={mapUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default StaticMapImage; 