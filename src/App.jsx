import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/common/ErrorBoundary';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import DesignSystem from './pages/DesignSystem';
import NotFound from './pages/NotFound';

// Protected Console Pages
import Dashboard from './pages/Dashboard';
import LiveMonitor from './pages/LiveMonitor';
import Alerts from './pages/Alerts';
import People from './pages/People';
import PersonProfile from './pages/PersonProfile';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Style Guide / Design System Route (open for team inspection) */}
        <Route path="/design" element={<DesignSystem />} />

        {/* Protected App Console Layout (Sidebar + TopBar + BottomNav) */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monitor" element={<LiveMonitor />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:id" element={<PersonProfile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </ErrorBoundary>
);
}
