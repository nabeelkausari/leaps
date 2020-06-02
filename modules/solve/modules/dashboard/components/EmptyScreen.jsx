import * as React from "react";
// import {
//   empty_dashboard_dark,
//   empty_dashboard_light
// } from "../../../../../../common/images";

export const EmptyScreen = ({ theme }) => {
  return (
    <div className="empty-dashboard ">
      {/*<img*/}
      {/*  className="empty-dashboard__image"*/}
      {/*  src={theme === "dark" ? empty_dashboard_dark : empty_dashboard_light}*/}
      {/*  alt="empty dashboard"*/}
      {/*/>*/}
      <h4 className="empty-dashboard__title">It's Empty Here</h4>
      <p className="empty-dashboard__sub-title">
        Curate Your Personal Dashboard
      </p>
    </div>
  );
};

export const DashboardLinkEmptyScreen = () => {
  return (
    <div className="empty-dashboard--1">
      <h4 className="empty-dashboard__title">It's Empty Here</h4>
    </div>
  );
};
