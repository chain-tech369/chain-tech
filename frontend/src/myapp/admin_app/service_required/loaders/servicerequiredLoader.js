import { getServiceRequireds } from "../apis/servicerequiredApi";

export const serviceRequiredLoader = async () => {
  try {
    const serviceRequireds = await getServiceRequireds();

    console.log(
      "Service requireds from backend:",
      serviceRequireds
    );

    return serviceRequireds;
  } catch (error) {
    console.error(
      "Failed to load service requireds:",
      error
    );

    throw error;
  }
};