import { useEffect, useState } from "react";

// Reusable components
import Form from "../../../../components/uis/Form";
import Input from "../../../../components/uis/Input";
import Button from "../../../../components/uis/Button";

export default function RoleForm({
  initialData = {},
  onSubmit,
  isLoading = false,
  submitText,
}) {
  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
  });

  const [errors, setErrors] = useState({});

  // ==========================================
  // SYNC INITIAL DATA
  // ==========================================

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      description: initialData.description || "",
    });
  }, [initialData.name, initialData.description]);

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================================
  // FORM VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    const trimmedName = formData.name.trim();
    const trimmedDescription = formData.description.trim();

    if (!trimmedName) {
      newErrors.name = "Role name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Role name must contain at least 2 characters.";
    } else if (trimmedName.length > 50) {
      newErrors.name = "Role name cannot exceed 50 characters.";
    }

    if (trimmedDescription.length > 255) {
      newErrors.description = "Description cannot exceed 255 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // HANDLE FORM SUBMISSION
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim() || null,
    };

    onSubmit(payload);
  };

  // ==========================================
  // FORM UI
  // ==========================================

  return (
    <Form onSubmit={handleSubmit}>

      {/* Role Name */}
      <Input
        label="Role Name"
        name="name"
        placeholder="Enter role name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        disabled={isLoading}
        maxLength={50}
      />

      {/* Description */}
      <div className="w-full">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Enter role description (optional)"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          maxLength={255}
          rows={4}
          className={`
            w-full rounded-lg border px-4 py-2.5
            text-gray-900 outline-none transition
            placeholder:text-gray-400
            disabled:cursor-not-allowed disabled:bg-gray-100
            ${
              errors.description
                ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
            }
            focus:ring-2
          `}
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description}
          </p>
        )}

        <p className="mt-1 text-xs text-gray-500">
          {formData.description.length}/255 characters
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading}
        className="w-full"
      >
        {submitText || (initialData.id ? "Update Role" : "Create Role")}
      </Button>

    </Form>
  );
}