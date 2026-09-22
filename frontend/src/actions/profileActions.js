import {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../apis/profileApi";

// ==========================================
// GET PROFILE
// ==========================================

export const fetchProfile = (userId) => async (dispatch) => {
  dispatch({
    type: "profile/fetchProfileStart",
  });

  try {
    const profile = await getProfile(userId);

    dispatch({
      type: "profile/fetchProfileSuccess",
      payload: profile,
    });

    return profile;
  } catch (error) {
    const message =
      error?.response?.data?.detail ||
      error?.message ||
      "Failed to fetch profile.";

    dispatch({
      type: "profile/fetchProfileFailure",
      payload: message,
    });

    throw error;
  }
};

// ==========================================
// CREATE PROFILE
// ==========================================

export const addProfile =
  (userId, profileData) => async (dispatch) => {
    dispatch({
      type: "profile/createProfileStart",
    });

    try {
      const profile = await createProfile(
        userId,
        profileData
      );

      dispatch({
        type: "profile/createProfileSuccess",
        payload: profile,
      });

      return profile;
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to create profile.";

      dispatch({
        type: "profile/createProfileFailure",
        payload: message,
      });

      throw error;
    }
  };

// ==========================================
// UPDATE PROFILE
// ==========================================

export const editProfile =
  (userId, profileData) => async (dispatch) => {
    dispatch({
      type: "profile/updateProfileStart",
    });

    try {
      const profile = await updateProfile(
        userId,
        profileData
      );

      dispatch({
        type: "profile/updateProfileSuccess",
        payload: profile,
      });

      return profile;
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to update profile.";

      dispatch({
        type: "profile/updateProfileFailure",
        payload: message,
      });

      throw error;
    }
  };

// ==========================================
// DELETE PROFILE
// ==========================================

export const removeProfile =
  (userId) => async (dispatch) => {
    dispatch({
      type: "profile/deleteProfileStart",
    });

    try {
      await deleteProfile(userId);

      dispatch({
        type: "profile/deleteProfileSuccess",
        payload: userId,
      });

      return true;
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to delete profile.";

      dispatch({
        type: "profile/deleteProfileFailure",
        payload: message,
      });

      throw error;
    }
  };