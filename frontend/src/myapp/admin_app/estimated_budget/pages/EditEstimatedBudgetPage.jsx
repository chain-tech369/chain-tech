import EstimatedBudgetForm from "../../../components/forms/EstimatedBudgetForm";

export default function EditEstimatedBudgetPage() {
  const estimatedBudget = {
    id: 1,
    name: "Basic Budget",
    description: "Budget for basic services.",
    is_active: true,
  };

  const handleUpdate = async (formData) => {
    // Dispatch updateEstimatedBudget Redux action
    console.log("Update Budget:", {
      id: estimatedBudget.id,
      data: formData,
    });
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Estimated Budget
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update estimated budget information.
        </p>
      </div>

      <EstimatedBudgetForm
        initialData={estimatedBudget}
        onSubmit={handleUpdate}
        submitText="Update Budget"
      />
    </div>
  );
}