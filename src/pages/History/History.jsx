import React from "react";
import { useNavigate } from "react-router-dom";
import { EmptyPageBox, VideoCard } from "../../components";
import { useAuth, useData } from "../../context";
import { clearHistoryVideo } from "../../services";
import "./history.css";
const History = () => {
  const navigate = useNavigate();
  const {
    data: { history_videos },
    dispatch,
  } = useData();
  const {
    auth: { token },
  } = useAuth();
  const handleNavigate = () => {
    navigate("/");
  };
  const handleClearHistory = () => {
    clearHistoryVideo(token, dispatch);
  };
  if (history_videos.length === 0) {
    return (
      <div className="page-component ">
        <EmptyPageBox
          text={"You Have't Watch any videos Click here Watch"}
          btnText={"Watch Now"}
          onClick={handleNavigate}
        />
      </div>
    );
  }

  return (
    <div className="page-component">
      <div className="history-header">
        <div className="pages-title">
          <h3>
            History
            {history_videos.length > 0 && `${history_videos.length} Videos`}
          </h3>
        </div>
        <div>
          <button className="history-btn" onClick={handleClearHistory}>
            Clear History
          </button>
        </div>
      </div>
      <div className="video-grid">
        {history_videos?.map((video, index) => {
          return <VideoCard {...video} key={index} showHistory={true} />;
        })}
      </div>
    </div>
  );
};

export default History;
