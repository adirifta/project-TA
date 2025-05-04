import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tambahkan interceptor untuk menyertakan token di header
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

// Interceptor untuk handling error global
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error('Server Error:', error.response.data);
        console.error('Status Code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error('No Response Received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Request Setup Error:', error.message);
      }
      return Promise.reject(error);
    }
  );

export default apiClient;