import React from "react";
import { DataAction } from "../../constants";
import { useData } from "../../context";
import "./categoryBtns.css";
const CategoryBtns = (props) => {
  const { categoryName } = props;
  const {
    data: { sortBy },
    dispatch,
  } = useData();
  console.log("categoryName", categoryName, "sortBy", sortBy);
  const handleCategory = (category) => {
    dispatch({
      type: DataAction.SET_SORT_CATEGORY,
      payload: category,
    });
  };
  return (
    <div>
      <button
        onClick={() => handleCategory(categoryName)}
        className={
          sortBy === categoryName
            ? "category-btn cat-btn-active "
            : "category-btn"
        }
      >
        {categoryName}
      </button>
    </div>
  );
};

export default CategoryBtns;
