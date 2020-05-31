import React, { useEffect, useState } from "react";
import { getIST } from "./TimeItem";

export function CountDown(props) {
  const [timerComplete, setTimerComplete] = useState(false);
  const [{ days, hours, minutes, seconds }, setTimeRemaining] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null
  });

  useEffect(() => {
    const timeInterval = setInterval(
      () =>
        getTimeTill(props.date, () => {
          clearInterval(timeInterval);
          setTimerComplete(true);
          this.props.onCompleteCallBack();
        }),
      1000
    );

    return () => clearInterval(timeInterval);
  }, [props.date]);

  const getTimeTill = (targetTime, callback) => {
    let ct = getIST();
    let days = Number(targetTime.diff(ct, "days"));
    let hours = Number(targetTime.diff(ct, "hours")) - days * 24;
    let minutes = Number(targetTime.diff(ct, "minutes")) - hours * 60;
    let seconds = Math.round(
      Number(targetTime.diff(ct, "seconds")) - hours * 60 * 60 - minutes * 60
    );
    setTimeRemaining({
      days,
      hours,
      minutes,
      seconds
    });
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      callback();
    }
  };

  return timerComplete ? (
    <span className="shl-home__webinar-item--message">
      {props.completeMessage}
    </span>
  ) : (
    <ul className="shl-home__webinar-item--countdown">
      {days > 0 && (
        <li>
          <span className="days">{days}</span>days
        </li>
      )}
      <li>
        <span className="hours">{hours}</span>Hours
      </li>
      <li>
        <span className="minutes">{minutes}</span>Minutes
      </li>
      <li>
        <span className="seconds">{seconds}</span>Seconds
      </li>
    </ul>
  );
}
