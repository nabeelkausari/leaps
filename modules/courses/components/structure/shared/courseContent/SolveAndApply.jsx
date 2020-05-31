import React, { Component } from "react";
import Material from "../../../../../material/components/Material";
import { Button } from "../../../../../../components/Buttons/Button";

class SolveAndApply extends Component {
  render() {
    const { solve, primary_action } = this.props;
    return (
      <div className="course-module-content__content">
        <div className="course-module-content__content-material">
          <Material
            material_link={solve._links.details}
            is_editable={solve._links.update}
            course_content
          />
        </div>
        <div className="course-module-content__content-actions">
          <Button variant="primary" size="md" onClick={primary_action}>
            Proceed
          </Button>
        </div>
      </div>
    );
  }
}

export default SolveAndApply;
