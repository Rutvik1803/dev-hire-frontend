import { post } from '../utils/api';

/**
 * Sign up a new user
 * @param {object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.name - User name
 * @param {string} userData.password - User password
 * @param {string} userData.role - User role (DEVELOPER or RECRUITER)
 * @returns {Promise<object>} - User data and access token
 */
export const signUp = async (userData) => {
  const response = await post('/api/auth/signup', userData);

  // Store access token in localStorage
  if (response.data?.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
  }

  return response.data;
};

/**
 * Login a user
 * @param {object} credentials - User login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @param {string} credentials.role - User role (DEVELOPER, RECRUITER, or ADMIN)
 * @returns {Promise<object>} - User data and access token
 */
export const login = async (credentials) => {
  const response = await post('/api/auth/login', credentials);

  // Store access token in localStorage
  if (response.data?.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
  }

  return response.data;
};

/**
 * Logout a user
 * Clears the access token from localStorage
 */
export const logout = () => {
  localStorage.removeItem('accessToken');
  // The refreshToken cookie will be cleared by the backend on logout API call
  // You can add a logout API call here if your backend has one
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

/**
 * Get stored access token
 * @returns {string|null}
 */
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export default {
  signUp,
  login,
  logout,
  isAuthenticated,
  getAccessToken,
};
