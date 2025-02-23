export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          {
            ...action.payload,
            read: false,
            id: Date.now(),
            timestamp: new Date().toISOString()
          },
          ...state.notifications
        ],
        unreadCount: state.unreadCount + 1
      };

    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload
            ? { ...notif, read: true }
            : notif
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      };

    case 'MARK_ALL_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif => ({ ...notif, read: true })),
        unreadCount: 0
      };

    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notif => notif.id !== action.payload),
        unreadCount: state.notifications.find(n => n.id === action.payload && !n.read)
          ? state.unreadCount - 1
          : state.unreadCount
      };

    case 'CLEAR_ALL':
      return {
        notifications: [],
        unreadCount: 0
      };

    default:
      return state;
  }
};