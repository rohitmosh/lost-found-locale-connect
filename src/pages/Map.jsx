
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Plus, Filter, List, Grid, Bell } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import FilterPanel from '../components/map/FilterPanel';
import MapControls from '../components/map/MapControls';
import ItemPopup from '../components/map/ItemPopup';
import QuickActions from '../components/map/QuickActions';
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
  }
];

const Map = () => {
  const { isDark } = useTheme();
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [filters, setFilters] = useState({
    categories: [],
    status: 'all',
    dateRange: 'all',
    radius: 5
  });
  
  const [filteredItems, setFilteredItems] = useState(mockItems);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const mapOptions = {
        center: { lat: 40.7589, lng: -73.9851 }, // NYC coordinates
        zoom: 13,
        styles: isDark ? [
          { elementType: 'geometry', stylers: [{ color: '#1f2937' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#1f2937' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#9ca3af' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d1d5db' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca3af' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#374151' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b7280' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#4b5563' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#374151' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca3af' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#6b7280' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#0f172a' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b7280' }]
          }
        ] : [],
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      };

      googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

      // Add markers for each item
      filteredItems.forEach(item => {
        const marker = new window.google.maps.Marker({
          position: item.location,
          map: googleMapRef.current,
          title: item.title,
          icon: {
            path: item.status === 'Lost' ? 
              'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' :
              'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
            fillColor: item.status === 'Lost' ? '#ef4444' : '#22c55e',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 1.2,
            anchor: new window.google.maps.Point(12, 24)
          },
          animation: window.google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
          setSelectedItem(item);
        });
      });

      setIsLoading(false);
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [isDark, filteredItems]);

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

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 animate-fade-in">
              <h1 className="text-xl font-bold gradient-text">
                Community Map
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                {filteredItems.length} items found
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-purple-500" />
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-inner">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className={`h-8 px-3 transition-all duration-200 ${
                    viewMode === 'map' 
                      ? 'bg-purple-600 text-white shadow-lg hover:shadow-purple-500/25 hover:bg-purple-700' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`h-8 px-3 transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-purple-600 text-white shadow-lg hover:shadow-purple-500/25 hover:bg-purple-700' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="relative bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 hover:glow-purple"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(filters.categories.length > 0 || filters.status !== 'all') && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full animate-pulse-glow"></span>
                )}
              </Button>

              {/* Notifications */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 hover:glow-purple"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Filter Panel */}
        <FilterPanel
          isOpen={showFilters}
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />

        {/* Main Content */}
        <div className="flex-1 relative">
          {viewMode === 'map' ? (
            <>
              {/* Map Container */}
              <div className="relative h-[calc(100vh-4rem)]">
                {isLoading && (
                  <div className="absolute inset-0 glass flex items-center justify-center z-10 animate-fade-in">
                    <div className="text-center">
                      <LoadingSpinner size="lg" />
                      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading map...</p>
                    </div>
                  </div>
                )}
                <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden shadow-2xl" />

                {/* Map Controls */}
                <MapControls
                  map={googleMapRef.current}
                  onMyLocation={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        const userLocation = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        };
                        googleMapRef.current?.setCenter(userLocation);
                        googleMapRef.current?.setZoom(15);
                      });
                    }
                  }}
                />

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
            <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto animate-fade-in">
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transform hover:scale-105 hover:glow-purple animate-fade-in"
                    onClick={() => setSelectedItem(item)}
                    style={{ animationDelay: `${filteredItems.indexOf(item) * 100}ms` }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                          item.status === 'Lost'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 group-hover:shadow-red-500/25'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 group-hover:shadow-green-500/25'
                        } group-hover:shadow-lg`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                        {item.category}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.distance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {filteredItems.length === 0 && (
                <div className="text-center py-12 animate-fade-in">
                  <div className="text-gray-400 dark:text-gray-600 mb-4">
                    <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No items found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notification Sidebar */}
        <NotificationSidebar
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </div>
    </div>
  );
};

export default Map;
