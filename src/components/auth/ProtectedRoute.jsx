import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-bitnox-bg flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bitnox-primary to-cyan-800 flex items-center justify-center font-heading font-extrabold text-bitnox-foreground shadow-glow-primary text-xl mb-4 animate-pulse">
          B
        </div>
        <div className="flex items-center gap-2 text-bitnox-primary font-mono text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Verifying Bitnox Credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
