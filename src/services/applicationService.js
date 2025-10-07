import { get, patch } from '../utils/api';

/**
 * Get dashboard statistics for recruiter
 * @returns {Promise<object>} Dashboard stats
 */
export const getDashboardStats = async () => {
  const response = await get('/api/recruiter/dashboard/stats');
  return response.data;
};

/**
 * Get recent applications (last 7 days)
 * @param {number} limit - Number of results (default: 10, max: 20)
 * @returns {Promise<array>} Recent applications
 */
export const getRecentApplications = async (limit = 10) => {
  const response = await get(
    `/api/recruiter/applications/recent?limit=${limit}`
  );
  return response.data;
};

/**
 * Get all applications for a specific job
 * @param {number} jobId - Job ID
 * @param {object} options - Query options
 * @param {string} options.status - Filter by status (APPLIED, IN_REVIEW, ACCEPTED, REJECTED)
 * @param {string} options.sort - Sort by date (asc, desc)
 * @returns {Promise<object>} Applications data with count
 */
export const getJobApplications = async (jobId, options = {}) => {
  const params = new URLSearchParams();
  if (options.status) params.append('status', options.status);
  if (options.sort) params.append('sort', options.sort);

  const queryString = params.toString();
  const url = `/api/jobs/${jobId}/applications${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await get(url);
  return response.data;
};

/**
 * Get all applications across all recruiter's jobs
 * @param {object} options - Query options
 * @param {string} options.status - Filter by status
 * @param {number} options.limit - Results per page (default: 50)
 * @param {number} options.offset - Pagination offset (default: 0)
 * @param {boolean} options.recent - Only last 30 days
 * @returns {Promise<object>} Applications data with pagination
 */
export const getAllApplications = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.status) params.append('status', options.status);
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);
  if (options.recent) params.append('recent', 'true');

  const queryString = params.toString();
  const url = `/api/recruiter/applications${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await get(url);
  return response.data;
};

/**
 * Get single application details
 * @param {number} applicationId - Application ID
 * @returns {Promise<object>} Application details
 */
export const getApplicationById = async (applicationId) => {
  const response = await get(`/api/applications/${applicationId}`);
  return response.data;
};

/**
 * Update application status
 * @param {number} applicationId - Application ID
 * @param {string} status - New status (APPLIED, IN_REVIEW, ACCEPTED, REJECTED)
 * @param {string} note - Optional note about the status change
 * @returns {Promise<object>} Updated application
 */
export const updateApplicationStatus = async (
  applicationId,
  status,
  note = ''
) => {
  const response = await patch(`/api/applications/${applicationId}/status`, {
    status,
    note,
  });
  return response.data;
};

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

export default {
  getDashboardStats,
  getRecentApplications,
  getJobApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  APPLICATION_STATUS,
  getStatusDisplay,
  getStatusColor,
};
