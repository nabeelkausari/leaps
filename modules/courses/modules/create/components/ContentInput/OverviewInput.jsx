import React, { Component } from "react";
import Material from "../../../../../material/components/Material";

class OverviewInput extends Component {
  render() {
    const { content_data, saveOverView, loading } = this.props;
    return (
      <div className="content-input content-input--1">
        {!loading && <Material material_link={content_data._links.self} course_content/>}
      </div>
    );
  }
}

export default OverviewInput;
