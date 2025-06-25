
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Plus, Filter, List, Grid, Bell, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
          { elementType: 'geometry', stylers: [{ color: '#1a1a2e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a2e' }] },
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
            stylers: [{ color: '#16213e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#16213e' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#0f1419' }]
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
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
        console.error('Google Maps API key is missing. Please add REACT_APP_GOOGLE_MAPS_API_KEY to your .env file');
        setIsLoading(false);
        return;
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
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

  const handleMyLocation = () => {
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
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Header Controls */}
      <div className="sticky top-16 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Search */}
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-purple-400" />
                <Input
                  type="text"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 w-80 h-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-purple-500/10 rounded-xl"
                />
              </div>
              
              <span className="text-gray-400 text-sm bg-gray-800/30 px-3 py-2 rounded-lg border border-gray-700">
                {filteredItems.length} items found
              </span>
            </div>

            {/* Right Side - Controls */}
            <div className="flex items-center space-x-3">
              {/* Filters Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="relative h-12 px-6 bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800/70 hover:border-purple-500/50 transition-all duration-300 rounded-xl group hover:shadow-lg hover:shadow-purple-500/20"
              >
                <Filter className="h-5 w-5 mr-2 group-hover:text-purple-400 transition-colors" />
                Filters
                {(filters.categories.length > 0 || filters.status !== 'all') && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full animate-pulse"></span>
                )}
              </Button>

              {/* My Location Button */}
              <Button
                variant="outline"
                onClick={handleMyLocation}
                className="h-12 px-6 bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800/70 hover:border-purple-500/50 transition-all duration-300 rounded-xl group hover:shadow-lg hover:shadow-purple-500/20"
              >
                <Target className="h-5 w-5 mr-2 group-hover:text-purple-400 transition-colors" />
                My Location
              </Button>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-800/50 rounded-xl p-1 border border-gray-700">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className={`h-10 px-4 transition-all duration-300 rounded-lg ${
                    viewMode === 'map' 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 hover:bg-purple-700' 
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Map
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`h-10 px-4 transition-all duration-300 rounded-lg ${
                    viewMode === 'list' 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 hover:bg-purple-700' 
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>

              {/* Notifications */}
              <Button
                variant="outline"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative h-12 px-4 bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800/70 hover:border-purple-500/50 transition-all duration-300 rounded-xl group hover:shadow-lg hover:shadow-purple-500/20"
              >
                <Bell className="h-5 w-5 group-hover:text-purple-400 transition-colors" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </Button>
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
                  <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-10 animate-fade-in">
                    <div className="text-center">
                      <LoadingSpinner size="lg" />
                      <p className="mt-4 text-gray-400">Loading map...</p>
                    </div>
                  </div>
                )}
                
                {(!process.env.REACT_APP_GOOGLE_MAPS_API_KEY || process.env.REACT_APP_GOOGLE_MAPS_API_KEY === 'your_google_maps_api_key_here') && (
                  <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-10 animate-fade-in">
                    <div className="text-center max-w-md p-8 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-2xl">
                      <div className="text-purple-500 mb-6">
                        <MapPin className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 gradient-text">
                        Map here
                      </h3>
                      <p className="text-gray-400 mb-6 text-lg">
                        Add your Google Maps API key to display the interactive map
                      </p>
                      <Button
                        onClick={() => window.open('https://console.developers.google.com/', '_blank')}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                      >
                        Get API Key
                      </Button>
                    </div>
                  </div>
                )}
                
                <div ref={mapRef} className="w-full h-full" />

                {/* Map Controls */}
                <MapControls
                  map={googleMapRef.current}
                  onMyLocation={handleMyLocation}
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
            <div className="p-6 h-[calc(100vh-10rem)] overflow-y-auto animate-fade-in">
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer border border-gray-700/50 hover:border-purple-500/50 transform hover:scale-105 hover:-translate-y-2 animate-fade-in"
                    onClick={() => setSelectedItem(item)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          item.status === 'Lost'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30 group-hover:shadow-lg group-hover:shadow-red-500/25'
                            : 'bg-green-500/20 text-green-400 border border-green-500/30 group-hover:shadow-lg group-hover:shadow-green-500/25'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="bg-gray-700/50 px-3 py-1 rounded-lg border border-gray-600/50">
                        {item.category}
                      </span>
                      <span className="flex items-center text-purple-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.distance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {filteredItems.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                  <div className="text-gray-600 mb-6">
                    <Search className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    No items found
                  </h3>
                  <p className="text-gray-400 text-lg">
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Map;
