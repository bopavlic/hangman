import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: `${BASE_URL}/stanko-ingemark/hang_the_wise_man_frontend_task`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
