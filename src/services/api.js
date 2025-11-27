const BASE_URL = 'https://quickdb-backend.onrender.com/api';

const request = async (method, endpoint, body = null) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Mimic axios error structure
      const error = new Error(data.message || 'An error occurred');
      error.response = {
        data,
        status: response.status,
        statusText: response.statusText,
      };
      throw error;
    }

    // Mimic axios response structure
    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    // Re-throw if it's already formatted, otherwise format it
    if (error.response) {
      throw error;
    }
    // Network errors or JSON parsing errors
    const netError = new Error(error.message);
    netError.response = {
      data: { message: error.message },
      status: 0,
    };
    throw netError;
  }
};

const api = {
  get: (endpoint) => request('GET', endpoint),
  post: (endpoint, data) => request('POST', endpoint, data),
  put: (endpoint, data) => request('PUT', endpoint, data),
  delete: (endpoint) => request('DELETE', endpoint),
};

export default api;
