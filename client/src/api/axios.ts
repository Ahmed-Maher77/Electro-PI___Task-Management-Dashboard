import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Bearer token from localStorage for cross-domain auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Extract error message standardized from API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً';
    return Promise.reject(new Error(message));
  }
);

export default api;
