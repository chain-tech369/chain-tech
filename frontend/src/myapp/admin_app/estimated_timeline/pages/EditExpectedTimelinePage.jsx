import ExpectedTimelineForm from "../forms/ExpectedTimelineForm";

export default function EditExpectedTimelinePage() {
  const expectedTimeline = {
    id: 1,
    name: "One Week",
    description: "Service completion within one week.",
    is_active: true,
  };

  const handleUpdate = async (formData) => {
    // Dispatch updateExpectedTimeline Redux action
    console.log("Update Timeline:", {
      id: expectedTimeline.id,
      data: formData,
    });
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Expected Timeline
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update expected timeline information.
        </p>
      </div>

      <ExpectedTimelineForm
        initialData={expectedTimeline}
        onSubmit={handleUpdate}
        submitText="Update Timeline"
      />
    </div>
  );
}