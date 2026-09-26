// src/actions/skillsActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../apis/skillsApi";


// ============================================
// GET ALL
// ============================================

export const fetchSkills =
  createAsyncThunk(
    "skills/fetchAll",
    async (_, { rejectWithValue }) => {
      try {
        return await getSkills();
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to fetch skills."
        );
      }
    }
  );


// ============================================
// GET ONE
// ============================================

export const fetchSkill =
  createAsyncThunk(
    "skills/fetchOne",
    async (skillId, { rejectWithValue }) => {
      try {
        return await getSkill(skillId);
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to fetch skill."
        );
      }
    }
  );


// ============================================
// CREATE
// ============================================

export const addSkill =
  createAsyncThunk(
    "skills/create",
    async (skillData, { rejectWithValue }) => {
      try {
        return await createSkill(skillData);
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to create skill."
        );
      }
    }
  );


// ============================================
// UPDATE
// ============================================

export const editSkill =
  createAsyncThunk(
    "skills/update",
    async (
      { skillId, skillData },
      { rejectWithValue }
    ) => {
      try {
        return await updateSkill(
          skillId,
          skillData
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to update skill."
        );
      }
    }
  );


// ============================================
// DELETE
// ============================================

export const removeSkill =
  createAsyncThunk(
    "skills/delete",
    async (skillId, { rejectWithValue }) => {
      try {
        return await deleteSkill(skillId);
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.detail ||
          "Failed to delete skill."
        );
      }
    }
  );