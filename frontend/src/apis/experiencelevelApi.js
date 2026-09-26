// src/apis/experiencelevelApi.js

import api from "./axios";


// ============================================
// GET ALL EXPERIENCE LEVELS
// ============================================

export const getExperienceLevels = async () => {
  const response = await api.get(
    "/admin/experiences/"
  );

  return response.data;
};


// ============================================
// GET ONE EXPERIENCE LEVEL
// ============================================

export const getExperienceLevel = async (
  experienceId
) => {
  const response = await api.get(
    `/admin/experiences/${experienceId}`
  );

  return response.data;
};


// ============================================
// CREATE EXPERIENCE LEVEL
// ============================================

export const createExperienceLevel = async (
  experienceData
) => {
  const response = await api.post(
    "/admin/experiences/",
    experienceData
  );

  return response.data;
};


// ============================================
// UPDATE EXPERIENCE LEVEL
// ============================================

export const updateExperienceLevel = async (
  experienceId,
  experienceData
) => {
  const response = await api.put(
    `/admin/experiences/${experienceId}`,
    experienceData
  );

  return response.data;
};


// ============================================
// DELETE EXPERIENCE LEVEL
// ============================================

export const deleteExperienceLevel = async (
  experienceId
) => {
  await api.delete(
    `/admin/experiences/${experienceId}`
  );

  return experienceId;
};