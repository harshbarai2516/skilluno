import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Protected Route component that checks authentication
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const username = sessionStorage.getItem("username");
      const balance = sessionStorage.getItem("balance");
      
      setIsAuthenticated(username && balance);
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  // Show loading or nothing while checking
  if (isChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Checking authentication...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
