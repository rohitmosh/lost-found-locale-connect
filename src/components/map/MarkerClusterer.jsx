import { useEffect, useRef } from 'react';

// MarkerClusterer component for grouping nearby markers
const MarkerClusterer = ({ map, markers }) => {
  const clustererRef = useRef(null);

  useEffect(() => {
    if (!map || !window.google || !markers || markers.length === 0) return;

    // Create a function to load MarkerClusterer script
    const loadMarkerClusterer = async () => {
      try {
        // Load MarkerClusterer Plus from CDN if not already loaded
        if (!window.markerClusterer) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        // Initialize clusterer with custom renderer
        if (window.markerClusterer) {
          // Custom renderer for clusters
          const renderer = {
            render: ({ count, position }) => {
              // Create custom cluster marker
              const marker = new window.google.maps.Marker({
                position,
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: '#8B5CF6',
                  fillOpacity: 0.9,
                  strokeWeight: 2,
                  strokeColor: '#ffffff',
                  scale: Math.max(count / 5, 1) * 15,
                },
                label: {
                  text: String(count),
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                },
                zIndex: 999,
                // Optimization for animation performance
                optimized: false
              });

              // Add animation and hover effects
              marker.addListener('mouseover', () => {
                const icon = marker.getIcon();
                icon.scale = Math.max(count / 5, 1) * 17;
                icon.fillOpacity = 1;
                marker.setIcon(icon);
              });

              marker.addListener('mouseout', () => {
                const icon = marker.getIcon();
                icon.scale = Math.max(count / 5, 1) * 15;
                icon.fillOpacity = 0.9;
                marker.setIcon(icon);
              });

              return marker;
            }
          };

          // Initialize MarkerClusterer with custom options
          if (clustererRef.current) {
            clustererRef.current.clearMarkers();
            clustererRef.current.setMap(null);
          }

          // Create new MarkerClusterer instance
          clustererRef.current = new window.markerClusterer.MarkerClusterer({
            map,
            markers: markers.filter(marker => marker),
            renderer,
            gridSize: 50,
            minimumClusterSize: 3,
            maxZoom: 15
          });
        }
      } catch (error) {
        console.error('Failed to load MarkerClusterer:', error);
      }
    };

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