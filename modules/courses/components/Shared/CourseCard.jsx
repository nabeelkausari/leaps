import React from "react";
import cx from "classnames";

const CourseCard = props => {
  const {
    course: {
      title,
      description,
      url_code,
      background_image
    },
    coming_soon,
    active,
    inactive,
    onClick,
  } = props;
  const labels = {
    active: "Enrolled",
    inactive: "Available",
    coming_soon: "Upcoming"
  };
  return (
    <div
      style={{
        backgroundImage: `url(${
          background_image
            ? background_image
            : "https://qasimulab.analyttica.com/static/media/backgroung-login.a6ee9db4.jpg"
        })`
      }}
      className="course-card"
      onClick={() => onClick(url_code)}
    >
      <div className="course-card__upper">
      </div>
      <div className="course-card__lower">
        <div className="course-card__title" title={title}>
          <h3 className="course-card__title--text">{title}</h3>
        </div>
        <div className="course-card__description">
          <p>{description}</p>
        </div>
        <div
          className={cx("course-card__status", {
            "course-card__status--active": active,
            "course-card__status--inactive": inactive,
            "course-card__status--coming-soon": coming_soon
          })}
        >
          {active && labels.active}
          {inactive && labels.inactive}
          {coming_soon && labels.coming_soon}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
