import * as React from "react";
import cx from "classnames";

export const CourseContentTiles = props => {
  const { tiles, webinar } = props;
  return (
    <div className="course-module-content__content-tiles">
      {tiles.map((tile, index) => (
        <div key={index} className="course-module-content__content-tile">
          <div
            className={cx("course-module-content__content-tile--primary", {
              "course-module-content__content-tile--primary-webinar": webinar
            })}
          >
            {tile.primary}
          </div>
          <div className="course-module-content__content-tile--secondary">
            {tile.secondary}
          </div>
        </div>
      ))}
    </div>
  );
};
