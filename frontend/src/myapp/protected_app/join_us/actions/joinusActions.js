// src/actions/joinusActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    createJoinUsApplication,
    getJoinUsApplications,
    getJoinUsApplication,
    updateJoinUsApplication,
    deleteJoinUsApplication,
} from "../apis/joinusApi";


// CREATE
export const createJoinUs = createAsyncThunk(
    "joinus/createJoinUs",
    async (applicationData, { rejectWithValue }) => {
        try {
            return await createJoinUsApplication(applicationData);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to create Join Us application"
            );
        }
    }
);


// GET ALL
export const fetchJoinUsApplications = createAsyncThunk(
    "joinus/fetchJoinUsApplications",
    async (_, { rejectWithValue }) => {
        try {
            return await getJoinUsApplications();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to fetch Join Us applications"
            );
        }
    }
);


// GET ONE
export const fetchJoinUsApplication = createAsyncThunk(
    "joinus/fetchJoinUsApplication",
    async (applicationId, { rejectWithValue }) => {
        try {
            return await getJoinUsApplication(applicationId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to fetch Join Us application"
            );
        }
    }
);


// UPDATE
export const updateJoinUs = createAsyncThunk(
    "joinus/updateJoinUs",
    async (
        { applicationId, applicationData },
        { rejectWithValue }
    ) => {
        try {
            return await updateJoinUsApplication(
                applicationId,
                applicationData
            );
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to update Join Us application"
            );
        }
    }
);


// DELETE
export const deleteJoinUs = createAsyncThunk(
    "joinus/deleteJoinUs",
    async (applicationId, { rejectWithValue }) => {
        try {
            return await deleteJoinUsApplication(
                applicationId
            );
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                "Failed to delete Join Us application"
            );
        }
    }
);