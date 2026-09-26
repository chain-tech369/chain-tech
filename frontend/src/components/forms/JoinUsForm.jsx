// src/components/forms/JoinUsForm.jsx

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Form from "../uis/Form";
import Input from "../uis/Input";
import Button from "../uis/Button";

import {
  createJoinUs,
} from "../../actions/joinusActions";

import {
  fetchProfessionalRoles,
} from "../../actions/professionalroleActions";

import {
  fetchExperienceLevels,
} from "../../actions/experiencelevelActions";

import {
  fetchSkills,
} from "../../actions/skillsActions";


export default function JoinUsForm() {

  // =========================================================
  // REDUX DISPATCH
  // =========================================================

  const dispatch = useDispatch();


  // =========================================================
  // JOIN US REDUX STATE
  // =========================================================

  const {
    loading,
    error,
    success,
  } = useSelector(
    (state) => state.joinus
  );


  // =========================================================
  // PROFESSIONAL ROLE REDUX STATE
  // =========================================================

  const {
    roles = [],
    loading: rolesLoading,
    error: rolesError,
  } = useSelector(
    (state) => state.professionalRole
  );


  // =========================================================
  // EXPERIENCE LEVEL REDUX STATE
  // =========================================================

  const {
    experiences = [],
    loading: experiencesLoading,
    error: experiencesError,
  } = useSelector(
    (state) => state.experienceLevel
  );


  // =========================================================
  // SKILLS & TECHNOLOGIES REDUX STATE
  // =========================================================

  const {
    skills = [],
    loading: skillsLoading,
    error: skillsError,
  } = useSelector(
    (state) => state.skills
  );


  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    professional_role_id: "",

    skill_ids: [],

    experience_id: "",

    github: "",

    portfolio: "",

    linkedin: "",

    message: "",

    terms: false,

  });


  // =========================================================
  // LOAD PROFESSIONAL ROLES
  // LOAD EXPERIENCE LEVELS
  // LOAD SKILLS & TECHNOLOGIES
  // =========================================================

  useEffect(() => {

    dispatch(
      fetchProfessionalRoles()
    );

    dispatch(
      fetchExperienceLevels()
    );

    dispatch(
      fetchSkills()
    );

  }, [dispatch]);


  // =========================================================
  // HANDLE NORMAL INPUT CHANGES
  // =========================================================

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


  // =========================================================
  // HANDLE SKILLS & TECHNOLOGIES DROPDOWN CHANGE
  // =========================================================

  const handleSkillsChange = (event) => {

    const selectedSkillId =
      event.target.value;


    setFormData((previous) => ({

      ...previous,

      skill_ids:
        selectedSkillId
          ? [Number(selectedSkillId)]
          : [],

    }));

  };


  // =========================================================
  // HANDLE FORM SUBMISSION
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault();


    // -------------------------------------------------------
    // MAKE SURE TERMS ARE ACCEPTED
    // -------------------------------------------------------

    if (!formData.terms) {

      return;

    }


    // -------------------------------------------------------
    // MAKE SURE PROFESSIONAL ROLE IS SELECTED
    // -------------------------------------------------------

    if (!formData.professional_role_id) {

      return;

    }


    // -------------------------------------------------------
    // MAKE SURE EXPERIENCE LEVEL IS SELECTED
    // -------------------------------------------------------

    if (!formData.experience_id) {

      return;

    }


    // -------------------------------------------------------
    // MAKE SURE AT LEAST ONE SKILL IS SELECTED
    // -------------------------------------------------------

    if (formData.skill_ids.length === 0) {

      return;

    }


    // -------------------------------------------------------
    // PREPARE DATA FOR FASTAPI
    // -------------------------------------------------------

    const applicationData = {

      name:
        formData.name,

      email:
        formData.email,

      phone:
        formData.phone,

      professional_role_id:
        Number(
          formData.professional_role_id
        ),

      experience_id:
        Number(
          formData.experience_id
        ),

      skills:
        formData.skill_ids,

      github:
        formData.github || null,

      portfolio:
        formData.portfolio || null,

      linkedin:
        formData.linkedin || null,

      message:
        formData.message,

      terms:
        formData.terms,

    };


    // -------------------------------------------------------
    // SEND DATA THROUGH REDUX
    // -------------------------------------------------------

    const result = await dispatch(
      createJoinUs(
        applicationData
      )
    );


    // -------------------------------------------------------
    // RESET FORM AFTER SUCCESS
    // -------------------------------------------------------

    if (
      createJoinUs.fulfilled.match(
        result
      )
    ) {

      setFormData({

        name: "",

        email: "",

        phone: "",

        professional_role_id: "",

        skill_ids: [],

        experience_id: "",

        github: "",

        portfolio: "",

        linkedin: "",

        message: "",

        terms: false,

      });

    }

  };


  // =========================================================
  // RETURN FORM
  // =========================================================

  return (

    <Form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* =====================================================
          NAME + EMAIL + PHONE
      ====================================================== */}

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


        <Input
          id="phone"
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="+254 700 000 000"
          value={formData.phone}
          onChange={handleChange}
          required
        />

      </div>


      {/* =====================================================
          PROFESSIONAL ROLE
      ====================================================== */}

      <div>

        <label
          htmlFor="professional_role_id"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Professional Role
        </label>


        <select
          id="professional_role_id"
          name="professional_role_id"
          value={
            formData.professional_role_id
          }
          onChange={handleChange}
          required
          disabled={rolesLoading}
          className="w-full rounded-xl border border-slate-300
                     bg-white px-4 py-3 outline-none transition
                     focus:border-blue-600 focus:ring-2
                     focus:ring-blue-100
                     disabled:cursor-not-allowed
                     disabled:bg-slate-100"
        >

          <option value="">

            {rolesLoading
              ? "Loading professional roles..."
              : "Select your role"
            }

          </option>


          {roles.map((role) => (

            <option
              key={role.id}
              value={role.id}
            >
              {role.name}
            </option>

          ))}

        </select>


        {/* ROLE ERROR */}

        {rolesError && (

          <p className="mt-2 text-sm text-red-600">

            Failed to load professional roles.

          </p>

        )}

      </div>


      {/* =====================================================
          SKILLS & TECHNOLOGIES
      ====================================================== */}

      <div>

        <label
          htmlFor="skill_ids"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Skills & Technologies
        </label>


        <select
          id="skill_ids"
          name="skill_ids"
          value={
            formData.skill_ids.length > 0
              ? String(formData.skill_ids[0])
              : ""
          }
          onChange={handleSkillsChange}
          required
          disabled={skillsLoading}
          className="w-full rounded-xl border border-slate-300
                     bg-white px-4 py-3
                     outline-none transition
                     focus:border-blue-600
                     focus:ring-2
                     focus:ring-blue-100
                     disabled:cursor-not-allowed
                     disabled:bg-slate-100"
        >

          <option value="">

            {skillsLoading
              ? "Loading skills & technologies..."
              : "Select a skill or technology"
            }

          </option>


          {skills.map((skill) => (

            <option
              key={skill.id}
              value={skill.id}
            >
              {skill.name}
            </option>

          ))}

        </select>


        {/* SKILLS & TECHNOLOGIES ERROR */}

        {skillsError && (

          <p className="mt-2 text-sm text-red-600">

            Failed to load skills and technologies.

          </p>

        )}

      </div>


      {/* =====================================================
          EXPERIENCE LEVEL
      ====================================================== */}

      <div>

        <label
          htmlFor="experience_id"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Experience Level
        </label>


        <select
          id="experience_id"
          name="experience_id"
          value={
            formData.experience_id
          }
          onChange={handleChange}
          required
          disabled={experiencesLoading}
          className="w-full rounded-xl border border-slate-300
                     bg-white px-4 py-3
                     outline-none transition
                     focus:border-blue-600
                     focus:ring-2
                     focus:ring-blue-100
                     disabled:cursor-not-allowed
                     disabled:bg-slate-100"
        >

          <option value="">

            {experiencesLoading
              ? "Loading experience levels..."
              : "Select experience"
            }

          </option>


          {experiences.map(
            (experience) => (

              <option
                key={experience.id}
                value={experience.id}
              >
                {experience.name}
              </option>

            )
          )}

        </select>


        {/* EXPERIENCE ERROR */}

        {experiencesError && (

          <p className="mt-2 text-sm text-red-600">

            Failed to load experience levels.

          </p>

        )}

      </div>


      {/* =====================================================
          GITHUB + PORTFOLIO
      ====================================================== */}

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


      {/* =====================================================
          LINKEDIN
      ====================================================== */}

      <Input
        id="linkedin"
        name="linkedin"
        label="LinkedIn"
        type="url"
        placeholder="https://linkedin.com/in/username"
        value={formData.linkedin}
        onChange={handleChange}
      />


      {/* =====================================================
          MESSAGE
      ====================================================== */}

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
                     border border-slate-300
                     px-4 py-3
                     outline-none transition
                     focus:border-blue-600
                     focus:ring-2
                     focus:ring-blue-100"
        />

      </div>


      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {success && (

        <div
          className="rounded-lg bg-green-50
                     p-3 text-sm text-green-600"
        >

          Application submitted successfully.

        </div>

      )}


      {/* =====================================================
          ERROR MESSAGE
      ====================================================== */}

      {error && (

        <div
          className="rounded-lg bg-red-50
                     p-3 text-sm text-red-600"
        >

          {typeof error === "string"
            ? error
            : "Failed to submit application."
          }

        </div>

      )}


      {/* =====================================================
          TERMS
      ====================================================== */}

      <label
        className="flex items-start gap-3
                   text-sm text-slate-600"
      >

        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          required
          className="mt-1 h-4 w-4"
        />


        <span>

          I confirm that the information
          provided is accurate and I agree
          to Chain-Tech reviewing my
          application.

        </span>

      </label>


      {/* =====================================================
          SUBMIT BUTTON
      ====================================================== */}

      <Button
        type="submit"
        disabled={loading}
        className="w-full
                   disabled:cursor-not-allowed
                   disabled:opacity-50"
      >

        {loading
          ? "Submitting Application..."
          : "Submit Application"
        }

      </Button>


      {/* =====================================================
          LOGIN LINK
      ====================================================== */}

      <p
        className="mt-6 text-center
                   text-sm text-slate-500"
      >

        Already have a Chain-Tech account?{" "}


        <Link
          to="/login"
          className="font-semibold
                     text-blue-600
                     hover:text-blue-800"
        >
          Login
        </Link>

      </p>

    </Form>

  );

}