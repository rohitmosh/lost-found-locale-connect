
import React from 'react';
import { X, MapPin, Clock, Filter } from 'lucide-react';

const NotificationSidebar = ({ isOpen, onClose }) => {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'new_item',
      title: 'New Lost Item Nearby',
      message: 'iPhone 13 Pro reported lost within 1km of your location',
      time: '2 minutes ago',
      category: 'Electronics',
      distance: '0.8km',
      unread: true
    },
    {
      id: 2,
      type: 'match',
      title: 'Possible Match Found',
      message: 'Found item matches your lost keys description',
      time: '1 hour ago',
      category: 'Keys',
      unread: true
    },
    {
      id: 3,
      type: 'status_update',
      title: 'Item Status Updated',
      message: 'Your reported watch has been marked as found',
      time: '3 hours ago',
      category: 'Jewelry',
      unread: false
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>{notifications.filter(n => n.unread).length} unread</span>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                notification.unread 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className={`h-4 w-4 ${
                    notification.type === 'new_item' ? 'text-blue-500' :
                    notification.type === 'match' ? 'text-green-500' : 'text-orange-500'
                  }`} />
                  <h3 className="font-medium text-foreground text-sm">
                    {notification.title}
                  </h3>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {notification.message}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {notification.time}
                  </span>
                  {notification.distance && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {notification.distance}
                    </span>
                  )}
                </div>
                
                <span className="px-2 py-1 bg-muted rounded text-xs">
                  {notification.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;
