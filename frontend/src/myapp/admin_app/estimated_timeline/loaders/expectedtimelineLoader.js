import { getExpectedTimelinesApi } from "../apis/expectedtimelineApi";

export async function expectedTimelineLoader() {
  try {
    const timelines = await getExpectedTimelinesApi();

    console.log("Expected timelines from backend:", timelines);
    console.log("Expected timelines type:", typeof timelines);
    console.log("Is array:", Array.isArray(timelines));

    return timelines;
  } catch (error) {
    console.error(
      "Failed to load expected timelines:",
      error.response?.data || error.message
    );

    throw error;
  }
}