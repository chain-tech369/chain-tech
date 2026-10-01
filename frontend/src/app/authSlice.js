import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ==========================================
  // ACCESS TOKEN
  // ==========================================
  //
  // Short-lived JWT access token.
  //
  accessToken: localStorage.getItem("access_token"),

  // ==========================================
  // AUTHENTICATION STATE
  // ==========================================

  isAuthenticated:
    !!localStorage.getItem("access_token"),

  // ==========================================
  // LOADING STATES
  // ==========================================

  loading: false,
  refreshing: false,

  // ==========================================
  // ERROR
  // ==========================================

  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // ==========================================
    // REGISTER
    // ==========================================

    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },

    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ==========================================
    // LOGIN
    // ==========================================

    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = null;

      const accessToken =
        action.payload?.access_token;

      // Save access token
      if (accessToken) {
        state.accessToken = accessToken;

        localStorage.setItem(
          "access_token",
          accessToken
        );

        state.isAuthenticated = true;
      }
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;

      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem(
        "access_token"
      );
    },

    // ==========================================
    // REFRESH ACCESS TOKEN
    // ==========================================

    refreshRequest: (state) => {
      state.refreshing = true;
      state.error = null;
    },

    refreshSuccess: (state, action) => {
      state.refreshing = false;
      state.error = null;

      const accessToken =
        action.payload?.access_token;

      // Save new access token
      if (accessToken) {
        state.accessToken = accessToken;

        localStorage.setItem(
          "access_token",
          accessToken
        );

        state.isAuthenticated = true;
      }
    },

    refreshFailure: (state, action) => {
      state.refreshing = false;
      state.error = action.payload;

      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem(
        "access_token"
      );
    },

    // ==========================================
    // LOGOUT
    // ==========================================

    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.error = null;

      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem(
        "access_token"
      );
    },

    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;

      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem(
        "access_token"
      );
    },

    // ==========================================
    // CLEAR AUTH ERROR
    // ==========================================

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

// ==========================================
// ACTIONS
// ==========================================

export const {
  registerRequest,
  registerSuccess,
  registerFailure,

  loginRequest,
  loginSuccess,
  loginFailure,

  refreshRequest,
  refreshSuccess,
  refreshFailure,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  clearAuthError,
} = authSlice.actions;

// ==========================================
// REDUCER
// ==========================================

export default authSlice.reducer;