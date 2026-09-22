import { getCurrentUser } from "../apis/userApi";
import { getProfile } from "../apis/profileApi";

// ==========================================
// PROFILE LOADER
// Loads the profile for the currently logged-in user
// ==========================================
export const profileLoader = async () => {
  try {
    // Get currently logged-in user
    const user = await getCurrentUser();

    console.log("CURRENT USER:", user);

    if (!user?.id) {
      throw new Error("User information is not available.");
    }

    // Get profile using the current user's ID
    const profile = await getProfile(user.id);

    console.log("CURRENT PROFILE:", profile);

    // Send both user and profile to the page
    return {
      user,
      profile,
    };
  } catch (error) {
    console.error("Failed to load profile:", error);
    console.error("RESPONSE:", error.response?.data);
    console.error("STATUS:", error.response?.status);

    throw new Response("Failed to load profile", {
      status: error.response?.status || 500,
      statusText:
        error.response?.data?.detail ||
        error.message ||
        "Failed to load profile",
    });
  }
};