import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotificationsProvider from '../../context/NotificationsProvider.jsx';
import Signup from '../../Signup';
import Login from '../../Login';
import Home from '../../Home';
import DashboardLayout from './DashboardLayout';
import ResetPassword from '../../ResetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Wrap protected routes with NotificationsProvider
  return <NotificationsProvider>{children}</NotificationsProvider>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

// Public Route wrapper component (only for non-authenticated users)
const PublicRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  
  if (user) {
    // Redirect to dashboard if user is already authenticated
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status when app loads
  useEffect(() => {
    // Add any additional auth checking logic here if needed
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (accessible to all) */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />

        {/* Authentication routes (only for non-authenticated users) */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Protected routes (only for authenticated users) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        {/* Catch all other routes and redirect to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;