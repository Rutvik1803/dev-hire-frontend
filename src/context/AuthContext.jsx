import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && authService.isAuthenticated()) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login user with API
   * @param {string} email
   * @param {string} password
   * @param {string} role - DEVELOPER, RECRUITER, or ADMIN
   * @returns {Promise<object>} User data
   * @throws {Error} If login fails
   */
  const login = async (email, password, role) => {
    try {
      const data = await authService.login({
        email,
        password,
        role: role.toUpperCase(),
      });

      // Store user data
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role.toLowerCase(),
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Register new user with API
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} role - developer or recruiter
   * @returns {Promise<object>} User data
   * @throws {Error} If registration fails
   */
  const register = async (name, email, password, role) => {
    try {
      const data = await authService.signUp({
        name,
        email,
        password,
        role: role.toUpperCase(),
      });

      // Store user data
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role.toLowerCase(),
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
