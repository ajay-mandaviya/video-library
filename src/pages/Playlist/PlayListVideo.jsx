import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components";
import { useData } from "../../context";
import PlayListVideoCard from "./PlayListVideoCard";

const PlayListVideo = () => {
  const {
    data: { playList },
  } = useData();

  const [isPlayListVideoLoading, setIsPlayListVideoLoading] = useState(true);
  const { playlistId } = useParams();
  console.log("params id is", playlistId);

  setTimeout(() => {
    setIsPlayListVideoLoading(false);
  }, 1000);

  const playListVideo = playList.find((list) => list._id === playlistId);

  console.log("playListVideo", playListVideo.videos);

  if (isPlayListVideoLoading) {
    return <Loader />;
  }

  return (
    <div className="page-component">
      <div className="video-grid">
        {playListVideo.videos.length > 0
          ? playListVideo.videos.map((video, index) => {
              return (
                <PlayListVideoCard
                  {...video}
                  key={index}
                  playlistId={playlistId}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default PlayListVideo;
