import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../context";
import { addHistoryVideo } from "../../services";
import { isVideoInList } from "../../utils";
import VideoOption from "../VideoOption/VideoOption";
import "./videocard.css";
const VideoCard = (props) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const cardRef = useRef();
  const navigate = useNavigate();
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
    setIsOptionOpen(!isOptionOpen);
  };
  const handleVideoNavigate = () => {
    navigate(`/video/${_id}`);
    if (!isInHistory && token) {
      addHistoryVideo(token, props, dispatch);
    }
  };

  return (
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
            {isOptionOpen && (
              <VideoOption
                isOptionOpen={isOptionOpen}
                setIsOptionOpen={setIsOptionOpen}
                props={props}
                cardRef={cardRef}
                isInWatchLater={isInWatchLater}
                video={props}
                dispatch={dispatch}
                isInLike={isInLike}
                showLike={showLike}
                showHistory={showHistory}
                isInHistory={isInHistory}
              />
            )}
          </div>
        </div>
        <div className="card-info">
          <div className="card-subtitle">{creator}</div>
          <div>{uploaded}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
