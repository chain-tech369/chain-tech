import {
  createServiceRequired,
  updateServiceRequired,
  deleteServiceRequired,
} from "../apis/servicerequiredApi";

/**
 * Create service required
 */
export const createServiceRequiredAction = async (
  serviceRequiredData
) => {
  try {
    const data = await createServiceRequired(
      serviceRequiredData
    );

    return data;
  } catch (error) {
    console.error(
      "Failed to create service required:",
      error
    );

    throw error;
  }
};

/**
 * Update service required
 */
export const updateServiceRequiredAction = async (
  serviceRequiredId,
  serviceRequiredData
) => {
  try {
    const data = await updateServiceRequired(
      serviceRequiredId,
      serviceRequiredData
    );

    return data;
  } catch (error) {
    console.error(
      "Failed to update service required:",
      error
    );

    throw error;
  }
};

/**
 * Delete service required
 */
export const deleteServiceRequiredAction = async (
  serviceRequiredId
) => {
  try {
    await deleteServiceRequired(serviceRequiredId);

    return serviceRequiredId;
  } catch (error) {
    console.error(
      "Failed to delete service required:",
      error
    );

    throw error;
  }
};