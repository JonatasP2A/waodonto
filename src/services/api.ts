import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wa.wanderalves.com',
});

export default api;
