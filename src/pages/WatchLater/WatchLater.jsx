import React from "react";
import { useNavigate } from "react-router-dom";
import { EmptyPageBox, VideoCard } from "../../components";
import { useData } from "../../context";

const WatchLater = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  const {
    data: { watchLater_videos },
  } = useData();

  if (watchLater_videos.length === 0) {
    return (
      <div className="page-component ">
        <EmptyPageBox
          text={"You haven't added anything  in Watch Later."}
          btnText={"Start Adding"}
          onClick={handleNavigate}
        />
      </div>
    );
  }

  return (
    <div className="page-component">
      <div className="pages-title">
        <h3>
          Watch Later{" "}
          {watchLater_videos.length > 0 &&
            `(${watchLater_videos.length} Videos)`}
        </h3>
      </div>
      <div className="video-grid">
        {watchLater_videos?.map((video, index) => {
          return <VideoCard {...video} key={index} />;
        })}
      </div>
    </div>
  );
};
export default WatchLater;
