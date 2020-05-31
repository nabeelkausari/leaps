import React, { Component } from "react";
import { WebinarItem } from "./WebinarItems";

class Webinar extends Component {
  render() {
    const { mobile_display, webinars } = this.props;

    let main_container_class = `shl-home__main-container shl-home--direction-column ${
      mobile_display
        ? "shl-home__main-container--padding-mobile--webinar"
        : "shl-home__main-container--padding-full"
    }`;

    return (
      <div className={main_container_class} id="resources">
        <div className="shl-home__section-info-wrapper shl-home--flex shl-home--justify-centre shl-home--align-centre shl-home--direction-column">
          <h2 className="shl-home__section-title-1 u-margin-bottom-medium">
            Webinars
          </h2>
          <p
            className={`shl-home__section-info-text ${
              mobile_display
                ? "shl-home--centre-text u-padding-both-rl-medium"
                : ""
            }`}
          >
            Join webinars led by data science experts and practitioners
          </p>
        </div>
        <div className="shl-home__webinar">
          {webinars &&
            webinars.map(webinar => (
              <WebinarItem
                key={webinar.webinarId}
                webinar={webinar}
                id={`webinar-${webinar.webinarId}`}
                {...this.props}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Webinar;
