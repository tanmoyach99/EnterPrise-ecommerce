import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => {
  return (
    <>
      <StarRating
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="15px"
        starHoverColor="yellow"
        starEmptyColor="yellow"
      />
    </>
  );
};

export default Star;
