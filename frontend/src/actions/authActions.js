import {
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
} from "../app/authSlice";

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../apis/authApi";

import { clearCurrentUser } from "../app/userSlice";

// ==========================================
// REGISTER
// ==========================================

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

// ==========================================
// LOGIN
// ==========================================

export const loginAction =
  (credentials) => async (dispatch) => {
    dispatch(loginRequest());

    try {
      /*
       * credentials contains:
       *
       * {
       *   email,
       *   password,
       *   remember
       * }
       */

      const data = await loginUser(credentials);

      /*
       * Backend returns the access token.
       *
       * The refresh token is stored in an
       * HttpOnly cookie by the backend.
       */

      dispatch(loginSuccess(data));

      return data;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Login failed";

      dispatch(loginFailure(message));

      throw error;
    }
  };

// ==========================================
// REFRESH ACCESS TOKEN
// ==========================================

export const refreshAction =
  () => async (dispatch) => {
    dispatch(refreshRequest());

    try {
      /*
       * The refresh token is stored in an
       * HttpOnly cookie.
       *
       * The browser automatically sends the cookie
       * with the refresh request.
       */

      const data = await refreshAccessToken();

      dispatch(refreshSuccess(data));

      return data;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Session expired";

      dispatch(refreshFailure(message));

      dispatch(clearCurrentUser());

      return null;
    }
  };

// ==========================================
// LOGOUT
// ==========================================

export const logoutAction =
  () => async (dispatch) => {
    dispatch(logoutRequest());

    try {
      const data = await logoutUser();

      dispatch(logoutSuccess());

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