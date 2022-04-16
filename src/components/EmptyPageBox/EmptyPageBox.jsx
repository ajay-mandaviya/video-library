import React from "react";

const EmptyPageBox = (props) => {
  const { btnText, text, onClick } = props;
  return (
    <div className="empty-box">
      <p>{text}</p>
      <button className="btn btn-dark" onClick={onClick}>
        {btnText}{" "}
      </button>
    </div>
  );
};

export default EmptyPageBox;
