import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "../app/authSlice";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../apis/authApi";

import {
  clearCurrentUser,
} from "../app/userSlice";

import { fetchCurrentUser } from "./CurrentUserActions";

// =========================
// REGISTER
// =========================

export const registerAction =
  (userData) => async (dispatch) => {
    dispatch(registerRequest());

    try {
      const data = await registerUser(userData);

      dispatch(registerSuccess(data));

      return data;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Registration failed";

      dispatch(registerFailure(message));

      throw error;
    }
  };

// =========================
// LOGIN
// =========================

export const loginAction =
  (credentials) => async (dispatch) => {
    dispatch(loginRequest());

    try {
      // 1. Login with email and password
      const data = await loginUser(credentials);

      // 2. Save access token
      dispatch(loginSuccess(data));

      // 3. Fetch current logged-in user
      const currentUser = await dispatch(
        fetchCurrentUser()
      );

      return {
        ...data,
        currentUser,
      };
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Login failed";

      dispatch(loginFailure(message));

      throw error;
    }
  };

// =========================
// LOGOUT
// =========================

export const logoutAction =
  () => async (dispatch) => {
    dispatch(logoutRequest());

    try {
      const data = await logoutUser();

      // 1. Clear authentication
      dispatch(logoutSuccess());

      // 2. Clear current user
      dispatch(clearCurrentUser());

      return data;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Logout failed";

      dispatch(logoutFailure(message));

      throw error;
    }
  };