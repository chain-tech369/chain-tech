import { getEstimatedBudgetsApi } from "../apis/estimatedbudgetApi";

export async function estimatedBudgetLoader() {
  try {
    const budgets = await getEstimatedBudgetsApi();

    console.log("Estimated budgets from backend:", budgets);

    return budgets;
  } catch (error) {
    console.error(
      "Failed to load estimated budgets:",
      error.response?.data || error.message
    );

    throw error;
  }
}