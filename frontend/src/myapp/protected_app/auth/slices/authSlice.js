import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem("access_token");

const initialState = {
  // ACCESS TOKEN
  accessToken,

  // AUTHENTICATED USER
  user: null,

  // AUTHENTICATION
  isAuthenticated: !!accessToken,
  authInitialized: !accessToken,

  // LOADING
  loading: false,
  refreshing: false,

  // ERROR
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

      const { access_token, user } = action.payload;

      if (access_token) {
        state.accessToken = access_token;

        localStorage.setItem("access_token", access_token);

        state.isAuthenticated = true;
      }

      if (user) {
        state.user = user;
      }

      state.authInitialized = true;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;

      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.authInitialized = true;

      localStorage.removeItem("access_token");
    },

    // ==========================================
    // REFRESH TOKEN
    // ==========================================

    refreshRequest: (state) => {
      state.refreshing = true;
      state.error = null;
    },

    refreshSuccess: (state, action) => {
      state.refreshing = false;
      state.error = null;

      const accessToken = action.payload?.access_token;

      if (accessToken) {
        state.accessToken = accessToken;

        localStorage.setItem("access_token", accessToken);

        state.isAuthenticated = true;
      }
    },

    refreshFailure: (state, action) => {
      state.refreshing = false;
      state.error = action.payload;

      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.authInitialized = true;

      localStorage.removeItem("access_token");
    },

    // ==========================================
    // SET AUTHENTICATED USER
    // ==========================================

    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.authInitialized = true;
    },

    // ==========================================
    // AUTHENTICATION INITIALIZATION
    // ==========================================

    authInitializationComplete: (state) => {
      state.authInitialized = true;
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
      state.user = null;
      state.isAuthenticated = false;
      state.authInitialized = true;

      localStorage.removeItem("access_token");
    },

    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;

      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.authInitialized = true;

      localStorage.removeItem("access_token");
    },

    // ==========================================
    // CLEAR ERROR
    // ==========================================

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

// ==============================================
// ACTIONS
// ==============================================

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

  setAuthUser,
  authInitializationComplete,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  clearAuthError,
} = authSlice.actions;

// ==============================================
// REDUCER
// ==============================================

export default authSlice.reducer;