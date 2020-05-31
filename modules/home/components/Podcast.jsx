import React, { Component } from "react";
import { Chatbox, ConcentricCircle } from "./PodcastItems";
// import {
//   podcast_cc_2,
//   icon_microphone,
//   podcast_coming_soon
// } from "../../../../common/images";

class Podcast extends Component {
  render() {
    const { mobile_display } = this.props;
    const coming_soon = true;

    let main_container_class = `shl-home__main-container shl-home--direction-column ${
      mobile_display
        ? "shl-home__main-container--padding-mobile"
        : "shl-home__main-container--padding-full"
    }`;

    return (
      <div className={main_container_class}>
        <div className="shl-home__section-info-wrapper shl-home--flex shl-home--direction-column shl-home--align-centre">
          <h2 className="shl-home__section-title-1 u-margin-bottom-medium">
            Podcasts
          </h2>
          <p
            className={`shl-home__section-info-text ${
              mobile_display ? "shl-home--centre-text" : ""
            }`}
          >
            {coming_soon
              ? "Coming Soon"
              : "Listen to what Industry Leaders have to say"}
          </p>
        </div>
        {coming_soon ? (
          <img alt="Podcasts coming soon" src="/images/podcasts.svg" />
        ) : (
          <div
            className={`shl-home__podcast${
              mobile_display ? "--mobile shl-home__podcast" : ""
            }`}
          >
            <ConcentricCircle
              size={mobile_display ? "large--mobile" : "large"}
              image="/images/podcast-cc-1.png"
              top={mobile_display ? "51%" : "30%"}
              left={mobile_display ? "-21%" : "-10%"}
            />

            <ConcentricCircle
              size={mobile_display ? "small--mobile" : "small"}
              image="/icons/microphone-icon.svg"
              center
              {...this.props}
            />

            <ConcentricCircle
              size={mobile_display ? "large--mobile" : "large"}
              image="/images/podcast-cc-2.png"
              top={mobile_display ? "0" : "5%"}
              left={mobile_display ? "72%" : "75%"}
            />

            <Chatbox
              text={"Is Linear Digressions a myth or fake news"}
              top={mobile_display ? "48%" : "30%"}
              left={mobile_display ? "0%" : "10%"}
              {...this.props}
            />
            <Chatbox
              text={"Can People be data skeptic in the industry"}
              mirror
              top={mobile_display ? "-1%" : "6%"}
              left={mobile_display ? "63%" : "68%"}
              {...this.props}
            />

            <div
              className={`shl-home__podcast--absolute shl-home__podcast--line${
                mobile_display ? "--mobile shl-home__podcast--line" : ""
              }`}
            ></div>
          </div>
        )}
      </div>
    );
  }
}

export default Podcast;
