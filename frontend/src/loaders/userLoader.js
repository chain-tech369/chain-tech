import {
  getCurrentUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
} from "../apis/userApi";

// ==========================================
// LOAD CURRENT LOGGED-IN USER
// ==========================================
export const currentUserLoader = async () => {
  try {
    const user = await getCurrentUser();

    console.log("CURRENT USER:", user);

    return user;
  } catch (error) {
    console.error("CURRENT USER ERROR:", error);
    console.error("RESPONSE:", error.response?.data);
    console.error("STATUS:", error.response?.status);

    throw error;
  }
};

// ==========================================
// LOAD USER BY ID
// ==========================================
export const userLoader = async ({ params }) => {
  try {
    console.log("PARAMS:", params);

    const userId = params.userId;

    console.log("USER ID:", userId);

    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await getUserById(userId);

    console.log("USER FROM API:", user);

    return user;
  } catch (error) {
    console.error("================================");
    console.error("USER LOADER ERROR:", error);
    console.error("ERROR RESPONSE:", error.response?.data);
    console.error("ERROR STATUS:", error.response?.status);
    console.error("ERROR MESSAGE:", error.message);
    console.error("================================");

    throw error;
  }
};

// ==========================================
// LOAD USER BY EMAIL
// ==========================================
export const userByEmailLoader = async ({ params }) => {
  try {
    const email = params.email;

    if (!email) {
      throw new Error("Email is required");
    }

    const user = await getUserByEmail(email);

    return user;
  } catch (error) {
    console.error("USER BY EMAIL ERROR:", error);

    throw error;
  }
};

// ==========================================
// LOAD ALL USERS
// ==========================================
export const usersLoader = async () => {
  try {
    const users = await getAllUsers();

    console.log("ALL USERS:", users);

    return users;
  } catch (error) {
    console.error("ALL USERS ERROR:", error);

    throw error;
  }
};