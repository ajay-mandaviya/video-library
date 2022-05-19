import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../context";
import { addHistoryVideo, deleteVideoFromPlayList } from "../../services";
import { isVideoInList } from "../../utils";
import toast from "react-hot-toast";
const PlayListVideoCard = (props) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const navigate = useNavigate();
  const {
    data: { history_videos, playList },
    dispatch,
  } = useData();
  const {
    auth: { token },
  } = useAuth();
  const { _id, title, uploaded, creator, playlistId } = props;
  const isInHistory = isVideoInList(history_videos, _id);
  const handleVideoNavigate = () => {
    navigate(`/video/${_id}`);
    if (!isInHistory && token) {
      addHistoryVideo(token, props, dispatch);
    }
  };
  const handleVideoOption = () => {
    setIsOptionOpen((prev) => !prev);
  };
  const removePlayListVideo = () => {
    if (token) {
      deleteVideoFromPlayList(playlistId, _id, token, dispatch);
    } else {
      toast.error("You are Not Login");
    }
  };
  return (
    <>
      <div className="card" key={_id}>
        <div onClick={handleVideoNavigate}>
          <img
            src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
            alt="card-imgs"
            className="card-img"
          />
        </div>
        <div className="card-description">
          <div className="card-info">
            <div className="card-subtitle">
              {title.slice(0, 30).concat("...")}
            </div>
            <div>
              <button className="ellipsis-btn" onClick={handleVideoOption}>
                <i className="fas fa-ellipsis-v"></i>
              </button>{" "}
            </div>
          </div>
          <div className="card-info">
            <div className="card-subtitle">{creator}</div>
            <div>{uploaded}</div>
          </div>
        </div>
      </div>
      {isOptionOpen && (
        <div className="video-card-option">
          <div onClick={removePlayListVideo}>
            <i className="fas fa-play-circle"></i> Remove to PlayList
          </div>
        </div>
      )}
    </>
  );
};

export default PlayListVideoCard;
