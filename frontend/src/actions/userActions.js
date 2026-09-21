import {
  getCurrentUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from "../apis/userApi";

// ==========================================
// GET CURRENT USER
// ==========================================
export const fetchCurrentUser = () => async (dispatch) => {
  dispatch({
    type: "user/fetchCurrentUserStart",
  });

  try {
    const user = await getCurrentUser();

    dispatch({
      type: "user/fetchCurrentUserSuccess",
      payload: user,
    });

    return user;
  } catch (error) {
    dispatch({
      type: "user/fetchCurrentUserFailure",
      payload:
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to fetch current user.",
    });

    throw error;
  }
};

// ==========================================
// GET ALL USERS
// ==========================================
export const fetchAllUsers = () => async (dispatch) => {
  dispatch({
    type: "user/fetchAllUsersStart",
  });

  try {
    const users = await getAllUsers();

    dispatch({
      type: "user/fetchAllUsersSuccess",
      payload: users,
    });

    return users;
  } catch (error) {
    dispatch({
      type: "user/fetchAllUsersFailure",
      payload:
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to fetch users.",
    });

    throw error;
  }
};

// ==========================================
// GET USER BY ID
// ==========================================
export const fetchUserById = (userId) => async (dispatch) => {
  dispatch({
    type: "user/fetchUserByIdStart",
  });

  try {
    const user = await getUserById(userId);

    dispatch({
      type: "user/fetchUserByIdSuccess",
      payload: user,
    });

    return user;
  } catch (error) {
    dispatch({
      type: "user/fetchUserByIdFailure",
      payload:
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to fetch user.",
    });

    throw error;
  }
};

// ==========================================
// GET USER BY EMAIL
// ==========================================
export const fetchUserByEmail = (email) => async (dispatch) => {
  dispatch({
    type: "user/fetchUserByEmailStart",
  });

  try {
    const user = await getUserByEmail(email);

    dispatch({
      type: "user/fetchUserByEmailSuccess",
      payload: user,
    });

    return user;
  } catch (error) {
    dispatch({
      type: "user/fetchUserByEmailFailure",
      payload:
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to fetch user.",
    });

    throw error;
  }
};

// ==========================================
// CREATE USER
// ==========================================
export const registerUser = (userData) => async (dispatch) => {
  dispatch({
    type: "user/createUserStart",
  });

  try {
    const user = await createUser(userData);

    dispatch({
      type: "user/createUserSuccess",
      payload: user,
    });

    return user;
  } catch (error) {
    dispatch({
      type: "user/createUserFailure",
      payload:
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to create user.",
    });

    throw error;
  }
};

// ==========================================
// UPDATE USER
// ==========================================
export const editUser = (userId, userData) => async (dispatch) => {
  dispatch({
    type: "user/updateUserStart",
  });

  try {
    const user = await updateUser(userId, userData);

    dispatch({
      type: "user/updateUserSuccess",
      payload: user,
    });

    return user;
  } catch (error) {
    dispatch({
      type: "user/updateUserFailure",
      payload:
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to update user.",
    });

    throw error;
  }
};

// ==========================================
// DELETE USER
// ==========================================
export const removeUser = (userId) => async (dispatch) => {
  dispatch({
    type: "user/deleteUserStart",
  });

  try {
    await deleteUser(userId);

    dispatch({
      type: "user/deleteUserSuccess",
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: "user/deleteUserFailure",
      payload:
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to delete user.",
    });

    throw error;
  }
};