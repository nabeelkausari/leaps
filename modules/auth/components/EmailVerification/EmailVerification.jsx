import React, { Component } from "react";
import AuthTemplete from "../shared/AuthTemplate";
import Loader from "../../../../components/Loader";

class EmailVerification extends Component {
  componentDidMount() {
    this.props.verifyEmail();
  }

  render() {
    return (
      <AuthTemplete>
        <div className="login__email-sent flex-default">
          <Loader
            style={{
              height: "80%",
              background: "transparent"
            }}
            loading
          />
        </div>
      </AuthTemplete>
    );
  }
}

export default EmailVerification;
