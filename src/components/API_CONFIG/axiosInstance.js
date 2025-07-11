import axios from 'axios';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL: 'https://your-api.com',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/auth/refresh-token', { refreshToken });

        const newToken = response.data.accessToken;
        localStorage.setItem('accessToken', newToken);

        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
        processQueue(null, newToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Optional: logout user or redirect to login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


import axiosInstance from './axiosInstance';

const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/protected-route');
    console.log(response.data);
  } catch (error) {
    console.error('API Error:', error);
  }
};
