import axios from 'axios';

// Set the base URL for API requests
const API_URL = 'http://localhost:5000';

// Function to log in the user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Returns the token or success message
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to register a new user
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data; // Returns the success message
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to fetch the user's profile
export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { 'x-auth-token': token }, // Pass token in headers
    });
    return response.data; // Returns user profile data
  } catch (error) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to update the user's profile
export const updateProfile = async (token, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, updateData, {
      headers: { 'x-auth-token': token }, // Pass token in headers
    });
    return response.data; // Returns success message or updated data
  } catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to access the dashboard
export const getDashboard = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`, {
      headers: { 'x-auth-token': token }, // Pass token in headers
    });
    return response.data; // Returns dashboard data
  } catch (error) {
    console.error('Error accessing dashboard:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
