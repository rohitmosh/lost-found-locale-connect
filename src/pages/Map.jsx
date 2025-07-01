import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Filter, List, Grid, Bell, Target, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterPanel from '../components/map/FilterPanel';
import MapControls from '../components/map/MapControls';
import ItemPopup from '../components/map/ItemPopup';
import QuickActions from '../components/map/QuickActions';
import MapMarker from '../components/map/MapMarker';
import MarkerClusterer from '../components/map/MarkerClusterer';
import NotificationSidebar from '../components/NotificationSidebar';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    title: 'iPhone 13 Pro',
    description: 'Blue iPhone with cracked screen, lost near Central Park',
    category: 'Electronics',
    status: 'Lost',
    date: '2024-01-15',
    location: { lat: 40.7829, lng: -73.9654 },
    image: null,
    distance: '0.8 km'
  },
  {
    id: 2,
    title: 'Brown Leather Wallet',
    description: 'Found at coffee shop, contains ID cards',
    category: 'Personal Items',
    status: 'Found',
    date: '2024-01-14',
    location: { lat: 40.7614, lng: -73.9776 },
    image: '/placeholder.svg',
    distance: '1.2 km'
  },
  {
    id: 3,
    title: 'Golden Retriever - Max',
    description: 'Friendly dog, wearing blue collar with tags',
    category: 'Pets',
    status: 'Lost',
    date: '2024-01-13',
    location: { lat: 40.7505, lng: -73.9934 },
    image: null,
    distance: '2.1 km'
  },
  {
    id: 4,
    title: 'Silver MacBook Pro',
    description: 'Left at library study area, has stickers on cover',
    category: 'Electronics',
    status: 'Lost',
    date: '2024-01-10',
    location: { lat: 40.7430, lng: -73.9800 },
    image: null,
    distance: '3.5 km'
  },
  {
    id: 5,
    title: 'House Keys with Red Keychain',
    description: 'Found near subway entrance on 5th Avenue',
    category: 'Keys',
    status: 'Found',
    date: '2024-01-12',
    location: { lat: 40.7560, lng: -73.9780 },
    image: null,
    distance: '1.5 km'
  }
];

const Map = () => {
  const { isDark } = useTheme();
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const mapPositionRef = useRef({ center: null, zoom: 13 });
  const [isLoading, setIsLoading] = useState(true);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [userLocation, setUserLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [activeSearch, setActiveSearch] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    status: 'all',
    dateRange: 'all',
    radius: 5
  });
  
  const [filteredItems, setFilteredItems] = useState(mockItems);

  // Debounce search input to avoid excessive filtering
  useEffect(() => {
    const timerId = setTimeout(() => {
      setActiveSearch(searchQuery);
    }, 500);
    
    return () => clearTimeout(timerId);
  }, [searchQuery]);
  
  // Suggestions based on search
  useEffect(() => {
    if (activeSearch.length >= 2) {
      // Mock search results based on the query
      const results = mockItems
        .filter(item => 
          item.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
          item.description.toLowerCase().includes(activeSearch.toLowerCase()) ||
          item.category.toLowerCase().includes(activeSearch.toLowerCase())
        )
        .slice(0, 5)
        .map(item => ({
          id: item.id,
          text: item.title,
          category: item.category
        }));
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [activeSearch]);

  // Update map theme when isDark changes
  useEffect(() => {
    if (googleMapRef.current && window.google) {
      // Create custom map style for dark mode
      const darkMapStyle = [
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

      // Apply styles immediately based on theme
      googleMapRef.current.setOptions({
        styles: isDark ? darkMapStyle : []
      });
      
      // Force map redraw to instantly apply theme
      const currentCenter = googleMapRef.current.getCenter();
      window.google.maps.event.trigger(googleMapRef.current, 'resize');
      googleMapRef.current.setCenter(currentCenter);
      
      // Update map container background color
      if (mapRef.current) {
        mapRef.current.style.backgroundColor = isDark ? '#0f172a' : '#ffffff';
      }
      
      // Re-render markers to apply updated styles
      // This helps ensure marker icons update with the theme
      if (viewMode === 'map') {
        // Update map container and force full redraw
        setTimeout(() => {
          window.google.maps.event.trigger(googleMapRef.current, 'resize');
        }, 50);
      }
    }
  }, [isDark, viewMode]);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      if (!window.google || !mapRef.current) return;

      // Only initialize the map once
      if (mapInitialized) return;
      setMapInitialized(true);

      // Get user location if available
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            });
          });
          
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }
      } catch (error) {
        console.log('Could not get user location:', error.message);
      }

      // Create custom map style for dark mode
      const darkMapStyle = [
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

      // Create map
      const mapOptions = {
        center: userLocation || { lat: 40.7589, lng: -73.9851 }, // Use user location or default to NYC
        zoom: 13,
        styles: isDark ? darkMapStyle : [],
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false,
        gestureHandling: 'greedy'
      };

      // Initialize map
      googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
      
      // Add user location marker if available
      if (userLocation) {
        const userMarker = new window.google.maps.Marker({
          position: userLocation,
          map: googleMapRef.current,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#8B5CF6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8
          },
          title: 'Your Location',
          zIndex: 1000
        });
        
        // Add pulsing effect
        const pulseMarker = new window.google.maps.Marker({
          position: userLocation,
          map: googleMapRef.current,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#8B5CF6',
            fillOpacity: 0.4,
            strokeColor: '#8B5CF6',
            strokeWeight: 1,
            scale: 16
          },
          zIndex: 999
        });
        
        // Animate pulsing effect
        let scale = 16;
        const animateMarker = () => {
          scale = scale === 16 ? 24 : 16;
          pulseMarker.setIcon({
            ...pulseMarker.getIcon(),
            scale: scale
          });
          setTimeout(animateMarker, 1000);
        };
        
        animateMarker();
      }

      // Clean up markers array
      markersRef.current = [];
      
      // Set loading to false after map is loaded
      setIsLoading(false);
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
        console.error('Google Maps API key is missing. Please add VITE_GOOGLE_MAPS_API_KEY to your .env.local file');
        setIsLoading(false);
        return;
      }
      
      // Preload the map styles to avoid flashing
      if (mapRef.current) {
        mapRef.current.style.backgroundColor = isDark ? '#0f172a' : '#ffffff';
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [isDark, userLocation]);

  // Update markers when filtered items change
  useEffect(() => {
    if (!googleMapRef.current || !window.google) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      if (marker && marker.setMap) {
        marker.setMap(null);
      }
    });
    
    // Reset markers array
    markersRef.current = [];
    
    // No need to add markers if we're in list view
    if (viewMode !== 'map') return;
    
    // Add user location marker if available
    if (userLocation) {
      // Create a user location marker with a distinctive style
      const userMarkerIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#8B5CF6', // Purple color
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 8
      };
      
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map: googleMapRef.current,
        icon: userMarkerIcon,
        title: 'Your Location',
        zIndex: 1000
      });
      
      // Add pulsing effect around user location
      const pulseMarker = new window.google.maps.Marker({
        position: userLocation,
        map: googleMapRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#8B5CF6',
          fillOpacity: 0.4,
          strokeColor: '#8B5CF6',
          strokeWeight: 1,
          scale: 16
        },
        zIndex: 999
      });
      
      // Animate pulsing effect
      let scale = 16;
      const animateMarker = () => {
        scale = scale === 16 ? 24 : 16;
        pulseMarker.setIcon({
          ...pulseMarker.getIcon(),
          scale: scale
        });
        setTimeout(animateMarker, 1000);
      };
      
      animateMarker();
      
      // Store user marker reference
      const userMarkerRef = { current: userMarker };
      markersRef.current.push(userMarkerRef);
    }
    
    // Add new markers for each item
    filteredItems.forEach((item) => {
      // Create a marker reference to store the Google Maps marker instance
      const markerRef = { current: null };
      
      // Create a Google Maps marker with custom icon for each item
      const svgMarker = {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          item.status === 'Lost' 
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                <circle cx="24" cy="20" r="18" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
                <circle cx="24" cy="20" r="8" fill="none" stroke="#ffffff" stroke-width="2" />
                <line x1="29" y1="25" x2="36" y2="32" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
                <path d="M24 38 L20 46 L28 46 Z" fill="#ef4444" stroke="#ffffff" stroke-width="1" />
              </svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                <circle cx="24" cy="20" r="18" fill="#10b981" stroke="#ffffff" stroke-width="2" />
                <line x1="24" y1="12" x2="24" y2="28" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
                <line x1="16" y1="20" x2="32" y2="20" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
                <path d="M24 38 L20 46 L28 46 Z" fill="#10b981" stroke="#ffffff" stroke-width="1" />
              </svg>`
        )}`,
        size: new window.google.maps.Size(48, 48),
        anchor: new window.google.maps.Point(24, 46),
        scaledSize: new window.google.maps.Size(48, 48),
      };
      
      // Create marker instance
      const marker = new window.google.maps.Marker({
        position: item.location,
        map: googleMapRef.current,
        title: item.title,
        icon: svgMarker,
        animation: window.google.maps.Animation.DROP,
        optimized: false, // Important for custom SVG markers
        zIndex: 1
      });
      
      // Add click listener
      marker.addListener('click', () => {
        handleItemClick(item);
      });
      
      // Add hover effects
      marker.addListener('mouseover', () => {
        marker.setZIndex(999);
        
        // Scale up the marker slightly
        const icon = marker.getIcon();
        icon.scaledSize = new window.google.maps.Size(56, 56);
        icon.anchor = new window.google.maps.Point(28, 54);
        marker.setIcon(icon);
      });
      
      marker.addListener('mouseout', () => {
        marker.setZIndex(1);
        
        // Scale back to normal
        const icon = marker.getIcon();
        icon.scaledSize = new window.google.maps.Size(48, 48);
        icon.anchor = new window.google.maps.Point(24, 46);
        marker.setIcon(icon);
      });
      
      // Store marker reference for clustering
      markerRef.current = marker;
      markersRef.current.push(markerRef);
    });
    
  }, [filteredItems, viewMode, googleMapRef.current]);

  // Filter items based on current filters
  useEffect(() => {
    let filtered = mockItems;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(item =>
        filters.categories.includes(item.category)
      );
    }

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(item =>
        item.status.toLowerCase() === filters.status
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, filters]);

  // Handle item selection
  const handleItemClick = (item) => {
    setSelectedItem(item);
    // If in list view, switch to map view first
    if (viewMode === 'list') {
      toggleViewMode('map');
      // Give time for the map to initialize before panning
      setTimeout(() => {
        if (googleMapRef.current && item.location) {
          // Use animation options for smooth transitions
          googleMapRef.current.panTo(item.location);
          googleMapRef.current.setZoom(15);
          // Apply smooth animation options with custom easing
          googleMapRef.current.setOptions({
            zoomControl: false,
            scrollwheel: false,
            draggable: false,
            disableDoubleClickZoom: true,
            animation: window.google.maps.Animation.SMOOTH,
            animationDuration: 800,
            animationEasing: "easeOutCubic"
          });
          
          // Force immediate map rerender to ensure animation starts right away
          window.google.maps.event.trigger(googleMapRef.current, 'resize');
          
          // Re-enable map controls after animation completes
          setTimeout(() => {
            googleMapRef.current.setOptions({
              zoomControl: false,
              scrollwheel: true,
              draggable: true,
              disableDoubleClickZoom: false
            });
          }, 1000);
        }
      }, 300);
    } else if (googleMapRef.current && item.location) {
      // Apply smooth animation with custom easing
      googleMapRef.current.setOptions({
        zoomControl: false,
        scrollwheel: false,
        draggable: false,
        disableDoubleClickZoom: true,
        animation: window.google.maps.Animation.SMOOTH,
        animationDuration: 800,
        animationEasing: "easeOutCubic"
      });
      
      // Force immediate map rerender to ensure animation starts right away
      window.google.maps.event.trigger(googleMapRef.current, 'resize');
      
      // Smooth pan and zoom
      googleMapRef.current.panTo(item.location);
      googleMapRef.current.setZoom(15);
      
      // Re-enable map controls after animation completes
      setTimeout(() => {
        googleMapRef.current.setOptions({
          zoomControl: false,
          scrollwheel: true,
          draggable: true,
          disableDoubleClickZoom: false
        });
      }, 1000);
    }
  };

  // Handle my location button click
  const handleMyLocation = () => {
    if (userLocation && googleMapRef.current) {
      googleMapRef.current.panTo(userLocation);
      googleMapRef.current.setZoom(15);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        if (googleMapRef.current) {
          googleMapRef.current.panTo(location);
          googleMapRef.current.setZoom(15);
        }
      });
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search result click
  const handleSearchResultClick = (itemId) => {
    const item = mockItems.find(item => item.id === itemId);
    if (item) {
      handleItemClick(item);
      setSearchResults([]);
      setSearchQuery(item.title);
    }
  };

  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Toggle view mode between map and list
  const toggleViewMode = (mode) => {
    // If switching from map to list, store current map position and zoom
    if (viewMode === 'map' && mode === 'list' && googleMapRef.current) {
      mapPositionRef.current = {
        center: googleMapRef.current.getCenter().toJSON(),
        zoom: googleMapRef.current.getZoom()
      };
    }
    
    // Set the view mode
    setViewMode(mode);
    
    // If switching to map view, completely reinitialize the map
    if (mode === 'map' && window.google) {
      // Small timeout to ensure the DOM is updated
      setTimeout(() => {
        // Completely reinitialize the map
        const mapOptions = {
          center: mapPositionRef.current.center || userLocation || { lat: 40.7589, lng: -73.9851 },
          zoom: mapPositionRef.current.zoom || 13,
          styles: isDark ? [
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
          ] : [],
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          gestureHandling: 'greedy'
        };

        // Clear existing markers before reinitializing
        if (markersRef.current) {
          markersRef.current.forEach(marker => {
            if (marker && marker.current && marker.current.setMap) {
              marker.current.setMap(null);
            }
          });
        }
        markersRef.current = [];

        // Completely recreate the map
        googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
        
        // Add user location marker if available
        if (userLocation) {
          const userMarker = new window.google.maps.Marker({
            position: userLocation,
            map: googleMapRef.current,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#8B5CF6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
              scale: 8
            },
            title: 'Your Location',
            zIndex: 1000
          });
          
          // Add pulsing effect
          const pulseMarker = new window.google.maps.Marker({
            position: userLocation,
            map: googleMapRef.current,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#8B5CF6',
              fillOpacity: 0.4,
              strokeColor: '#8B5CF6',
              strokeWeight: 1,
              scale: 16
            },
            zIndex: 999
          });
          
          // Animate pulsing effect
          let scale = 16;
          const animateMarker = () => {
            scale = scale === 16 ? 24 : 16;
            pulseMarker.setIcon({
              ...pulseMarker.getIcon(),
              scale: scale
            });
            setTimeout(animateMarker, 1000);
          };
          
          animateMarker();
          
          // Store user marker reference
          markersRef.current.push({ current: userMarker });
        }
        
        // Add item markers
        filteredItems.forEach((item) => {
          // Create a marker reference to store the Google Maps marker instance
          const markerRef = { current: null };
          
          // Create a Google Maps marker with custom icon for each item
          const svgMarker = {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
              item.status === 'Lost' 
                ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                    <circle cx="24" cy="20" r="18" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
                    <circle cx="24" cy="20" r="8" fill="none" stroke="#ffffff" stroke-width="2" />
                    <line x1="29" y1="25" x2="36" y2="32" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
                    <path d="M24 38 L20 46 L28 46 Z" fill="#ef4444" stroke="#ffffff" stroke-width="1" />
                  </svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                    <circle cx="24" cy="20" r="18" fill="#10b981" stroke="#ffffff" stroke-width="2" />
                    <line x1="24" y1="12" x2="24" y2="28" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
                    <line x1="16" y1="20" x2="32" y2="20" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
                    <path d="M24 38 L20 46 L28 46 Z" fill="#10b981" stroke="#ffffff" stroke-width="1" />
                  </svg>`
            )}`,
            size: new window.google.maps.Size(48, 48),
            anchor: new window.google.maps.Point(24, 46),
            scaledSize: new window.google.maps.Size(48, 48),
          };
          
          // Create marker instance
          const marker = new window.google.maps.Marker({
            position: item.location,
            map: googleMapRef.current,
            title: item.title,
            icon: svgMarker,
            animation: window.google.maps.Animation.DROP,
            optimized: false, // Important for custom SVG markers
            zIndex: 1
          });
          
          // Add click listener
          marker.addListener('click', () => {
            handleItemClick(item);
          });
          
          // Add hover effects
          marker.addListener('mouseover', () => {
            marker.setZIndex(999);
            
            // Scale up the marker slightly
            const icon = marker.getIcon();
            icon.scaledSize = new window.google.maps.Size(56, 56);
            icon.anchor = new window.google.maps.Point(28, 54);
            marker.setIcon(icon);
          });
          
          marker.addListener('mouseout', () => {
            marker.setZIndex(1);
            
            // Scale back to normal
            const icon = marker.getIcon();
            icon.scaledSize = new window.google.maps.Size(48, 48);
            icon.anchor = new window.google.maps.Point(24, 46);
            marker.setIcon(icon);
          });
          
          // Store marker reference for clustering
          markerRef.current = marker;
          markersRef.current.push(markerRef);
        });
      }, 100); // Small delay to ensure DOM is updated
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} flex flex-col`}>
      {/* Navigation */}
      <Navbar />

      {/* Header Controls */}
      <div className={`sticky top-16 z-40 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left Side - Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative group">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors group-focus-within:text-purple-400`} />
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className={`pl-12 w-full h-12 ${isDark ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 hover:bg-gray-800/70' : 'bg-gray-100/50 border-gray-300 text-gray-900 placeholder-gray-500 hover:bg-gray-100/70'} border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 rounded-xl`}
                />
                
                {/* Search results dropdown */}
                <AnimatePresence>
                  {searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute top-full left-0 right-0 mt-2 ${isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-md border rounded-xl shadow-2xl z-50 overflow-hidden`}
                    >
                      {searchResults.map((result) => (
                        <motion.button
                          key={result.id}
                          onClick={() => handleSearchResultClick(result.id)}
                          className={`w-full px-4 py-3 text-left ${isDark ? 'hover:bg-purple-900/30' : 'hover:bg-purple-100/70'} transition-colors flex items-center justify-between`}
                          whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                        >
                          <div className="flex items-center">
                            <Search className="h-4 w-4 mr-2 text-purple-400" />
                            <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{result.text}</span>
                          </div>
                          <span className={`text-xs ${isDark ? 'text-gray-400 bg-gray-700/50' : 'text-gray-500 bg-gray-200/70'} px-2 py-1 rounded-md`}>
                            {result.category}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Active filters tags */}
              {(filters.categories.length > 0 || filters.status !== 'all' || filters.dateRange !== 'all') && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs text-gray-400"
                  >
                    Active filters:
                  </motion.span>
                  
                  <AnimatePresence>
                    {filters.status !== 'all' && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="px-2 py-1 rounded-md text-xs bg-purple-900/30 text-purple-400 border border-purple-700/50 flex items-center"
                      >
                        {filters.status === 'lost' ? 'Lost Items' : 'Found Items'}
                        <button
                          onClick={() => setFilters({...filters, status: 'all'})}
                          className="ml-1 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.span>
                    )}
                    
                    {filters.categories.map(category => (
                      <motion.span
                        key={category}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="px-2 py-1 rounded-md text-xs bg-purple-900/30 text-purple-400 border border-purple-700/50 flex items-center"
                      >
                        {category}
                        <button
                          onClick={() => setFilters({
                            ...filters, 
                            categories: filters.categories.filter(c => c !== category)
                          })}
                          className="ml-1 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Right Side - Controls */}
            <div className="flex items-center space-x-3">
              {/* Results counter */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-sm ${isDark ? 'text-gray-400 bg-gray-800/30 border-gray-700' : 'text-gray-500 bg-gray-200/50 border-gray-300'} px-3 py-2 rounded-lg border`}
              >
                {filteredItems.length} items found
              </motion.span>
              
              {/* Filters Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFilters}
                className={`relative h-12 px-6 ${isDark ? 'bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800/70' : 'bg-gray-100/50 border-gray-300 text-gray-900 hover:bg-gray-100/70'} border hover:border-purple-500/50 transition-all duration-300 rounded-xl flex items-center space-x-2 hover:shadow-lg hover:shadow-purple-500/20`}
              >
                <Filter className="h-5 w-5 text-purple-400" />
                <span>Filters</span>
                {(filters.categories.length > 0 || filters.status !== 'all') && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full"
                    layoutId="filter-badge"
                  />
                )}
              </motion.button>

              {/* My Location Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMyLocation}
                className={`h-12 px-6 ${isDark ? 'bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800/70' : 'bg-gray-100/50 border-gray-300 text-gray-900 hover:bg-gray-100/70'} border hover:border-purple-500/50 transition-all duration-300 rounded-xl flex items-center space-x-2 hover:shadow-lg hover:shadow-purple-500/20`}
              >
                <Target className="h-5 w-5 text-purple-400" />
                <span>My Location</span>
              </motion.button>

              {/* View Toggle */}
              <div className={`flex items-center ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100/50 border-gray-300'} rounded-xl p-1 border`}>
                <motion.button
                  whileHover={{ scale: viewMode === 'map' ? 1 : 1.05 }}
                  whileTap={{ scale: viewMode === 'map' ? 1 : 0.95 }}
                  onClick={() => toggleViewMode('map')}
                  className="relative h-10 px-4 rounded-lg flex items-center space-x-2 transition-all duration-300"
                >
                  {viewMode === 'map' && (
                    <motion.div
                      layoutId="viewMode"
                      className="absolute inset-0 bg-purple-600 rounded-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Grid className={`h-4 w-4 ${viewMode === 'map' ? 'text-white' : 'text-gray-400'} relative z-10`} />
                  <span className={`${viewMode === 'map' ? 'text-white' : 'text-gray-400'} relative z-10`}>Map</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: viewMode === 'list' ? 1 : 1.05 }}
                  whileTap={{ scale: viewMode === 'list' ? 1 : 0.95 }}
                  onClick={() => toggleViewMode('list')}
                  className="relative h-10 px-4 rounded-lg flex items-center space-x-2 transition-all duration-300"
                >
                  {viewMode === 'list' && (
                    <motion.div
                      layoutId="viewMode"
                      className="absolute inset-0 bg-purple-600 rounded-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-white' : 'text-gray-400'} relative z-10`} />
                  <span className={`${viewMode === 'list' ? 'text-white' : 'text-gray-400'} relative z-10`}>List</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Filter Panel */}
        <FilterPanel
          isOpen={showFilters}
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />

        {/* Map/List Content */}
        <div className="flex-1 relative">
          {viewMode === 'map' ? (
            <>
              {/* Map Container */}
              <div className="relative h-[calc(100vh-10rem)]">
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-10"
                  >
                    <div className="text-center">
                      <LoadingSpinner size="lg" />
                      <p className="mt-4 text-gray-400">Loading map...</p>
                    </div>
                  </motion.div>
                )}
                
                {(!import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY === 'your_google_maps_api_key_here') && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-10"
                  >
                    <div className="text-center max-w-md p-8 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-purple-500 mb-6"
                      >
                        <MapPin className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      </motion.div>
                      <motion.h3 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent"
                      >
                        Map here
                      </motion.h3>
                      <motion.p 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-gray-400 mb-6 text-lg"
                      >
                        Add your Google Maps API key to display the interactive map
                      </motion.p>
                      <motion.button
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open('https://console.cloud.google.com/', '_blank')}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300"
                      >
                        Get API Key
                      </motion.button>
                    </div>
                  </motion.div>
                )}
                
                <div ref={mapRef} className="w-full h-full" />

                {/* Map Controls */}
                <MapControls
                  map={googleMapRef.current}
                />

                {/* Marker Clusterer */}
                {googleMapRef.current && markersRef.current.length > 0 && (
                  <MarkerClusterer 
                    key={`clusterer-${markersRef.current.length}`}
                    map={googleMapRef.current}
                    markers={markersRef.current.map(ref => ref.current).filter(Boolean)}
                  />
                )}

                {/* Quick Actions */}
                <QuickActions />

                {/* Item Popup */}
                {selectedItem && (
                  <ItemPopup
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                  />
                )}
              </div>
            </>
          ) : (
            /* List View */
            <div className={`p-6 h-[calc(100vh-10rem)] overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-purple-100/30'}`}>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence>
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        type: "spring", 
                        damping: 25, 
                        stiffness: 300,
                        delay: index * 0.05
                      }}
                      whileHover={{ 
                        y: -5, 
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(139, 92, 246, 0.2)",
                        borderColor: "rgba(139, 92, 246, 0.5)"
                      }}
                      className={`group ${isDark ? 'bg-gray-800/80' : 'bg-white/90'} backdrop-blur-sm rounded-2xl p-6 shadow-lg border ${isDark ? 'border-gray-700/50' : 'border-gray-200/70'} cursor-pointer overflow-hidden h-80 flex flex-col`}
                      onClick={() => handleItemClick(item)}
                    >
                      {/* Image container with consistent height */}
                      <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
                        {item.image ? (
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                          />
                        ) : (
                          <div className={`w-full h-full ${isDark ? 'bg-gray-800' : 'bg-purple-100/50'} flex items-center justify-center`}>
                            <Search className={`h-12 w-12 ${isDark ? 'text-gray-700' : 'text-purple-300'}`} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                      </div>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-purple-400 transition-colors duration-300`}>
                          {item.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                            item.status === 'Lost'
                              ? `${isDark ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-500/10 text-red-500 border border-red-500/20'} group-hover:shadow-lg group-hover:shadow-red-500/25`
                              : `${isDark ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-500/10 text-green-600 border border-green-500/20'} group-hover:shadow-lg group-hover:shadow-green-500/25`
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      {/* Card content with flex grow to push footer to bottom */}
                      <div className="flex-grow">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4 line-clamp-2`}>
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Card footer */}
                      <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-auto`}>
                        <span className={`${isDark ? 'bg-gray-700/50 border-gray-600/50' : 'bg-gray-200/70 border-gray-300/50'} px-3 py-1 rounded-lg border`}>
                          {item.category}
                        </span>
                        <span className="flex items-center text-purple-400">
                          <MapPin className="h-3 w-3 mr-1" />
                          {item.distance}
                        </span>
                      </div>
                      
                      {/* Hover effect overlay with View Details button */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-purple-900/50 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="flex justify-center">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent double triggering
                              toggleViewMode('map');
                              handleItemClick(item);
                            }}
                            className="text-white font-semibold text-sm px-4 py-2 transition-all duration-200 hover:text-purple-300"
                          >
                            View Details
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredItems.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.2 }}
                  className={`text-center py-20 ${isDark ? '' : 'bg-white/40 rounded-2xl shadow-sm border border-purple-100/50'}`}
                >
                  <div className={`${isDark ? 'text-gray-600' : 'text-purple-300'} mb-6`}>
                    <Search className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  </div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>
                    No items found
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFilters({
                      categories: [],
                      status: 'all',
                      dateRange: 'all',
                      radius: 5
                    })}
                    className={`mt-6 bg-purple-600 text-white px-6 py-2 rounded-xl ${isDark ? 'hover:bg-purple-700' : 'hover:bg-purple-500'} transition-colors ${!isDark && 'shadow-md shadow-purple-200/50'}`}
                  >
                    Clear Filters
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Map;
