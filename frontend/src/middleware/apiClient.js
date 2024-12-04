import axios from 'axios';
import store from '../redux/store';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
});

store.subscribe(() => {
  const state = store.getState();
  const token = state.token;
  if (token) {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers['Authorization'];
  }
});

export default apiClient;
