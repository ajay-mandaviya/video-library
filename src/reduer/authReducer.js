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

    default:
      return state;
  }
};
