/**
 * Map utility functions for location and distance calculations
 */

/**
 * Calculate the distance between two coordinates in kilometers
 * @param {Object} point1 - First coordinate with lat/lng properties
 * @param {Object} point2 - Second coordinate with lat/lng properties
 * @returns {number} - Distance in kilometers
 */
export const calculateDistance = (point1, point2) => {
  if (!point1 || !point2) return null;
  
  // Haversine formula to calculate distance between two points on Earth
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return parseFloat(distance.toFixed(1));
};

/**
 * Format a distance in km to a human-readable string
 * @param {number} distance - Distance in kilometers
 * @returns {string} - Formatted distance string
 */
export const formatDistance = (distance) => {
  if (distance === null) return 'Unknown distance';
  if (distance < 0.1) return 'Very close';
  if (distance < 1) return `${(distance * 1000).toFixed(0)} m`;
  return `${distance.toFixed(1)} km`;
};

/**
 * Get the user's current location
 * @returns {Promise<Object>} - Promise resolving to location {lat, lng}
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
};

/**
 * Create a custom map marker SVG icon for lost or found items
 * @param {string} type - 'lost' or 'found'
 * @param {Object} opts - Optional configuration
 * @returns {Object} - SVG path and configuration for Google Maps marker
 */
export const createMarkerIcon = (type, opts = {}) => {
  const defaultOptions = {
    scale: 1,
    fillOpacity: 1,
    strokeWeight: 2
  };
  
  const options = { ...defaultOptions, ...opts };
  
  // SVG paths
  const lostMarkerPath = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" width="36" height="36">
      <path stroke="#ffffff" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
    </svg>
  `;

  const foundMarkerPath = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981" width="36" height="36">
      <path stroke="#ffffff" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
      <circle cx="12" cy="9" r="2.5" fill="#ffffff"/>
    </svg>
  `;
  
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      type === 'lost' ? lostMarkerPath : foundMarkerPath
    )}`,
    scaledSize: { width: 36 * options.scale, height: 36 * options.scale },
    anchor: { x: 18 * options.scale, y: 36 * options.scale },
    fillOpacity: options.fillOpacity,
    strokeWeight: options.strokeWeight
  };
};

/**
 * Create dark mode style for Google Maps
 * @returns {Array} - Array of style configurations for Google Maps
 */
export const getDarkMapStyle = () => [
  { elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6b7280' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca3af' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b7280' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0f1e32' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca3af' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0c1221' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }]
  }
]; 