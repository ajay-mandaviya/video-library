import React from "react";
import { useNavigate } from "react-router-dom";
import { EmptyPageBox, VideoCard } from "../../components";
import { useData } from "../../context";

import "./like.css";

const Liked = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  const {
    data: { liked_videos },
  } = useData();

  if (liked_videos.length === 0) {
    return (
      <div className="page-component ">
        <EmptyPageBox
          text={"You Have't Like any videos Click here Explore"}
          btnText={"Explore"}
          onClick={handleNavigate}
        />
      </div>
    );
  }

  return (
    <div className="page-component">
      <div className="pages-title">
        <h3>
          Liked {liked_videos.length > 0 && `${liked_videos.length} Videos`}
        </h3>
      </div>
      <div className="video-grid">
        {liked_videos?.map((video, index) => {
          return <VideoCard {...video} key={index} showLike = {true} />;
        })}
      </div>
    </div>
  );
};

export default Liked;
