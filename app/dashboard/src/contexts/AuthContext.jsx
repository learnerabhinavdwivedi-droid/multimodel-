import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock user database
  const [mockUsers, setMockUsers] = useState(() => {
    const savedUsers = localStorage.getItem('mockUsers');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: '1', name: 'Demo User', email: 'demo@speechmirror.ai', password: 'password', avatar: null, plan: 'free' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }, [mockUsers]);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          setLoading(false);
          resolve(userWithoutPassword);
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };

  const register = async (name, email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers.some(u => u.email === email)) {
          setLoading(false);
          reject(new Error('Email already exists'));
          return;
        }
        const newUser = { id: Date.now().toString(), name, email, password, avatar: null, plan: 'free' };
        setMockUsers(prev => [...prev, newUser]);
        
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        setLoading(false);
        resolve(userWithoutPassword);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers.some(u => u.email === email)) {
          setLoading(false);
          resolve(true);
        } else {
          setLoading(false);
          reject(new Error('Email not found'));
        }
      }, 800);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
