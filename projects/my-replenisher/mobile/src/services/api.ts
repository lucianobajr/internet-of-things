import axios from "axios";

const api = axios.create({
  baseURL: "https://my-replenisher-server-auth.up.railway.app",
});

export default api;