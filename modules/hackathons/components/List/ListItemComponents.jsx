import React from "react";

export const Live = () => (
  <div className="hli__status status__live">
    <span className="status__live--indicator">&nbsp;</span>
    LIVE
  </div>
);

export const Upcoming = () => (
  <div className="hli__status status__upcoming">Upcoming</div>
);
export const Past = () => <div className="hli__status status__past">Past</div>;
