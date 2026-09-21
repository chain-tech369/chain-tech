import axios from "axios";

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const api = axios.create({
  baseURL: isLocalhost
    ? "http://127.0.0.1:8001"
    : "https://instead-electronic-storm-lands.trycloudflare.com",

  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// REQUEST INTERCEPTOR
// Add JWT token to every request
// ==========================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    console.log("API REQUEST:", config.method?.toUpperCase(), config.url);
    console.log("ACCESS TOKEN EXISTS:", !!token);

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Authentication failed.");

      // Do NOT immediately remove the token here
      // while debugging. Otherwise it becomes difficult
      // to determine what went wrong.
    }

    return Promise.reject(error);
  }
);

export default api;