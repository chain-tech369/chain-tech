import { createSlice } from "@reduxjs/toolkit";

import {
  createServiceRequestAction,
  getServiceRequestsAction,
  getServiceRequestAction,
  updateServiceRequestAction,
  deleteServiceRequestAction,
} from "../actions/servicerequestAction";

const initialState = {
  serviceRequests: [],
  serviceRequest: null,

  loading: false,
  creating: false,
  updating: false,
  deleting: false,

  error: null,
  success: false,
};

const serviceRequestSlice = createSlice({
  name: "serviceRequest",

  initialState,

  reducers: {
    clearServiceRequestError: (state) => {
      state.error = null;
    },

    clearServiceRequestSuccess: (state) => {
      state.success = false;
    },

    clearCurrentServiceRequest: (state) => {
      state.serviceRequest = null;
    },
  },

  extraReducers: (builder) => {
    // ==========================================
    // CREATE
    // ==========================================

    builder
      .addCase(
        createServiceRequestAction.pending,
        (state) => {
          state.creating = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        createServiceRequestAction.fulfilled,
        (state, action) => {
          state.creating = false;
          state.success = true;

          state.serviceRequests.push(action.payload);
        }
      )

      .addCase(
        createServiceRequestAction.rejected,
        (state, action) => {
          state.creating = false;
          state.error =
            action.payload || "Failed to create service request.";
        }
      );

    // ==========================================
    // GET ALL
    // ==========================================

    builder
      .addCase(
        getServiceRequestsAction.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getServiceRequestsAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.serviceRequests = action.payload;
        }
      )

      .addCase(
        getServiceRequestsAction.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Failed to load service requests.";
        }
      );

    // ==========================================
    // GET ONE
    // ==========================================

    builder
      .addCase(
        getServiceRequestAction.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getServiceRequestAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.serviceRequest = action.payload;
        }
      )

      .addCase(
        getServiceRequestAction.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Failed to load service request.";
        }
      );

    // ==========================================
    // UPDATE
    // ==========================================

    builder
      .addCase(
        updateServiceRequestAction.pending,
        (state) => {
          state.updating = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        updateServiceRequestAction.fulfilled,
        (state, action) => {
          state.updating = false;
          state.success = true;

          state.serviceRequest = action.payload;

          const index = state.serviceRequests.findIndex(
            (item) => item.id === action.payload.id
          );

          if (index !== -1) {
            state.serviceRequests[index] = action.payload;
          }
        }
      )

      .addCase(
        updateServiceRequestAction.rejected,
        (state, action) => {
          state.updating = false;
          state.error =
            action.payload || "Failed to update service request.";
        }
      );

    // ==========================================
    // DELETE
    // ==========================================

    builder
      .addCase(
        deleteServiceRequestAction.pending,
        (state) => {
          state.deleting = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        deleteServiceRequestAction.fulfilled,
        (state, action) => {
          state.deleting = false;
          state.success = true;

          state.serviceRequests =
            state.serviceRequests.filter(
              (item) => item.id !== action.payload
            );

          if (
            state.serviceRequest?.id === action.payload
          ) {
            state.serviceRequest = null;
          }
        }
      )

      .addCase(
        deleteServiceRequestAction.rejected,
        (state, action) => {
          state.deleting = false;
          state.error =
            action.payload || "Failed to delete service request.";
        }
      );
  },
});

export const {
  clearServiceRequestError,
  clearServiceRequestSuccess,
  clearCurrentServiceRequest,
} = serviceRequestSlice.actions;

export default serviceRequestSlice.reducer;