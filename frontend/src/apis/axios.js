import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8001",
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// REQUEST INTERCEPTOR
// ========================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    console.log(
      "API REQUEST:",
      config.method?.toUpperCase(),
      config.url
    );

    console.log(
      "ACCESS TOKEN EXISTS:",
      !!token
    );

    const isAuthRoute =
      config.url === "/auth/login" ||
      config.url === "/auth/register";

    if (token && !isAuthRoute) {
      if (config.headers?.set) {
        config.headers.set(
          "Authorization",
          `Bearer ${token}`
        );
      } else {
        config.headers = config.headers || {};

        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// ========================================
// RESPONSE INTERCEPTOR
// ========================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;

    const requestUrl = error.config?.url;

    const isAuthRoute =
      requestUrl === "/auth/login" ||
      requestUrl === "/auth/register";

    if (status === 401) {
      console.error(
        "Authentication failed:",
        error.response?.data
      );

      // Do not remove the token when login/register
      // itself returns 401.
      if (!isAuthRoute) {
        console.log(
          "Token is invalid or expired. Logging out..."
        );

        localStorage.removeItem("access_token");

        // Send the user back to login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;