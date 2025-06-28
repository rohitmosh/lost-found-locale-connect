import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom marker component for lost and found items
const MapMarker = ({ item, onClick, map, markerRef }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // SVG paths for the marker icons
  const lostMarkerPath = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" width="32" height="32">
      <path stroke="#ffffff" stroke-width="1" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
    </svg>
  `;

  const foundMarkerPath = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981" width="32" height="32">
      <path stroke="#ffffff" stroke-width="1" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
      <circle cx="12" cy="9" r="2.5" fill="#ffffff"/>
    </svg>
  `;

  useEffect(() => {
    if (!map || !window.google) return;
    
    // Create the marker with custom SVG icon
    const svgMarker = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        item.status === 'Lost' ? lostMarkerPath : foundMarkerPath
      )}`,
      size: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 32),
      scaledSize: new window.google.maps.Size(32, 32),
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
      icon.scaledSize = new window.google.maps.Size(40, 40);
      icon.anchor = new window.google.maps.Point(20, 40);
      marker.setIcon(icon);
    });
    
    marker.addListener('mouseout', () => {
      setIsHovered(false);
      marker.setZIndex(1);
      
      // Scale back to normal
      const icon = marker.getIcon();
      icon.scaledSize = new window.google.maps.Size(32, 32);
      icon.anchor = new window.google.maps.Point(16, 32);
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