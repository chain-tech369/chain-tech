// src/app/professionalroleSlice.js

import { createSlice } from "@reduxjs/toolkit";

import {
  fetchProfessionalRoles,
  fetchProfessionalRole,
  addProfessionalRole,
  editProfessionalRole,
  removeProfessionalRole,
} from "../actions/professionalroleActions";


const initialState = {
  roles: [],
  currentRole: null,

  loading: false,
  error: null,

  success: false,
};


const professionalroleSlice = createSlice({
  name: "professionalRole",

  initialState,

  reducers: {
    clearProfessionalRoleError: (state) => {
      state.error = null;
    },

    clearProfessionalRoleSuccess: (state) => {
      state.success = false;
    },

    clearCurrentProfessionalRole: (state) => {
      state.currentRole = null;
    },
  },

  extraReducers: (builder) => {

    // ============================================
    // GET ALL
    // ============================================

    builder
      .addCase(
        fetchProfessionalRoles.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProfessionalRoles.fulfilled,
        (state, action) => {
          state.loading = false;
          state.roles = action.payload;
        }
      )

      .addCase(
        fetchProfessionalRoles.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );


    // ============================================
    // GET ONE
    // ============================================

    builder
      .addCase(
        fetchProfessionalRole.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProfessionalRole.fulfilled,
        (state, action) => {
          state.loading = false;
          state.currentRole = action.payload;
        }
      )

      .addCase(
        fetchProfessionalRole.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );


    // ============================================
    // CREATE
    // ============================================

    builder
      .addCase(
        addProfessionalRole.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        addProfessionalRole.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.roles.push(action.payload);
          state.currentRole = action.payload;
        }
      )

      .addCase(
        addProfessionalRole.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );


    // ============================================
    // UPDATE
    // ============================================

    builder
      .addCase(
        editProfessionalRole.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        editProfessionalRole.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          const index =
            state.roles.findIndex(
              (role) =>
                role.id === action.payload.id
            );

          if (index !== -1) {
            state.roles[index] =
              action.payload;
          }

          state.currentRole =
            action.payload;
        }
      )

      .addCase(
        editProfessionalRole.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );


    // ============================================
    // DELETE
    // ============================================

    builder
      .addCase(
        removeProfessionalRole.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        removeProfessionalRole.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.roles =
            state.roles.filter(
              (role) =>
                role.id !== action.payload
            );

          if (
            state.currentRole?.id ===
            action.payload
          ) {
            state.currentRole = null;
          }
        }
      )

      .addCase(
        removeProfessionalRole.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );
  },
});


export const {
  clearProfessionalRoleError,
  clearProfessionalRoleSuccess,
  clearCurrentProfessionalRole,
} = professionalroleSlice.actions;


export default professionalroleSlice.reducer;