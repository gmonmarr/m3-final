// src/api.js

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
}

export async function verifyToken() {
  try {
    await API.get('/auth/verify');
    return true;
  } catch {
    return false;
  }
}


export default API;
