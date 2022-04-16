import { loginApi, signUpUserApi } from "./auth";
import {
  addHistoryVideo,
  getAllHistory,
  removeHistoryVideo,
  clearHistoryVideo,
} from "./history";

import { addToLike, getLikeVideos, removeLike } from "./likeapi";
import {
  addToWatchLater,
  getWatchLaterVideos,
  removeToWatchLater,
} from "./watchLater";

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
  getWatchLaterVideos,
  removeToWatchLater,
  addToWatchLater,
};
