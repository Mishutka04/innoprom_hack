import React from "react";
import { Icon16StarAlt } from "@vkontakte/icons";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? (
          <Icon16StarAlt key={index} />
        ) : (
          <Icon16StarAlt key={index} />
        ),
      )}
    </div>
  );
};

export default StarRating;
