import axios from 'axios';
import { getToken } from '../utils/auth';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach JWT token to every request if present
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (payload) => API.post('/auth/register', payload);
export const login = (payload) => API.post('/auth/login', payload);
export const getMe = () => API.get('/auth/me');

export const getProgress = () => API.get('/progress');
export const updateProgress = (category, percentage) =>
  API.put(`/progress/${category}`, { percentage });

export const getAptitudeQuestions = () => API.get('/aptitude/questions');
export const submitAptitude = (answers) => API.post('/aptitude/submit', { answers });
export const getAptitudeResults = () => API.get('/aptitude/results');

export const getCodingProblems = () => API.get('/coding/problems');
export const getCodingProblem = (id) => API.get(`/coding/problems/${id}`);
export const submitCode = (payload) => API.post('/coding/submit', payload);
export const getSubmissions = () => API.get('/coding/submissions');
export default API;
