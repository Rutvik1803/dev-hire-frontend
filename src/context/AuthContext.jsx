import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Mock authentication state
  // Change this to test different roles: 'developer', 'recruiter', 'admin', or null
  const [user, setUser] = useState(null);

  const login = (email, password, role) => {
    // Mock login - in real app, this would call an API
    setUser({
      id: 1,
      name:
        role === 'admin'
          ? 'Admin User'
          : role === 'recruiter'
          ? 'Recruiter User'
          : 'Developer User',
      email: email,
      role: role,
    });
  };

  const register = (name, email, password, role) => {
    // Mock registration
    setUser({
      id: Date.now(),
      name: name,
      email: email,
      role: role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
