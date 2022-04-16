import axios from "axios";
import { DataAction } from "../constants";
export const getAllHistory = async (token, dispatch) => {
  try {
    const {
      data: { history },
    } = await axios.get("/api/user/history", {
      headers: {
        authorization: token,
      },
    });
    // console.log("histroy videos", data);
    dispatch({
      type: DataAction.SET_HISTORY_VIDEOS,
      payload: history,
    });
  } catch (error) {
    console.log("Error while get history", error);
  }
};
export const addHistoryVideo = async (token, video, dispatch) => {
  console.log("adding video into history");
  try {
    const {
      data: { history },
    } = await axios.post(
      "/api/user/history",
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
      type: DataAction.SET_HISTORY_VIDEOS,
      payload: history,
    });
  } catch (error) {
    console.log("Error while add history", error);
  }
};
export const removeHistoryVideo = async (token, id, dispatch) => {
  try {
    const {
      data: { history },
    } = await axios.delete(`/api/user/history/${id}`, {
      headers: {
        authorization: token,
      },
    });

    dispatch({
      type: DataAction.SET_HISTORY_VIDEOS,
      payload: history,
    });
  } catch (error) {
    console.log("Error while add remove history", error);
  }
};
export const clearHistoryVideo = async (token, dispatch) => {
  try {
    const {
      data: { history },
    } = await axios.delete(`/api/user/history/all`, {
      headers: {
        authorization: token,
      },
    });

    dispatch({
      type: DataAction.SET_HISTORY_VIDEOS,
      payload: history,
    });
  } catch (error) {
    console.log("Error while add cleat history", error);
  }
};
