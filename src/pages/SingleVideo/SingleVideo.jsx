import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singleVideo.css";
import axios from "axios";
import { Loader, PlayListModal } from "../../components";
import { useData } from "../../context/VideoContext";
import { isVideoInList } from "../../utils";
import { useAuth } from "../../context";
import toast from "react-hot-toast";
import {
  addHistoryVideo,
  addToLike,
  addToWatchLater,
  removeLike,
  removeToWatchLater,
} from "../../services";

const SingleVideo = () => {
  const { videoId } = useParams();

  const {
    data: { liked_videos, history_videos, watchLater_videos },
    dispatch,
  } = useData();
  console.log("watchLater_videos", watchLater_videos);
  const isInLike = isVideoInList(liked_videos, videoId);
  const isInHistory = isVideoInList(history_videos, videoId);
  const isInWatchLater = isVideoInList(watchLater_videos, videoId);
  const {
    auth: { token },
  } = useAuth();
  const [video, setVideo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayListOpen, setIsPlayListOpen] = useState(false);
  const getVideo = async () => {
    try {
      setIsLoading(true);
      const {
        data: { video },
      } = await axios.get(`/api/video/${videoId}`);
      setVideo(video);
      setIsLoading(false);
    } catch (error) {
      console.log("error is", error.message);
    }
  };
  useEffect(() => {
    getVideo();
  }, []);
  const handleLike = () => {
    if (token) {
      if (isInLike) {
        removeLike(videoId, token, dispatch);
      } else {
        addToLike(video, token, dispatch);
      }
    } else {
      toast.error("Please Login to Like Video");
    }
  };

  const handleAddToWatchLater = () => {
    if (token) {
      if (isInWatchLater) {
        removeToWatchLater(videoId, token, dispatch);
      } else {
        addToWatchLater(video, token, dispatch);
      }
    } else {
      toast.error("Please Login to add Video");
    }
  };

  const handleOpenPlayList = () => {
    setIsPlayListOpen(!isPlayListOpen);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="single-video-page">
        <div className="video-player">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
          <div className="video-info">
            <div>
              <h2 className="video-title">{video?.title}</h2>
              <h3 className="video-creator">Creator : {video?.creator}</h3>
            </div>

            <div className="user-btns">
              <div
                className={`${
                  isInLike ? "user-btn user-btn-active" : "user-btn"
                }`}
                onClick={handleLike}
              >
                <i
                  className={`${
                    isInLike ? "fas fa-thumbs-up" : "far fa-thumbs-up"
                  }`}
                ></i>
                <span>{isInLike ? "Liked" : "Like"}</span>
              </div>
              <div
                className={`${
                  isInWatchLater ? "user-btn user-btn-active" : "user-btn"
                }`}
                onClick={handleAddToWatchLater}
              >
                <i
                  className={`${
                    isInWatchLater ? "fas fa-clock" : "far fa-clock"
                  }`}
                ></i>

                <span>
                  {isInWatchLater ? "Add WatchLater" : "Remove WatchLater"}
                </span>
              </div>
              <div className="user-btn">
                <i className="fas fa-share"></i>
                <span>Share</span>
              </div>
              <div className="user-btn" onClick={handleOpenPlayList}>
                <i className="fas fa-play-circle"></i>
                <span>Save To</span>
              </div>
            </div>

            <div className="video-description">
              <p>{video?.description}</p>
            </div>
          </div>
        </div>
        <div className="suggest-videos">{/* here cateogry videos */}</div>
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

export default SingleVideo;
