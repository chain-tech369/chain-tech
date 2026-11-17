import ExpectedTimelineForm from "../forms/ExpectedTimelineForm";

export default function CreateExpectedTimelinePage() {
  const handleCreate = async (formData) => {
    // Dispatch createExpectedTimeline Redux action
    console.log("Create Timeline:", formData);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create Expected Timeline
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Add a new service completion timeline.
        </p>
      </div>

      <ExpectedTimelineForm
        onSubmit={handleCreate}
        submitText="Create Timeline"
      />
    </div>
  );
}