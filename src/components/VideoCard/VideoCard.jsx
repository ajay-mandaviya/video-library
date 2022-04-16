import React from "react";
import { Link } from "react-router-dom";
import "./videocard.css";
const VideoCard = (props) => {
  const { _id, title, uploaded, creator } = props;
  return (
    <Link to={`/video/${_id}`} className="card" key={_id}>
      <div>
        <img src={`https://i.ytimg.com/vi/${_id}/0.jpg`} className="card-img" />
      </div>
      <div className="card-description">
        <div className="card-info">
          <div className="card-subtitle">
            {title.slice(0, 30).concat("...")}
          </div>
          <div>
            <button className="ellipsis-btn">
              <i className="fas fa-ellipsis-v"></i>
            </button>{" "}
          </div>
        </div>
        <div className="card-info">
          <div className="card-subtitle">{creator}</div>
          <div>{uploaded}</div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
