import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationPanel from './NotificationPanel';

const UserSection = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const { state } = useNotifications();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="relative">
        <button
          className={`relative p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors ${
            showNotifications ? 'bg-slate-100' : ''
          }`}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="w-5 h-5" />
          {state.unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {state.unreadCount}
            </span>
          )}
        </button>
        {showNotifications && (
          <NotificationPanel onClose={() => setShowNotifications(false)} />
        )}
      </div>
      
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
        {isSidebarOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

UserSection.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default UserSection;