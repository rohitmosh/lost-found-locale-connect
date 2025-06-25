
import React from 'react';
import { X, MapPin, Calendar, User, Phone, Mail, Navigation } from 'lucide-react';

const ItemPopup = ({ item, onClose, userLocation }) => {
  const calculateDistance = () => {
    if (!userLocation) return null;
    
    const R = 6371; // Earth's radius in km
    const dLat = (item.location.lat - userLocation.lat) * Math.PI / 180;
    const dLon = (item.location.lng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(item.location.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance.toFixed(1);
  };

  const distance = calculateDistance();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className="glass rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-md transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${item.status === 'lost' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
              <MapPin className={`h-5 w-5 ${item.status === 'lost' ? 'text-red-400' : 'text-green-400'}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.status === 'lost' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {item.status.toUpperCase()}
                </span>
                <span className="px-2 py-1 bg-muted/50 text-muted-foreground rounded text-xs">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        {item.image && (
          <div className="px-6 pb-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            
            {distance && (
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {distance} km away
                </span>
              </div>
            )}
          </div>

          {/* Contact Info */}
          {item.contact && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{item.contact}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:glow-purple text-sm font-medium">
              Contact Owner
            </button>
            <button className="px-4 py-2 bg-muted/50 text-muted-foreground rounded-lg hover:bg-muted transition-all duration-200 text-sm font-medium">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPopup;
