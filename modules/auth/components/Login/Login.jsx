import React, { Component } from "react";
import { notify } from "../../../../../common/utils/notification";
import LoginForm from "../shared/LoginForm";
import { goToLogin, goToRegistration } from "../shared/links";
import LoginOrRegister from "../shared/LoginOrRegister";

class Login extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loginSuccess, history } = this.props;
    if (loginSuccess && prevProps.loginSuccess !== loginSuccess) {
      notify.success("Logged in Successful", "");
      history.push("/");
    }
  }

  goToForgotPassword = () => {
    this.props.history.push("/auth/forgot_password");
  };

  render() {
    return (
      <LoginOrRegister
        goToLogin={goToLogin}
        goToRegistration={goToRegistration}
        login
      >
        <LoginForm
          login={this.props.login}
          goToForgotPassword={this.goToForgotPassword}
        />
      </LoginOrRegister>
    );
  }
}

export default Login;
