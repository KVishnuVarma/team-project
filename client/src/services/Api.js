import axios from 'axios';

// Create an axios instance
const instance = axios.create({
    baseURL: 'http://localhost:5000',  // Your backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true
});

// API request methods
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const delet = (url) => instance.delete(url); // `delet` is okay if you're consistent

// Interceptor for requests
instance.interceptors.request.use(
    function (config) {
        return config;  // Modify config if needed before sending the request
    }, 
    function (error) {
        return Promise.reject(error);  // Reject the request if an error occurs
    }
);

// Interceptor for responses
instance.interceptors.response.use(
    function (response) {
        console.log('intercept response', response);  // Log the response for debugging
        return response;  // Return the response as is
    }, 
    function (error) {
        console.log('intercept response', error);  // Log any errors from the response
        return Promise.reject(error);  // Reject the response if an error occurs
    }
);
