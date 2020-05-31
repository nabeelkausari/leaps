import React, { Component } from "react";
import AuthTemplete from "../shared/AuthTemplate";
import { CheckIcon, EmailIcon, KeyIcon } from "../../../../../common/images";
import { FormControl } from "react-bootstrap";
import { Button } from "../../../../components/Buttons/Button";
import { Link, withRouter } from "react-router-dom";
import LoginContainer from "../../containers/login";
import { validatePassword } from "../../../../../common/api/tokens";

class ResetPassword extends Component {
  state = {
    new_password: "",
    confirm_password: "",
    reset_successfull: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { reset_password_succeeded } = this.props;
    if (
      reset_password_succeeded &&
      reset_password_succeeded !== prevProps.reset_password_succeeded
    ) {
      this.setState({ reset_successfull: true });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { new_password, confirm_password } = this.state;
    const {
      match: {
        params: { code }
      }
    } = this.props;

    if (validatePassword(new_password, confirm_password)) {
      this.props.resetPassword({ code, password: new_password });
    }
  };

  render() {
    const { new_password, confirm_password, reset_successfull } = this.state;
    return (
      <AuthTemplete>
        {!reset_successfull && (
          <div>
            <div className="login__form-sub-container">
              <h2 className="login__title">
                {" "}
                <span className="login__title--orange">Reset Password</span>
              </h2>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="login__form-sub-container">
                <label className="login__sub-text">New Password</label>
                <div className="login__input-wrapper">
                  <KeyIcon className="login__input-icon" />
                  <FormControl
                    placeholder="Password"
                    type="password"
                    value={new_password}
                    onChange={this.handleChange}
                    name="new_password"
                    className="login__input"
                  />
                </div>
              </div>

              <div className="login__form-sub-container">
                <label className="login__sub-text">Confirm Password</label>
                <div className="login__input-wrapper">
                  <KeyIcon className="login__input-icon" />
                  <FormControl
                    placeholder="Password"
                    type="password"
                    value={confirm_password}
                    onChange={this.handleChange}
                    name="confirm_password"
                    className="login__input"
                  />
                </div>
              </div>

              <div className="login__form-sub-container">
                <Button
                  type="submit"
                  className="login__btn"
                  buttonType="primary"
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        )}

        {reset_successfull && (
          <div className="login__email-sent">
            <CheckIcon className="login__email-sent--logo" />
            <h2 className="login__email-sent--title">Successfully Reset</h2>
            <Link className="login__email-sent--action" to="/auth/login">
              Back to Sign In
            </Link>
          </div>
        )}
      </AuthTemplete>
    );
  }
}

export default LoginContainer(withRouter(ResetPassword));
