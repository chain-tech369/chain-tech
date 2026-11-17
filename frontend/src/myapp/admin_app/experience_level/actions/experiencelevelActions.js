// src/actions/experiencelevelActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getExperienceLevels,
  getExperienceLevel,
  createExperienceLevel,
  updateExperienceLevel,
  deleteExperienceLevel,
} from "../apis/experiencelevelApi";


// ============================================
// GET ALL
// ============================================

export const fetchExperienceLevels =
  createAsyncThunk(
    "experienceLevel/fetchAll",
    async (_, { rejectWithValue }) => {
      try {
        return await getExperienceLevels();
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to fetch experience levels."
        );
      }
    }
  );


// ============================================
// GET ONE
// ============================================

export const fetchExperienceLevel =
  createAsyncThunk(
    "experienceLevel/fetchOne",
    async (
      experienceId,
      { rejectWithValue }
    ) => {
      try {
        return await getExperienceLevel(
          experienceId
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to fetch experience level."
        );
      }
    }
  );


// ============================================
// CREATE
// ============================================

export const addExperienceLevel =
  createAsyncThunk(
    "experienceLevel/create",
    async (
      experienceData,
      { rejectWithValue }
    ) => {
      try {
        return await createExperienceLevel(
          experienceData
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to create experience level."
        );
      }
    }
  );


// ============================================
// UPDATE
// ============================================

export const editExperienceLevel =
  createAsyncThunk(
    "experienceLevel/update",
    async (
      {
        experienceId,
        experienceData,
      },
      { rejectWithValue }
    ) => {
      try {
        return await updateExperienceLevel(
          experienceId,
          experienceData
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to update experience level."
        );
      }
    }
  );


// ============================================
// DELETE
// ============================================

export const removeExperienceLevel =
  createAsyncThunk(
    "experienceLevel/delete",
    async (
      experienceId,
      { rejectWithValue }
    ) => {
      try {
        return await deleteExperienceLevel(
          experienceId
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to delete experience level."
        );
      }
    }
  );