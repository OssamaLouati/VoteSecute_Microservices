import axios from 'axios';

// Global response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the status code is 429, display the alert
    if (error.response?.status === 429) {
      alert('Too many requests'); // Note: console.alert is not a standard method, you might want to use console.log or alert instead.
    }
    return Promise.reject(error);
  }
);

export default axios;
