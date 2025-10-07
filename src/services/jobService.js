import { get, post, put, del } from '../utils/api';

/**
 * Create a new job posting
 * @param {object} jobData - Job posting data
 * @param {string} jobData.title - Job title
 * @param {string} jobData.companyName - Company name
 * @param {string} jobData.location - Job location
 * @param {string} jobData.jobType - Job type (FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP)
 * @param {string} jobData.salaryRange - Salary range
 * @param {string[]} jobData.requiredSkills - Array of required skills
 * @param {string} jobData.description - Job description
 * @returns {Promise<object>} - Created job data
 */
export const createJob = async (jobData) => {
  const response = await post('/api/jobs', jobData);
  return response.data;
};

/**
 * Get all jobs (public)
 * @returns {Promise<array>} - Array of all jobs
 */
export const getAllJobs = async () => {
  const response = await get('/api/jobs');
  return response.data;
};

/**
 * Get a single job by ID (public)
 * @param {number} jobId - Job ID
 * @returns {Promise<object>} - Job data
 */
export const getJobById = async (jobId) => {
  const response = await get(`/api/jobs/${jobId}`);
  return response.data;
};

/**
 * Get jobs posted by the current recruiter
 * Requires authentication and RECRUITER role
 * @returns {Promise<array>} - Array of recruiter's jobs
 */
export const getMyJobs = async () => {
  const response = await get('/api/jobs/my/jobs');
  return response.data;
};

/**
 * Update a job posting
 * @param {number} jobId - Job ID
 * @param {object} jobData - Updated job data
 * @returns {Promise<object>} - Updated job data
 */
export const updateJob = async (jobId, jobData) => {
  const response = await put(`/api/jobs/${jobId}`, jobData);
  return response.data;
};

/**
 * Delete a job posting
 * @param {number} jobId - Job ID
 * @returns {Promise<object>} - Deletion confirmation
 */
export const deleteJob = async (jobId) => {
  const response = await del(`/api/jobs/${jobId}`);
  return response.data;
};

/**
 * Job type constants
 */
export const JOB_TYPES = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  CONTRACT: 'CONTRACT',
  INTERNSHIP: 'INTERNSHIP',
};

/**
 * Convert frontend job type to backend format
 */
export const convertJobType = (type) => {
  const typeMap = {
    'Full-time': 'FULL_TIME',
    'Part-time': 'PART_TIME',
    Contract: 'CONTRACT',
    Internship: 'INTERNSHIP',
  };
  return typeMap[type] || type;
};

/**
 * Convert backend job type to frontend format
 */
export const convertJobTypeToFrontend = (type) => {
  const typeMap = {
    FULL_TIME: 'Full-time',
    PART_TIME: 'Part-time',
    CONTRACT: 'Contract',
    INTERNSHIP: 'Internship',
  };
  return typeMap[type] || type;
};

export default {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
  JOB_TYPES,
  convertJobType,
  convertJobTypeToFrontend,
};
