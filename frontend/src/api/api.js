import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-2955.up.railway.app"
});

// 🔥 token auto send
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;