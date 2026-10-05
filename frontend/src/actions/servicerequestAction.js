import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createServiceRequest,
  getServiceRequests,
  getServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
} from "../apis/servicerequestApi";

// ==========================================
// CREATE
// ==========================================

export const createServiceRequestAction = createAsyncThunk(
  "serviceRequest/create",
  async (serviceRequestData, { rejectWithValue }) => {
    try {
      return await createServiceRequest(serviceRequestData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.message ||
          "Failed to create service request."
      );
    }
  }
);

// ==========================================
// GET ALL
// ==========================================

export const getServiceRequestsAction = createAsyncThunk(
  "serviceRequest/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getServiceRequests();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.message ||
          "Failed to load service requests."
      );
    }
  }
);

// ==========================================
// GET ONE
// ==========================================

export const getServiceRequestAction = createAsyncThunk(
  "serviceRequest/getOne",
  async (serviceRequestId, { rejectWithValue }) => {
    try {
      return await getServiceRequest(serviceRequestId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.message ||
          "Failed to load service request."
      );
    }
  }
);

// ==========================================
// UPDATE
// ==========================================

export const updateServiceRequestAction = createAsyncThunk(
  "serviceRequest/update",
  async (
    { serviceRequestId, serviceRequestData },
    { rejectWithValue }
  ) => {
    try {
      return await updateServiceRequest(
        serviceRequestId,
        serviceRequestData
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.message ||
          "Failed to update service request."
      );
    }
  }
);

// ==========================================
// DELETE
// ==========================================

export const deleteServiceRequestAction = createAsyncThunk(
  "serviceRequest/delete",
  async (serviceRequestId, { rejectWithValue }) => {
    try {
      await deleteServiceRequest(serviceRequestId);

      return serviceRequestId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.message ||
          "Failed to delete service request."
      );
    }
  }
);