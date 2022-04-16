import { Authaction } from "../constants";

export const authReducer = (state, action) => {
  console.log("inside the auth reducer");
  switch (action.type) {
    case Authaction.SET_TOKEN:
      console.log("setting token", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    case Authaction.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
