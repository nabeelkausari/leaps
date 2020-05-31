import React from "react";
import cx from "classnames";

export const AnimatedButton = ({
  onClick,
  icon: Icon,
  text,
  outlined,
  outlinedDark,
  filled,
  filledNoHighlight
}) => (
  <div
    className={cx("animated-btn", {
      "animated-btn--outlined": outlined,
      "animated-btn--outlined-dark": outlinedDark,
      "animated-btn--filled": filled,
      "animated-btn--filled-no-highlight": filledNoHighlight
    })}
    onClick={onClick}
  >
    {Icon && <Icon/>}
    <div className="animated-btn__text">{text}</div>
  </div>
);
