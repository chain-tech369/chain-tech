import { configureStore } from "@reduxjs/toolkit";

// Protected reducers
import {
  authReducer,
  userReducer,
  profileReducer,
  joinUsReducer,
  serviceRequestReducer,
} from "../myapp/protected_app/indexslice";

// Admin reducers
import {
  professionalRoleReducer,
  experienceLevelReducer,
  skillsReducer,
  estimatedBudgetReducer,
  expectedTimelineReducer,
  serviceRequiredReducer,
} from "../myapp/admin_app/indexslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    joinUs: joinUsReducer,

    professionalRole: professionalRoleReducer,
    experienceLevel: experienceLevelReducer,
    skills: skillsReducer,
    estimatedBudget: estimatedBudgetReducer,
    expectedTimeline: expectedTimelineReducer,
    serviceRequired: serviceRequiredReducer,

    serviceRequest: serviceRequestReducer,
  },
});

export default store;