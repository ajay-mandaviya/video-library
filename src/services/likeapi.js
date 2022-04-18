import axios from "axios";
import { DataAction } from "../constants";

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
  } catch (error) {
    console.log("Erro in add to like", error);
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
    console.log("data after delte", likes);
  } catch (error) {
    console.log("error while remove from liked", error);
  }
};
