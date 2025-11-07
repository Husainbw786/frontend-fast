// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
  MATCH_RESUMES: `${API_BASE_URL}/api/v1/match-resumes`,
  FIND_CANDIDATES: `${API_BASE_URL}/api/v1/find-candidates`,
  CALCULATE_ATS_SCORE: `${API_BASE_URL}/api/v1/calculate-ats-score`,
};

