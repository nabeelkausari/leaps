import React, { Component } from "react";
import { PrintIcon, PinIcon, FullScreenIcon } from "../../../common/images";
import Tooltip from "../Tooltip/Tooltip";
import cx from "classnames";
import { printResult } from "../../../common/utils/printFile";

class Flyout extends Component {
  getPrefix = sequence_number => {
    let string_number = sequence_number.toString();
    let regex_expression = /[0-9]/g;
    if (string_number.match(regex_expression)) {
      return "0" + string_number;
    } else {
      return string_number;
    }
  };

  render() {
    const {
      title,
      sequence_no,
      require_pin,
      require_full_screen,
      require_download,
      children,
      secondary,
      hideFlyout,
      pinStep,
      results_primary,
      results_secondary,
      OnCLickFullScreen,
      dashboard_items,
      is_flyout_full_screen,
      is_steps_open,
      pin_output_loading,
      read_only,
      is_case,
      print_ref,
      show_pin,
      scenario_id
    } = this.props;

    const is_pinned =
      secondary && results_secondary
        ? dashboard_items.some(d => d.step_id === results_secondary.id)
        : dashboard_items.some(d => d.step_id === results_primary.id);

    const handlePin = () =>
      pinStep(
        secondary ? results_secondary : results_primary,
        false,
        scenario_id
      );

    return (
      <div
        className={
          !is_steps_open
            ? secondary
              ? "flyout-container flyout-container--4"
              : is_flyout_full_screen
              ? "flyout-container flyout-container--3 flyout-container--full-screen"
              : "flyout-container flyout-container--3"
            : secondary
            ? "flyout-container flyout-container--2"
            : is_flyout_full_screen
            ? "flyout-container flyout-container--1 flyout-container--full-screen"
            : "flyout-container flyout-container--1"
        }
      >
        <div className="flyout-container__header">
          <div className="flyout-container__index-no-wrapper">
            <span className="flyout-container__index-no">
              {this.getPrefix(sequence_no)}
            </span>
          </div>
          <div className="flyout-container__title-wrapper">
            <h6 className="flyout-container__title">
              <Tooltip placement="left" text={title}>
                <span> {title}</span>
              </Tooltip>
            </h6>
          </div>
          <div className="flyout-container__options">
            {require_download && (
              <Tooltip placement={"bottom"} text={"Print"}>
                <div className="flyout-container__action-wrapper">
                  <PrintIcon
                    className="flyout-container__action-icon"
                    onClick={() => printResult(print_ref)}
                  />
                </div>
              </Tooltip>
            )}
            {is_case && !read_only && require_pin && show_pin && (
              <Tooltip placement={"bottom"} text={is_pinned ? "Unpin" : "Pin"}>
                <div
                  style={{ opacity: pin_output_loading && ".2" }}
                  className="flyout-container__action-wrapper"
                  onClick={!pin_output_loading ? handlePin : () => {}}
                >
                  <PinIcon
                    className={cx("flyout-container__action-icon", {
                      active: is_pinned
                    })}
                  />
                </div>
              </Tooltip>
            )}
            {require_full_screen && (
              <Tooltip placement={"bottom"} text={"Full Screen"}>
                <div className="flyout-container__action-wrapper">
                  {/*<img src={full_screen_icon} alt="Pin icon" className="flyout-container__action-icon" onClick={() => OnCLickFullScreen(secondary?'secondary':'primary')}/>*/}
                  <FullScreenIcon
                    className={cx("flyout-container__action-icon", {
                      "active--1": is_flyout_full_screen
                    })}
                    onClick={() =>
                      OnCLickFullScreen(secondary ? "secondary" : "primary")
                    }
                  />
                </div>
              </Tooltip>
            )}
          </div>
          <div
            className="flyout-container__close-btn"
            onClick={
              secondary ? () => hideFlyout(true) : () => hideFlyout(false)
            }
          >
            &times;
          </div>
        </div>

        <div className="flyout-container__content">{children}</div>
      </div>
    );
  }
}

export default Flyout;
