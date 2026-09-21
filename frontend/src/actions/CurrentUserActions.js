// src/actions/userActions.js

import {
  getCurrentUser,
} from "../apis/userApi";

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch({
    type: "USER_LOADING",
  });

  try {
    const user = await getCurrentUser();

    dispatch({
      type: "USER_SUCCESS",
      payload: user,
    });

    return user;
  } catch (error) {
    dispatch({
      type: "USER_ERROR",
      payload:
        error.response?.data || error.message,
    });

    throw error;
  }
};