import React from "react";
import cx from "classnames";

export const Point = props => {
  let is_apply_skill = props.apply_skill;
  let { mobile_display, active } = props;

  let text_style = `shl-home__point-text ${
    !is_apply_skill
      ? mobile_display
        ? "shl-home__point-text--1--mobile"
        : "shl-home__point-text--1"
      : mobile_display
      ? "shl-home__point-text--2--mobile"
      : "shl-home__point-text--2"
  }`;

  return (
    <div
      className={cx(
        "shl-home__point-wrapper",
        {
          "shl-home__point-wrapper--1": is_apply_skill && !mobile_display
        },
        {
          "shl-home__point-wrapper--mobile": is_apply_skill && mobile_display
        }
      )}
      onClick={props.onClick ? () => props.onClick(props.index) : () => {}}
    >
      <div className="shl-home__point-left-wrapper">
        <div
          className={cx(
            "shl-home__point-indicator",
            {
              "shl-home__point-indicator--large":
                is_apply_skill && !mobile_display
            },
            {
              "shl-home__point-indicator--mobile":
                is_apply_skill && mobile_display
            },
            {
              "shl-home__point-indicator--active":
                props.active && !mobile_display
            }
          )}
          style={{ backgroundColor: props.item.color }}
        >
          {props.index ? (
            <span
              className={`shl-home__point-indicator--text${
                is_apply_skill && mobile_display
                  ? "--mobile shl-home__point-indicator--text"
                  : ""
              }`}
            >
              {props.index}
            </span>
          ) : (
            " "
          )}
        </div>
      </div>
      <div
        className={cx("shl-home__point-right-wrapper", {
          "shl-home__point-right-wrapper--scale": active && !mobile_display
        })}
      >
        <div
          className={cx(
            "shl-home__point-title",
            {
              "shl-home__point-title--1": is_apply_skill & !mobile_display
            },
            {
              "shl-home__point-title--1--mobile":
                is_apply_skill && mobile_display
            },
            { "u-margin-bottom-medium": props.margin_xl && !mobile_display },
            { "u-margin-bottom-small": props.margin_xl && mobile_display }
          )}
        >
          {props.item.title}
        </div>
        {props.item.text && <p className={text_style}>{props.item.text}</p>}
      </div>
    </div>
  );
};
