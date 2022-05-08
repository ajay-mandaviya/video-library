import { Authaction } from "../constants";

export const authReducer = (state, action) => {
  switch (action.type) {
    case Authaction.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case Authaction.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Authaction.SET_AUTH_LOGOUT:
      return {
        ...state,
        user: {},
        token: "",
      };
    default:
      return state;
  }
};
