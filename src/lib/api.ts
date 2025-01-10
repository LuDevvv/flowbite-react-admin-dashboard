import axios from "axios";

// Configuración de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "https://api.azteli.com/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
