import api from "./axios";

// ==========================================
// GET PROFILE BY USER ID
// GET /profiles/{user_id}
// ==========================================
export const getProfileByUserId = async (userId) => {
  const response = await api.get(`/profiles/${userId}`);

  return response.data;
};

// ==========================================
// CREATE PROFILE
// POST /profiles/{user_id}
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
// PUT /profiles/{user_id}
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
// DELETE /profiles/{user_id}
// ==========================================
export const deleteProfile = async (userId) => {
  await api.delete(`/profiles/${userId}`);
};