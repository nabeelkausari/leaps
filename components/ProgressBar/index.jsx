import React, { Component } from "react";

class ProgressBar extends Component {
  render() {
    const { completed_percentage, width } = this.props;
    const bar_width = width ? width : 20;
    const bar_width_string = bar_width.toString() + "rem";
    const active_width =
      (bar_width - bar_width * (completed_percentage / 100)).toString() + "rem";
    return (
      <div className="ath-progress-bar">
        <div className="ath-progress-bar__text">
          {completed_percentage} % Completed
        </div>
        <div
          className="ath-progress-bar__wrapper"
          style={{ width: bar_width_string }}
        >
          <div
            className="ath-progress-bar__active-area"
            style={{ width: active_width }}
          >
            &nbsp;
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
