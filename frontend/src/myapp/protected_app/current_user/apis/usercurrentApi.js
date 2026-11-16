import api from "./axios";

// ==========================================
// GET CURRENT USER
// ==========================================

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

// ==========================================
// UPDATE USER
// ==========================================

export const updateUser = async (userId, userData) => {
  const response = await api.put(
    `/users/${userId}`,
    userData
  );

  return response.data;
};