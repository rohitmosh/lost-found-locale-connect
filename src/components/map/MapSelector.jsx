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
  const hasSetInitialLocation = useRef(false);

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
  }, []);

  // Clean up on unmount
  const onUnmount = useCallback(() => {
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
      setIsLoading(true);
      
      // Request user's location with a promise
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by your browser'));
          return;
        }
        
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error),
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });
      
      // Extract coordinates
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      // Update map center if map is available
      if (location && mapRef.current) {
        // Update map center
        mapRef.current.panTo(location);
        setCenter(location);
        
        // Update selected location
        setSelectedLocation(location);
        
        // Notify parent component
        if (onLocationChange) {
          onLocationChange(location);
        }
      }
    } catch (error) {
      console.error('Error getting user location:', error);
      
      // Show appropriate error message based on error code
      let errorMessage = 'Could not get your location.';
      
      if (error.code) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location services for this website.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please try again.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        }
      }
      
      // Show error message
      alert(errorMessage);
    } finally {
      setIsLoading(false);
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
    if (initialLocation && mapRef.current && !hasSetInitialLocation.current) {
      mapRef.current.panTo(initialLocation);
      setCenter(initialLocation);
      setSelectedLocation(initialLocation);
      hasSetInitialLocation.current = true;
    }
  }, [initialLocation]);

  // Try to get user location on component mount only once
  useEffect(() => {
    const initUserLocation = async () => {
      if (hasSetInitialLocation.current) return;
      
      try {
        const location = await getUserLocation();
        if (location && !hasSetInitialLocation.current) {
          setCenter(location);
          setSelectedLocation(location);
          hasSetInitialLocation.current = true;
          
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
              gestureHandling: 'greedy',
              draggable: true,
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
        
        {/* Loading overlay */}
        {isLoaded && isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-2"></div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Getting location...</p>
            </div>
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
          disabled={isLoading}
          className="text-purple-600 border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
        >
          {isLoading ? 'Getting location...' : 'Use Current Location'}
        </Button>
      </div>
    </div>
  );
};

export default MapSelector; 