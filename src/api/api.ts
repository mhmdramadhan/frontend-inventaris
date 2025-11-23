import axios from 'axios';
import { Product } from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Ambil token dari localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products');
  return data;
};

export const createProduct = async (product: Omit<Product, 'id'>) => {
  const { data } = await api.post('/products', product);
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/login', { email, password });
  return data.token;
};
