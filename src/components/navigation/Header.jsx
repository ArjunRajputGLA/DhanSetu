import { useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import UserSection from './UserSection';
import { useNotifications } from '../../hooks/useNotifications';

const Header = ({ activeSection, isSidebarOpen }) => {
  const { dispatch } = useNotifications();

  useEffect(() => {
    // Example of adding a notification
    const addSampleNotification = () => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          message: 'Welcome to the dashboard!',
          timestamp: new Date().toLocaleTimeString(),
          read: false,
          priority: 'high'
        }
      });
    };

    addSampleNotification();
  }, [dispatch]);

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-slate-200">
      <div className="flex items-center justify-between px-6 py-3">
        <h1 className="text-2xl font-bold text-slate-800">{activeSection}</h1>
        <SearchBar />
        <UserSection isSidebarOpen={isSidebarOpen} />
      </div>
    </header>
  );
};

Header.propTypes = {
  activeSection: PropTypes.string.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Header;