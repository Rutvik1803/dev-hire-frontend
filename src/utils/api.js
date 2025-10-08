const API_BASE_URL = 'http://localhost:4000';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Makes an HTTP request to the API
 * @param {string} endpoint - The API endpoint (e.g., '/api/auth/login')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - The response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Check if body is FormData (for file uploads)
  const isFormData = options.body instanceof FormData;

  const config = {
    ...options,
    headers: {
      // Don't set Content-Type for FormData - let browser set it with boundary
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    credentials: 'include', // Important: Include cookies for refreshToken
  };

  // Add access token if available
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle error responses
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    // Check if request was aborted
    if (error.name === 'AbortError') {
      const abortError = new Error('Request cancelled');
      abortError.name = 'AbortError';
      throw abortError;
    }

    if (error instanceof ApiError) {
      throw error;
    }

    // Network error or other issues
    throw new ApiError('Network error. Please check your connection.', 0, null);
  }
};

/**
 * GET request helper
 */
export const get = (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'GET',
  });
};

/**
 * POST request helper
 */
export const post = (endpoint, data, options = {}) => {
  // Don't stringify FormData
  const body = data instanceof FormData ? data : JSON.stringify(data);

  return apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body,
  });
};

/**
 * PUT request helper
 */
export const put = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request helper
 */
export const del = (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'DELETE',
  });
};

/**
 * PATCH request helper
 */
export const patch = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export default {
  get,
  post,
  put,
  delete: del,
  apiRequest,
};
