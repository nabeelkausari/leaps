import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import SharedDashboardRenderer from "./SharedDashboardRenderer";

class Dashboard extends Component {
  render() {
    const { dashboard_code } = this.props.match.params;
    return (
      <SharedDashboardRenderer
        {...this.props}
        dashboard_code={dashboard_code}
      />
    );
  }
}

export default withRouter(Dashboard);
