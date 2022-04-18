import axios from "axios";
import { DataAction } from "../constants";
import toast from "react-hot-toast";
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
  const toastId = toast.loading("adding...");
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
    toast.success("Video added to watchLater", {
      id: toastId,
    });
  } catch (error) {
    console.log("error in add to watch later", error);
    toast.error("try again", {
      id: toastId,
    });
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
    toast.success("Video Remove from watch Later");
  } catch (error) {
    toast.error("try again");
    console.log("error in remove watch later", error);
  }
};
