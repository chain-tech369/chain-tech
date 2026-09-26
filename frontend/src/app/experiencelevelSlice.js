// src/app/experiencelevelSlice.js

import { createSlice } from "@reduxjs/toolkit";

import {
  fetchExperienceLevels,
  fetchExperienceLevel,
  addExperienceLevel,
  editExperienceLevel,
  removeExperienceLevel,
} from "../actions/experiencelevelActions";


const initialState = {
  experiences: [],
  currentExperience: null,

  loading: false,
  error: null,

  success: false,
};


const experiencelevelSlice = createSlice({
  name: "experienceLevel",

  initialState,

  reducers: {
    clearExperienceError: (state) => {
      state.error = null;
    },

    clearExperienceSuccess: (state) => {
      state.success = false;
    },

    clearCurrentExperience: (state) => {
      state.currentExperience = null;
    },
  },

  extraReducers: (builder) => {

    // ============================================
    // GET ALL
    // ============================================

    builder
      .addCase(
        fetchExperienceLevels.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchExperienceLevels.fulfilled,
        (state, action) => {
          state.loading = false;
          state.experiences =
            action.payload;
        }
      )

      .addCase(
        fetchExperienceLevels.rejected,
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
        fetchExperienceLevel.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchExperienceLevel.fulfilled,
        (state, action) => {
          state.loading = false;
          state.currentExperience =
            action.payload;
        }
      )

      .addCase(
        fetchExperienceLevel.rejected,
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
        addExperienceLevel.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        addExperienceLevel.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.experiences.push(
            action.payload
          );

          state.currentExperience =
            action.payload;
        }
      )

      .addCase(
        addExperienceLevel.rejected,
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
        editExperienceLevel.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        editExperienceLevel.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          const index =
            state.experiences.findIndex(
              (experience) =>
                experience.id ===
                action.payload.id
            );

          if (index !== -1) {
            state.experiences[index] =
              action.payload;
          }

          state.currentExperience =
            action.payload;
        }
      )

      .addCase(
        editExperienceLevel.rejected,
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
        removeExperienceLevel.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        removeExperienceLevel.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.experiences =
            state.experiences.filter(
              (experience) =>
                experience.id !==
                action.payload
            );

          if (
            state.currentExperience?.id ===
            action.payload
          ) {
            state.currentExperience = null;
          }
        }
      )

      .addCase(
        removeExperienceLevel.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );
  },
});


export const {
  clearExperienceError,
  clearExperienceSuccess,
  clearCurrentExperience,
} = experiencelevelSlice.actions;


export default experiencelevelSlice.reducer;