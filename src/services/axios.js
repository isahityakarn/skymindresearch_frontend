import axios from "axios";
import { clearAuth } from "../utils/storage";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        // Return successful responses as-is
        return response;
    },
    (error) => {
        // Handle different error cases
        if (error.response) {
            const { status, data } = error.response;
            
            // Handle 403 Forbidden errors
            if (status === 403) {
                const customMessage = data?.message || "You don't have permission to access this resource.";
                error.message = customMessage;
                
                console.error('Access Denied:', customMessage);
            }
            
            // Handle 401 Unauthorized errors
            else if (status === 401) {
                const customMessage = data?.message || "Your session has expired. Please login again.";
                error.message = customMessage;
                
                // Clear auth data and redirect to login
                clearAuth();
                
                // Only redirect if not already on login page
                if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
                    console.error('Session expired. Redirecting to login...');
                    window.location.href = '/';
                }
            }
            
            // Handle 404 Not Found errors
            else if (status === 404) {
                const customMessage = data?.message || "The requested resource was not found.";
                error.message = customMessage;
            }
            
            // Handle 500 Server errors
            else if (status >= 500) {
                const customMessage = data?.message || "Server error. Please try again later.";
                error.message = customMessage;
            }
            
            // Handle other errors with backend message if available
            else if (data?.message) {
                error.message = data.message;
            }
        } else if (error.request) {
            // Request was made but no response received
            error.message = "Network error. Please check your connection.";
        } else {
            // Something else happened
            error.message = error.message || "An unexpected error occurred.";
        }
        
        return Promise.reject(error);
    }
);

export default api;