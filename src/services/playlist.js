import axios from "axios";
import { DataAction } from "../constants";
import toast from "react-hot-toast";

export const getUserPlayList = async (token, dispatch) => {
  try {
    const {
      data: { playlists },
      status,
    } = await axios.get("/api/user/playlists", {
      headers: {
        authorization: token,
      },
    });
    if (status === 200) {
      dispatch({
        type: DataAction.SET_USER_PLAYLIST,
        payload: playlists,
      });
    }
  } catch (error) {
    console.log("error while get user playlist", error);
  }
};

export const createPlayList = async (name, token, dispatch, callBack) => {
  const toastId = toast.loading("Creating...");
  try {
    const {
      data: { playlists },
      status,
    } = await axios.post(
      "/api/user/playlists",
      {
        playlist: { name: name, description: " " },
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200 || status === 201) {
      dispatch({
        type: DataAction.SET_USER_PLAYLIST,
        payload: playlists,
      });
      callBack(status);
      toast.success("playList create successfully", {
        id: toastId,
      });
    }
  } catch (error) {
    console.log("error while add to playlist", error);
    toast.error("Try again", {
      id: toastId,
    });
  }
};

export const deletePlayList = async (id, token, dispatch) => {
  const toastId = toast.loading("Creating...");
  try {
    const {
      data: { playlists },
      status,
    } = await axios.delete(`/api/user/playlists/${id}`, {
      headers: {
        authorization: token,
      },
    });
    // console.log("delete playlist", data);
    if (status === 200) {
      dispatch({
        type: DataAction.SET_USER_PLAYLIST,
        payload: playlists,
      });
      toast.success("playList Delete successfully", {
        id: toastId,
      });
    }
  } catch (error) {
    toast.error("Try again", {
      id: toastId,
    });
    console.log("error while delete to playlist", error);
  }
};

export const getPlayList = async (playListId, token) => {};

export const addVideoToPlayList = async (listId, video, token, dispatch) => {
  const toastId = toast.loading("Adding to PlayList...");
  try {
    const {
      data: { playlist },
      status,
    } = await axios.post(
      `/api/user/playlists/${listId}`,
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (status === 200 || status === 201) {
      dispatch({
        type: DataAction.ADD_VIDEO_PLAYLIST,
        payload: playlist,
      });
      toast.success("Video Added SuccessFully", {
        id: toastId,
      });
    }
  } catch (error) {
    toast.error("Try Again", {
      id: toastId,
    });
    console.log("erro while adding to playlist video", error);
  }
};

export const deleteVideoFromPlayList = async (
  listId,
  videoId,
  token,
  dispatch
) => {
  const toastId = toast.loading("Deleting....");
  try {
    const {
      data: { playlist },
      status,
    } = await axios.delete(`/api/user/playlists/${listId}/${videoId}`, {
      headers: {
        authorization: token,
      },
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: DataAction.ADD_VIDEO_PLAYLIST,
        payload: playlist,
      });
      toast.success("Video Remove Successfully", {
        id: toastId,
      });
    }
  } catch (error) {
    toast.error("Try again", {
      id: toastId,
    });
    console.log("error while delete video playlist", error);
  }
};
