import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import joinusReducer from "./joinusSlice";
import professionalroleReducer from "./professionalroleSlice";
import experiencelevelReducer from "./experiencelevelSlice";
import skillsReducer from "./skillsSlice";
import estimatedBudgetReducer from "./estimatedbudgetSlice";
import expectedTimelineReducer from "./expectedtimelineSlice";
import serviceRequiredReducer from "./servicerequiredSlice";
import serviceRequestReducer from "./servicerequestSlice";


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