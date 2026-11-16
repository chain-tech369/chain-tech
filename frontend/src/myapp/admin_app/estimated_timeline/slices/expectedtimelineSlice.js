import { createSlice } from "@reduxjs/toolkit";

import {
    fetchExpectedTimelines,
    fetchExpectedTimeline,
    createExpectedTimeline,
    updateExpectedTimeline,
    deleteExpectedTimeline,
} from "../actions/expectedtimelineAction";


const initialState = {
    timelines: [],
    currentTimeline: null,

    loading: false,
    creating: false,
    updating: false,
    deleting: false,

    error: null,
    success: false,
};


const expectedTimelineSlice = createSlice({
    name: "expectedTimeline",

    initialState,

    reducers: {
        clearExpectedTimelineError: (state) => {
            state.error = null;
        },

        clearExpectedTimelineSuccess: (state) => {
            state.success = false;
        },

        clearCurrentExpectedTimeline: (state) => {
            state.currentTimeline = null;
        },
    },

    extraReducers: (builder) => {

        // ==========================================
        // GET ALL
        // ==========================================

        builder
            .addCase(
                fetchExpectedTimelines.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchExpectedTimelines.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.timelines = action.payload;
                }
            )

            .addCase(
                fetchExpectedTimelines.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );


        // ==========================================
        // GET ONE
        // ==========================================

        builder
            .addCase(
                fetchExpectedTimeline.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchExpectedTimeline.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.currentTimeline = action.payload;
                }
            )

            .addCase(
                fetchExpectedTimeline.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );


        // ==========================================
        // CREATE
        // ==========================================

        builder
            .addCase(
                createExpectedTimeline.pending,
                (state) => {
                    state.creating = true;
                    state.error = null;
                    state.success = false;
                }
            )

            .addCase(
                createExpectedTimeline.fulfilled,
                (state, action) => {
                    state.creating = false;

                    state.timelines.push(action.payload);

                    state.success = true;
                }
            )

            .addCase(
                createExpectedTimeline.rejected,
                (state, action) => {
                    state.creating = false;
                    state.error = action.payload;
                    state.success = false;
                }
            );


        // ==========================================
        // UPDATE
        // ==========================================

        builder
            .addCase(
                updateExpectedTimeline.pending,
                (state) => {
                    state.updating = true;
                    state.error = null;
                    state.success = false;
                }
            )

            .addCase(
                updateExpectedTimeline.fulfilled,
                (state, action) => {
                    state.updating = false;

                    const updatedTimeline =
                        action.payload;

                    const index =
                        state.timelines.findIndex(
                            (timeline) =>
                                timeline.id ===
                                updatedTimeline.id
                        );

                    if (index !== -1) {
                        state.timelines[index] =
                            updatedTimeline;
                    }

                    if (
                        state.currentTimeline?.id ===
                        updatedTimeline.id
                    ) {
                        state.currentTimeline =
                            updatedTimeline;
                    }

                    state.success = true;
                }
            )

            .addCase(
                updateExpectedTimeline.rejected,
                (state, action) => {
                    state.updating = false;
                    state.error = action.payload;
                    state.success = false;
                }
            );


        // ==========================================
        // DELETE
        // ==========================================

        builder
            .addCase(
                deleteExpectedTimeline.pending,
                (state) => {
                    state.deleting = true;
                    state.error = null;
                    state.success = false;
                }
            )

            .addCase(
                deleteExpectedTimeline.fulfilled,
                (state, action) => {
                    state.deleting = false;

                    state.timelines =
                        state.timelines.filter(
                            (timeline) =>
                                timeline.id !==
                                action.payload
                        );

                    if (
                        state.currentTimeline?.id ===
                        action.payload
                    ) {
                        state.currentTimeline = null;
                    }

                    state.success = true;
                }
            )

            .addCase(
                deleteExpectedTimeline.rejected,
                (state, action) => {
                    state.deleting = false;
                    state.error = action.payload;
                    state.success = false;
                }
            );
    },
});


export const {
    clearExpectedTimelineError,
    clearExpectedTimelineSuccess,
    clearCurrentExpectedTimeline,
} = expectedTimelineSlice.actions;


export default expectedTimelineSlice.reducer;