import React, { Component } from "react";
import ProfileContainer from "../modules/profile/containers/profile";
import { isCreator } from "../../common/utils/helperFunctions";
import { history } from "../../index";

export default ComposedComponent => {
  class CheckCreatorRole extends Component {
    state = {
      fetchedUserRoles: false
    };

    componentDidMount() {
      const { info } = this.props;

      if (!isCreator(info)) {
        history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return ProfileContainer(CheckCreatorRole);
};
