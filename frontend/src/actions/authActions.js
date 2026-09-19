import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  userRequest,
  userSuccess,
  userFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "../app/authSlice";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../apis/authApi";

// ========================================
// REGISTER
// ========================================

export const registerAction = (userData) => async (dispatch) => {
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

// ========================================
// LOGIN
// ========================================

export const loginAction = (credentials) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const data = await loginUser(credentials);

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

// ========================================
// GET CURRENT USER
// ========================================

export const getCurrentUserAction = () => async (dispatch) => {
  dispatch(userRequest());

  try {
    const data = await getCurrentUser();

    dispatch(userSuccess(data));

    return data;
  } catch (error) {
    const message =
      error.response?.data?.detail ||
      error.message ||
      "Failed to get current user";

    dispatch(userFailure(message));

    throw error;
  }
};

// ========================================
// LOGOUT
// ========================================

export const logoutAction = () => async (dispatch) => {
  dispatch(logoutRequest());

  try {
    const data = await logoutUser();

    dispatch(logoutSuccess());

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