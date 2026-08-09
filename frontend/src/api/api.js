import axios from "axios";

const api = axios.create({
  baseURL: "http://10.55.140.158:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;