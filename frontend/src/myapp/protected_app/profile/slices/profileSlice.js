const initialState = {
  profile: null,

  loading: false,
  updating: false,
  creating: false,
  deleting: false,

  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    // ==========================================
    // FETCH PROFILE
    // ==========================================
    case "profile/fetchProfileStart":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "profile/fetchProfileSuccess":
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: null,
      };

    case "profile/fetchProfileFailure":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ==========================================
    // CREATE PROFILE
    // ==========================================
    case "profile/createProfileStart":
      return {
        ...state,
        creating: true,
        error: null,
      };

    case "profile/createProfileSuccess":
      return {
        ...state,
        creating: false,
        profile: action.payload,
        error: null,
      };

    case "profile/createProfileFailure":
      return {
        ...state,
        creating: false,
        error: action.payload,
      };

    // ==========================================
    // UPDATE PROFILE
    // ==========================================
    case "profile/updateProfileStart":
      return {
        ...state,
        updating: true,
        error: null,
      };

    case "profile/updateProfileSuccess":
      return {
        ...state,
        updating: false,
        profile: action.payload,
        error: null,
      };

    case "profile/updateProfileFailure":
      return {
        ...state,
        updating: false,
        error: action.payload,
      };

    // ==========================================
    // DELETE PROFILE
    // ==========================================
    case "profile/deleteProfileStart":
      return {
        ...state,
        deleting: true,
        error: null,
      };

    case "profile/deleteProfileSuccess":
      return {
        ...state,
        deleting: false,
        profile: null,
        error: null,
      };

    case "profile/deleteProfileFailure":
      return {
        ...state,
        deleting: false,
        error: action.payload,
      };

    // ==========================================
    // DEFAULT
    // ==========================================
    default:
      return state;
  }
};

export default profileReducer;