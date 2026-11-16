import RoleForm from "../../../components/forms/RoleForm";

export default function CreateRolePage() {
  const handleCreate = async (formData) => {
    // Dispatch your createRole Redux action here
    console.log("Create Role:", formData);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create Role
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new system role.
        </p>
      </div>

      <RoleForm
        onSubmit={handleCreate}
        submitText="Create Role"
      />
    </div>
  );
}