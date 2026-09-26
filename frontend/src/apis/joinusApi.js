// src/apis/joinusApi.js

import api from "./axios";


// CREATE
export const createJoinUsApplication = async (applicationData) => {
    const response = await api.post(
        "/join-us/",
        applicationData
    );

    return response.data;
};


// GET ALL
export const getJoinUsApplications = async () => {
    const response = await api.get(
        "/join-us/"
    );

    return response.data;
};


// GET ONE
export const getJoinUsApplication = async (applicationId) => {
    const response = await api.get(
        `/join-us/${applicationId}`
    );

    return response.data;
};


// UPDATE
export const updateJoinUsApplication = async (
    applicationId,
    applicationData
) => {
    const response = await api.patch(
        `/join-us/${applicationId}`,
        applicationData
    );

    return response.data;
};


// DELETE
export const deleteJoinUsApplication = async (applicationId) => {
    await api.delete(
        `/join-us/${applicationId}`
    );

    return applicationId;
};