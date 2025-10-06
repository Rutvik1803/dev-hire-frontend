// API Base URL
export const API_BASE_URL = 'http://localhost:4000';

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  SIGNUP: '/api/auth/signup',
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  ME: '/api/auth/me',
};

// User Roles
export const USER_ROLES = {
  DEVELOPER: 'DEVELOPER',
  RECRUITER: 'RECRUITER',
  ADMIN: 'ADMIN',
};

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Cannot connect to server. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid credentials or role mismatch.',
  USER_EXISTS: 'An account with this email already exists.',
  VALIDATION_ERROR: 'Please check your input fields.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Redirecting...',
  SIGNUP_SUCCESS: 'Account created successfully! Redirecting...',
  LOGOUT_SUCCESS: 'Logged out successfully.',
};

export default {
  API_BASE_URL,
  AUTH_ENDPOINTS,
  USER_ROLES,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
