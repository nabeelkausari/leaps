import React, { Component } from "react";
import { Button } from "../../../components/Buttons/Button";
import AuthModal from "../../auth/components/shared/AuthModal";

class Hackathon extends Component {
  render() {
    const { mobile_display } = this.props;

    let main_container_class = `shl-home__main-container ${
      mobile_display
        ? "shl-home--direction-column-reverse shl-home__main-container--padding-mobile"
        : "shl-home--align-centre shl-home__main-container--padding-full u-margin-bottom-large-xl"
    }`;

    return (
      <div className={main_container_class}>
        <div className="shl-home__equal-sub-container">
          <div
            className={`shl-home__hackathon--wrapper${
              mobile_display ? "--mobile shl-home__hackathon--wrapper" : ""
            }`}
          >
            <h3
              className={
                mobile_display
                  ? "shl-home__hackathon--title--mobile"
                  : "shl-home__hackathon--title"
              }
            >
              Hackathon
            </h3>
            <p
              className={
                mobile_display
                  ? "shl-home__hackathon--text shl-home__hackathon--text--mobile"
                  : "shl-home__hackathon--text"
              }
            >
              Launching Soon
            </p>
          </div>
        </div>
        <div
          className={`shl-home__equal-sub-container ${
            mobile_display ? "u-margin-bottom-small" : "u-padding-left-large"
          }`}
        >
          <div className="shl-home__section-info-wrapper">
            <h2 className="shl-home__section-title-1 u-margin-bottom-medium">
              <span className="shl-home--highlight">SOLVE</span> and unleash
              <br />
              the data scientist in you
            </h2>
            <p
              className={`shl-home__section-info-text ${!mobile_display &&
                "u-margin-right-large-xxl u-margin-bottom-large"}`}
            >
              Data science is part art and part science, apply yourself to build
              creative and robust solutions
            </p>
            {!mobile_display && (
              <div className="shl-home__section-actions-wrapper">
                <AuthModal
                  showRegister
                  Trigger={({ handleClick }) => (
                    <Button onClick={handleClick} variant="primary" size="lg">
                      Join for Free
                    </Button>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Hackathon;
