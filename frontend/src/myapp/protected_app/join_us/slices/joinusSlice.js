// src/app/joinusSlice.js

import { createSlice } from "@reduxjs/toolkit";

import {
    createJoinUs,
    fetchJoinUsApplications,
    fetchJoinUsApplication,
    updateJoinUs,
    deleteJoinUs,
} from "../actions/joinusActions";


const initialState = {
    applications: [],
    currentApplication: null,

    loading: false,
    error: null,

    success: false,
};


const joinusSlice = createSlice({
    name: "joinus",

    initialState,

    reducers: {
        clearJoinUsError: (state) => {
            state.error = null;
        },

        clearJoinUsSuccess: (state) => {
            state.success = false;
        },

        clearCurrentJoinUsApplication: (state) => {
            state.currentApplication = null;
        },
    },

    extraReducers: (builder) => {

        // =========================
        // CREATE
        // =========================

        builder
            .addCase(createJoinUs.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(createJoinUs.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                state.applications.push(
                    action.payload
                );

                state.currentApplication =
                    action.payload;
            })

            .addCase(createJoinUs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });


        // =========================
        // GET ALL
        // =========================

        builder
            .addCase(
                fetchJoinUsApplications.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchJoinUsApplications.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.applications =
                        action.payload;
                }
            )

            .addCase(
                fetchJoinUsApplications.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );


        // =========================
        // GET ONE
        // =========================

        builder
            .addCase(
                fetchJoinUsApplication.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchJoinUsApplication.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.currentApplication =
                        action.payload;
                }
            )

            .addCase(
                fetchJoinUsApplication.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );


        // =========================
        // UPDATE
        // =========================

        builder
            .addCase(
                updateJoinUs.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = false;
                }
            )

            .addCase(
                updateJoinUs.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;

                    const updatedApplication =
                        action.payload;

                    const index =
                        state.applications.findIndex(
                            (application) =>
                                application.id ===
                                updatedApplication.id
                        );

                    if (index !== -1) {
                        state.applications[index] =
                            updatedApplication;
                    }

                    state.currentApplication =
                        updatedApplication;
                }
            )

            .addCase(
                updateJoinUs.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                    state.success = false;
                }
            );


        // =========================
        // DELETE
        // =========================

        builder
            .addCase(
                deleteJoinUs.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = false;
                }
            )

            .addCase(
                deleteJoinUs.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;

                    state.applications =
                        state.applications.filter(
                            (application) =>
                                application.id !==
                                action.payload
                        );

                    if (
                        state.currentApplication?.id ===
                        action.payload
                    ) {
                        state.currentApplication = null;
                    }
                }
            )

            .addCase(
                deleteJoinUs.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                    state.success = false;
                }
            );
    },
});


export const {
    clearJoinUsError,
    clearJoinUsSuccess,
    clearCurrentJoinUsApplication,
} = joinusSlice.actions;


export default joinusSlice.reducer;