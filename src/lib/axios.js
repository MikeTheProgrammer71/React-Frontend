import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else if (config.url !== "/api/users/authenticate" && config.url !== "/api/users/create") {
      console.log('No token found in LocalStorage');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
