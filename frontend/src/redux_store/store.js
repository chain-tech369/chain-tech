import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../myapp/protected_app/auth/slices/authSlice";
import userReducer from "../myapp/protected_app/user/slices/userSlice";
import profileReducer from "../myapp/protected_app/profile/slices/profileSlice";
import joinusReducer from "../myapp/protected_app/join_us/slices/joinusSlice";
import professionalroleReducer from "../myapp/admin_app/professional_role/slices/professionalroleSlice";
import experiencelevelReducer from "./experiencelevelSlice";
import skillsReducer from "./skillsSlice";
import estimatedBudgetReducer from "./estimatedbudgetSlice";
import expectedTimelineReducer from "../myapp/admin_app/estimated_timeline/slices/expectedtimelineSlice";
import serviceRequiredReducer from "./servicerequiredSlice";
import serviceRequestReducer from "../myapp/protected_app/service_request/slices/servicerequestSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    joinus: joinusReducer,
     professionalRole: professionalroleReducer,
    experienceLevel: experiencelevelReducer,
    skills: skillsReducer,
    estimatedBudget: estimatedBudgetReducer,
    expectedTimeline: expectedTimelineReducer,
     serviceRequired: serviceRequiredReducer,
     serviceRequest: serviceRequestReducer,
  },
});

export default store;