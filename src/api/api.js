import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookmyshowbe-bsg1.onrender.com/api'
});

export default api;
