import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom marker component for lost and found items
const MapMarker = ({ item, onClick, map, markerRef }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // SVG paths for the marker icons - Updated with search icon for lost and plus icon for found
  const lostMarkerPath = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <circle cx="24" cy="20" r="18" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
      <circle cx="24" cy="20" r="8" fill="none" stroke="#ffffff" stroke-width="2" />
      <line x1="29" y1="25" x2="36" y2="32" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
      <path d="M24 38 L20 46 L28 46 Z" fill="#ef4444" stroke="#ffffff" stroke-width="1" />
    </svg>
  `;

  const foundMarkerPath = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <circle cx="24" cy="20" r="18" fill="#10b981" stroke="#ffffff" stroke-width="2" />
      <line x1="24" y1="12" x2="24" y2="28" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
      <line x1="16" y1="20" x2="32" y2="20" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
      <path d="M24 38 L20 46 L28 46 Z" fill="#10b981" stroke="#ffffff" stroke-width="1" />
    </svg>
  `;

  useEffect(() => {
    if (!map || !window.google) return;
    
    // Create the marker with custom SVG icon
    const svgMarker = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        item.status === 'Lost' ? lostMarkerPath : foundMarkerPath
      )}`,
      size: new window.google.maps.Size(48, 48),
      anchor: new window.google.maps.Point(24, 46),
      scaledSize: new window.google.maps.Size(48, 48),
    };
    
    // Create marker instance
    const marker = new window.google.maps.Marker({
      position: item.location,
      map: map,
      title: item.title,
      icon: svgMarker,
      animation: window.google.maps.Animation.DROP,
      optimized: false, // Important for custom SVG markers
      zIndex: isHovered ? 999 : 1
    });
    
    // Store marker reference for clustering
    if (markerRef) {
      markerRef.current = marker;
    }

    // Add click listener
    marker.addListener('click', () => {
      onClick(item);
    });
    
    // Add hover listeners
    marker.addListener('mouseover', () => {
      setIsHovered(true);
      marker.setZIndex(999);
      
      // Scale up the marker slightly
      const icon = marker.getIcon();
      icon.scaledSize = new window.google.maps.Size(56, 56);
      icon.anchor = new window.google.maps.Point(28, 54);
      marker.setIcon(icon);
    });
    
    marker.addListener('mouseout', () => {
      setIsHovered(false);
      marker.setZIndex(1);
      
      // Scale back to normal
      const icon = marker.getIcon();
      icon.scaledSize = new window.google.maps.Size(48, 48);
      icon.anchor = new window.google.maps.Point(24, 46);
      marker.setIcon(icon);
    });
    
    // Show marker with animation
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Clean up marker on unmount
    return () => {
      marker.setMap(null);
    };
  }, [map, item, onClick, isHovered, markerRef]);

  // Render tooltip for hover effect
  return (
    <AnimatePresence>
      {isHovered && isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={`fixed pointer-events-none px-3 py-2 rounded-lg shadow-lg z-50 text-white text-sm font-medium ${
            item.status === 'Lost' 
              ? 'bg-red-500/90 backdrop-blur-sm' 
              : 'bg-green-500/90 backdrop-blur-sm'
          }`}
          style={{
            left: window.event?.clientX + 10 || 0,
            top: window.event?.clientY - 30 || 0,
          }}
        >
          <div className="flex items-center space-x-2">
            <span>{item.title}</span>
            <span className="text-xs opacity-80">{item.distance}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapMarker; 