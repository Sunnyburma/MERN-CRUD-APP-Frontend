import axios from 'axios';

const getApiBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    return 'https://mern-crud-app-h49t.onrender.com/api';
  }

  const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, '');
  return normalizedBaseUrl.endsWith('/api')
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getRecords = async (params) => {
  const { data } = await api.get('/records', { params });
  return data;
};

export const getRecord = async (id) => {
  const { data } = await api.get(`/records/${id}`);
  return data.data;
};

export const createRecord = async (payload) => {
  const { data } = await api.post('/records', payload);
  return data.data;
};

export const updateRecord = async (id, payload) => {
  const { data } = await api.put(`/records/${id}`, payload);
  return data.data;
};

export const deleteRecord = async (id) => {
  const { data } = await api.delete(`/records/${id}`);
  return data;
};

export const getApiErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong';
