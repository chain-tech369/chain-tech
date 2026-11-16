import { getProfile } from "../apis/profileApi";

// ==========================================
// PROFILE LOADER
// Loads profile for a specific user
// ==========================================
export const profileLoader = async ({ params }) => {
  try {
    const userId = params.userId;

    console.log("USER ID:", userId);

    if (!userId) {
      throw new Error("User ID is required.");
    }

    // Get profile using user ID
    const profile = await getProfile(userId);

    console.log("PROFILE:", profile);

    return profile;
  } catch (error) {
    console.error("================================");
    console.error("PROFILE LOADER ERROR:", error);
    console.error(
      "RESPONSE:",
      error.response?.data
    );
    console.error(
      "STATUS:",
      error.response?.status
    );
    console.error("================================");

    throw new Response(
      error.response?.data?.detail ||
        error.message ||
        "Failed to load profile",
      {
        status:
          error.response?.status || 500,
        statusText:
          error.response?.data?.detail ||
          error.message ||
          "Failed to load profile",
      }
    );
  }
};