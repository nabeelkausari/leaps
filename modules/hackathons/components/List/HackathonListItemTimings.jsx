import React from "react";
import moment from "moment";
import "../../styles/hackathon-list-item-timings.scss";

export const HackathonListItemTimings = props => {
  const { end_time, start_time } = props;
  const starts_on = moment(start_time).format("MMMM DD[,] YYYY");
  const starts_at = moment(start_time).format("h:mm A");
  const ends_on = moment(end_time).format("MMMM DD[,] YYYY");
  const duration = moment
    .duration(moment(end_time).diff(moment(start_time)))
    .asHours();
  return (
    <div className="hli__timings">
      <div>
        <p className="hli__timings--title">Starts On</p>
        <p className="hli__timings--value">{starts_on}</p>
      </div>
      <div>
        <p className="hli__timings--title">Ends On</p>
        <p className="hli__timings--value">{ends_on}</p>
      </div>
      <div>
        <p className="hli__timings--title">Starts At</p>
        <p className="hli__timings--value">{starts_at}</p>
      </div>
      <div>
        <p className="hli__timings--title">Duration</p>
        <p className="hli__timings--value">{duration} Hours</p>
      </div>
    </div>
  );
};
