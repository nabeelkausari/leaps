import React, { Component } from "react";
import { isLoggedIn } from "../../app/modules/auth/redux/actions";

export default ComposedComponent => {
  class UnAuth extends Component {
    checkUnAuth = () => {
      if (isLoggedIn()) {
        this.props.history.push("/cases/3/4/dataset");
      }
    };

    componentDidMount() {
      this.checkUnAuth();
    }

    componentDidUpdate() {
      this.checkUnAuth();
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return UnAuth;
};
