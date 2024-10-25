import axios from 'axios';

// Create an axios instance
const instance = axios.create({
    baseURL: 'http://localhost:5000',  // Your backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Allow cookies to be sent with requests
});

// Interceptor for requests to attach token
instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token && !config.url.includes('/register') && !config.url.includes('/login')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    function (error) {
        console.error('Request error:', error); // Log request errors
        return Promise.reject(error);
    }
);

// API request methods
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteRequest = (url) => instance.delete(url); // Renamed to 'deleteRequest'

// Interceptor for responses
instance.interceptors.response.use(
    function (response) {
        console.log('Intercept response:', response);
        return response;
    }, 
    function (error) {
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error('Response error:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);
