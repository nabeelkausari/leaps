import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { scholar_how_it_works } from "../../../../common/images";

import { Point } from "./Point";

class HowItWorks extends Component {
  points = [
    {
      title: "Learn",
      color: "#23b0cc",
      text:
        "Immerse yourself in the courses with contextualized content designed by industry experts from diverse industry domains, to gain on the job problem solving experience"
    },
    {
      title: "Apply",
      color: "#6c3cd6",
      text:
        "Experience the data science virtual lab powered by our patented and award winning data science platform ATH Precision"
    },
    {
      title: "Solve",
      color: "#0397ff",
      text:
        "Apply your data science quotient to solve real world and business problems"
    }
  ];

  render() {
    const { mobile_display } = this.props;

    let main_container_class = `shl-home__main-container shl-home--direction-column ${
      mobile_display
        ? "shl-home__main-container--padding-mobile"
        : "shl-home__main-container--full-height shl-home__main-container--padding-full"
    }`;

    return (
      <div id="scroll-down" className={main_container_class}>
        <div className="shl-home__section-info-wrapper">
          <h4 className="shl-home__section-title-2">How it works ?</h4>
          <h2
            className={`shl-home__section-title-3 ${
              !mobile_display
                ? "shl-home__section-title-1--half-length u-margin-bottom-medium"
                : ""
            }`}
          >
            An innovative experiential{" "}
            <span className="shl-home__section-title-3">
              data science platform
            </span>{" "}
            <br />
            built on the patented{" "}
            <span className="shl-home__section-title-1">
              LEARN - APPLY - SOLVE
            </span>{" "}
            framework
          </h2>
        </div>
        <div
          className={`shl-home__sub-wrapper ${mobile_display &&
            "shl-home--direction-column"}`}
        >
          <div className="shl-home__equal-sub-container shl-home--align-centre">
            <img
              className={`${
                mobile_display
                  ? "shl-home__hiw--img--mobile"
                  : "shl-home__hiw--img--desktop"
              }`}
              src="/images/scholar-how-it-wroks.svg"
              alt="section 2 image"
            />
          </div>
          <div
            className={`shl-home__equal-sub-container shl-home--align-centre shl-home--direction-column shl-home--justify-centre ${
              mobile_display ? "u-margin-top-medium" : "u-margin-left-large-1"
            }`}
          >
            <div className="shl-home__hiw--wrapper">
              <div
                className={`shl-home--line ${mobile_display &&
                  "shl-home--line--mobile-1"}`}
              ></div>
              {this.points.map((point, i) => (
                <Point key={i} item={point} mobile_display={mobile_display} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HowItWorks;
