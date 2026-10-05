import axiosInstance from "./axios";

/**
 * Get all service required records
 */
export const getServiceRequireds = async () => {
  const response = await axiosInstance.get(
    "/admin/service-requireds/"
  );

  return response.data;
};

/**
 * Get one service required record
 */
export const getServiceRequiredById = async (serviceRequiredId) => {
  const response = await axiosInstance.get(
    `/admin/service-requireds/${serviceRequiredId}`
  );

  return response.data;
};

/**
 * Create a service required record
 */
export const createServiceRequired = async (serviceRequiredData) => {
  const response = await axiosInstance.post(
    "/admin/service-requireds/",
    serviceRequiredData
  );

  return response.data;
};

/**
 * Update a service required record
 */
export const updateServiceRequired = async (
  serviceRequiredId,
  serviceRequiredData
) => {
  const response = await axiosInstance.patch(
    `/admin/service-requireds/${serviceRequiredId}`,
    serviceRequiredData
  );

  return response.data;
};

/**
 * Delete a service required record
 */
export const deleteServiceRequired = async (serviceRequiredId) => {
  await axiosInstance.delete(
    `/admin/service-requireds/${serviceRequiredId}`
  );

  return serviceRequiredId;
};