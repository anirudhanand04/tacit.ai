// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  AI_ENDPOINT: '/api/chat', // Your AI endpoint path
  HEADERS: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  }
}; 