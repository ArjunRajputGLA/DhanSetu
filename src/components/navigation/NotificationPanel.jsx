import React from 'react';
import PropTypes from 'prop-types';
import { Bell, Check, Trash2, Filter, Clock, Zap, ShieldAlert, X } from 'lucide-react';

const generateCustomNotifications = () => [
  {
    id: 1,
    title: "Security Alert",
    message: "Unusual login attempt detected from new device",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    priority: "high",
    icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
    action: "Review Activity"
  },
  {
    id: 2,
    title: "Task Completed",
    message: "Monthly report generation finished successfully",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    priority: "medium",
    icon: <Check className="w-5 h-5 text-green-500" />,
    action: "View Report"
  },
  {
    id: 3,
    title: "New Features",
    message: "Check out the latest platform updates and improvements",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
    priority: "low",
    icon: <Zap className="w-5 h-5 text-blue-500" />,
    action: "Learn More"
  }
];

// Utility function to format timestamps
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const NotificationBell = ({ unreadCount, onClick, isOpen }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
    >
      <div className={`p-2 rounded-lg transition-all duration-200 ${
        isOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-700'
      }`}>
        <Bell className={`w-5 h-5 transition-transform duration-200 ${
          isOpen || isHovered ? 'rotate-12 scale-110' : ''
        }`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full animate-pulse px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>
      {isHovered && unreadCount > 0 && !isOpen && (
        <div className="absolute -bottom-12 right-0 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
          {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </div>
      )}
    </button>
  );
};

const NotificationPanel = ({ onClose }) => {
  const [notifications, setNotifications] = React.useState(() => {
    const customNotifications = generateCustomNotifications();
    return customNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  });
  const [filter, setFilter] = React.useState('all');
  const [isFiltersVisible, setIsFiltersVisible] = React.useState(false);
  const panelRef = React.useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = React.useMemo(() => {
    return notifications.filter(notification => {
      if (filter === 'unread') return !notification.read;
      if (filter === 'read') return notification.read;
      return true;
    });
  }, [notifications, filter]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]); // Just clear the notifications without closing the panel
  };

  const handleDeleteNotification = (id, event) => {
    event.stopPropagation();
    setNotifications(prev => 
      prev.filter(n => n.id !== id)
    );
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500 hover:bg-red-50';
      case 'medium': return 'border-l-4 border-yellow-500 hover:bg-yellow-50';
      default: return 'border-l-4 border-blue-500 hover:bg-blue-50';
    }
  };

  const renderFilterButton = (filterType) => (
    <button
      key={filterType}
      onClick={() => setFilter(filterType)}
      className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
        filter === filterType
          ? 'bg-blue-100 text-blue-800 font-medium'
          : 'bg-white text-slate-600 hover:bg-slate-100'
      }`}
      aria-label={`Filter by ${filterType}`}
    >
      {filterType}
      {filterType !== 'all' && (
        <span className="ml-1 text-xs">
          ({notifications.filter(n => 
            filterType === 'unread' ? !n.read : n.read
          ).length})
        </span>
      )}
    </button>
  );

  return (
    <div 
      ref={panelRef}
      className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 max-h-[80vh] flex flex-col overflow-hidden transform transition-all duration-200 ease-out"
      role="dialog"
      aria-label="Notifications panel"
    >
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            className={`p-1.5 rounded-lg transition-colors ${
              isFiltersVisible ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-600'
            }`}
            title="Filter notifications"
            aria-expanded={isFiltersVisible}
          >
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isFiltersVisible && (
        <div className="p-2 border-b border-slate-200 bg-slate-50 flex gap-2">
          {['all', 'unread', 'read'].map(renderFilterButton)}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <p className="text-slate-600 font-medium">No notifications</p>
            <p className="text-slate-500 text-sm mt-1">
              {filter !== 'all' 
                ? `No ${filter} notifications to display`
                : 'We will notify you when something arrives'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`${getPriorityStyle(notification.priority)} group transition-all duration-200 ${
                  !notification.read ? 'bg-blue-50/50' : 'bg-white'
                }`}
              >
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="mt-1">{notification.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-slate-800 truncate">
                          {notification.title}
                        </span>
                        <div className="flex items-center gap-2 ml-2">
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                          <button
                            onClick={(e) => handleDeleteNotification(notification.id, e)}
                            className="p-1 rounded-full hover:bg-slate-200 opacity-0 group-hover:opacity-100 transition-all"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4 text-slate-500" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          <time dateTime={notification.timestamp}>
                            {formatTimestamp(notification.timestamp)}
                          </time>
                        </div>
                        {notification.action && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            {notification.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-2 border-t border-slate-200 bg-slate-50 flex gap-2">
          <button
            onClick={handleMarkAllAsRead}
            className="flex-1 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center gap-2 transition-colors"
            disabled={!unreadCount}
          >
            <Check className="w-4 h-4" />
            Mark all as read
          </button>
          <button
            onClick={handleClearAll}
            className="flex-1 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

NotificationBell.propTypes = {
  unreadCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

NotificationPanel.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default NotificationPanel;