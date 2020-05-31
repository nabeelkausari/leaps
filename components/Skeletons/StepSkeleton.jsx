import React, { Component } from "react";

class StepSkeleton extends Component {
  render() {
    return (
      <div className="step-skeleton">
        <div className="step-skeleton__container">
          <div className="step-skeleton__wrapper">
            <div className="step-skeleton__functions"></div>
          </div>
          <div className="step-skeleton__wrapper">
            <div className="step-skeleton__columns"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default StepSkeleton;
