import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import authContainer from "../../containers/login";
import { LoginOrRegisterTabs } from "./LoginOrRegister";
import ForgotPasswordForm from "./ForgotPasswordForm";

class AuthModal extends Component {
  state = {
    show: false,
    login: true,
    forgot: false
  };
  openModal = () => {
    const { showRegister } = this.props;
    this.setState({ show: true, login: !showRegister });
  };
  closeModal = () => {
    this.setState({ show: false, login: true });
    if (this.props.onCloseCallback) this.props.onCloseCallback();
  };
  toggleLogin = () =>
    this.setState(({ login }) => ({ login: !login, forgot: false }));
  toggleForgot = () => this.setState(({ forgot }) => ({ forgot: !forgot }));
  backToLogin = () => this.setState({ login: true, forgot: false });

  componentDidMount() {
    const { showRegister, openModal } = this.props;
    if (showRegister) {
      this.setState({ login: false });
    }

    if (openModal !== undefined) {
      this.setState({ show: openModal });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.openModal !== prevProps.openModal) {
      this.setState({ show: this.props.openModal });
    }
  }

  render() {
    const { Trigger, hideTrigger = false } = this.props;
    const { login, show, forgot } = this.state;
    return (
      <>
        {!hideTrigger && <Trigger handleClick={this.openModal} />}
        <Modal
          show={show}
          onHide={this.closeModal}
          size="sm"
          aria-labelledby="example-modal-sizes-title-lg"
          style={{ height: "100%" }}
        >
          <Modal.Header>
            <Modal.Title>Authentication</Modal.Title>
            <img alt="Close" src="/icons/close.svg" className="extract-close" onClick={this.closeModal}/>
          </Modal.Header>
          <Modal.Body style={{ overflow: "auto", padding: "2rem 4rem" }}>
            {forgot ? (
              <ForgotPasswordForm
                goToLogin={this.backToLogin}
                {...this.props}
              />
            ) : (
              <>
                <LoginOrRegisterTabs
                  login={login}
                  register={!login}
                  allow_registration={true}
                  goToLogin={this.toggleLogin}
                  goToRegistration={this.toggleLogin}
                />
                {login ? (
                  <LoginForm
                    goToForgotPassword={this.toggleForgot}
                    socialLogin
                    {...this.props}
                  />
                ) : (
                  <RegisterForm full_height {...this.props} />
                )}
              </>
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default authContainer(AuthModal);
