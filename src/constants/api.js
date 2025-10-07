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

// Job Endpoints
export const JOB_ENDPOINTS = {
  CREATE: '/api/jobs',
  GET_ALL: '/api/jobs',
  GET_BY_ID: (id) => `/api/jobs/${id}`,
  GET_MY_JOBS: '/api/jobs/my/jobs',
  UPDATE: (id) => `/api/jobs/${id}`,
  DELETE: (id) => `/api/jobs/${id}`,
};

// User Roles
export const USER_ROLES = {
  DEVELOPER: 'DEVELOPER',
  RECRUITER: 'RECRUITER',
  ADMIN: 'ADMIN',
};

// Job Types
export const JOB_TYPES = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  CONTRACT: 'CONTRACT',
  INTERNSHIP: 'INTERNSHIP',
};

// Job Type Display Names
export const JOB_TYPE_LABELS = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
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
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  JOB_NOT_FOUND: 'Job not found.',
  INVALID_JOB_ID: 'Invalid job ID.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Redirecting...',
  SIGNUP_SUCCESS: 'Account created successfully! Redirecting...',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  JOB_CREATED: 'Job posted successfully!',
  JOB_UPDATED: 'Job updated successfully!',
  JOB_DELETED: 'Job deleted successfully!',
  APPLICATION_SUBMITTED: 'Application submitted successfully!',
};

export default {
  API_BASE_URL,
  AUTH_ENDPOINTS,
  JOB_ENDPOINTS,
  USER_ROLES,
  JOB_TYPES,
  JOB_TYPE_LABELS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
