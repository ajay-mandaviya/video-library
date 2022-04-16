import { loginApi, signUpUserApi } from "./auth";
import {
  addHistoryVideo,
  getAllHistory,
  removeHistoryVideo,
  clearHistoryVideo,
} from "./history";
import { addToLike, getLikeVideos, removeLike } from "./likeapi";

export {
  loginApi,
  signUpUserApi,
  getLikeVideos,
  addToLike,
  removeLike,
  getAllHistory,
  removeHistoryVideo,
  addHistoryVideo,
  clearHistoryVideo,
};
