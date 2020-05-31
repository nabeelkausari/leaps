import React, { Component } from "react";
import get from "lodash/get";
import Material from "../../../material/components/CaseMaterial";

class SubmissionRules extends Component {
  render() {
    const { current_hackathon } = this.props;
    const submission_link = get(
      current_hackathon,
      "solve_details[0]._links.get_solution_submission_rules"
    );
    const edit_submission_link = get(
      current_hackathon,
      "solve_details[0]._links.edit_solution_submission_rules"
    );
    return (
      <div className="hd-child">
        <div className="hd-child-material">
          <h2 className="hd-child-material__title">Submission Rules</h2>
          <Material
            material_link={submission_link}
            update_link={edit_submission_link}
          />
        </div>
      </div>
    );
  }
}

export default SubmissionRules;
