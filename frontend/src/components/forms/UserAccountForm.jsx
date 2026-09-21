import { useEffect, useState } from "react";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

export default function UserAccountForm({
  user,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // UPDATE FORM WHEN USER CHANGES
  // ==========================================

  useEffect(() => {
    if (!user) {
      return;
    }

    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      password: "",
    });
  }, [user]);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const dataToSend = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
      };

      // Only send password when user entered one
      if (formData.password.trim() !== "") {
        dataToSend.password = formData.password;
      }

      await onSave(dataToSend);

    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to update account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      <div className="space-y-6">

        {/* ========================================
            FIRST NAME
        ======================================== */}

        <Input
          label="First Name"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
        />

        {/* ========================================
            LAST NAME
        ======================================== */}

        <Input
          label="Last Name"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
        />

        {/* ========================================
            EMAIL
        ======================================== */}

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />

        {/* ========================================
            PASSWORD
        ======================================== */}

        <Input
          label="New Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave blank to keep your current password"
        />

        <p className="text-sm leading-6 text-slate-500">
          Leave the password field empty if you do not
          want to change your password.
        </p>

        {/* ========================================
            ERROR
        ======================================== */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ========================================
            BUTTONS
        ======================================== */}

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">

          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </Button>

          <Button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full bg-slate-200 text-slate-800 hover:bg-slate-300 sm:w-auto"
          >
            Cancel
          </Button>

        </div>

      </div>

    </Form>
  );
}