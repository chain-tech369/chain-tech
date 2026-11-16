import { getServiceRequests } from "../apis/servicerequestApi";

export const serviceRequestFormLoader = async () => {
  try {
    const serviceRequests = await getServiceRequests();

    return {
      serviceRequests,
    };
  } catch (error) {
    throw new Response(
      error.response?.data?.detail ||
        "Failed to load service requests.",
      {
        status: error.response?.status || 500,
      }
    );
  }
};