import { post } from '../utils/api';

/**
 * Generate AI cover letter
 * @param {object} userDetails - User information
 * @param {object} jobDescription - Job details
 * @param {AbortSignal} signal - Optional abort signal for cancellation
 * @returns {Promise<object>} - Generated cover letter data
 */
export const generateCoverLetter = async (
  userDetails,
  jobDescription,
  signal
) => {
  const response = await post(
    '/api/ai/generate-cover-letter',
    {
      userDetails,
      jobDescription,
    },
    { signal }
  );
  return response.data;
};

export default {
  generateCoverLetter,
};
