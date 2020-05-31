import React, { Component } from "react";
// import {
//   EmailIcon,
//   KeyIcon,
//   SocialGoogle,
//   SocialLinkedin
// } from "../../../../../common/images";
import { FormControl } from "react-bootstrap";
import { gmailLogin, linkedInLogin } from "./links";
import { setSessionStorage } from "../../../../common/utils/storage";
import { SOCIAL_REDIRECT_KEY } from "../../../../common/utils/constants";

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSocialLogin = platform => {
    const {
      history: {
        location: { pathname }
      }
    } = this.props;

    setSessionStorage(SOCIAL_REDIRECT_KEY, pathname);

    switch (platform) {
      case "google":
        gmailLogin();
        break;
      case "linkedin":
        linkedInLogin();
        break;
    }
  };

  handleLogin = e => {
    e.preventDefault();
    const { history } = this.props;
    const query = new URLSearchParams(history.location.search);
    const caseId = query.get("case_id");

    const params = {
      ...(caseId && { case_id: caseId })
    };
    this.props.login(this.state, params);
  };

  render() {
    const { email, password } = this.state;
    const { goToForgotPassword, socialLogin } = this.props;
    return (
      <form action="#" onSubmit={this.handleLogin}>
        <div className="login__form-sub-container">
          <label className="login__sub-text">Email</label>
          <div className="login__input-wrapper">
            {/*<EmailIcon className="login__input-icon" />*/}
            <FormControl
              placeholder="Email"
              type="text"
              value={email}
              onChange={this.handleChange}
              name="email"
              className="login__input"
            />
          </div>
        </div>

        <div
          className="login__form-sub-container"
          style={{ paddingBottom: "1rem" }}
        >
          <label className="login__sub-text">Password</label>
          <div className="login__input-wrapper">
            {/*<KeyIcon className="login__input-icon" />*/}
            <FormControl
              placeholder="Password"
              type="password"
              value={password}
              onChange={this.handleChange}
              name="password"
              className="login__input"
            />
          </div>
        </div>

        <div className="login__form-sub-container">
          <p className="login__forgot-password" onClick={goToForgotPassword}>
            Forgot Password?
          </p>
          <button type="submit" className="login__btn">
            Sign In
          </button>

          {socialLogin && (
            <div className="login__social-container">
              <p className="login__social-container--text">- OR -</p>
              <div className="login__social-sub-container">
                <img
                  src="/images/icons/icon-google.svg"
                  className="login__social-icon"
                  onClick={() => this.onSocialLogin("google")}
                />

                <img
                  src="/images/icons/icon-linkedin.svg"
                  className="login__social-icon"
                  onClick={() => this.onSocialLogin("linkedin")}
                />
              </div>
            </div>
          )}
        </div>
      </form>
    );
  }
}

export default LoginForm;
