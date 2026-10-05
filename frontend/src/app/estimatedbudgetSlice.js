import { createSlice } from "@reduxjs/toolkit";

import {
  fetchEstimatedBudgets,
  fetchEstimatedBudget,
  createEstimatedBudget,
  updateEstimatedBudget,
  deleteEstimatedBudget,
} from "../actions/estimatedbudgetAction";

const initialState = {
  estimatedBudgets: [],
  estimatedBudget: null,
  loading: false,
  error: null,
  success: false,
};

const estimatedBudgetSlice = createSlice({
  name: "estimatedBudget",

  initialState,

  reducers: {
    clearEstimatedBudgetError: (state) => {
      state.error = null;
    },

    clearEstimatedBudgetSuccess: (state) => {
      state.success = false;
    },

    clearSelectedEstimatedBudget: (state) => {
      state.estimatedBudget = null;
    },
  },

  extraReducers: (builder) => {
    // =====================================================
    // GET ALL
    // =====================================================

    builder
      .addCase(fetchEstimatedBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEstimatedBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.estimatedBudgets = action.payload;
      })

      .addCase(fetchEstimatedBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================================
      // GET ONE
      // =====================================================

      .addCase(fetchEstimatedBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEstimatedBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.estimatedBudget = action.payload;
      })

      .addCase(fetchEstimatedBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================================
      // CREATE
      // =====================================================

      .addCase(createEstimatedBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createEstimatedBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.estimatedBudgets.push(action.payload);
      })

      .addCase(createEstimatedBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // =====================================================
      // UPDATE
      // =====================================================

      .addCase(updateEstimatedBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateEstimatedBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const index = state.estimatedBudgets.findIndex(
          (budget) => budget.id === action.payload.id
        );

        if (index !== -1) {
          state.estimatedBudgets[index] = action.payload;
        }

        state.estimatedBudget = action.payload;
      })

      .addCase(updateEstimatedBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // =====================================================
      // DELETE
      // =====================================================

      .addCase(deleteEstimatedBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(deleteEstimatedBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.estimatedBudgets =
          state.estimatedBudgets.filter(
            (budget) => budget.id !== action.payload
          );

        if (
          state.estimatedBudget?.id ===
          action.payload
        ) {
          state.estimatedBudget = null;
        }
      })

      .addCase(deleteEstimatedBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearEstimatedBudgetError,
  clearEstimatedBudgetSuccess,
  clearSelectedEstimatedBudget,
} = estimatedBudgetSlice.actions;

// =====================================================
// DEFAULT REDUCER
// =====================================================

export default estimatedBudgetSlice.reducer;