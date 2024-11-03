import React from "react";
import { Icon16StarAlt } from "@vkontakte/icons";
import baseTheme from "@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? (
          <Icon16StarAlt
            fill={baseTheme.colorBackgroundAccent.normal.value}
            key={index}
          />
        ) : (
          <Icon16StarAlt
            fill={baseTheme.colorBackground.normal.value}
            key={index}
          />
        ),
      )}
    </div>
  );
};

export default StarRating;
