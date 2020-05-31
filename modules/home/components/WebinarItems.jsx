import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import { Button } from "../../../components/Buttons/Button";
import AuthModal from "../../auth/components/shared/AuthModal";
import { TimeItem } from "./TimeItem";

export const getWebinarStatus = session => {
  const webinar_statuses = {
    not_started: null,
    has_started: null,
    has_completed: null
  };
  if (!session) return webinar_statuses;
  let { startTime, duration } = session;
  const endTime = moment(startTime).add(duration || 45, "minutes");
  startTime = moment(startTime);

  if (moment().isBefore(startTime)) {
    webinar_statuses.not_started = true;
  } else if (moment().isBetween(startTime, endTime)) {
    webinar_statuses.has_started = true;
  } else if (moment().isAfter(endTime)) {
    webinar_statuses.has_completed = true;
  }

  return webinar_statuses;
};

const getJoinText = (selectedSession, isLoggedIn) => {
  const { not_started, has_completed, has_started } = getWebinarStatus(
    selectedSession
  );
  const has_started_but_no_link =
    has_started && get(selectedSession, "webinarLink") === "";
  const has_completed_but_no_link =
    has_completed && get(selectedSession, "webinarRecordedLink") === "";

  let text = "";
  let disabled = has_started_but_no_link || has_completed_but_no_link;

  if (not_started) {
    text = selectedSession.enrolId !== null ? "Cancel" : "Enroll";
  } else if (has_started) {
    text = "Join Webinar";
  } else if (has_completed) {
    text = "View Recording";
  }
  if (isLoggedIn === false) {
    text = `Register Now to ${text}`;
  }
  if (isLoggedIn) {
    if (has_started_but_no_link) {
      text = "Webinar not ready yet";
    }
    if (has_completed_but_no_link) {
      text = "Recording not ready yet";
    }
  }

  return {
    text,
    disabled
  };
};

export class WebinarItem extends Component {
  state = {
    selectedSession: null
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { enrol_webinar_succeeded, unenrol_webinar_succeeded } = this.props;
    if (
      (enrol_webinar_succeeded &&
        enrol_webinar_succeeded !== prevProps.enrol_webinar_succeeded) ||
      (unenrol_webinar_succeeded &&
        unenrol_webinar_succeeded !== prevProps.unenrol_webinar_succeeded)
    ) {
      this.setState({ selectedSession: null });
    }
  }

  makeSelection = selectedSession =>
    this.setState(state => ({
      selectedSession:
        state.selectedSession === selectedSession ? "" : selectedSession
    }));

  handleEnrollment = () => {
    const {
      webinarSessionId,
      enrolId,
      webinarLink,
      webinarRecordedLink
    } = this.state.selectedSession;
    const { not_started, has_completed, has_started } = getWebinarStatus(
      this.state.selectedSession
    );
    const { webinarId } = this.props.webinar;

    if (has_started) {
      return window.open(webinarLink, "_blank");
    }
    if (has_completed) {
      return window.open(webinarRecordedLink, "_blank");
    }
    if (not_started) {
      if (enrolId !== null) {
        return this.props.unenrolWebinar({
          webinarSessionId,
          webinarId,
          enrolId
        });
      }
      this.props.enrolWebinar({
        webinarSessionId,
        webinarId
      });
    }
  };

  render() {
    const { selectedSession } = this.state;
    const { mobile_display, is_logged_in, webinar, id } = this.props;
    const selected_or_first_session = selectedSession || webinar.sessions[0];
    const { text, disabled } = getJoinText(
      selected_or_first_session,
      is_logged_in
    );

    return (
      <div
        id={id}
        className={`shl-home__webinar-item${
          mobile_display ? "--mobile shl-home__webinar-item" : ""
        }`}
      >
        <div
          className={`shl-home__webinar-item--info-wrapper${
            mobile_display
              ? "--mobile shl-home__webinar-item--info-wrapper"
              : ""
          }`}
        >
          <h3
            className={`shl-home__webinar-item--title${
              mobile_display
                ? "--mobile shl-home__webinar-item--title u-margin-bottom-small"
                : " u-margin-bottom-medium"
            }`}
          >
            {webinar.title}
          </h3>
          <h5
            className={`shl-home__webinar-item--author${
              mobile_display
                ? "--mobile shl-home__webinar-item--author u-margin-bottom-small"
                : " u-margin-bottom-medium "
            }`}
          >
            Webinar by{" "}
            <span>{get(selected_or_first_session, "speakerDetails.name")}</span>
          </h5>
          <p
            className={`u-margin-bottom-medium  shl-home__webinar-item--text${
              mobile_display ? "--mobile shl-home__webinar-item--text" : ""
            }`}
          >
            {webinar.description}
          </p>
        </div>
        <div className="shl-home__webinar-item--time-wrapper--outer">
          <p
            className={`u-margin-bottom-medium shl-home__webinar-item--text${
              mobile_display ? "--mobile shl-home__webinar-item--text " : ""
            }`}
          >
            Select Time
          </p>
          <div
            className={`shl-home__webinar-item--time-wrapper${
              mobile_display
                ? "--mobile shl-home__webinar-item--time-wrapper"
                : ""
            }`}
          >
            {webinar.sessions.map(session => (
              <TimeItem
                onClick={() => this.makeSelection(session)}
                key={session.webinarSessionId}
                session={session}
                mobile_display={mobile_display}
                selection={
                  selectedSession ? selectedSession.webinarSessionId : null
                }
              />
            ))}
            {mobile_display &&
              (!is_logged_in ? (
                <AuthModal
                  showRegister
                  Trigger={({ handleClick }) => (
                    <Button onClick={handleClick} variant="primary" size="xl">
                      {text}
                    </Button>
                  )}
                />
              ) : (
                selectedSession && (
                  <Button
                    onClick={this.handleEnrollment}
                    variant={
                      selectedSession.enrolId !== null ? "outlined" : "primary"
                    }
                    size="xl"
                    disabled={disabled}
                  >
                    {text}
                  </Button>
                )
              ))}
          </div>
          {!mobile_display && (
            <div style={{ margin: "2rem 3rem 0", textAlign: "right" }}>
              {!is_logged_in ? (
                <AuthModal
                  showRegister
                  Trigger={({ handleClick }) => (
                    <Button onClick={handleClick} variant="primary" size="lg">
                      {text}
                    </Button>
                  )}
                />
              ) : (
                selectedSession && (
                  <Button
                    onClick={this.handleEnrollment}
                    variant={
                      selectedSession.enrolId !== null ? "outlined" : "primary"
                    }
                    size="lg"
                    disabled={disabled}
                  >
                    {text}
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
