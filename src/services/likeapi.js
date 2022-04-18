import axios from "axios";
import { DataAction } from "../constants";
import toast from "react-hot-toast";
export const getLikeVideos = async (dispatch, token) => {
  try {
    const {
      data: { likes },
    } = await axios.get("/api/user/likes", {
      headers: {
        authorization: token,
      },
    });

    dispatch({
      type: DataAction.SET_LIKE_VIDEOS,
      payload: likes,
    });
  } catch (error) {
    console.log("Error in get Liked videos", error);
  }
};

export const addToLike = async (video, token, dispatch) => {
  const toastId = toast.loading("adding...");
  try {
    const {
      data: { likes },
    } = await axios.post(
      "/api/user/likes",
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
      type: DataAction.SET_LIKE_VIDEOS,
      payload: likes,
    });
    toast.success("Video added to Like", {
      id: toastId,
    });
  } catch (error) {
    console.log("Erro in add to like", error);
    toast.error("try again", {
      id: toastId,
    });
  }
};

export const removeLike = async (id, token, dispatch) => {
  try {
    const {
      data: { likes },
    } = await axios.delete(`/api/user/likes/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: DataAction.SET_LIKE_VIDEOS,
      payload: likes,
    });
    toast.success("Video Remove from like");
  } catch (error) {
    toast.error("try again");
    console.log("error while remove from liked", error);
  }
};
