import { createSlice } from "@reduxjs/toolkit";

const permissionSlice = createSlice({
  name: "permissions",
  initialState: {
    permissions: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Keep your existing reducers here
  },
});

export const {
  // Keep your existing action names here
} = permissionSlice.actions;

export default permissionSlice.reducer;