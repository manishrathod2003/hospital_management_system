import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // .env se value lega
});

export default api;
