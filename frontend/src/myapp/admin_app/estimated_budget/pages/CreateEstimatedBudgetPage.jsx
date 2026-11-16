
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import EstimatedBudgetForm from "../../../components/forms/EstimatedBudgetForm";

import { canPerformAction } from "../../../utils/permission";

export default function CreateEstimatedBudgetPage() {
  // Get authenticated user from Redux
  const user = useSelector((state) => state.auth.user);

  // Get user permissions
  const permissions = user?.permissions ?? [];

  // Check create permission
  const canCreate = canPerformAction(
    permissions,
    "estimated_budget",
    "create"
  );

  // Deny access if permission is missing
  if (!canCreate) {
    return <Navigate to="/unauthorized" replace />;
  }

  const handleCreate = async (formData) => {
    // Dispatch createEstimatedBudget Redux action
    console.log("Create Budget:", formData);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create Estimated Budget
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add a new estimated budget option.
        </p>
      </div>

      <EstimatedBudgetForm
        onSubmit={handleCreate}
        submitText="Create Budget"
      />
    </div>
  );
}
