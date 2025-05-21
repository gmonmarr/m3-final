// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken, verifyToken } from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      verifyTokenWithServer(storedToken);
    }
  }, []);

  const verifyTokenWithServer = async (storedToken) => {
    setAuthToken(storedToken);
    const isValid = await verifyToken();
    if (isValid) {
      setToken(storedToken);
    } else {
      sessionStorage.removeItem('token');
      setAuthToken(null);
      setToken(null);
    }
  };

  const login = (newToken) => {
    setToken(newToken);
    setAuthToken(newToken);
    sessionStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setAuthToken(null);
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
