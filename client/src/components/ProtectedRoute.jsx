import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8 text-center text-xl font-bold">Loading OnePulse...</div>;
  return user ? children : <Navigate to="/login" replace />;
}
