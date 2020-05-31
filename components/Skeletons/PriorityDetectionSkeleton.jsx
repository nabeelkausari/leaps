import React, { Component } from "react";

class PriorityDetectionSkeleton extends Component {
  render() {
    return (
      <div className="step-skeleton">
        <div className="step-skeleton__container">
          <div className="skeleton-index-no__wrapper"></div>
          <div className="step-skeleton__wrapper">
            <div className="step-skeleton__icon"></div>
            <div className="step-skeleton__functions"></div>
          </div>
          <div className="step-skeleton__wrapper">
            <div className="step-skeleton__icon"></div>
            <div className="step-skeleton__columns"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PriorityDetectionSkeleton;
