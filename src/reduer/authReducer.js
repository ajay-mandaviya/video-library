export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
      };

    default:
      return state;
  }
};
