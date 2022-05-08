import React, { useEffect, useState } from "react";
import { useAuth } from "../../context";
import {
  addToWatchLater,
  removeHistoryVideo,
  removeLike,
  removeToWatchLater,
} from "../../services";
import toast from "react-hot-toast";
import "./videoOption.css";
import PlayListModal from "../PlayListModal/PlayListModal";

const VideoOption = ({
  cardRef,
  isOptionOpen,
  setIsOptionOpen,
  isInWatchLater,
  video,
  dispatch,
  isInLike,
  isInHistory,
  showLike,
  showHistory,
}) => {
  const {
    auth: { token },
  } = useAuth();

  const [isPlayListOpen, setIsPlayListOpen] = useState(false);

  console.log("isPlayListOpen", isPlayListOpen);

  // useEffect(() => {
  //   const handleOutSideClick = (e) => {
  //     console.log("cardRef", cardRef?.current);
  //     if (
  //       isOptionOpen &&
  //       cardRef?.current &&
  //       !cardRef?.current?.contains(e.target)
  //     ) {
  //       setIsOptionOpen(false);
  //     } else if (e.target.classList.contains("playlist-modal")) {
  //       setIsOptionOpen(true);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleOutSideClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutSideClick);
  //   };
  // }, []);

  const handleAddToWatchLater = () => {
    if (token) {
      if (isInWatchLater) {
        removeToWatchLater(video._id, token, dispatch);
      } else {
        addToWatchLater(video, token, dispatch);
      }
    } else {
      toast.error("Please Login to add Video");
    }
    setIsOptionOpen(false);
  };
  const handleAddToPlayList = () => {
    console.log("disable", isOptionOpen);
    setIsPlayListOpen((prev) => !prev);
  };

  const handleRemoveLike = () => {
    removeLike(video._id, token, dispatch);
    setIsOptionOpen(false);
  };

  const handleRemoveHistory = () => {
    removeHistoryVideo(video._id, token, dispatch);
    setIsOptionOpen(false);
  };
  return (
    <>
      <div className="video-card-option" ref={cardRef}>
        <div onClick={handleAddToWatchLater}>
          <i
            className={`${isInWatchLater ? "fas fa-clock" : "far fa-clock"}`}
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
      {isPlayListOpen && (
        <PlayListModal
          isPlayListOpen={isPlayListOpen}
          setIsPlayListOpen={setIsPlayListOpen}
          video={video}
        />
      )}
    </>
  );
};

export default VideoOption;
