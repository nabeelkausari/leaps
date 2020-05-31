import React, { Component } from "react";
import { Point } from "./Point";
import { Button } from "../../../components/Buttons/Button";
// import {
//   apply_skills_1,
//   apply_skills_1_mobile,
//   apply_skills_2,
//   apply_skills_2_mobile,
//   apply_skills_3,
//   apply_skills_3_mobile
// } from "../../../../common/images";

let points = [
  {
    title: "Upload your own data",
    text:
      "To gain hands on experience of the data science virtual lab, powered by our innovative platform ATH Precision"
  },
  {
    title: "Experiment with preloaded datasets",
    text: "To gain applied exposure across diverse industry domains"
  },
  {
    title: "Build your own models at a click of a button",
    text:
      "Identified, curated, tested and ingested by data science experts. Apply data science in a code free, tool agnostic and point n click manner"
  }
];

class ApplySkills extends Component {
  state = {
    active_index: 0,
    current_img: null,
    line_active_class_id: 1
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.props.mobile_display) {
        this.setState({ current_img: "/images/scholar-apply-skills-mobile-image.png" });
      } else {
        this.setState({ current_img: "/images/scholar-apply-skills-image.png" });
      }
    }, 1000);
  }

  handleClick = id => {
    this.setState({ active_index: id - 1 });
    let cur_img = this.setImage(id - 1);
    this.setLineActiveClassID(id - 1);
    this.setState({ current_img: cur_img });
  };

  setLineActiveClassID = id => {
    if (id === 0) {
      this.setState({ line_active_class_id: 1 });
    } else if (id === 1) {
      this.setState({ line_active_class_id: 2 });
    } else if (id === 2) {
      this.setState({ line_active_class_id: 3 });
    }
  };

  getPoint = (point, i) => {
    let result_point = {};
    if (i === this.state.active_index) {
      result_point = { title: point.title, text: point.text };
    } else {
      result_point = { title: point.title };
    }
    return result_point;
  };

  setImage = id => {
    const { mobile_display } = this.props;
    switch (id) {
      case 0:
        return mobile_display ? "/images/scholar-apply-skills-mobile-image.png" : "/images/scholar-apply-skills-image.png";
      case 1:
        return mobile_display ? "/images/apply-skills-2-mobile.png" : "/images/apply-skills-2.png";
      case 2:
        return mobile_display ? "/images/apply-skills-3-mobile.png" : "/images/apply-skills-3.png";
    }
  };

  render() {
    const { mobile_display } = this.props;
    const { active_index, current_img, line_active_class_id } = this.state;

    let main_container_class = `shl-home__main-container shl-home--direction-column ${
      mobile_display
        ? "shl-home__main-container--padding-mobile"
        : "shl-home__main-container--padding-full"
    }`;
    return (
      <div className={main_container_class}>
        <div
          className={`shl-home__section-info-wrapper ${
            mobile_display ? "u-margin-bottom-medium" : ""
          }`}
        >
          <h2 className="shl-home__section-title-1">
            <span className="shl-home--highlight">APPLY</span> your data <br />
            science skills
          </h2>
        </div>
        <div
          className={`shl-home__sub-container ${
            mobile_display
              ? "shl-home--flex shl-home--direction-column-reverse shl-home--align-centre"
              : ""
          }`}
        >
          <div
            className={`shl-home__apply-skills--container${
              mobile_display ? "--mobile shl-home__apply-skills--container" : ""
            }`}
          >
            <div
              className={`shl-home--line shl-home--line--1${
                mobile_display
                  ? "--mobile shl-home--line--1--mobile--" +
                    line_active_class_id
                  : "--desktop shl-home--line--1--desktop--" +
                    line_active_class_id
              }`}
            >
              &nbsp;
            </div>
            {points.map((point, i) => (
              <Point
                item={this.getPoint(point, i)}
                index={i + 1}
                key={i}
                apply_skill
                margin_xl={i === active_index}
                onClick={this.handleClick}
                {...this.props}
              />
            ))}
            <Button
              style={{ visibility: "hidden" }}
              variant="primary"
              size={mobile_display ? "sm" : "lg"}
              className={
                mobile_display
                  ? "u-margin-top-small shl-home__apply-skills--btn"
                  : "u-margin-top-medium"
              }
            >
              Know More
            </Button>
          </div>
          <div
            className={`shl-home__apply-skills--container--1${
              mobile_display
                ? "--mobile shl-home__apply-skills--container--1"
                : ""
            }`}
          >
            <img
              src={current_img}
              alt="apply skills"
              className={
                mobile_display
                  ? "shl-home__apply-skills--img"
                  : "shl-home__apply-skills--img shl-home__apply-skills--img--desktop"
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApplySkills;
