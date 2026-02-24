import axios from 'axios';

const sanctum = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export const csrfCookie = () => sanctum.get('/sanctum/csrf-cookie');

export const login = (credentials) => sanctum.post('/auth/login', credentials);

export const register = (user) => sanctum.post('/auth/register', user);

export const logout = () => sanctum.post('/auth/logout');

export const getUser = () => sanctum.get('/auth/me');
