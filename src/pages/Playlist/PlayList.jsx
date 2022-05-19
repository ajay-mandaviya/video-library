import React from "react";
import { useNavigate } from "react-router-dom";
import { EmptyPageBox, PlayListCard } from "../../components";
import { useData } from "../../context";
import "./playlist.css";

const PlayList = () => {
  const {
    data: { playList },
  } = useData();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  if (playList.length === 0) {
    return (
      <div className="page-component ">
        <EmptyPageBox
          text={"You haven't Create Watch Later."}
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
          Play List
          {playList.length > 0 && `(${playList.length} PlayList)`}
        </h3>
      </div>
      <div className="video-grid">
        {playList?.map((list, index) => {
          return <PlayListCard list={list} key={index} />;
        })}
      </div>
    </div>
  );
};

export default PlayList;
