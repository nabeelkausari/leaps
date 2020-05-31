import React, { Component } from "react";
import Material from "../../../../../material/components/Material";

class Overview extends Component {
  render() {
    const { overview } = this.props;
    return (
      <div className="course-module-content__content">
        <div className="course-module-content__content-material">
          <Material
            material_link={overview._links.self}
            update_link={overview._links.update}
            course_content
          />
        </div>
      </div>
    );
  }
}

export default Overview;
