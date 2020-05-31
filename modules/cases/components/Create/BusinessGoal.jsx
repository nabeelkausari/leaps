import React, { Component } from "react";
import { Button } from "../../../../components/Buttons/Button";

import CaseContainer from "../../containers/Create/createCase";
import { notify } from "../../../../../common/utils/notification";
import { FormInput } from "../../../../components/Forms/FormInput";
import Input from "../../../../components/Forms/Input";

class BusinessGoal extends Component {
  state = {
    description: "",
    issue: "",
    outcome: ""
  };

  componentDidMount() {
    this.props.getCaseCategories();
  }

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { description, issue, outcome } = this.state;
    if (
      description.length === 0 ||
      issue.length === 0 ||
      outcome.length === 0
    ) {
      notify.warning("All fields are mandatory", "");
      return false;
    }
    return true;
  };

  submitBusinessGoal = () => {
    this.setState({ should_reset: false });
    if (this.validateForm()) {
      this.props.createBusinessProblem(this.state);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const { description, issue, outcome } = this.state;
    const { history } = this.props;
    return (
      <div className="problem-statement">
        <div className="problem-statement__title">
          <h4>Define Business goal</h4>
        </div>
        <div className="problem-statement__container">
          <Input
            name="description"
            type="textarea"
            value={description}
            label="Describe your business problem or strategy"
            placeholder=" Describe here"
            onChange={this.handleInputChange}
            tabIndex="0"
          />
        </div>

        <div className="problem-statement__container">
          <Input
            name="issue"
            type="textarea"
            value={issue}
            label="Current state or issue"
            placeholder="Describe here"
            onChange={this.handleInputChange}
            tabIndex="0"
          />
        </div>

        <div className="problem-statement__container">
          <Input
            name="outcome"
            type="textarea"
            value={outcome}
            label="Expected Outcome"
            placeholder="Describe here"
            onChange={this.handleInputChange}
            tabIndex="0"
          />
        </div>

        <div className="footer">
          <Button
            className="create-case-btn create-case-btn--secondary-left"
            variant="primary"
            onClick={() => history.push("/cases")}
          >
            Cancel
          </Button>
          <Button
            className="create-case-btn create-case-btn--primary"
            buttonType="primary"
            onClick={this.submitBusinessGoal}
          >
            Continue
          </Button>
        </div>
      </div>

      // <div>
      //    <div style={{display:"flex",justifyContent:"space-between"}}>
      //
      //        <Button buttonType="primary" onClick={this.submitBusinessGoal}>Continue</Button>
      //    </div>
      //    <div style={{display:"flex", flexDirection:"column"}}>
      //         <p>Describe your business problem or strategy</p>
      //        <textarea placeholder=" Describe here" name="description" value={description} onChange={this.handleInputChange}/>
      //
      //    </div>
      //    <div style={{display:"flex", flexDirection:"column"}}>
      //         <p>Current state or issue</p>
      //        <textarea placeholder=" Describe here" name="issue" value={issue} onChange={this.handleInputChange}/>
      //
      //    </div>
      //    <div style={{display:"flex", flexDirection:"column"}}>
      //         <p>Expected Outcome</p>
      //        <textarea placeholder=" Describe here" name="outcome" value={outcome} onChange={this.handleInputChange}/>
      //    </div>
      // </div>
    );
  }
}

export default CaseContainer(BusinessGoal);
