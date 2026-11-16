import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  users: [],
  selectedUser: null,

  loading: false,
  error: null,

  updating: false,
  deleting: false,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    // ==========================================
    // CURRENT USER
    // ==========================================

    fetchCurrentUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchCurrentUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },

    fetchCurrentUserFailure: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = action.payload;
    },

    // ==========================================
    // ALL USERS
    // ==========================================

    fetchAllUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },

    fetchAllUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ==========================================
    // USER BY ID
    // ==========================================

    fetchUserByIdStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchUserByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedUser = action.payload;
      state.error = null;
    },

    fetchUserByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ==========================================
    // USER BY EMAIL
    // ==========================================

    fetchUserByEmailStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchUserByEmailSuccess: (state, action) => {
      state.loading = false;
      state.selectedUser = action.payload;
      state.error = null;
    },

    fetchUserByEmailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ==========================================
    // CREATE USER
    // ==========================================

    createUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    createUserSuccess: (state, action) => {
      state.loading = false;

      state.users.push(action.payload);

      state.currentUser = action.payload;

      state.error = null;
    },

    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ==========================================
    // UPDATE USER
    // ==========================================

    updateUserStart: (state) => {
      state.updating = true;
      state.error = null;
    },

    updateUserSuccess: (state, action) => {
      state.updating = false;

      const updatedUser = action.payload;

      // Update current user
      if (state.currentUser?.id === updatedUser.id) {
        state.currentUser = updatedUser;
      }

      // Update selected user
      if (state.selectedUser?.id === updatedUser.id) {
        state.selectedUser = updatedUser;
      }

      // Update user inside users array
      const index = state.users.findIndex(
        (user) => user.id === updatedUser.id
      );

      if (index !== -1) {
        state.users[index] = updatedUser;
      }

      state.error = null;
    },

    updateUserFailure: (state, action) => {
      state.updating = false;
      state.error = action.payload;
    },

    // ==========================================
    // DELETE USER
    // ==========================================

    deleteUserStart: (state) => {
      state.deleting = true;
      state.error = null;
    },

    deleteUserSuccess: (state, action) => {
      state.deleting = false;

      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );

      if (state.currentUser?.id === action.payload) {
        state.currentUser = null;
      }

      if (state.selectedUser?.id === action.payload) {
        state.selectedUser = null;
      }

      state.error = null;
    },

    deleteUserFailure: (state, action) => {
      state.deleting = false;
      state.error = action.payload;
    },

    // ==========================================
    // CLEAR USER ERROR
    // ==========================================

    clearUserError: (state) => {
      state.error = null;
    },

    // ==========================================
    // CLEAR CURRENT USER
    // ==========================================

    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  fetchCurrentUserStart,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,

  fetchAllUsersStart,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,

  fetchUserByIdStart,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,

  fetchUserByEmailStart,
  fetchUserByEmailSuccess,
  fetchUserByEmailFailure,

  createUserStart,
  createUserSuccess,
  createUserFailure,

  updateUserStart,
  updateUserSuccess,
  updateUserFailure,

  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,

  clearUserError,
  clearCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;