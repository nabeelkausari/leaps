import React, { Component } from "react";
import ProfileContainer from "../../app/modules/profile/containers/profile";
import { getUserProfileLink } from "../utils/storage";

export default ComposedComponent => {
  class Authentication extends Component {
    state = {
      profile_loaded: false
    };
    profile_link = getUserProfileLink();

    componentDidMount() {
      if (this.profile_link) {
        this.props.getprofile();
      }
    }

    componentDidUpdate(prevProps) {
      const { fetch_profile_succeeded, loginSuccess } = this.props;

      if (
        fetch_profile_succeeded &&
        fetch_profile_succeeded !== prevProps.fetch_profile_succeeded
      ) {
        this.setState({ profile_loaded: true });
        this.props.getAllCollaborators();
      }

      if (loginSuccess && loginSuccess !== prevProps.loginSuccess) {
        this.props.getprofile();
        this.setState({ profile_loading: true });
      }
    }

    render() {
      const { profile_loaded } = this.state;
      if (!profile_loaded && this.profile_link) return <div />;
      return <ComposedComponent {...this.props} />;
    }
  }

  return ProfileContainer(Authentication);
};
