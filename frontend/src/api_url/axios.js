import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8001",

  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

api.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("access_token");

    console.log(
      "API REQUEST:",
      config.method?.toUpperCase(),
      config.url
    );

    console.log(
      "ACCESS TOKEN EXISTS:",
      !!accessToken
    );

    const isAuthRoute =
      config.url === "/auth/login" ||
      config.url === "/auth/register" ||
      config.url === "/auth/refresh" ||
      config.url === "/auth/logout";

    if (accessToken && !isAuthRoute) {
      if (config.headers?.set) {
        config.headers.set(
          "Authorization",
          `Bearer ${accessToken}`
        );
      } else {
        config.headers = config.headers || {};

        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }
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

  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;

    // No response from server
    if (!error.response) {
      return Promise.reject(error);
    }

    // ========================================
    // ONLY HANDLE 401
    // ========================================

    if (status !== 401) {
      return Promise.reject(error);
    }

    // ========================================
    // PREVENT INFINITE RETRY
    // ========================================

    if (originalRequest?._retry) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    // ========================================
    // NEVER REFRESH AUTH ENDPOINTS
    // ========================================

    const requestUrl = originalRequest?.url;

    const isAuthRoute =
      requestUrl === "/auth/login" ||
      requestUrl === "/auth/register" ||
      requestUrl === "/auth/refresh" ||
      requestUrl === "/auth/logout";

    if (isAuthRoute) {
      return Promise.reject(error);
    }

    // ========================================
    // GET REFRESH TOKEN
    // ========================================

    const refreshToken =
      localStorage.getItem("refresh_token");

    if (!refreshToken) {
      localStorage.removeItem("access_token");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      console.log("Access token expired.");
      console.log("Trying to refresh access token...");

      // ----------------------------------------
      // REQUEST NEW ACCESS TOKEN
      // ----------------------------------------

      const response = await axios.post(
        "http://127.0.0.1:8001/auth/refresh",
        {
          refresh_token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newAccessToken =
        response.data?.access_token;

      const newRefreshToken =
        response.data?.refresh_token;

      if (!newAccessToken) {
        throw new Error(
          "No access token returned from refresh endpoint."
        );
      }

      // ----------------------------------------
      // SAVE NEW ACCESS TOKEN
      // ----------------------------------------

      localStorage.setItem(
        "access_token",
        newAccessToken
      );

      // ----------------------------------------
      // SAVE ROTATED REFRESH TOKEN
      // ----------------------------------------

      if (newRefreshToken) {
        localStorage.setItem(
          "refresh_token",
          newRefreshToken
        );
      }

      // ----------------------------------------
      // UPDATE ORIGINAL REQUEST
      // ----------------------------------------

      if (originalRequest.headers?.set) {
        originalRequest.headers.set(
          "Authorization",
          `Bearer ${newAccessToken}`
        );
      } else {
        originalRequest.headers =
          originalRequest.headers || {};

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;
      }

      console.log(
        "Access token refreshed successfully."
      );

      // ----------------------------------------
      // RETRY ORIGINAL REQUEST
      // ----------------------------------------

      return api(originalRequest);
    } catch (refreshError) {
      console.error(
        "Refresh token failed:",
        refreshError.response?.data ||
          refreshError.message
      );

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  }
);

export default api;