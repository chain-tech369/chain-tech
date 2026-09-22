import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("access_token"),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("access_token"),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // ==============================
    // REGISTER
    // ==============================

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

    // ==============================
    // LOGIN
    // ==============================

    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = null;

      if (action.payload.access_token) {
        state.accessToken = action.payload.access_token;
        state.isAuthenticated = true;

        localStorage.setItem(
          "access_token",
          action.payload.access_token
        );
      }
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // ==============================
    // LOGOUT
    // ==============================

    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.error = null;

      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("access_token");
    },

    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;

      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("access_token");
    },

    // ==============================
    // CLEAR ERROR
    // ==============================

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,

  loginRequest,
  loginSuccess,
  loginFailure,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;