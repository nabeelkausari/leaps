import React, { Component } from "react";
import get from "lodash/get";

import ProfileContainer from "../../app/modules/profile/containers/profile";

export default ComposedComponent => {
  class SolutionAuthentication extends Component {
    checkHasSolutions = () => {
      const { info } = this.props;
      if (!get(info, "_links.solution_dashboard")) {
        this.props.history.push("/");
      }
    };

    componentDidMount() {
      this.checkHasSolutions();
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return ProfileContainer(SolutionAuthentication);
};
