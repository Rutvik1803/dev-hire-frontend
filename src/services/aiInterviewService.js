import { post } from '../utils/api';

/**
 * Generate AI interview questions based on tech stack
 * @param {string[]} techStack - Array of required skills/technologies
 * @param {AbortSignal} signal - Optional abort signal for cancellation
 * @returns {Promise<object>} - Interview questions data
 */
export const generateInterviewQuestions = async (techStack, signal) => {
  const response = await post(
    '/api/ai/generate-questions',
    {
      techStack,
    },
    { signal }
  );
  return response.data;
};

/**
 * Evaluate user's answer (client-side evaluation)
 * @param {string} userAnswer - User's selected answer
 * @param {string} correctAnswer - Correct answer
 * @returns {boolean} - Whether the answer is correct
 */
export const evaluateAnswer = (userAnswer, correctAnswer) => {
  return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
};

export default {
  generateInterviewQuestions,
  evaluateAnswer,
};
