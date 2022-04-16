import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singleVideo.css";
import axios from "axios";
import { Loader, VideoCard } from "../../components";
import { useData } from "../../context/VideoContext";
import { shuffleArray } from "../../utils/arraysManuPlation";

const SingleVideo = () => {
  const { videoId } = useParams();
  const {
    data: { videos },
  } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState();
  const [categoryVideos, setCategoryVideo] = useState([]);
  const getCategoryVideo = (categorys) => {
    const data = videos.filter((video) => video.category === categorys);
    const shufleVideo = shuffleArray(data);
    setCategoryVideo(shufleVideo);
  };

  const getVideo = async () => {
    try {
      setIsLoading(true);
      const {
        data: { video },
      } = await axios.get(`/api/video/${videoId}`);
      setVideo(video);
      getCategoryVideo(video.category);
      setIsLoading(false);
    } catch (error) {
      console.log("error is", error.message);
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="single-video-page">
      <div className="video-player">
        <iframe
          width="100%"
          height="35%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
        <div className="video-info">
          <div>
            <h2 className="video-title">{video?.title}</h2>
            <h3 className="video-creator">Creator {video?.creator}</h3>
          </div>

          <div className="user-btns">
            <div className="user-btn">
              <i className="fas fa-thumbs-up"></i>
              <span>Like</span>
            </div>
            <div className="user-btn">
              <i className="fas fa-clock"></i>
              <span>Watch Later</span>
            </div>
            <div className="user-btn">
              <i className="fas fa-share"></i>
              <span>Share</span>
            </div>
            <div className="user-btn">
              <i className="fas fa-play-circle"></i>
              <span>Save To</span>
            </div>
          </div>

          <div className="video-description">
            <p>{video?.description}</p>
          </div>
        </div>
      </div>
      <div className="suggest-videos">
        {categoryVideos &&
          categoryVideos?.map((video, index) => {
            return <VideoCard {...video} key={index} />;
          })}
      </div>
    </div>
  );
};

export default SingleVideo;
