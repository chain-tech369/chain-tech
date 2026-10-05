import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

import {
  createServiceRequestAction,
} from "../../actions/servicerequestAction";

export default function ServiceRequestForm() {
  // =====================================================
  // REDUX
  // =====================================================

  const dispatch = useDispatch();

  const {
    creating,
    error,
    success,
  } = useSelector(
    (state) => state.serviceRequest
  );

  // =====================================================
  // LOADER DATA
  // =====================================================

  const loaderData = useLoaderData();

  const estimatedBudgets =
    loaderData?.estimatedBudgets ?? [];

  const expectedTimelines =
    loaderData?.expectedTimelines ?? [];

  const serviceRequireds =
    loaderData?.serviceRequireds ?? [];

  // =====================================================
  // FORM STATE
  // =====================================================

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

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ===================================================
    // PREPARE BACKEND DATA
    // ===================================================

    const submissionData = {
      ...formData,

      budget_id: formData.budget
        ? Number(formData.budget)
        : null,

      timeline_id: formData.timeline
        ? Number(formData.timeline)
        : null,

      service_required_id: formData.service
        ? Number(formData.service)
        : null,
    };

    // ===================================================
    // REMOVE FRONTEND-ONLY FIELDS
    // ===================================================

    delete submissionData.budget;
    delete submissionData.timeline;
    delete submissionData.service;

    // ===================================================
    // SEND TO REDUX THUNK
    // ===================================================

    const result = await dispatch(
      createServiceRequestAction(
        submissionData
      )
    );

    // ===================================================
    // SUCCESS
    // ===================================================

    if (
      createServiceRequestAction.fulfilled.match(
        result
      )
    ) {
      alert(
        "Thank you! Your service request has been submitted."
      );

      // ===============================================
      // RESET FORM
      // ===============================================

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

          <Input
            id="phone"
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="+254..."
            value={formData.phone}
            onChange={handleChange}
          />

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

            {serviceRequireds.map((service) => (
              <option
                key={service.id}
                value={service.id}
              >
                {service.name}
              </option>
            ))}
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
          <Input
            id="project_name"
            name="project_name"
            label="Project Name"
            type="text"
            placeholder="Example: E-commerce platform"
            value={formData.project_name}
            onChange={handleChange}
          />

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

          {/* =================================================
              BUDGET + TIMELINE
          ================================================= */}

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
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select budget
                </option>

                {estimatedBudgets.map(
                  (budget) => (
                    <option
                      key={budget.id}
                      value={budget.id}
                    >
                      {budget.name}
                    </option>
                  )
                )}
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
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select timeline
                </option>

                {expectedTimelines.map(
                  (timeline) => (
                    <option
                      key={timeline.id}
                      value={timeline.id}
                    >
                      {timeline.name}
                    </option>
                  )
                )}
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
            value={
              formData.additional_information
            }
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
          SUCCESS
      ===================================================== */}

      {success && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
          Service request submitted successfully.
        </div>
      )}

      {/* =====================================================
          TERMS + SUBMIT
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
            I agree that Chain-Tech may contact me
            regarding this service request.
          </span>
        </label>

        <Button
          type="submit"
          disabled={creating}
          className="mt-6 w-full rounded-xl px-6 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {creating
            ? "Submitting Service Request..."
            : "Submit Service Request"}
        </Button>

        <p className="mt-3 text-center text-xs text-slate-400">
          Your information will be used only to
          process your request.
        </p>
      </div>
    </Form>
  );
}