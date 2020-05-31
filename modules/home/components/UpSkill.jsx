import React, { Component } from "react";
// import { HashLink } from "react-router-hash-link";

// import { scholar_up_skill } from "../../../../common/images";
import { Button } from "../../../components/Buttons/Button";
import AuthModal from "../../auth/components/shared/AuthModal";
import Link from "next/link"
// import { ScrollDown } from "../../../../common/images";

class UpSkill extends Component {
  render() {
    const { mobile_display, handleOpenModal } = this.props;

    let main_container_class = `shl-home__main-container ${
      mobile_display
        ? "shl-home--direction-column-reverse shl-home__main-container--padding-mobile"
        : "shl-home__main-container--full-height shl-home__main-container--padding-full"
    }`;

    let equal_sub_wrapper_2_class = `shl-home__equal-sub-container shl-home--align-centre ${
      mobile_display ? "shl-home--justify-centre u-margin-bottom-large" : ""
    }`;

    return (
      <div className={main_container_class}>
        <div className="shl-home__equal-sub-container shl-home--align-centre">
          <div className="shl-home__section-info-wrapper">
            <h4 className="shl-home__section-title-2">
              Experience Applied Data Science
            </h4>
            <div className="shl-home__section-wrapper">
              <h2
                className={`shl-home__section-title-4${
                  mobile_display ? "--mobile shl-home__section-title-4" : ""
                }`}
              >
                <b>
                  <span>le</span>arn
                </b>{" "}
                by doing,
              </h2>
              <h2
                className={`shl-home__section-title-4${
                  mobile_display ? "--mobile shl-home__section-title-4" : ""
                }`}
              >
                <b>
                  <span>ap</span>ply
                </b>{" "}
                by experimenting,
              </h2>
              <h2
                className={`shl-home__section-title-4${
                  mobile_display ? "--mobile shl-home__section-title-4" : ""
                }`}
              >
                <b>
                  <span>s</span>olve
                </b>{" "}
                like a pro.
              </h2>
            </div>
            <p className="shl-home__section-info-text u-margin-right-medium">
              Experience the hands on data science virtual lab and courses,
              designed by industry experts, powered by our patented and award
              winning platform ATH Precision
            </p>
            <div className="shl-home__section-actions-wrapper">
              <div className="shl-home__section-actions-wrapper--1">
                <AuthModal
                  showRegister
                  Trigger={({ handleClick }) => (
                    <Button
                      className={
                        mobile_display
                          ? "u-margin-right-small"
                          : "u-margin-right-medium"
                      }
                      onClick={handleClick}
                      variant="primary"
                      size={mobile_display ? "lg" : "xl"}
                    >
                      Join for Free
                    </Button>
                  )}
                />

                <p
                  className={`shl-home__section-action-text ${
                    mobile_display
                      ? "u-margin-right-small"
                      : "u-margin-right-medium"
                  } `}
                >
                  Product Intro
                </p>

                <div className="shl-home__play-btn" onClick={handleOpenModal}>
                  <i
                    className={`fa fa-play ${
                      mobile_display
                        ? "shl-home__play-btn--icon--mobile"
                        : "shl-home__play-btn--icon"
                    }`}
                  />
                </div>
              </div>
              <AuthModal
                Trigger={({ handleClick }) => (
                  <div className="shl-home__section-actions-wrapper--2">
                    <p className="shl-home__section-action-text ">
                      Already registered ?{"  "}
                      <button className="btn btn-link" onClick={handleClick}>
                        Sign in
                      </button>
                    </p>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <div className={equal_sub_wrapper_2_class}>
          <img
            className={`shl-home__section-img ${mobile_display &&
              "shl-home__section-img--mobile"}`}
            src="/images/scholar-upskill.png"
            alt="section img"
          />
        </div>
        {!mobile_display && (
          <Link
            href="/#scroll-down"
          >
            <a className="shl-home__scroll-down"><img src="/icons/scroll-down.svg" className="shl-home__scroll-down--icon"/></a>
          </Link>
        )}
      </div>
    );
  }
}

export default UpSkill;
