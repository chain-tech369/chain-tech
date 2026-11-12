import RoleForm from "../../../components/forms/RoleForm";

export default function EditRolePage() {
  const role = {
    id: 1,
    name: "Admin",
    description: "System administrator with full access.",
  };

  const handleUpdate = async (formData) => {
    // Dispatch your updateRole Redux action here
    console.log("Update Role:", {
      id: role.id,
      data: formData,
    });
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Role
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update role information.
        </p>
      </div>

      <RoleForm
        initialData={role}
        onSubmit={handleUpdate}
        submitText="Update Role"
      />
    </div>
  );
}