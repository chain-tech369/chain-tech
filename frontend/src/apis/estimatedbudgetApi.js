import axiosInstance from "./axios";

const BASE_URL = "/admin/estimated-budgets";


// Get all estimated budgets
export const getEstimatedBudgetsApi = async () => {
  const response = await axiosInstance.get(`${BASE_URL}/`);

  return response.data;
};


// Get one estimated budget
export const getEstimatedBudgetApi = async (estimatedBudgetId) => {
  const response = await axiosInstance.get(
    `${BASE_URL}/${estimatedBudgetId}`
  );

  return response.data;
};


// Create estimated budget
export const createEstimatedBudgetApi = async (estimatedBudgetData) => {
  const response = await axiosInstance.post(
    `${BASE_URL}/`,
    estimatedBudgetData
  );

  return response.data;
};


// Update estimated budget
export const updateEstimatedBudgetApi = async (
  estimatedBudgetId,
  estimatedBudgetData
) => {
  const response = await axiosInstance.patch(
    `${BASE_URL}/${estimatedBudgetId}`,
    estimatedBudgetData
  );

  return response.data;
};


// Delete estimated budget
export const deleteEstimatedBudgetApi = async (estimatedBudgetId) => {
  await axiosInstance.delete(
    `${BASE_URL}/${estimatedBudgetId}`
  );

  return estimatedBudgetId;
};