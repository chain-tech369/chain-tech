import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getExpectedTimelinesApi,
    getExpectedTimelineApi,
    createExpectedTimelineApi,
    updateExpectedTimelineApi,
    deleteExpectedTimelineApi,
} from "../apis/expectedtimelineApi";


// GET all expected timelines
export const fetchExpectedTimelines = createAsyncThunk(
    "expectedTimeline/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getExpectedTimelinesApi();

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to fetch expected timelines."
            );
        }
    }
);


// GET one expected timeline
export const fetchExpectedTimeline = createAsyncThunk(
    "expectedTimeline/fetchOne",
    async (timelineId, { rejectWithValue }) => {
        try {
            const data = await getExpectedTimelineApi(timelineId);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to fetch expected timeline."
            );
        }
    }
);


// CREATE expected timeline
export const createExpectedTimeline = createAsyncThunk(
    "expectedTimeline/create",
    async (timelineData, { rejectWithValue }) => {
        try {
            const data = await createExpectedTimelineApi(
                timelineData
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to create expected timeline."
            );
        }
    }
);


// UPDATE expected timeline
export const updateExpectedTimeline = createAsyncThunk(
    "expectedTimeline/update",
    async (
        { timelineId, timelineData },
        { rejectWithValue }
    ) => {
        try {
            const data = await updateExpectedTimelineApi(
                timelineId,
                timelineData
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to update expected timeline."
            );
        }
    }
);


// DELETE expected timeline
export const deleteExpectedTimeline = createAsyncThunk(
    "expectedTimeline/delete",
    async (timelineId, { rejectWithValue }) => {
        try {
            const deletedId =
                await deleteExpectedTimelineApi(timelineId);

            return deletedId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to delete expected timeline."
            );
        }
    }
);