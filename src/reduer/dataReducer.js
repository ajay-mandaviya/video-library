import { DataAction } from "../constants";
export const dataReducer = (state, action) => {
  switch (action.type) {
    case DataAction.SET_VIDEOS:
      return {
        ...state,
        videos: [...action.payload],
      };
    case DataAction.SET_CATEGORIES:
      return {
        ...state,
        category: [...action.payload],
      };
    case DataAction.SET_LIKE_VIDEOS:
      return {
        ...state,
        liked_videos: [...action.payload],
      };
    case DataAction.SET_HISTORY_VIDEOS:
      return {
        ...state,
        history_videos: [...action.payload],
      };
    default:
      return state;
  }
};
