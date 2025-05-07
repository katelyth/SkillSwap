import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure the backend URL is correct
  headers: {
    'Content-Type': 'application/json', // Ensure the request is sent as JSON
  },
});

// Define and export the login function
export const login = async (credentials) => {
  try {
    const response = await API.post('/login', credentials);
    return response; // Return the response if the login is successful
  } catch (error) {
    // Handle errors appropriately (e.g., logging or re-throwing)
    if (error.response) {
      // The request was made, but the server responded with an error
      throw error.response; // Throw the error so the calling component can handle it
    } else if (error.request) {
      // The request was made, but no response was received
      throw new Error('No response from the server');
    } else {
      // Something else caused the error
      throw new Error('Error occurred while making the request');
    }
  }
};

// Define and export other API functions
export const register = async (userData) => {
  return API.post('/register', userData);
};

export default API;
