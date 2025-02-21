// src/utils/axiosInstance.ts
import axios from "axios";

let BASEURL=process.env.NEXT_PUBLIC_API_URL

let isRefreshing = false; // To prevent multiple refresh attempts
let failedRequestsQueue: any[] = []; // Store failed requests during refresh

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASEURL, // Replace with your API base URL
  timeout: 5000,
});

// Request interceptor: Add the Authorization token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors and refresh token logic
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return response if everything is fine
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 Unauthorized (authentication error)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is in progress, queue the failed request
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Attempt to refresh the token using the refresh token
      try {
        const refreshToken = localStorage.getItem("refreshToken"); // Assuming refresh token is stored in localStorage

        // Request the new token
        const response = await axios.post(`${BASEURL}/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken; // Adjust based on your API response

        // Save the new access token
        localStorage.setItem("authToken", newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Process all queued requests after refreshing the token
        failedRequestsQueue.forEach((request: any) => request.resolve(newAccessToken));
        failedRequestsQueue = [];

        return axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        // If refreshing fails, clear both tokens and redirect to login page
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; // Redirect to login page
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // If error is not a 401 or refresh fails, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
