'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/user')
      .then((response) => setUser(response.data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(values) {
    const response = await api.post('/login', values);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    router.push('/dashboard');
  }

  async function register(values) {
    const response = await api.post('/register', values);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    router.push('/dashboard');
  }

  async function logout() {
    await api.post('/logout').catch(() => null);
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
