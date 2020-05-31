import React, { Component } from "react";
import { FollowItem, HashItem, TabItem } from "./FooterItems";
import {
  Follow_Google,
  Follow_linkedIn,
  Follow_Gmail,
  Follow_FB,
  Follow_Twitter
} from "../../../../common/images";

import cx from "classnames";

class Footer extends Component {
  render() {
    const { mobile_display } = this.props;

    let main_container_class = `shl-home__main-container shl-home--bg-dark ${
      mobile_display
        ? "shl-home__main-container--padding-mobile shl-home--direction-column"
        : "shl-home__main-container--padding-full shl-home--align-centre  shl-home--direction-column"
    }`;

    return (
      <div className={main_container_class}>
        <div
          className={cx("shl-home__footer--main", {
            "shl-home--direction-column": mobile_display
          })}
        >
          <div className="shl-home__equal-sub-container shl-home--direction-column">
            <div
              className={`shl-home__footer--tabs--horizontal${
                mobile_display
                  ? "--mobile shl-home__footer--tabs--horizontal"
                  : ""
              }`}
            >
              <TabItem text="LEARN" link="/courses" type="1" />
              <TabItem text="APPLY" link="/cases" type="1" />
              <TabItem text="SOLVE" link="/solve" type="1" />
              <HashItem link="/home#resources" text="THE HUB" type="1" />
            </div>
            <div
              className={`shl-home__footer--container--2 ${
                mobile_display
                  ? "shl-home--direction-column shl-home--centre-text"
                  : ""
              }`}
            >
              <div
                className={cx("shl-home__footer--tabs--vertical", {
                  "shl-home__footer--tabs--vertical--mobile": mobile_display
                })}
              >
                <TabItem
                  text="Terms & Conditions"
                  link="/terms-conditions"
                  type="2"
                  new_target
                />
                <TabItem
                  text="Privacy & Disclaimer"
                  link="/privacy-policy"
                  type="2"
                  new_target
                />
              </div>
              <div
                className={cx("shl-home__footer--tabs--vertical", {
                  "shl-home__footer--tabs--vertical--mobile--1": mobile_display
                })}
              >
                <HashItem link="/home#blogs" text="Blogs" type="2" />
                <HashItem link="/home#resources" text="Webinars" type="2" />
                <HashItem link="/home#customers" text="Testimonials" type="2" />
              </div>
            </div>
          </div>
          <div className="shl-home__equal-sub-container">
            <div
              className={cx("shl-home__footer--container--1", {
                "shl-home__footer--container--1--mobile": mobile_display
              })}
            >
              <div
                className={cx("shl-home__footer--address-wrapper", {
                  "shl-home__footer--address-wrapper--mobile": mobile_display
                })}
              >
                <p className="shl-home__footer--address-text">
                  <span className="shl-home__footer--address-title">USA</span>
                  <br />
                  Analyttica Datalab Inc.
                  <br />
                  1007 N. Orange St,
                  <br />
                  Wilmington, Delaware
                  <br />
                  Tel: +1 917 300 3289/3325
                </p>
              </div>
              <div className="shl-home__footer--address-wrapper">
                <p className="shl-home__footer--address-text">
                  <span className="shl-home__footer--address-title">India</span>
                  <br />
                  Analyttica Datalab Pvt. Ltd.
                  <br />
                  702, Brigade IRV Centre,
                  <br />
                  Whitefield, Bengaluru
                  <br />
                  Tel : +91 80 4650 7300
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="shl-home__footer--sub">
          <p className="shl-home__footer--sub--text">Follow Us On</p>
          <div className="shl-home__footer--sub--icons-wrapper">
            <FollowItem
              Svg={Follow_FB}
              text="FaceBook"
              type="1"
              link="https://www.facebook.com/AnalytticaTH/"
            />
            <FollowItem
              Svg={Follow_Twitter}
              text="Twitter"
              type="1"
              link="https://twitter.com/Analyttica"
            />
            <FollowItem
              Svg={Follow_linkedIn}
              text="Linked In"
              type="2"
              link="https://www.linkedin.com/company/analyttica-datalab-pvt-ltd-/"
            />
          </div>
          <p className="shl-home__footer--sub--text shl-home__footer--sub--text--1">
            <a href="mailto:support@analyttica.com">support@analyttica.com</a>
          </p>
          <p className="shl-home__footer--sub--text">
            Copyright 2020 Analyttica | All Rights Reserved
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
