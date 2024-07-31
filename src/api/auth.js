import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

export const logout = async () => {
  return await axios.post(`${API_URL}/logout`);
};
