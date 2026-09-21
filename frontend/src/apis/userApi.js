import api from "./axios";

// ==========================================
// GET CURRENT LOGGED-IN USER
// GET /users/me
// ==========================================
export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

// ==========================================
// CREATE USER
// POST /users/
// ==========================================
export const createUser = async (userData) => {
  const response = await api.post("/users/", userData);
  return response.data;
};

// ==========================================
// GET ALL USERS
// GET /users/
// ==========================================
export const getAllUsers = async () => {
  const response = await api.get("/users/");
  return response.data;
};

// ==========================================
// GET USER BY ID
// GET /users/{user_id}
// ==========================================
export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// ==========================================
// GET USER BY EMAIL
// GET /users/email/{email}
// ==========================================
export const getUserByEmail = async (email) => {
  const response = await api.get(
    `/users/email/${encodeURIComponent(email)}`
  );

  return response.data;
};

// ==========================================
// UPDATE USER
// PUT /users/{user_id}
// ==========================================
export const updateUser = async (userId, userData) => {
  const response = await api.put(
    `/users/${userId}`,
    userData
  );

  return response.data;
};

// ==========================================
// DELETE USER
// DELETE /users/{user_id}
// ==========================================
export const deleteUser = async (userId) => {
  await api.delete(`/users/${userId}`);
};