import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('mojilo_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
      return null;
    }
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('mojilo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mojilo_user');
    }
  }, [user]);

  // Signup function
  const signup = (name, email, password) => {
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, you should hash this!
      createdAt: new Date().toISOString()
    };

    // Save to users list too
    const existingUsers = JSON.parse(localStorage.getItem('mojilo_users') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('mojilo_users', JSON.stringify(existingUsers));

    setUser(newUser);
    return true;
  };

  // Login function
  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('mojilo_users') || '[]');
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
