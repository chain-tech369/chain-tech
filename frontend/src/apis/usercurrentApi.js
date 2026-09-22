import api from "./axios";

// Get current logged-in user
export const getCurrentUser = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

// Update user
export const updateUser = async (userId, userData) => {
  const response = await api.put(
    `/users/${userId}`,
    userData
  );

  return response.data;
};