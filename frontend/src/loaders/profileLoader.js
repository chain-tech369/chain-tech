import { getProfileByUserId } from "../apis/profileApi";

// ==========================================
// PROFILE LOADER
// Loads the profile for the current user
// ==========================================
export const profileLoader = async ({ params }) => {
  try {
    const userId = params.userId;

    if (!userId) {
      throw new Error("User ID is required");
    }

    const profile = await getProfileByUserId(userId);

    return profile;
  } catch (error) {
    console.error("Failed to load profile:", error);

    throw new Response("Failed to load profile", {
      status: error.response?.status || 500,
    });
  }
};