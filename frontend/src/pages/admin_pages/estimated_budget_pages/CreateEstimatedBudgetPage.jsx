import EstimatedBudgetForm from "../../../components/forms/EstimatedBudgetForm";

export default function CreateEstimatedBudgetPage() {
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