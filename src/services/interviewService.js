import { get, post, patch, del } from '../utils/api';

/**
 * ===========================
 * INTERVIEW SCHEDULING APIs
 * ===========================
 */

/**
 * Schedule a new interview (Recruiter only)
 * @param {object} interviewData - Interview details
 * @param {number} interviewData.applicationId - Application ID
 * @param {string} interviewData.scheduledDate - ISO date string
 * @param {number} interviewData.duration - Duration in minutes (15-480)
 * @param {string} interviewData.meetingLink - Optional meeting URL
 * @param {string} interviewData.location - Optional location
 * @param {string} interviewData.interviewerNotes - Optional notes
 * @returns {Promise<object>} Interview data
 */
export const scheduleInterview = async (interviewData) => {
  const response = await post('/api/interviews/schedule', interviewData);
  // API returns { interview: {...} }
  return response.data?.interview || response.data;
};

/**
 * Get interview by ID
 * @param {number} interviewId - Interview ID
 * @returns {Promise<object>} Interview details
 */
export const getInterviewById = async (interviewId) => {
  const response = await get(`/api/interviews/${interviewId}`);
  // API returns { interview: {...} }
  return response.data?.interview || response.data;
};

/**
 * Get interview by application ID
 * @param {number} applicationId - Application ID
 * @returns {Promise<object>} Interview details or null
 */
export const getInterviewByApplicationId = async (applicationId) => {
  try {
    const response = await get(`/api/interviews/application/${applicationId}`);
    // API returns { interview: {...} }
    return response.data?.interview || response.data;
  } catch (error) {
    // Return null if no interview found (404)
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Update/reschedule interview (Recruiter only)
 * @param {number} interviewId - Interview ID
 * @param {object} updates - Fields to update
 * @returns {Promise<object>} Updated interview
 */
export const updateInterview = async (interviewId, updates) => {
  const response = await patch(`/api/interviews/${interviewId}`, updates);
  // API returns { interview: {...} }
  return response.data?.interview || response.data;
};

/**
 * Cancel interview (Recruiter only)
 * @param {number} interviewId - Interview ID
 * @returns {Promise<object>} Cancelled interview
 */
export const cancelInterview = async (interviewId) => {
  const response = await del(`/api/interviews/${interviewId}`);
  // API returns { interview: {...} }
  return response.data?.interview || response.data;
};

/**
 * Get all interviews for recruiter
 * @param {object} options - Query options
 * @param {string} options.status - Filter by status
 * @param {boolean} options.upcoming - Only upcoming interviews
 * @param {number} options.limit - Results per page
 * @param {number} options.offset - Pagination offset
 * @returns {Promise<object>} Interviews data
 */
export const getRecruiterInterviews = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.status) params.append('status', options.status);
  if (options.upcoming) params.append('upcoming', 'true');
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);

  const queryString = params.toString();
  const url = `/api/interviews/recruiter/all${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await get(url);
  return response.data;
};

/**
 * Get all interviews for developer
 * @param {object} options - Query options
 * @param {string} options.status - Filter by status
 * @param {boolean} options.upcoming - Only upcoming interviews
 * @param {number} options.limit - Results per page
 * @param {number} options.offset - Pagination offset
 * @returns {Promise<object>} Interviews data
 */
export const getDeveloperInterviews = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.status) params.append('status', options.status);
  if (options.upcoming) params.append('upcoming', 'true');
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);

  const queryString = params.toString();
  const url = `/api/interviews/developer/all${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await get(url);
  return response.data;
};

/**
 * Interview status constants
 */
export const INTERVIEW_STATUS = {
  SCHEDULED: 'SCHEDULED',
  RESCHEDULED: 'RESCHEDULED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

/**
 * Get status display text
 */
export const getInterviewStatusDisplay = (status) => {
  const statusMap = {
    SCHEDULED: 'Scheduled',
    RESCHEDULED: 'Rescheduled',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
  };
  return statusMap[status] || status;
};

/**
 * Get status color classes
 */
export const getInterviewStatusColor = (status) => {
  const colorMap = {
    SCHEDULED: 'bg-blue-100 text-blue-700',
    RESCHEDULED: 'bg-yellow-100 text-yellow-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
};

/**
 * Format interview date for display
 */
export const formatInterviewDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format interview time for display
 */
export const formatInterviewTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default {
  scheduleInterview,
  getInterviewById,
  getInterviewByApplicationId,
  updateInterview,
  cancelInterview,
  getRecruiterInterviews,
  getDeveloperInterviews,
  INTERVIEW_STATUS,
  getInterviewStatusDisplay,
  getInterviewStatusColor,
  formatInterviewDate,
  formatInterviewTime,
};
