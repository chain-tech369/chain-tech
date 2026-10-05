import axiosInstance from "./axios";

// ==========================================
// CREATE SERVICE REQUEST
// ==========================================

export const createServiceRequest = async (serviceRequestData) => {
  const response = await axiosInstance.post(
    "/service-requests/",
    serviceRequestData
  );

  return response.data;
};

// ==========================================
// GET ALL SERVICE REQUESTS
// ==========================================

export const getServiceRequests = async () => {
  const response = await axiosInstance.get(
    "/service-requests/"
  );

  return response.data;
};

// ==========================================
// GET ONE SERVICE REQUEST
// ==========================================

export const getServiceRequest = async (serviceRequestId) => {
  const response = await axiosInstance.get(
    `/service-requests/${serviceRequestId}`
  );

  return response.data;
};

// ==========================================
// UPDATE SERVICE REQUEST
// ==========================================

export const updateServiceRequest = async (
  serviceRequestId,
  serviceRequestData
) => {
  const response = await axiosInstance.put(
    `/service-requests/${serviceRequestId}`,
    serviceRequestData
  );

  return response.data;
};

// ==========================================
// DELETE SERVICE REQUEST
// ==========================================

export const deleteServiceRequest = async (serviceRequestId) => {
  const response = await axiosInstance.delete(
    `/service-requests/${serviceRequestId}`
  );

  return response.data;
};