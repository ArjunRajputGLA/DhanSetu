import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { NotificationsContext } from './NotificationsContext'; 
import { notificationReducer } from './notificationReducer';

const NotificationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
    unreadCount: 0
  });

  return (
    <NotificationsContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
};

NotificationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationsProvider;