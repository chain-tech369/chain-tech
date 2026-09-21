import { useState } from "react";
import { Link } from "react-router-dom";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

export default function JoinUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    skills: "",
    experience: "",
    github: "",
    portfolio: "",
    linkedin: "",
    message: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // HANDLE INPUT CHANGES
  // =========================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      // Backend API will be added here
      console.log("Join Us Application:", formData);

      // Temporary delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      alert("Application submitted successfully.");

      setFormData({
        name: "",
        email: "",
        role: "",
        skills: "",
        experience: "",
        github: "",
        portfolio: "",
        linkedin: "",
        message: "",
        terms: false,
      });
    } catch (error) {
      setError(
        error.message || "Failed to submit application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ================= NAME + EMAIL ================= */}

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          id="name"
          name="name"
          label="Full Name"
          type="text"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

      </div>

      {/* ================= ROLE ================= */}

      <div>
        <label
          htmlFor="role"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Professional Role
        </label>

        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-300
                     bg-white px-4 py-3 outline-none transition
                     focus:border-blue-600 focus:ring-2
                     focus:ring-blue-100"
        >
          <option value="">
            Select your role
          </option>

          <option value="Frontend Developer">
            Frontend Developer
          </option>

          <option value="Backend Developer">
            Backend Developer
          </option>

          <option value="Full-Stack Developer">
            Full-Stack Developer
          </option>

          <option value="Mobile Developer">
            Mobile Developer
          </option>

          <option value="DevOps Engineer">
            DevOps Engineer
          </option>

          <option value="Software Engineer">
            Software Engineer
          </option>

          <option value="UI/UX Designer">
            UI/UX Designer
          </option>

          <option value="Data Engineer">
            Data Engineer
          </option>

          <option value="Other">
            Other
          </option>
        </select>
      </div>

      {/* ================= SKILLS ================= */}

      <Input
        id="skills"
        name="skills"
        label="Skills & Technologies"
        type="text"
        placeholder="React, FastAPI, Python, Docker, PostgreSQL..."
        value={formData.skills}
        onChange={handleChange}
        required
      />

      {/* ================= EXPERIENCE ================= */}

      <div>
        <label
          htmlFor="experience"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Experience Level
        </label>

        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-300
                     bg-white px-4 py-3 outline-none transition
                     focus:border-blue-600 focus:ring-2
                     focus:ring-blue-100"
        >
          <option value="">
            Select experience
          </option>

          <option value="Beginner">
            Beginner
          </option>

          <option value="Junior">
            Junior
          </option>

          <option value="Mid-Level">
            Mid-Level
          </option>

          <option value="Senior">
            Senior
          </option>

          <option value="Lead">
            Lead
          </option>
        </select>
      </div>

      {/* ================= GITHUB + PORTFOLIO ================= */}

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          id="github"
          name="github"
          label="GitHub"
          type="url"
          placeholder="https://github.com/username"
          value={formData.github}
          onChange={handleChange}
        />

        <Input
          id="portfolio"
          name="portfolio"
          label="Portfolio"
          type="url"
          placeholder="https://yourportfolio.com"
          value={formData.portfolio}
          onChange={handleChange}
        />

      </div>

      {/* ================= LINKEDIN ================= */}

      <Input
        id="linkedin"
        name="linkedin"
        label="LinkedIn"
        type="url"
        placeholder="https://linkedin.com/in/username"
        value={formData.linkedin}
        onChange={handleChange}
      />

      {/* ================= MESSAGE ================= */}

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Tell Us About Yourself
        </label>

        <textarea
          id="message"
          name="message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell us about your experience, projects, skills, and how you could contribute to Chain-Tech..."
          className="w-full resize-none rounded-xl
                     border border-slate-300 px-4 py-3
                     outline-none transition
                     focus:border-blue-600 focus:ring-2
                     focus:ring-blue-100"
        />
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ================= TERMS ================= */}

      <label className="flex items-start gap-3 text-sm text-slate-600">

        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          required
          className="mt-1 h-4 w-4"
        />

        <span>
          I confirm that the information provided is
          accurate and I agree to Chain-Tech reviewing
          my application.
        </span>

      </label>

      {/* ================= SUBMIT ================= */}

      <Button
        type="submit"
        disabled={loading}
        className="w-full disabled:cursor-not-allowed
                   disabled:opacity-50"
      >
        {loading
          ? "Submitting Application..."
          : "Submit Application"}
      </Button>

      {/* ================= LOGIN LINK ================= */}

      <p className="mt-6 text-center text-sm text-slate-500">

        Already have a Chain-Tech account?{" "}

        <Link
          to="/login"
          className="font-semibold text-blue-600
                     hover:text-blue-800"
        >
          Login
        </Link>

      </p>
    </Form>
  );
}