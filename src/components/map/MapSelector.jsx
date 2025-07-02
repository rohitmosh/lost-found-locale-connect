import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { getUserLocation, getDarkMapStyle } from '@/lib/map-utils';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const MapSelector = ({ onLocationChange, initialLocation, containerClassName }) => {
  const { isDark } = useTheme();
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  // Initialize map when API is loaded
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMap(map);
    setIsLoading(false);

    // Create marker at center
    if (window.google && !markerRef.current) {
      markerRef.current = new window.google.maps.Marker({
        position: center,
        map: map,
        draggable: false,
        animation: window.google.maps.Animation.DROP,
      });
    }
  }, [center]);

  // Clean up on unmount
  const onUnmount = useCallback(() => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    setMap(null);
  }, []);

  // Update marker position when map is dragged
  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      const newLocation = {
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      };
      
      // Update marker position
      if (markerRef.current) {
        markerRef.current.setPosition(newCenter);
      }
      
      setSelectedLocation(newLocation);
      
      // Notify parent component
      if (onLocationChange) {
        onLocationChange(newLocation);
      }
    }
  };

  // Handle current location button click
  const handleUseCurrentLocation = async () => {
    try {
      const location = await getUserLocation();
      if (location && mapRef.current) {
        mapRef.current.panTo(location);
        setCenter(location);
        
        if (markerRef.current) {
          markerRef.current.setPosition(location);
        }
        
        setSelectedLocation(location);
        
        // Notify parent component
        if (onLocationChange) {
          onLocationChange(location);
        }
      }
    } catch (error) {
      console.error('Error getting user location:', error);
      // Could show a toast notification here
    }
  };

  // Apply theme changes
  useEffect(() => {
    if (mapRef.current && window.google) {
      mapRef.current.setOptions({
        styles: isDark ? getDarkMapStyle() : []
      });
    }
  }, [isDark]);

  // Set initial location if provided
  useEffect(() => {
    if (initialLocation && mapRef.current) {
      mapRef.current.panTo(initialLocation);
      setCenter(initialLocation);
      
      if (markerRef.current) {
        markerRef.current.setPosition(initialLocation);
      }
      
      setSelectedLocation(initialLocation);
    }
  }, [initialLocation]);

  // Try to get user location on component mount
  useEffect(() => {
    const initUserLocation = async () => {
      try {
        const location = await getUserLocation();
        if (location) {
          setCenter(location);
          setSelectedLocation(location);
          
          // Notify parent component
          if (onLocationChange) {
            onLocationChange(location);
          }
        }
      } catch (error) {
        console.error('Error getting initial user location:', error);
      }
    };

    initUserLocation();
  }, [onLocationChange]);

  return (
    <div className="border border-purple-200 dark:border-purple-900/50 rounded-lg overflow-hidden">
      <div className={`h-[200px] relative ${containerClassName || ''}`}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{
              width: '100%',
              height: '100%',
            }}
            center={center}
            zoom={14}
            onLoad={onMapLoad}
            onUnmount={onUnmount}
            onDragEnd={handleCenterChanged}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              styles: isDark ? getDarkMapStyle() : [],
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
            }}
          >
            {/* The marker is created programmatically in the center of the map */}
          </GoogleMap>
        ) : (
          <div className="h-full bg-purple-50 dark:bg-gray-700 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10" />
            <div className="text-center relative">
              <MapPin className="h-10 w-10 text-purple-500 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-300">
                Loading map...
              </p>
            </div>
          </div>
        )}
        
        {/* Fixed pin in center */}
        {isLoaded && !isLoading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <MapPin className="h-8 w-8 text-purple-600 drop-shadow-lg" />
          </div>
        )}
      </div>
      
      <div className="p-3 bg-white dark:bg-gray-800 flex justify-between items-center">
        <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
          <MapPin className="h-4 w-4 text-purple-500 mr-1" />
          <span>
            {selectedLocation 
              ? `${selectedLocation.lat.toFixed(5)}, ${selectedLocation.lng.toFixed(5)}`
              : 'Select a location'}
          </span>
        </div>
        <Button 
          type="button" 
          variant="outline"
          size="sm"
          onClick={handleUseCurrentLocation}
          className="text-purple-600 border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
        >
          Use Current Location
        </Button>
      </div>
    </div>
  );
};

export default MapSelector; 