import React, { Component } from "react";
import { CreateCaseHeader } from "./CreateCaseHeader";
import { Wizard } from "../../../../components/Wizard";

import BusinessGoal from "./BusinessGoal";
import Recommendations from "./Recommendations";
import CaseInfo from "./CaseInfo";

import "./Create.scss";

class CreateCase extends Component {
  steps = [
    { id: 1, name: "Step 1", component: <BusinessGoal /> },
    { id: 2, name: "Step 2", component: <Recommendations /> },
    { id: 3, name: "Step 3", component: <CaseInfo /> }
  ];

  render() {
    return (
      <div>
        <Wizard steps={this.steps} />
      </div>
    );
  }
}

export default CreateCase;
