import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import joinusReducer from "./joinusSlice";
import professionalroleReducer from "./professionalroleSlice";
import experiencelevelReducer from "./experiencelevelSlice";
import skillsReducer from "./skillsSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    joinus: joinusReducer,
     professionalRole: professionalroleReducer,
    experienceLevel: experiencelevelReducer,
    skills: skillsReducer,
  },
});

export default store;