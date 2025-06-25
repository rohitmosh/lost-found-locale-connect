
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import MapControls from '../components/map/MapControls';
import FilterPanel from '../components/map/FilterPanel';
import ItemPopup from '../components/map/ItemPopup';
import QuickActions from '../components/map/QuickActions';
import NotificationSidebar from '../components/NotificationSidebar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { MapPin, MapPinPlus, Search, Filter, List, Map as MapIcon } from 'lucide-react';

const Map = () => {
  const { isDark } = useTheme();
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  
  // Filter states
  const [filters, setFilters] = useState({
    categories: [],
    status: 'all', // 'lost', 'found', 'all'
    dateRange: 'all',
    radius: 5, // km
    searchTerm: ''
  });

  // Sample data - in real app this would come from API
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Lost iPhone 13 Pro",
      description: "Black iPhone 13 Pro lost near the park entrance",
      category: "Electronics",
      status: "lost",
      date: "2024-01-15",
      location: { lat: 40.7128, lng: -74.0060 },
      contact: "john@example.com",
      image: null
    },
    {
      id: 2,
      title: "Found Gold Watch",
      description: "Beautiful gold watch found on Main Street",
      category: "Jewelry",
      status: "found",
      date: "2024-01-14",
      location: { lat: 40.7589, lng: -73.9851 },
      contact: "sarah@example.com",
      image: "/placeholder.svg"
    }
  ]);

  const filteredItems = useCallback(() => {
    return items.filter(item => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }
      
      // Status filter
      if (filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }
      
      // Search term filter
      if (filters.searchTerm && !item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) && 
          !item.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [items, filters]);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const mapOptions = {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        styles: isDark ? [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ] : [],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
      };

      googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
      
      // Add markers for items
      filteredItems().forEach(item => {
        const marker = new window.google.maps.Marker({
          position: item.location,
          map: googleMapRef.current,
          title: item.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: item.status === 'lost' ? '#ef4444' : '#22c55e',
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: '#ffffff'
          },
          animation: window.google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
          setSelectedItem(item);
        });
      });

      setIsLoading(false);
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [isDark, filteredItems]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleMyLocation = () => {
    if (userLocation && googleMapRef.current) {
      googleMapRef.current.setCenter(userLocation);
      googleMapRef.current.setZoom(15);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Map Container */}
      <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
        {/* Search Bar */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for items, locations, or keywords..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 glass rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 glass rounded-lg hover:bg-primary/10 transition-all duration-200 ${
                showFilters ? 'bg-primary/20' : ''
              }`}
            >
              <Filter className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
              className="p-3 glass rounded-lg hover:bg-primary/10 transition-all duration-200"
            >
              {viewMode === 'map' ? <List className="h-5 w-5" /> : <MapIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel 
          show={showFilters}
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilters(false)}
        />

        {/* Map */}
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ filter: isDark ? 'brightness(0.8)' : 'none' }}
        />

        {/* Map Controls */}
        <MapControls 
          onMyLocation={handleMyLocation}
          userLocation={userLocation}
        />

        {/* Quick Actions */}
        <QuickActions />

        {/* Results Counter */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="glass px-4 py-2 rounded-lg">
            <span className="text-sm text-foreground">
              {filteredItems().length} items found
            </span>
          </div>
        </div>

        {/* Notification Toggle */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="absolute top-20 right-4 z-10 p-3 glass rounded-lg hover:bg-primary/10 transition-all duration-200 hover:glow-purple"
        >
          <div className="relative">
            <MapPin className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>
        </button>
      </div>

      {/* Item Popup */}
      {selectedItem && (
        <ItemPopup 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)}
          userLocation={userLocation}
        />
      )}

      {/* Notification Sidebar */}
      <NotificationSidebar 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
};

export default Map;
