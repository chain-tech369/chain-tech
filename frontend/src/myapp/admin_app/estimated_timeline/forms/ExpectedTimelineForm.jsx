import { useEffect, useState } from "react";

// Reusable components
import Form from "../../../../components/uis/Form";
import Input from "../../../../components/uis/Input";
import Button from "../../../../components/uis/Button";

export default function ExpectedTimelineForm({
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
    is_active: initialData.is_active ?? true,
  });

  const [errors, setErrors] = useState({});

  // ==========================================
  // SYNC INITIAL DATA
  // ==========================================

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      description: initialData.description || "",
      is_active: initialData.is_active ?? true,
    });
  }, [
    initialData.name,
    initialData.description,
    initialData.is_active,
  ]);

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    if (!trimmedName) {
      newErrors.name = "Timeline name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    } else if (trimmedName.length > 100) {
      newErrors.name = "Name cannot exceed 100 characters.";
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
      is_active: formData.is_active,
    };

    onSubmit(payload);
  };

  // ==========================================
  // FORM UI
  // ==========================================

  return (
    <Form onSubmit={handleSubmit}>

      {/* Timeline Name */}
      <Input
        label="Timeline Name"
        name="name"
        placeholder="Enter expected timeline name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        disabled={isLoading}
        maxLength={100}
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
          placeholder="Enter timeline description (optional)"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-3">
        <input
          id="is_active"
          name="is_active"
          type="checkbox"
          checked={formData.is_active}
          onChange={handleChange}
          disabled={isLoading}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />

        <label
          htmlFor="is_active"
          className="text-sm font-medium text-gray-700"
        >
          Active
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading}
        className="w-full"
      >
        {submitText ||
          (initialData.id ? "Update Timeline" : "Create Timeline")}
      </Button>

    </Form>
  );
}