import { useState } from "react";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

export default function ServiceRequestForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    project_name: "",
    description: "",
    budget: "",
    timeline: "",
    additional_information: "",
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
      console.log("Service Request:", formData);

      // Temporary delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      alert(
        "Thank you! Your service request has been submitted."
      );

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        project_name: "",
        description: "",
        budget: "",
        timeline: "",
        additional_information: "",
        terms: false,
      });
    } catch (error) {
      setError(
        error.message || "Failed to submit service request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* =====================================================
          YOUR INFORMATION
      ===================================================== */}

      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Your Information
        </h3>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {/* FULL NAME */}

          <Input
            id="full_name"
            name="full_name"
            label="Full Name"
            type="text"
            placeholder="Your full name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}

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

          {/* PHONE */}

          <Input
            id="phone"
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="+254..."
            value={formData.phone}
            onChange={handleChange}
          />

          {/* COMPANY */}

          <Input
            id="company"
            name="company"
            label="Company / Organization"
            type="text"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* =====================================================
          SERVICE REQUIRED
      ===================================================== */}

      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Service Required
        </h3>

        <div className="mt-5">
          <label
            htmlFor="service"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            What service do you need?
          </label>

          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Select a service
            </option>

            <option value="web-development">
              Web Development
            </option>

            <option value="mobile-development">
              Mobile App Development
            </option>

            <option value="software-development">
              Custom Software Development
            </option>

            <option value="ui-ux">
              UI/UX Design
            </option>

            <option value="cloud">
              Cloud Solutions
            </option>

            <option value="cybersecurity">
              Cybersecurity
            </option>

            <option value="database">
              Database Solutions
            </option>

            <option value="devops">
              DevOps & Infrastructure
            </option>

            <option value="consulting">
              Technology Consulting
            </option>

            <option value="other">
              Other
            </option>
          </select>
        </div>
      </div>

      {/* =====================================================
          PROJECT DETAILS
      ===================================================== */}

      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Project Details
        </h3>

        <div className="mt-5 space-y-5">
          {/* PROJECT NAME */}

          <Input
            id="project_name"
            name="project_name"
            label="Project Name"
            type="text"
            placeholder="Example: E-commerce platform"
            value={formData.project_name}
            onChange={handleChange}
          />

          {/* DESCRIPTION */}

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Tell us about your project
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe what you want Chain-Tech to build or help you with..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* BUDGET + TIMELINE */}

          <div className="grid gap-5 sm:grid-cols-2">
            {/* BUDGET */}

            <div>
              <label
                htmlFor="budget"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Estimated Budget
              </label>

              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select budget
                </option>

                <option value="under-500">
                  Under $500
                </option>

                <option value="500-1000">
                  $500 – $1,000
                </option>

                <option value="1000-5000">
                  $1,000 – $5,000
                </option>

                <option value="5000-10000">
                  $5,000 – $10,000
                </option>

                <option value="10000-plus">
                  $10,000+
                </option>

                <option value="not-sure">
                  Not sure yet
                </option>
              </select>
            </div>

            {/* TIMELINE */}

            <div>
              <label
                htmlFor="timeline"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Expected Timeline
              </label>

              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select timeline
                </option>

                <option value="urgent">
                  Urgent
                </option>

                <option value="1-month">
                  Within 1 month
                </option>

                <option value="1-3-months">
                  1 – 3 months
                </option>

                <option value="3-6-months">
                  3 – 6 months
                </option>

                <option value="flexible">
                  Flexible
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ADDITIONAL INFORMATION
      ===================================================== */}

      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Additional Information
        </h3>

        <div className="mt-5">
          <label
            htmlFor="additional_information"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Anything else we should know?
          </label>

          <textarea
            id="additional_information"
            name="additional_information"
            rows="4"
            value={formData.additional_information}
            onChange={handleChange}
            placeholder="Additional requirements, existing systems, preferred technologies, etc."
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================================
          TERMS
      ===================================================== */}

      <div className="border-t border-slate-200 pt-6">
        <label className="flex gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
            className="mt-1 h-4 w-4 rounded border-slate-300"
          />

          <span>
            I agree that Chain-Tech may contact me regarding
            this service request.
          </span>
        </label>

        {/* =================================================
            SUBMIT
        ================================================= */}

        <Button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl px-6 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Submitting Service Request..."
            : "Submit Service Request"}
        </Button>

        <p className="mt-3 text-center text-xs text-slate-400">
          Your information will be used only to process your
          request.
        </p>
      </div>
    </Form>
  );
}