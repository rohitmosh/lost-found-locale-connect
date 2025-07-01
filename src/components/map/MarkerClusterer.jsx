import { useEffect, useRef } from 'react';

// Preload MarkerClusterer script at component level for immediate availability
const preloadMarkerClusterer = () => {
  if (!window.MarkerClusterer && !window._markerClustererLoading) {
    window._markerClustererLoading = true;
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js';
    script.async = true;
    script.onload = () => {
      console.log('MarkerClusterer script preloaded successfully');
      window._markerClustererLoaded = true;
      window._markerClustererLoading = false;
    };
    script.onerror = (error) => {
      console.error('Error preloading MarkerClusterer script:', error);
      window._markerClustererLoading = false;
    };
    document.head.appendChild(script);
  }
};

// Preload the script immediately
preloadMarkerClusterer();

// MarkerClusterer component for grouping nearby markers
const MarkerClusterer = ({ map, markers }) => {
  const clustererRef = useRef(null);

  useEffect(() => {
    if (!map || !window.google || !markers || markers.length === 0) return;

    // Function to initialize marker clusterer
    const initializeClusterer = () => {
      console.log('Creating clusters with markers:', markers.length);
      
      // Clear existing clusterer immediately if it exists
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
        clustererRef.current.setMap(null);
        clustererRef.current = null;
      }
      
      // Filter out any null or undefined markers
      const validMarkers = markers.filter(marker => marker);
      console.log('Valid markers for clustering:', validMarkers.length);
      
      // Create beautiful cluster styles with glow effect
      const clusterStyles = [
        {
          textColor: 'white',
          textSize: 16,
          fontWeight: 'bold',
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
              <!-- Outer glow -->
              <circle cx="40" cy="40" r="38" fill="rgba(139, 92, 246, 0.2)" />
              <!-- Inner glow -->
              <circle cx="40" cy="40" r="32" fill="rgba(139, 92, 246, 0.4)" />
              <!-- Main circle -->
              <circle cx="40" cy="40" r="26" fill="#8B5CF6" stroke="#ffffff" stroke-width="2" />
            </svg>
          `)}`,
          height: 80,
          width: 80,
          anchorText: [40, 40],
          anchorIcon: [40, 40],
          textOffset: [0, 0]
        },
        // Different sizes for different cluster sizes
        {
          textColor: 'white',
          textSize: 16,
          fontWeight: 'bold',
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90" height="90">
              <!-- Outer glow -->
              <circle cx="45" cy="45" r="43" fill="rgba(139, 92, 246, 0.2)" />
              <!-- Inner glow -->
              <circle cx="45" cy="45" r="37" fill="rgba(139, 92, 246, 0.4)" />
              <!-- Main circle -->
              <circle cx="45" cy="45" r="31" fill="#8B5CF6" stroke="#ffffff" stroke-width="2" />
            </svg>
          `)}`,
          height: 90,
          width: 90,
          anchorText: [45, 45],
          anchorIcon: [45, 45],
          textOffset: [0, 0]
        },
        {
          textColor: 'white',
          textSize: 18,
          fontWeight: 'bold',
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
              <!-- Outer glow -->
              <circle cx="50" cy="50" r="48" fill="rgba(139, 92, 246, 0.2)" />
              <!-- Inner glow -->
              <circle cx="50" cy="50" r="42" fill="rgba(139, 92, 246, 0.4)" />
              <!-- Main circle -->
              <circle cx="50" cy="50" r="36" fill="#8B5CF6" stroke="#ffffff" stroke-width="2" />
            </svg>
          `)}`,
          height: 100,
          width: 100,
          anchorText: [50, 50],
          anchorIcon: [50, 50],
          textOffset: [0, 0]
        }
      ];
      
      if (typeof window.MarkerClusterer === 'function') {
        // Create the MarkerClusterer with optimized settings for faster clustering
        clustererRef.current = new window.MarkerClusterer(map, validMarkers, {
          gridSize: 40, // Even smaller grid size for more responsive clustering
          minimumClusterSize: 2,
          maxZoom: 15,
          styles: clusterStyles,
          zoomOnClick: true,
          averageCenter: true,
          batchSize: 200, // Increase batch size for faster rendering
          batchSizeIE: 200,
          title: '', // Empty title to improve performance
          ignoreHidden: true, // Improve performance by ignoring hidden markers
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
          imageExtension: 'png',
          calculator: function(markers, numStyles) {
            // Custom calculator to determine which style to use based on number of markers
            const count = markers.length;
            let index = 0;
            if (count < 10) {
              index = 0;
            } else if (count < 20) {
              index = 1;
            } else {
              index = 2;
            }
            return {
              text: count.toString(),
              index: index
            };
          }
        });
        
        // Force immediate clustering refresh
        if (clustererRef.current) {
          // This additional step forces a re-render of clusters
          window.google.maps.event.trigger(map, 'idle');
        }
        
        console.log('MarkerClusterer initialized successfully');
      } else if (window.markerClusterer && window.markerClusterer.MarkerClusterer) {
        // Fallback to @googlemaps/markerclusterer if available
        console.log('Using @googlemaps/markerclusterer instead');
        
        // Custom renderer for clusters
        const renderer = {
          render: ({ count, position }) => {
            // Determine size based on count
            let size, glowSize, innerGlowSize, mainSize;
            
            if (count < 10) {
              size = 80;
              glowSize = 38;
              innerGlowSize = 32;
              mainSize = 26;
            } else if (count < 20) {
              size = 90;
              glowSize = 43;
              innerGlowSize = 37;
              mainSize = 31;
            } else {
              size = 100;
              glowSize = 48;
              innerGlowSize = 42;
              mainSize = 36;
            }
            
            // Create custom cluster marker with glow effect
            const marker = new window.google.maps.Marker({
              position,
              icon: {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
                    <!-- Outer glow -->
                    <circle cx="${size/2}" cy="${size/2}" r="${glowSize}" fill="rgba(139, 92, 246, 0.2)" />
                    <!-- Inner glow -->
                    <circle cx="${size/2}" cy="${size/2}" r="${innerGlowSize}" fill="rgba(139, 92, 246, 0.4)" />
                    <!-- Main circle -->
                    <circle cx="${size/2}" cy="${size/2}" r="${mainSize}" fill="#8B5CF6" stroke="#ffffff" stroke-width="2" />
                  </svg>
                `)}`,
                size: new window.google.maps.Size(size, size),
                anchor: new window.google.maps.Point(size/2, size/2),
                scaledSize: new window.google.maps.Size(size, size),
              },
              label: {
                text: count.toString(),
                color: 'white',
                fontSize: count < 10 ? '16px' : count < 20 ? '16px' : '18px',
                fontWeight: 'bold',
                className: 'cluster-marker-label',
              },
              zIndex: 999,
              optimized: true
            });

            if (!document.getElementById('cluster-label-style')) {
              const style = document.createElement('style');
              style.id = 'cluster-label-style';
              style.innerHTML = `
                .cluster-marker-label {
                  text-align: center;
                  width: 100% !important;
                  left: 0 !important;
                  top: 50% !important;
                  transform: translateY(-50%) !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  display: flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                }
              `;
              document.head.appendChild(style);
            }

            return marker;
          }
        };

        // Initialize MarkerClusterer with custom options
        clustererRef.current = new window.markerClusterer.MarkerClusterer({
          map,
          markers: validMarkers,
          renderer,
          gridSize: 40, // Smaller grid size for more responsive clustering
          minimumClusterSize: 2,
          maxZoom: 15,
          algorithm: {
            maxZoom: 15,
            radius: 60, // Optimize for better clustering
            viewportPadding: 0 // Remove padding for more immediate clustering
          }
        });
        
        // Force immediate clustering refresh
        window.google.maps.event.trigger(map, 'idle');
        
        console.log('MarkerClusterer (fallback) initialized successfully');
      } else {
        console.error('MarkerClusterer library not loaded properly');
      }
    };

    // Create a function to load MarkerClusterer script
    const loadMarkerClusterer = async () => {
      try {
        // If already loaded, initialize immediately
        if (window.MarkerClusterer || window._markerClustererLoaded) {
          initializeClusterer();
          return;
        }
        
        // Otherwise, load MarkerClusterer Plus from CDN if not already loading
        if (!window._markerClustererLoading) {
          window._markerClustererLoading = true;
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js';
            script.async = true;
            script.onload = () => {
              console.log('MarkerClusterer script loaded successfully');
              window._markerClustererLoaded = true;
              window._markerClustererLoading = false;
              resolve();
            };
            script.onerror = (error) => {
              console.error('Error loading MarkerClusterer script:', error);
              window._markerClustererLoading = false;
              reject(error);
            };
            document.head.appendChild(script);
          });
        } else {
          // If already loading, wait for it to complete
          await new Promise(resolve => {
            const checkLoaded = () => {
              if (window._markerClustererLoaded) {
                resolve();
              } else {
                setTimeout(checkLoaded, 50);
              }
            };
            checkLoaded();
          });
        }
        
        // Initialize after loading
        initializeClusterer();
        
      } catch (error) {
        console.error('Failed to load or initialize MarkerClusterer:', error);
      }
    };

    // Execute marker clustering immediately
    loadMarkerClusterer();

    // Cleanup function
    return () => {
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
        clustererRef.current.setMap(null);
      }
    };
  }, [map, markers]);

  // This is a utility component with no UI
  return null;
};

export default MarkerClusterer; 