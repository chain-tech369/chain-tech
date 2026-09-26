// src/actions/professionalroleActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProfessionalRoles,
  getProfessionalRole,
  createProfessionalRole,
  updateProfessionalRole,
  deleteProfessionalRole,
} from "../apis/professionalroleApi";


// ============================================
// GET ALL
// ============================================

export const fetchProfessionalRoles =
  createAsyncThunk(
    "professionalRole/fetchAll",
    async (_, { rejectWithValue }) => {
      try {
        return await getProfessionalRoles();
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to fetch professional roles."
        );
      }
    }
  );


// ============================================
// GET ONE
// ============================================

export const fetchProfessionalRole =
  createAsyncThunk(
    "professionalRole/fetchOne",
    async (roleId, { rejectWithValue }) => {
      try {
        return await getProfessionalRole(roleId);
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to fetch professional role."
        );
      }
    }
  );


// ============================================
// CREATE
// ============================================

export const addProfessionalRole =
  createAsyncThunk(
    "professionalRole/create",
    async (roleData, { rejectWithValue }) => {
      try {
        return await createProfessionalRole(
          roleData
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to create professional role."
        );
      }
    }
  );


// ============================================
// UPDATE
// ============================================

export const editProfessionalRole =
  createAsyncThunk(
    "professionalRole/update",
    async (
      { roleId, roleData },
      { rejectWithValue }
    ) => {
      try {
        return await updateProfessionalRole(
          roleId,
          roleData
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to update professional role."
        );
      }
    }
  );


// ============================================
// DELETE
// ============================================

export const removeProfessionalRole =
  createAsyncThunk(
    "professionalRole/delete",
    async (roleId, { rejectWithValue }) => {
      try {
        return await deleteProfessionalRole(
          roleId
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to delete professional role."
        );
      }
    }
  );