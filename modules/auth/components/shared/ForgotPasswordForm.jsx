import React, { Component } from "react";
// import { CheckIcon, EmailIcon } from "../../../../../common/images";
import { FormControl } from "react-bootstrap";
import { Button } from "../../../../components/Buttons/Button";

class ForgotPasswordForm extends Component {
  state = {
    email: "",
    email_sent: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { forgot_password_succeeded } = this.props;
    if (
      forgot_password_succeeded &&
      forgot_password_succeeded !== prevProps.forgot_password_succeeded
    ) {
      this.setState({ email_sent: true });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.forgotPassword({
      emailId: this.state.email,
      tenantName: "analyttica"
    });
  };
  render() {
    const { email, email_sent } = this.state;
    return (
      <>
        {!email_sent && (
          <div>
            <div className="login__form-sub-container">
              <h2 className="login__title">
                <span className="login__title--orange">Forgot Password?</span>
              </h2>
              <h4 className="login__sub-title">
                Enter the email id you used when you signed up. We will help you
                out
              </h4>
            </div>
            <form action="#" onSubmit={this.handleSubmit}>
              <div className="login__form-sub-container">
                <label className="login__sub-text">Email Id</label>
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

              <div className="login__form-sub-container">
                <Button
                  type="submit"
                  className="login__btn"
                  buttonType="primary"
                >
                  Submit
                </Button>
              </div>

              <div className="login__form-sub-container">
                <p className="login__forgot-password" onClick={this.props.goToLogin}>
                  Back to Login
                </p>
              </div>
            </form>
          </div>
        )}

        {email_sent && (
          <div className="login__email-sent">
            {/*<CheckIcon className="login__email-sent--logo" />*/}
            <h2 className="login__email-sent--title">
              Reset Password requested, you will receive an email soon{" "}
            </h2>
          </div>
        )}
      </>
    );
  }
}

export default ForgotPasswordForm;
