import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle standardized response or extract error message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً';
    return Promise.reject(new Error(message));
  }
);

export default api;
