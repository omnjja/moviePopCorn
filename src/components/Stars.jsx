import React from "react";
import Star from "./Star";

const Stars = ({userRating, tempRating, setUserRating, setTempRating }) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
  };
  function handleUserRating(i) {
    setUserRating(i + 1);
    setTempRating(0);
  }
  return (
    <div className="stars">
      {Array.from({ length: 10 }, (_, i) => (
        <Star
          key={i}
          index = {i}
          onClick={() => handleUserRating(i)}
          onHoverIn={() => setTempRating(i + 1)}
          onHoverOut={() => setTempRating(0)}
          userRating={userRating}
          tempRating={tempRating}
        /> // should path the onclick to the star component
      ))}
    </div>
  );
};

export default Stars;
