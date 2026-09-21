import { useState } from "react";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

export default function ProfileForm({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    phone: profile?.phone || "",
    profile_image: profile?.profile_image || "",
    bio: profile?.bio || "",
    address: profile?.address || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  // HANDLE FORM SUBMIT
  // ==========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Send the profile data to the parent component.
      await onSave(formData);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="space-y-6">

        {/* ==========================================
            PHONE
        ========================================== */}
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+254 700 000 000"
        />

        {/* ==========================================
            PROFILE IMAGE
        ========================================== */}
        <Input
          label="Profile Image URL"
          name="profile_image"
          type="url"
          value={formData.profile_image}
          onChange={handleChange}
          placeholder="https://example.com/profile.jpg"
        />

        {/* ==========================================
            ADDRESS
        ========================================== */}
        <Input
          label="Address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />

        {/* ==========================================
            BIO
        ========================================== */}
        <div>
          <label
            htmlFor="bio"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Bio
          </label>

          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us a little about yourself..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-950 focus:ring-2 focus:ring-blue-950/10"
          />
        </div>

        {/* ==========================================
            ERROR
        ========================================== */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ==========================================
            BUTTONS
        ========================================== */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Save Changes"}
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