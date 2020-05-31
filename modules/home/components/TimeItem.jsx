import cx from "classnames";
import { TickIcon } from "../../../../common/images";
import moment from "moment-timezone";
import React from "react";
import { CountDown } from "./CountDown";
import { getWebinarStatus } from "./WebinarItems";

export function getIST(dt) {
  const tz = "Asia/Kolkata";
  return dt ? moment(dt).tz(tz) : moment().tz(tz);
}

export const TimeItem = ({ mobile_display, session, selection, onClick }) => {
  const enrolled = session.enrolId !== null;
  const selected = selection === session.webinarSessionId;
  const [date] = session.startTime.split(" ");
  const { not_started, has_completed, has_started } = getWebinarStatus(session);

  return (
    <div
      onClick={onClick}
      className={cx("shl-home__webinar-item--time-item", {
        "shl-home__webinar-item--active": enrolled,
        "shl-home__webinar-item--selected": selected,
        "shl-home__webinar-item--time-item--mobile": mobile_display
      })}
    >
      {enrolled || selected ? (
        <span
          className={cx("shl-home__webinar-item--radio", {
            "shl-home__webinar-item--radio--active": enrolled
          })}
        >
          <TickIcon className="shl-home__webinar-item--tick" />
        </span>
      ) : (
        <span className="shl-home__webinar-item--radio">&nbsp;</span>
      )}

      <div className="shl-home__webinar-item--date-time-wrapper">
        <p className="shl-home__webinar-item--date">
          {not_started && moment(new Date(date)).format(" Do MMMM YYYY")}
          {/*{show_timer && (*/}
          {/*  <CountDown*/}
          {/*    completeMessage="Webinar has started"*/}
          {/*    date={getIST(session.startTime)}*/}
          {/*  />*/}
          {/*)}*/}
          {has_started &&
            `${moment(new Date(date)).format(" Do MMMM YYYY")} (Started)`}
          {has_completed &&
            `${moment(new Date(date)).format(" Do MMMM YYYY")} (Finished)`}
        </p>
        {not_started && (
          <p className="shl-home__webinar-item--time">
            {moment(session.startTime).format("LT")} IST
            {session.duration && `(${session.duration} Minutes)`}
          </p>
        )}
      </div>
    </div>
  );
};
