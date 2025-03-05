import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de que coincida con la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;