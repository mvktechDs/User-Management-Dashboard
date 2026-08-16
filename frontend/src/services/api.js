import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const customError = {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      details: null,
      status: error.response ? error.response.status : 500
    };

    if (error.response && error.response.data) {
      const responseData = error.response.data;
      customError.message = responseData.message || customError.message;
      if (responseData.error) {
        customError.code = responseData.error.code || customError.code;
        customError.details = responseData.error.details || null;
      }
    } else if (error.request) {
      customError.message = 'No response from the server. Please check your network connection.';
      customError.code = 'NETWORK_ERROR';
    }

    return Promise.reject(customError);
  }
);

export default api;
