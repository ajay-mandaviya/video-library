import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../context";
import { addHistoryVideo } from "../../services";
import { isVideoInList } from "../../utils";
import PlayListModal from "../PlayListModal/PlayListModal";
import {
  addToWatchLater,
  removeHistoryVideo,
  removeLike,
  removeToWatchLater,
} from "../../services";
import "./videocard.css";
import toast from "react-hot-toast";
const VideoCard = (props) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isPlayListOpen, setIsPlayListOpen] = useState(false);
  const cardRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (
        isOptionOpen &&
        cardRef?.current &&
        !cardRef?.current?.contains(e.target)
      ) {
        setIsOptionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [isOptionOpen]);

  const {
    data: { history_videos, watchLater_videos, playList, liked_videos },
    dispatch,
  } = useData();
  const {
    auth: { token },
  } = useAuth();
  const { _id, title, uploaded, creator, showLike, showHistory } = props;
  const isInHistory = isVideoInList(history_videos, _id);
  const isInWatchLater = isVideoInList(watchLater_videos, _id);
  const isInLike = isVideoInList(liked_videos, _id);

  const handleVideoOption = () => {
    setIsOptionOpen(true);
  };
  const handleVideoNavigate = () => {
    navigate(`/video/${_id}`);
    if (!isInHistory && token) {
      addHistoryVideo(token, props, dispatch);
    }
  };

  const handleAddToWatchLater = () => {
    if (token) {
      if (isInWatchLater) {
        removeToWatchLater(props._id, token, dispatch);
      } else {
        addToWatchLater(props, token, dispatch);
      }
    } else {
      toast.error("Please Login to add Video");
    }
    setIsOptionOpen(false);
  };
  const handleAddToPlayList = () => {
    setIsPlayListOpen((prev) => !prev);
  };

  const handleRemoveLike = () => {
    removeLike(props._id, token, dispatch);
    setIsOptionOpen(false);
  };

  const handleRemoveHistory = () => {
    removeHistoryVideo(props._id, token, dispatch);
    setIsOptionOpen(false);
  };

  return (
    <div className="card ref" key={_id}>
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
            {isOptionOpen && (
              <div className="video-card-option ref" ref={cardRef}>
                <div onClick={handleAddToWatchLater}>
                  <i
                    className={`${
                      isInWatchLater ? "fas fa-clock" : "far fa-clock"
                    }`}
                  ></i>
                  {isInWatchLater ? "Remove Watch Later" : "Add to Watch Later"}
                </div>
                <div onClick={handleAddToPlayList}>
                  <i className="fas fa-play-circle"></i> Add to Play List
                </div>
                {isInLike && showLike && (
                  <div onClick={handleRemoveLike}>
                    <i className="fas fa-trash"></i> Remove From Liked
                  </div>
                )}
                {isInHistory && showHistory && (
                  <div onClick={handleRemoveHistory}>
                    <i className="fas fa-trash"></i> Remove From History
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="card-info">
          <div className="card-subtitle">{creator}</div>
          <div>{uploaded}</div>
        </div>
      </div>
      {isPlayListOpen && (
        <PlayListModal
          isPlayListOpen={isPlayListOpen}
          setIsPlayListOpen={setIsPlayListOpen}
          video={props}
        />
      )}
    </div>
  );
};

export default VideoCard;
