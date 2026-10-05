import { estimatedBudgetLoader } from "./estimatedbudgetLoader";
import { expectedTimelineLoader } from "./expectedtimelineLoader";
import { serviceRequiredLoader } from "./servicerequiredLoader";

export async function servicerequestLoader() {
  const [
    estimatedBudgets,
    expectedTimelines,
    serviceRequireds,
  ] = await Promise.all([
    estimatedBudgetLoader(),
    expectedTimelineLoader(),
    serviceRequiredLoader(),
  ]);

  return {
    estimatedBudgets,
    expectedTimelines,
    serviceRequireds,
  };
}