import React, { Component } from "react";

import { tick_icon } from "../../../../../common/images/index";
import { withRouter } from "react-router-dom";

class CaseCreationStepper extends Component {
  state = {
    step_1_complete: false,
    step_2_complete: false,
    step_3_complete: false
  };

  componentDidMount() {
    this.checkUrl();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkUrl();
    }
  }

  checkUrl = () => {
    switch (this.props.location.pathname) {
      case "/create":
        this.setState({
          step_1_complete: false,
          step_2_complete: false,
          step_3_complete: false
        });
        break;
      case "/create/our_recommendations":
        this.setState({ step_1_complete: true });
        break;
      case "/create/case_info":
        this.setState({ step_2_complete: true });
        break;
      default:
        break;
    }
  };

  render() {
    const { step_1_complete, step_2_complete, step_3_complete } = this.state;
    const step1 = step_1_complete ? "stepper-step-complete" : "stepper-step";
    const step2 = step_2_complete ? "stepper-step-complete" : "stepper-step";
    const step3 = step_3_complete ? "stepper-step-complete" : "stepper-step";

    return (
      <div className="case-creation-flow">
        <div className="stepper">
          <div className={step1}>
            <div className={step1 + "__indicator"}>
              {step_1_complete ? (
                <img
                  src={tick_icon}
                  alt=""
                  className="stepper-step-complete__icon"
                />
              ) : (
                "01"
              )}
            </div>
            <div className={step1 + "__info"}>
              <div className={step1 + "__step-no"}>Step 01</div>
              <div className={step1 + "__title"}>Define Business Goal</div>
            </div>
          </div>

          <hr
            className={
              step_1_complete
                ? "stepper__line stepper__line--complete"
                : "stepper__line"
            }
          />

          <div className={step2}>
            <div className={step2 + "__indicator"}>
              {step_2_complete ? (
                <img
                  src={tick_icon}
                  alt=""
                  className="stepper-step-complete__icon"
                />
              ) : (
                "02"
              )}
            </div>
            <div className={step2 + "__info"}>
              <div className={step2 + "__step-no"}>Step 02</div>
              <div className={step2 + "__title"}>Our Recommendations</div>
            </div>
          </div>

          <hr
            className={
              step_2_complete
                ? "stepper__line stepper__line--complete"
                : "stepper__line"
            }
          />

          <div className={step3}>
            <div className={step3 + "__indicator"}>
              {step_3_complete ? (
                <img
                  src={tick_icon}
                  alt=""
                  className="stepper-step-complete__icon"
                />
              ) : (
                "03"
              )}
            </div>
            <div className={step3 + "__info"}>
              <div className={step3 + "__step-no"}>Step 03</div>
              <div className={step3 + "__title"}>Save Your Case</div>
            </div>
          </div>
        </div>

        <hr className="stepper__bottom-divider" />

        <div className="stepper__children">{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(CaseCreationStepper);
