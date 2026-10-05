import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getEstimatedBudgetsApi,
  getEstimatedBudgetApi,
  createEstimatedBudgetApi,
  updateEstimatedBudgetApi,
  deleteEstimatedBudgetApi,
} from "../apis/estimatedbudgetApi";

// =====================================================
// GET ALL ESTIMATED BUDGETS
// =====================================================

export const fetchEstimatedBudgets = createAsyncThunk(
  "estimatedBudget/fetchEstimatedBudgets",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getEstimatedBudgetsApi();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          "Failed to fetch estimated budgets."
      );
    }
  }
);

// =====================================================
// GET ONE ESTIMATED BUDGET
// =====================================================

export const fetchEstimatedBudget = createAsyncThunk(
  "estimatedBudget/fetchEstimatedBudget",

  async (id, { rejectWithValue }) => {
    try {
      const response = await getEstimatedBudgetApi(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          "Failed to fetch estimated budget."
      );
    }
  }
);

// =====================================================
// CREATE ESTIMATED BUDGET
// =====================================================

export const createEstimatedBudget = createAsyncThunk(
  "estimatedBudget/createEstimatedBudget",

  async (budgetData, { rejectWithValue }) => {
    try {
      const response =
        await createEstimatedBudgetApi(budgetData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          "Failed to create estimated budget."
      );
    }
  }
);

// =====================================================
// UPDATE ESTIMATED BUDGET
// =====================================================

export const updateEstimatedBudget = createAsyncThunk(
  "estimatedBudget/updateEstimatedBudget",

  async (
    { id, budgetData },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await updateEstimatedBudgetApi(
          id,
          budgetData
        );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          "Failed to update estimated budget."
      );
    }
  }
);

// =====================================================
// DELETE ESTIMATED BUDGET
// =====================================================

export const deleteEstimatedBudget = createAsyncThunk(
  "estimatedBudget/deleteEstimatedBudget",

  async (id, { rejectWithValue }) => {
    try {
      await deleteEstimatedBudgetApi(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          "Failed to delete estimated budget."
      );
    }
  }
);