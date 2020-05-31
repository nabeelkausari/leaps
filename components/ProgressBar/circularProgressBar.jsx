import React, { Component } from "react";

class CircularProgressBar extends Component {
  render() {
    const { percentage, display_value, display_text } = this.props;
    const int_percentage = parseInt(percentage);
    return (
      <div className="course-progress-container">
        <div className="progress" data-percentage={int_percentage}>
          <span className="progress-left">
            <span className="progress-bar" />
          </span>
          <span className="progress-right">
            <span className="progress-bar" />
          </span>
          <div className="progress-value">
            <div className="progress-value-items">
              <div className="progress-value-items--value">{display_value}</div>
              {display_text && (
                <div className="progress-value-items--symbol">
                  {display_text}
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default CircularProgressBar;
