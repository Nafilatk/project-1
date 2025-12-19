// src/app/lib/axios.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001", // your json-server base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
