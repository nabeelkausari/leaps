import React, { Component } from "react";
import ProfileContainer from "../../app/modules/profile/containers/profile";
import { getUserProfileLink } from "../utils/storage";
import { doLogout } from "../utils/doLogout";
import { isLoggedIn } from "../../app/modules/auth/redux/actions";

export default ComposedComponent => {
  class Authentication extends Component {
    state = {
      profile_loaded: false
    };

    checkAuth = () => {
      let profile_link = getUserProfileLink();
      if (!isLoggedIn() || !profile_link) {
        doLogout();
      }
    };

    componentDidMount() {
      this.checkAuth();
      this.props.getprofile();
    }

    componentDidUpdate(prevProps) {
      const { fetch_profile_succeeded } = this.props;
      this.checkAuth();

      if (
        fetch_profile_succeeded &&
        fetch_profile_succeeded !== prevProps.fetch_profile_succeeded
      ) {
        this.setState({ profile_loaded: true });
        this.props.getAllCollaborators();
      }
    }

    render() {
      const { profile_loaded } = this.state;
      if (!profile_loaded) return <div />;
      return <ComposedComponent {...this.props} />;
    }
  }

  return ProfileContainer(Authentication);
};
