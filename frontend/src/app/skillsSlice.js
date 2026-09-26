// src/app/skillsSlice.js

import { createSlice } from "@reduxjs/toolkit";

import {
  fetchSkills,
  fetchSkill,
  addSkill,
  editSkill,
  removeSkill,
} from "../actions/skillsActions";


const initialState = {
  skills: [],
  currentSkill: null,

  loading: false,
  error: null,

  success: false,
};


const skillsSlice = createSlice({
  name: "skills",

  initialState,

  reducers: {
    clearSkillsError: (state) => {
      state.error = null;
    },

    clearSkillsSuccess: (state) => {
      state.success = false;
    },

    clearCurrentSkill: (state) => {
      state.currentSkill = null;
    },
  },

  extraReducers: (builder) => {

    // ============================================
    // GET ALL
    // ============================================

    builder
      .addCase(
        fetchSkills.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchSkills.fulfilled,
        (state, action) => {
          state.loading = false;
          state.skills = action.payload;
        }
      )

      .addCase(
        fetchSkills.rejected,
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
        fetchSkill.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchSkill.fulfilled,
        (state, action) => {
          state.loading = false;
          state.currentSkill = action.payload;
        }
      )

      .addCase(
        fetchSkill.rejected,
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
        addSkill.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        addSkill.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.skills.push(
            action.payload
          );

          state.currentSkill =
            action.payload;
        }
      )

      .addCase(
        addSkill.rejected,
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
        editSkill.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        editSkill.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          const index =
            state.skills.findIndex(
              (skill) =>
                skill.id ===
                action.payload.id
            );

          if (index !== -1) {
            state.skills[index] =
              action.payload;
          }

          state.currentSkill =
            action.payload;
        }
      )

      .addCase(
        editSkill.rejected,
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
        removeSkill.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        removeSkill.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.skills =
            state.skills.filter(
              (skill) =>
                skill.id !== action.payload
            );

          if (
            state.currentSkill?.id ===
            action.payload
          ) {
            state.currentSkill = null;
          }
        }
      )

      .addCase(
        removeSkill.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );
  },
});


export const {
  clearSkillsError,
  clearSkillsSuccess,
  clearCurrentSkill,
} = skillsSlice.actions;


export default skillsSlice.reducer;