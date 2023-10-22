// ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('jwtToken');
    if (!isAuthenticated) {
        localStorage.setItem('authMessage', 'You must login first.');
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
