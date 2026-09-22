import api from "./axios";

// ==========================================
// GET PROFILE
// ==========================================
export const getProfile = async (userId) => {
  const response = await api.get(`/profiles/${userId}`);

  return response.data;
};

// ==========================================
// CREATE PROFILE
// ==========================================
export const createProfile = async (userId, profileData) => {
  const response = await api.post(
    `/profiles/${userId}`,
    profileData
  );

  return response.data;
};

// ==========================================
// UPDATE PROFILE
// ==========================================
export const updateProfile = async (userId, profileData) => {
  const response = await api.put(
    `/profiles/${userId}`,
    profileData
  );

  return response.data;
};

// ==========================================
// DELETE PROFILE
// ==========================================
export const deleteProfile = async (userId) => {
  const response = await api.delete(
    `/profiles/${userId}`
  );

  return response.data;
};