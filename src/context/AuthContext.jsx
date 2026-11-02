import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient, { mockUsers } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load persisted session on initial mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('wakewatch_user');
      const storedToken = localStorage.getItem('wakewatch_token');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      } else {
        // In mock mode, pre-seed with Admin for instant preview convenience
        if (apiClient.isMockMode()) {
          const defaultAdmin = mockUsers[0];
          setUser(defaultAdmin);
          localStorage.setItem('wakewatch_user', JSON.stringify(defaultAdmin));
          localStorage.setItem('wakewatch_token', 'mock_jwt_preseed_admin');
        }
      }
    } catch (err) {
      console.error('Failed to restore auth session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiClient.login(email, password);
      setUser(response.user);
      localStorage.setItem('wakewatch_user', JSON.stringify(response.user));
      localStorage.setItem('wakewatch_token', response.token);
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (e) {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      localStorage.removeItem('wakewatch_user');
      localStorage.removeItem('wakewatch_token');
    }
  };

  // Quick switch between Admin and Instructor for demonstration
  const switchRole = (targetRole) => {
    const matched = mockUsers.find((u) => u.role.toLowerCase() === targetRole.toLowerCase());
    if (matched) {
      setUser(matched);
      localStorage.setItem('wakewatch_user', JSON.stringify(matched));
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    switchRole,
    isAdmin: user?.role === 'Admin',
    isInstructor: user?.role === 'Instructor',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
