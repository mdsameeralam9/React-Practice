import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  // timeout: 5000,
  // withCredentials: true
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response; // Must return response
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

// Request interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    console.log("Request:", request);
    return request; // Must return request
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);



export const axiosPrivate = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});