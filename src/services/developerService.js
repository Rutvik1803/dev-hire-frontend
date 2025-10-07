import { get, post, patch, del } from '../utils/api';

/**
 * ===========================
 * DEVELOPER DASHBOARD APIs
 * ===========================
 */

/**
 * Get dashboard statistics for developer
 * @returns {Promise<object>} Dashboard stats
 */
export const getDeveloperDashboardStats = async () => {
  const response = await get('/api/developer/dashboard/stats');
  return response.data;
};

/**
 * Get developer's profile
 * @returns {Promise<object>} Developer profile data
 */
export const getDeveloperProfile = async () => {
  const response = await get('/api/developer/profile');
  return response.data;
};

/**
 * Update developer profile
 * @param {object} profileData - Profile data to update
 * @param {number} profileData.experience - Years of experience
 * @param {array} profileData.skills - Array of skills
 * @param {string} profileData.linkedinUrl - LinkedIn profile URL
 * @param {string} profileData.githubUrl - GitHub profile URL
 * @param {string} profileData.phone - Phone number
 * @returns {Promise<object>} Updated profile
 */
export const updateDeveloperProfile = async (profileData) => {
  const response = await patch('/api/developer/profile', profileData);
  return response.data;
};

/**
 * ===========================
 * APPLICATION APIs
 * ===========================
 */

/**
 * Get all applications submitted by developer
 * @param {object} options - Query options
 * @param {string} options.status - Filter by status (APPLIED, IN_REVIEW, ACCEPTED, REJECTED)
 * @param {number} options.limit - Results per page (default: 50)
 * @param {number} options.offset - Pagination offset (default: 0)
 * @param {string} options.sort - Sort order (asc, desc) - default: desc
 * @returns {Promise<object>} Applications data with pagination
 */
export const getDeveloperApplications = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.status) params.append('status', options.status);
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);
  if (options.sort) params.append('sort', options.sort);

  const queryString = params.toString();
  const url = `/api/developer/applications${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await get(url);
  return response.data;
};

/**
 * Get recent applications (last 30 days)
 * @param {number} limit - Number of results (default: 10, max: 20)
 * @returns {Promise<array>} Recent applications
 */
export const getRecentApplications = async (limit = 10) => {
  const response = await get(
    `/api/developer/applications/recent?limit=${limit}`
  );
  return response.data;
};

/**
 * Apply to a job
 * @param {number} jobId - Job ID
 * @param {string} coverLetter - Cover letter content
 * @returns {Promise<object>} Application data
 */
export const applyToJob = async (jobId, coverLetter) => {
  const response = await post(`/api/jobs/${jobId}/apply`, {
    coverLetter,
  });
  return response.data;
};

/**
 * Check if developer has applied to a specific job
 * @param {number} jobId - Job ID
 * @returns {Promise<object>} Application status { hasApplied, application }
 */
export const checkApplicationStatus = async (jobId) => {
  const response = await get(`/api/jobs/${jobId}/application-status`);
  return response.data;
};

/**
 * Withdraw an application
 * @param {number} applicationId - Application ID
 * @returns {Promise<object>} Success message
 */
export const withdrawApplication = async (applicationId) => {
  const response = await del(`/api/applications/${applicationId}`);
  return response.data;
};

/**
 * ===========================
 * RESUME APIs
 * ===========================
 */

/**
 * Upload resume file
 * @param {File} file - Resume file (PDF/DOC/DOCX, max 5MB)
 * @returns {Promise<object>} Resume data with URL
 */
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  // Don't set Content-Type header - let browser handle it with boundary
  const response = await post('/api/developer/resume/upload', formData);
  return response.data;
};

/**
 * Get resume details
 * @returns {Promise<object>} Resume data or null if no resume
 */
export const getResumeDetails = async () => {
  const response = await get('/api/developer/resume');
  return response.data;
};

/**
 * Delete resume
 * @returns {Promise<object>} Success message
 */
export const deleteResume = async () => {
  const response = await del('/api/developer/resume');
  return response.data;
};

/**
 * ===========================
 * UTILITY FUNCTIONS
 * ===========================
 */

/**
 * Application status constants
 */
export const APPLICATION_STATUS = {
  APPLIED: 'APPLIED',
  IN_REVIEW: 'IN_REVIEW',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

/**
 * Convert backend status to frontend display format
 */
export const getStatusDisplay = (status) => {
  const statusMap = {
    APPLIED: 'Applied',
    IN_REVIEW: 'In Review',
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected',
  };
  return statusMap[status] || status;
};

/**
 * Get status badge color class
 */
export const getStatusColor = (status) => {
  const colorMap = {
    APPLIED: 'bg-blue-100 text-blue-700',
    IN_REVIEW: 'bg-yellow-100 text-yellow-700',
    ACCEPTED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
};

/**
 * Validate resume file
 * @param {File} file - File to validate
 * @returns {object} { valid: boolean, error: string }
 */
export const validateResumeFile = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!file) {
    return { valid: false, error: 'Please select a file' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only PDF and DOC/DOCX files are allowed' };
  }

  return { valid: true, error: null };
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export default {
  // Dashboard
  getDeveloperDashboardStats,
  getDeveloperProfile,
  updateDeveloperProfile,

  // Applications
  getDeveloperApplications,
  getRecentApplications,
  applyToJob,
  checkApplicationStatus,
  withdrawApplication,

  // Resume
  uploadResume,
  getResumeDetails,
  deleteResume,

  // Utilities
  APPLICATION_STATUS,
  getStatusDisplay,
  getStatusColor,
  validateResumeFile,
  formatFileSize,
};
