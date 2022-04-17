import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { DataAction } from "../constants";
import { dataReducer } from "../reduer";
import { shuffleArray } from "../utils/arraysManuPlation";

const DataProvider = createContext();

const VideoProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, {
    isDataLoading: true,
    videos: [],
    playList: [],
    category: [],
    history_videos: [],
    liked_videos: [],
    watchLater_videos: [],
    sortBy: "",
    searchBy: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { categories },
        } = await axios.get("/api/categories");
        dispatch({
          type: DataAction.SET_CATEGORIES,
          payload: categories,
        });
      } catch (error) {
        console.log("Error while get category", error);
      }
    })();
  }, []);

  const getAllVideos = async () => {
    try {
      const {
        data: { videos },
      } = await axios.get("/api/videos");
      const shuffleVideos = shuffleArray(videos);
      dispatch({
        type: DataAction.SET_VIDEOS,
        payload: shuffleVideos,
      });
    } catch (error) {
      console.log("error while get vudeis", error);
    }
  };
  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <DataProvider.Provider value={{ data, dispatch }}>
      {children}
    </DataProvider.Provider>
  );
};

export const useData = () => useContext(DataProvider);

export default VideoProvider;
