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
    case DataAction.SET_WATCH_LATER_VIDEOS:
      return {
        ...state,
        watchLater_videos: [...action.payload],
      };
    case DataAction.SET_SORT_CATEGORY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case DataAction.SET_SEARCH_VIDEO:
      return {
        ...state,
        searchBy: action.payload,
      };
    case DataAction.SET_USER_PLAYLIST:
      return {
        ...state,
        playList: action.payload,
      };
    case DataAction.ADD_VIDEO_PLAYLIST:
      return {
        ...state,
        playList: state.playList.map((list) =>
          list._id === action.payload._id ? action.payload : list
        ),
      };
     case DataAction.SET_USER_LOGOUT : return{
       ...state,
       playList : [],
       watchLater_videos: [],
       history_videos : [],
      liked_videos : []
     } 
    default:
      return state;
  }
};
