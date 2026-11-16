import axiosInstance from "./axios";

const EXPECTED_TIMELINE_URL = "/admin/expected-timelines";


// GET all expected timelines
export const getExpectedTimelinesApi = async () => {
    const response = await axiosInstance.get(
        `${EXPECTED_TIMELINE_URL}/`
    );

    return response.data;
};


// GET one expected timeline
export const getExpectedTimelineApi = async (timelineId) => {
    const response = await axiosInstance.get(
        `${EXPECTED_TIMELINE_URL}/${timelineId}`
    );

    return response.data;
};


// CREATE expected timeline
export const createExpectedTimelineApi = async (timelineData) => {
    const response = await axiosInstance.post(
        `${EXPECTED_TIMELINE_URL}/`,
        timelineData
    );

    return response.data;
};


// UPDATE expected timeline
export const updateExpectedTimelineApi = async (
    timelineId,
    timelineData
) => {
    const response = await axiosInstance.put(
        `${EXPECTED_TIMELINE_URL}/${timelineId}`,
        timelineData
    );

    return response.data;
};


// DELETE expected timeline
export const deleteExpectedTimelineApi = async (timelineId) => {
    await axiosInstance.delete(
        `${EXPECTED_TIMELINE_URL}/${timelineId}`
    );

    return timelineId;
};