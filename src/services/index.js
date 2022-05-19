import { loginApi, signUpUserApi } from "./auth";
import { addToLike, getLikeVideos, removeLike } from "./likeapi";
import {
  addHistoryVideo,
  getAllHistory,
  removeHistoryVideo,
  clearHistoryVideo,
} from "./history";

import {
  getPlayList,
  deletePlayList,
  getUserPlayList,
  createPlayList,
  addVideoToPlayList,
  deleteVideoFromPlayList,
} from "./playlist";
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
  deletePlayList,
  getUserPlayList,
  createPlayList,
  getPlayList,
  addVideoToPlayList,
  deleteVideoFromPlayList,
};
