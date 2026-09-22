import {
  fetchCurrentUserStart,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,

  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../app/userSlice";

import {
  fetchCurrentUser,
  editUser,
} from "./actions/CurrentUserActions";

// ==========================================
// GET CURRENT USER
// ==========================================

export const fetchCurrentUserRedux = () => async (dispatch) => {
  dispatch(fetchCurrentUserStart());

  try {
    const user = await fetchCurrentUser();

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

export const editUserRedux =
  (userId, userData) => async (dispatch) => {
    dispatch(updateUserStart());

    try {
      const updatedUser = await editUser(
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