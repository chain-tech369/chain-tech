import {
  getCurrentUser,
  updateUser,
} from "../apis/usercurrentApi";

// Get current user
export const fetchCurrentUser = async () => {
  return await getCurrentUser();
};

// Update user
export const editUser = async (userId, userData) => {
  return await updateUser(userId, userData);
};