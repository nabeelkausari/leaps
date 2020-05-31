import React from "react";
import cx from "classnames";
import { CompleteIcon, RightArrowIcon } from "../../../../../common/images";

export const HackathonTimeLine = ({ active, list }) => {
  const getIcon = Icon => {
    return <Icon className="ht-card__icon" />;
  };
  return (
    <div className="ht">
      {list.map(
        (item, i) =>
          item.visible && (
            <div
              className="ht-card"
              key={i}
              onClick={active && item.onClick && item.onClick}
            >
              <div
                className={cx("ht-card__contents", {
                  "ht-card__contents--active": active
                })}
              >
                <h4 className="ht-card__title">{item.title}</h4>
                <RightArrowIcon className="ht-card__icon-right" />
              </div>
              <span className="ht-card__icon-wrapper">
                {getIcon(!item.completed ? item.icon : CompleteIcon)}
              </span>
            </div>
          )
      )}
    </div>
  );
};
