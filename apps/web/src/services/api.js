import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

// axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = axios.create({
  baseURL: BASE_URL
});


export default api;
