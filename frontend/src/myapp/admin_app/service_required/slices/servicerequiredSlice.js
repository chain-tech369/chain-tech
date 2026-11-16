import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceRequireds: [],
  currentServiceRequired: null,

  loading: false,
  error: null,

  creating: false,
  updating: false,
  deleting: false,
};

const serviceRequiredSlice = createSlice({
  name: "serviceRequired",

  initialState,

  reducers: {
    // =========================
    // GET ALL
    // =========================

    getServiceRequiredsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getServiceRequiredsSuccess: (state, action) => {
      state.loading = false;
      state.serviceRequireds = action.payload;
      state.error = null;
    },

    getServiceRequiredsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // GET ONE
    // =========================

    getServiceRequiredStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getServiceRequiredSuccess: (state, action) => {
      state.loading = false;
      state.currentServiceRequired = action.payload;
      state.error = null;
    },

    getServiceRequiredFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // CREATE
    // =========================

    createServiceRequiredStart: (state) => {
      state.creating = true;
      state.error = null;
    },

    createServiceRequiredSuccess: (state, action) => {
      state.creating = false;

      state.serviceRequireds.push(action.payload);

      state.error = null;
    },

    createServiceRequiredFailure: (state, action) => {
      state.creating = false;
      state.error = action.payload;
    },

    // =========================
    // UPDATE
    // =========================

    updateServiceRequiredStart: (state) => {
      state.updating = true;
      state.error = null;
    },

    updateServiceRequiredSuccess: (state, action) => {
      state.updating = false;

      const updatedServiceRequired = action.payload;

      const index = state.serviceRequireds.findIndex(
        (item) => item.id === updatedServiceRequired.id
      );

      if (index !== -1) {
        state.serviceRequireds[index] =
          updatedServiceRequired;
      }

      if (
        state.currentServiceRequired?.id ===
        updatedServiceRequired.id
      ) {
        state.currentServiceRequired =
          updatedServiceRequired;
      }

      state.error = null;
    },

    updateServiceRequiredFailure: (state, action) => {
      state.updating = false;
      state.error = action.payload;
    },

    // =========================
    // DELETE
    // =========================

    deleteServiceRequiredStart: (state) => {
      state.deleting = true;
      state.error = null;
    },

    deleteServiceRequiredSuccess: (state, action) => {
      state.deleting = false;

      state.serviceRequireds =
        state.serviceRequireds.filter(
          (item) => item.id !== action.payload
        );

      if (
        state.currentServiceRequired?.id ===
        action.payload
      ) {
        state.currentServiceRequired = null;
      }

      state.error = null;
    },

    deleteServiceRequiredFailure: (state, action) => {
      state.deleting = false;
      state.error = action.payload;
    },

    // =========================
    // CLEAR
    // =========================

    clearServiceRequiredError: (state) => {
      state.error = null;
    },

    clearCurrentServiceRequired: (state) => {
      state.currentServiceRequired = null;
    },
  },
});

export const {
  getServiceRequiredsStart,
  getServiceRequiredsSuccess,
  getServiceRequiredsFailure,

  getServiceRequiredStart,
  getServiceRequiredSuccess,
  getServiceRequiredFailure,

  createServiceRequiredStart,
  createServiceRequiredSuccess,
  createServiceRequiredFailure,

  updateServiceRequiredStart,
  updateServiceRequiredSuccess,
  updateServiceRequiredFailure,

  deleteServiceRequiredStart,
  deleteServiceRequiredSuccess,
  deleteServiceRequiredFailure,

  clearServiceRequiredError,
  clearCurrentServiceRequired,
} = serviceRequiredSlice.actions;

export default serviceRequiredSlice.reducer;