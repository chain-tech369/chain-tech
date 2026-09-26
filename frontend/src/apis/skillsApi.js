// src/apis/skillsApi.js

import api from "./axios";


// ============================================
// GET ALL SKILLS
// ============================================

export const getSkills = async () => {
  const response = await api.get(
    "/admin/skills/"
  );

  return response.data;
};


// ============================================
// GET ONE SKILL
// ============================================

export const getSkill = async (skillId) => {
  const response = await api.get(
    `/admin/skills/${skillId}`
  );

  return response.data;
};


// ============================================
// CREATE SKILL
// ============================================

export const createSkill = async (skillData) => {
  const response = await api.post(
    "/admin/skills/",
    skillData
  );

  return response.data;
};


// ============================================
// UPDATE SKILL
// ============================================

export const updateSkill = async (
  skillId,
  skillData
) => {
  const response = await api.put(
    `/admin/skills/${skillId}`,
    skillData
  );

  return response.data;
};


// ============================================
// DELETE SKILL
// ============================================

export const deleteSkill = async (skillId) => {
  await api.delete(
    `/admin/skills/${skillId}`
  );

  return skillId;
};