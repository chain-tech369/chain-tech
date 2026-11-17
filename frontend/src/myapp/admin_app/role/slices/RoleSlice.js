import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Keep your existing reducers
  },
});

export const {
  // Keep your existing action exports
} = roleSlice.actions;

export default roleSlice.reducer;