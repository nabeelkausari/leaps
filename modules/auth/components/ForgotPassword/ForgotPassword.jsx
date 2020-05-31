import React, { Component } from "react";
import AuthTemplete from "../shared/AuthTemplate";
import ForgotPasswordForm from "../shared/ForgotPasswordForm";
import { goToLogin } from "../shared/links";

class ForgotPassword extends Component {
  render() {
    return (
      <AuthTemplete>
        <ForgotPasswordForm goToLogin={goToLogin} />
      </AuthTemplete>
    );
  }
}

export default ForgotPassword;
