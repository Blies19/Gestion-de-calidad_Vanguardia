import apiClient from './client';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data.token;
};

export const signup = async (userData: SignupRequest) => {
  const response = await apiClient.post('/auth/signup', userData);
  return response.data;
};