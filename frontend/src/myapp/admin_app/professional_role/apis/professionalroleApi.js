// src/apis/professionalroleApi.js

import api from "./axios";


// ============================================
// GET ALL PROFESSIONAL ROLES
// ============================================

export const getProfessionalRoles = async () => {
  const response = await api.get(
    "/admin/professional-roles/"
  );

  return response.data;
};


// ============================================
// GET ONE PROFESSIONAL ROLE
// ============================================

export const getProfessionalRole = async (roleId) => {
  const response = await api.get(
    `/admin/professional-roles/${roleId}`
  );

  return response.data;
};


// ============================================
// CREATE PROFESSIONAL ROLE
// ============================================

export const createProfessionalRole = async (roleData) => {
  const response = await api.post(
    "/admin/professional-roles/",
    roleData
  );

  return response.data;
};


// ============================================
// UPDATE PROFESSIONAL ROLE
// ============================================

export const updateProfessionalRole = async (
  roleId,
  roleData
) => {
  const response = await api.put(
    `/admin/professional-roles/${roleId}`,
    roleData
  );

  return response.data;
};


// ============================================
// DELETE PROFESSIONAL ROLE
// ============================================

export const deleteProfessionalRole = async (roleId) => {
  await api.delete(
    `/admin/professional-roles/${roleId}`
  );

  return roleId;
};