import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signupUser = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};