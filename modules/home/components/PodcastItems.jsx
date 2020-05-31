import React from "react";
import cx from "classnames";

export const Chatbox = props => {
  const { mobile_display } = props;

  return (
    <div
      className={`shl-home__podcast--chat${
        mobile_display ? "--mobile shl-home__podcast--chat" : ""
      }`}
      style={{ top: props.top, left: props.left }}
    >
      <div
        className={cx(
          "shl-home__podcast--triangle",
          {
            "shl-home__podcast--triangle-mirror":
              props.mirror && !mobile_display
          },
          {
            "shl-home__podcast--triangle-mirror--mobile":
              props.mirror && mobile_display
          },
          {
            "shl-home__podcast--triangle-normal":
              !props.mirror && !mobile_display
          },
          {
            "shl-home__podcast--triangle-normal--mobile":
              !props.mirror && mobile_display
          },
          { "shl-home__podcast--triangle--mobile": mobile_display }
        )}
      >
        &nbsp;
      </div>
      {props.text}
    </div>
  );
};

export const ConcentricCircle = props => {
  return (
    <div
      className={`shl-home__podcast--c-circle--${props.size} ${
        props.center ? "shl-home__podcast--absolute" : ""
      }`}
      style={{ top: props.top, left: props.left }}
    >
      <div
        className={`shl-home__podcast--absolute shl-home__podcast--c-circle--inner-${props.size}`}
      >
        <div
          className={`shl-home__podcast--absolute shl-home__podcast--c-circle--inner-2-${props.size}`}
        >
          <img
            className={`shl-home__podcast--absolute shl-home__podcast--image-${props.size}`}
            src={props.image}
            alt="center"
          />
        </div>
      </div>
    </div>
  );
};
