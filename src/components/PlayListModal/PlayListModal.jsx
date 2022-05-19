import React, { useState } from "react";
import { useAuth, useData } from "../../context";
import {
  addVideoToPlayList,
  createPlayList,
  deleteVideoFromPlayList,
} from "../../services";
import { isVideoInList } from "../../utils";
import "./playlistmodal.css";
import toast from "react-hot-toast";
const PlayListModal = ({ video, setIsPlayListOpen }) => {
  const {
    data: { playList },
    dispatch,
  } = useData();
  const {
    auth: { token },
  } = useAuth();
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const handleCreatePlayList = () => {
    setInputVisible(true);
  };
  const handleSavePlayList = () => {
    if (token) {
      createPlayList(playlistTitle, token, dispatch, (status) => {
        if (status === 201 || status === 200) {
          setInputVisible(false);
          setPlaylistTitle("");
        }
      });
    } else {
      toast.error("Please Login to Create");
    }
  };
  const handleCancel = () => {
    setInputVisible(false);
  };
  const handleAddPlayList = (e, listId) => {
    if (token) {
      if (e.target.checked) {
        addVideoToPlayList(listId, video, token, dispatch);
        console.log("value check");
      } else {
        deleteVideoFromPlayList(listId, video._id, token, dispatch);
        console.log("uncheck");
      }
    } else {
      toast.error("You are Not login");
    }
  };

  return (
    <div className="playlist-modal-body ref">
      <div className="playlist-modal">
        <div className="playlist-modal-header">
          <h3>Save to PlayList</h3>
          <i
            className="fas fa-window-close fa-2px"
            onClick={() => {
              setIsPlayListOpen(false);
            }}
          ></i>
        </div>
        <div className="line"></div>
        <div className="playlist-modal-list">
          {isInputVisible && (
            <label className="user-playlist">
              Name :{" "}
              <input
                type="text"
                placeholder="Enter PlayList Name"
                value={playlistTitle}
                onChange={(e) => setPlaylistTitle(e.target.value)}
              />
            </label>
          )}
          {playList.length === 0 ? (
            <p>Start Create a PlayList</p>
          ) : (
            playList.map((data) => {
              const isVideoInPlayList = isVideoInList(data.videos, video._id);

              return (
                <label className="user-playlist" key={data._id}>
                  <input
                    type="checkbox"
                    checked={isVideoInPlayList}
                    onChange={(e) => {
                      handleAddPlayList(e, data._id);
                    }}
                  />
                  {data.name}
                </label>
              );
            })
          )}
        </div>
        <div className="line"></div>
        <div className="playlist-modal-btn">
          {isInputVisible ? (
            <div className="user-select-btn">
              <button
                disabled={playlistTitle === ""}
                onClick={handleSavePlayList}
              >
                Save
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleCreatePlayList}>Create a playList</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayListModal;
