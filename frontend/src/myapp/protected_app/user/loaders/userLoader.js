import {
  getUserById,
  getUserByEmail,
  getAllUsers,
} from "../apis/userApi";

// ==========================================
// LOAD USER BY ID
// ==========================================
export const userLoader = async ({ params }) => {
  try {
    const userId = params.userId;

    if (!userId) {
      throw new Error("User ID is required.");
    }

    const user = await getUserById(userId);

    return user;
  } catch (error) {
    console.error("USER LOADER ERROR:", error);
    console.error("RESPONSE:", error.response?.data);
    console.error("STATUS:", error.response?.status);

    throw new Response(
      error.response?.data?.detail ||
        error.message ||
        "Failed to load user.",
      {
        status: error.response?.status || 500,
        statusText:
          error.response?.data?.detail ||
          error.message ||
          "Failed to load user.",
      }
    );
  }
};

// ==========================================
// LOAD USER BY EMAIL
// ==========================================
export const userByEmailLoader = async ({ params }) => {
  try {
    const email = params.email;

    if (!email) {
      throw new Error("Email is required.");
    }

    const user = await getUserByEmail(email);

    return user;
  } catch (error) {
    console.error("USER BY EMAIL ERROR:", error);

    throw new Response(
      error.response?.data?.detail ||
        error.message ||
        "Failed to load user.",
      {
        status: error.response?.status || 500,
        statusText:
          error.response?.data?.detail ||
          error.message ||
          "Failed to load user.",
      }
    );
  }
};

// ==========================================
// LOAD ALL USERS
// ==========================================
export const usersLoader = async () => {
  try {
    const users = await getAllUsers();

    return users;
  } catch (error) {
    console.error("USERS LOADER ERROR:", error);

    throw new Response(
      error.response?.data?.detail ||
        error.message ||
        "Failed to load users.",
      {
        status: error.response?.status || 500,
        statusText:
          error.response?.data?.detail ||
          error.message ||
          "Failed to load users.",
      }
    );
  }
};