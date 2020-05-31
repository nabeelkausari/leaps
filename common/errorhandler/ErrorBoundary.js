import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
import { Button } from "../../app/components/Buttons/Button";
import { ErrorMan } from "../images";
import "./ErrorBoundary.scss";

const is_prod = process.env.NODE_ENV === "production";

export class AppBoundary extends Component {
  state = {
    error: null,
    eventId: null
  };
  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }
  render() {
    if (this.state.error && is_prod) {
      return (
        <div className="snap">
          <ErrorMan className="snap__image" />
          <p className="snap__title">Oops! Something Went Wrong.</p>
          <p className="snap__sub-title">
            Our team has been notified. Sorry for the inconvenience caused.
            <br />
            You may{" "}
            <a className="snap__link" onClick={() => window.location.reload()}>
              refresh
            </a>{" "}
            the page or navigate back to{" "}
            <a className="snap__link" onClick={() => (window.location = "/")}>
              home
            </a>
          </p>
          <Button
            variant="primary"
            size="md"
            className="snap__btn"
            onClick={() =>
              Sentry.showReportDialog({ eventId: this.state.eventId })
            }
          >
            Send Crash Report
          </Button>

          <div className="snap__contact-us">
            <p> Any Other Issue ?</p>
            <p> Write to : support@analyttica.com</p>
          </div>
        </div>
      );
    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}
