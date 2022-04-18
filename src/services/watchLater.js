import axios from "axios";
import { DataAction } from "../constants";

export const getWatchLaterVideos = async (token, dispatch) => {
  try {
    const {
      data: { watchlater },
    } = await axios.get("/api/user/watchlater", {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: DataAction.SET_WATCH_LATER_VIDEOS,
      payload: watchlater,
    });
  } catch (error) {
    console.log("get error in get watch later", error);
  }
};

export const addToWatchLater = async (video, token, dispatch) => {
  try {
    const {
      data: { watchlater },
    } = await axios.post(
      "/api/user/watchlater",
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({
      type: DataAction.SET_WATCH_LATER_VIDEOS,
      payload: watchlater,
    });
  } catch (error) {
    console.log("error in add to watch later", error);
  }
};

export const removeToWatchLater = async (id, token, dispatch) => {
  try {
    const {
      data: { watchlater },
    } = await axios.delete(`/api/user/watchlater/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: DataAction.SET_WATCH_LATER_VIDEOS,
      payload: watchlater,
    });
  } catch (error) {
    console.log("error in remove watch later", error);
  }
};
