import React, { Component, Fragment } from "react";
import { Navbar } from "react-bootstrap";
import Link from "next/link"
import {NewHeaderContent} from "./HeaderVariants"
import AuthModal from "../../auth/components/shared/AuthModal";

class Header extends Component {
  state = {
    modalVisible: false
  };

  toggleModal = () =>
    this.setState(({ modalVisible }) => ({ modalVisible: !modalVisible }));

  render() {
    return (
      <Fragment>
        <Navbar bg="case-list-header">
          <Navbar.Brand className="ath-logo-holder">
            <Link href={"/"}>
              <img
                src="/logos/leaps.svg"
                style={{ height: "2.5rem", cursor: "pointer" }}
                className="ath-logo"
                alt="logo"
              />
            </Link>
          </Navbar.Brand>

          <NewHeaderContent />
          <div className="case-list-header__un-auth-wrapper">
            <AuthModal
              Trigger={({ handleClick }) => (
                <button
                  className="btn btn-link btn-link--no-highlight"
                  style={{ marginLeft: "1rem", fontSize: "1.2rem" }}
                  onClick={handleClick}
                >
                  Sign in
                </button>
              )}
            />
          </div>
        </Navbar>
        {this.props.children}
      </Fragment>
    );
  }
}

export default Header;
