import React from "react";
import { CategoryBtns, VideoCard } from "../../components";
import { useData } from "../../context";
import "./home.css";
const Home = () => {
  const {
    data: { videos, category, sortBy, searchBy },
  } = useData();
  const filterVideos = () => {
    let sortNewVideos = videos;
    if (searchBy) {
      sortNewVideos = sortNewVideos.filter((video) =>
        video.title.toLowerCase().includes(searchBy.toLowerCase())
      );
    }
    if (sortBy && sortBy !== "All") {
      sortNewVideos = sortNewVideos.filter(
        (video) => video.category === sortBy
      );
    }
    return sortNewVideos;
  };

  const filtersVideos = filterVideos();

  console.log();
  return (
    <div className="page-component">
      <div className="category-btns">
        {category?.map((cat, index) => {
          return <CategoryBtns {...cat} key={index} />;
        })}
      </div>
      <div className="video-grid">
        {filtersVideos?.map((video, index) => {
          return <VideoCard {...video} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Home;
