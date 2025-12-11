import axios from "axios";
import { API_URL } from "../utils/constants";

// Create Axios Instance
const api = axios.create({
  baseURL: API_URL, // example: http://localhost:8000
});

// Add Authorization Header Automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export instance
export default api;
