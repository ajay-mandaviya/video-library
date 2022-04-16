import React from "react";
import { VideoCard } from "../../components";
import { useData } from "../../context";
import "./home.css";

const Home = () => {
  const {
    data: { videos, category },
  } = useData();
  console.log("category in home page", category);
  return (
    <div className="page-component">
      <div className="category-btns">
        {category?.map((cat, index) => {
          return <button key={cat._id}>{cat.categoryName}</button>;
        })}
      </div>
      <div className="video-grid">
        {videos?.map((video, index) => {
          return <VideoCard {...video} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Home;
