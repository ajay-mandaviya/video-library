import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../context";
import { deletePlayList } from "../../services";
import "./playlistcard.css";

const PlayListCard = ({ list }) => {
  const navigate = useNavigate();
  const { videos } = list;
  const {
    auth: { token },
  } = useAuth();
  const { dispatch } = useData();
  const handleDeletePlayList = () => {
    deletePlayList(list._id, token, dispatch);
  };
  const handleNavigate = () => {
    navigate(`/playlist/${list._id}`);
  };
  return (
    <div className="playlist-card">
      <div className="play-list-img" onClick={handleNavigate}>
        {videos.length > 0 ? (
          <img
            src={`https://img.youtube.com/vi/${videos[0]._id}/0.jpg`}
            alt={`no video`}
            className="card-img"
          />
        ) : (
          <div className="list-empty">
            <h2>{list.name} is Empty!</h2>
          </div>
        )}
      </div>
      <div className="play-list-highlight">
        <div>
          <span>{videos.length}+ Videos</span>
        </div>
      </div>
      <div className="play-list-info">
        <div>
          <p>{list.name}</p>
        </div>
        <div onClick={handleDeletePlayList}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  );
};

export default PlayListCard;
