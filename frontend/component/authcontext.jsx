import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    console.log(['AuthContext Got Token:', savedToken]);
    if (savedToken) {
      setIsLoggedIn(true);
      setToken(savedToken);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken(null);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
