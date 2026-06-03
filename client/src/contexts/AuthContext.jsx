import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        if (localStorage.getItem('onepulse_token')) {
          const { data } = await api.get('/auth/profile');
          setUser(data.user);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  async function login(payload) {
    const { data } = await api.post('/auth/login', payload);
    localStorage.setItem('onepulse_token', data.token);
    setUser(data.user);
  }

  async function register(payload) {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('onepulse_token', data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('onepulse_token');
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, register, logout, setUser }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
