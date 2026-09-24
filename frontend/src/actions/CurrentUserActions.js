import {
  fetchCurrentUserStart,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../app/userSlice";

import {
  getCurrentUser,
  updateUser,
} from "../apis/usercurrentApi";

// ==========================================
// GET CURRENT USER
// ==========================================

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch(fetchCurrentUserStart());

  try {
    const user = await getCurrentUser();

    dispatch(fetchCurrentUserSuccess(user));

    return user;
  } catch (error) {
    const message =
      error.response?.data?.detail ||
      error.message ||
      "Failed to fetch current user.";

    dispatch(fetchCurrentUserFailure(message));

    throw error;
  }
};

// ==========================================
// UPDATE USER
// ==========================================

export const editUser = (userId, userData) => async (dispatch) => {
  dispatch(updateUserStart());

  try {
    const updatedUser = await updateUser(
      userId,
      userData
    );

    dispatch(updateUserSuccess(updatedUser));

    return updatedUser;
  } catch (error) {
    const message =
      error.response?.data?.detail ||
      error.message ||
      "Failed to update user.";

    dispatch(updateUserFailure(message));

    throw error;
  }
};