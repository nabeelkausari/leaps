import React, { Component, Fragment } from "react";
import { tick_icon } from "../../../common/images";
import cx from "classnames";
import { notify } from "../../../common/utils/notification";

export class Wizard extends Component {
  state = {
    currentStep: 1
  };

  next = () => {
    if (this.props.steps[this.state.currentStep - 1].validation) {
      let should_proceed = this.props.steps[
        this.state.currentStep - 1
      ].validation_function();
      if (should_proceed) {
        this.setState(state => {
          this.props.steps[state.currentStep - 1].onNextClick();
          if (this.props.steps.length > state.currentStep) {
            return { currentStep: state.currentStep + 1 };
          }
        });
      } else {
        notify.error(
          "Error",
          this.props.steps[this.state.currentStep - 1].validation_msg
        );
      }
    } else {
      this.setState(state => {
        this.props.steps[state.currentStep - 1].onNextClick();
        if (this.props.steps.length > state.currentStep) {
          return { currentStep: state.currentStep + 1 };
        }
      });
    }
  };

  prev = () => {
    this.setState(state => {
      if (state.currentStep !== 1) {
        return { currentStep: state.currentStep - 1 };
      }
    });
  };

  getClassname = step_id => {
    if (this.state.currentStep === step_id) {
      return "stepper-steps-current";
    } else if (this.state.currentStep > step_id) {
      return "stepper-steps-complete";
    } else {
      return "stepper-steps";
    }
  };

  render() {
    const { currentStep } = this.state;
    const { solution_creator } = this.props;
    return (
      <div className="wizard">
        <div className="wizard__header stepper-component">
          {this.props.steps.map((step, index) => (
            <Fragment>
              <div className={this.getClassname(step.id)}>
                <div className={this.getClassname(step.id) + "__indicator"}>
                  {currentStep > step.id ? (
                    <img
                      src={tick_icon}
                      alt=""
                      className="stepper-steps-complete__icon"
                    />
                  ) : (
                    <span className=""> {step.id}</span>
                  )}
                </div>
                <div className={this.getClassname(step.id) + "__info"}>
                  <div className={this.getClassname(step.id) + "__step-no"}>
                    {step.upperText}
                  </div>
                  <div className={this.getClassname(step.id) + "__title"}>
                    {step.lowerText}
                  </div>
                </div>
              </div>
              {this.props.steps.length !== index + 1 && (
                <hr
                  className={
                    currentStep - step.id === 1
                      ? "stepper-component__line stepper__line--complete"
                      : "stepper-component__line"
                  }
                />
              )}
            </Fragment>
          ))}
        </div>
        <div
          className={cx("wizard__body", {
            "wizard__body--1": solution_creator
          })}
        >
          {this.props.steps[currentStep - 1].component}
        </div>
        <div
          className={cx("wizard__footer", {
            "wizard__footer--1": solution_creator
          })}
        >
          <button
            className="wizard__footer--cancel"
            onClick={this.props.onCancel}
          >
            Cancel
          </button>
          <div className="wizard__footer--container">
            {currentStep !== 1 && (
              <button className="wizard__footer--back" onClick={this.prev}>
                Back
              </button>
            )}
            <button className="wizard__footer--next" onClick={this.next}>
              {this.props.steps[currentStep - 1].nextButtonLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
