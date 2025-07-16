import { useState, useCallback } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-base-url.com', // Replace with your API base URL
  timeout: 10000, // 10 seconds timeout
});


//https://github.com/divanov11/refresh-token-fetchwrapper
//https://github.com/divanov11/refresh-token-axios-interceptors/

// refresh and accees token
//https://github.com/bablukpik/react-frontend
//https://github.com/bablukpik/rest-api\

//https://github.com/SukhjinderArora/refresh-token-auth-app/blob/main/client/src/App.js

//done
//https://github.com/gitdagray/react_jwt_auth
//https://github.com/gitdagray/react_jwt_auth/blob/main/src/hooks/useRefreshToken.js

const useFetch = (token = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (method, url, body = null, customHeaders = {}) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      };

      const response = await axiosInstance({
        method,
        url,
        data: body,
        headers,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const get = useCallback((url, headers) => request('get', url, null, headers), [request]);
  const post = useCallback((url, body, headers) => request('post', url, body, headers), [request]);
  const put = useCallback((url, body, headers) => request('put', url, body, headers), [request]);
  const patch = useCallback((url, body, headers) => request('patch', url, body, headers), [request]);
  const del = useCallback((url, headers) => request('delete', url, null, headers), [request]);

  return { data, error, loading, get, post, put, patch, del };
};

export default useFetch;
