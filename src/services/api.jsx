import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create API instance
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor to include the token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle invalid token
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 498) {
            localStorage.removeItem("token"); // Remove the invalid token
            localStorage.removeItem("userEmail");
            window.location.href = "/login";  // Redirect by reloading the page
        }
        return Promise.reject(error);
    }
);


// Auth API requests
export const loginUser = (email, password) => API.post("/auth/login", { email, password });

export const registerUser = (userData) => API.post("/auth/register", userData);



// URL shortening API requests
export const shortenUrl = (originalUrl) => API.post("/url/shorten", { originalUrl });

export const getOriginalUrl = (shortCode) => API.get(`/url/${shortCode}`);

export const getAllUrls = () => API.get("/url");

export const deleteUrl = (shortCode) => API.delete(`/url/${shortCode}`);

export const updateUrlStatus = async (shortCode, status) => {
    API.put(`/url/${shortCode}/status`, { status });
};




// Fetch user details based on email
export const getUserDetails = (email) => API.get(`/auth/user/details`, { params: { email } });


export default API;