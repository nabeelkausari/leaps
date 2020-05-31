import React, { Component, Fragment } from "react";
// import {
//   EmailIcon,
//   KeyIcon,
//   login_bg,
//   Logo
// } from "../../../../../common/images";
import Link from "next/link";

class AuthTemplate extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="login">
        <div
          // style={{ backgroundImage: `url(${login_bg})` }}
          className="login__bg-container"
        >
          <div className="login__bg-holder" />
          <div className="login__bg-content" />
        </div>

        <div className="login__form-container">
          {/*<img src={Logo} alt="Logo" className="login__logo"/>*/}
          <Link href="/">
            {/*<Logo className="login__logo" />*/}
          </Link>
          <Fragment>{children}</Fragment>
        </div>
        <div className="login__content">
          <h2 className="login__content-title">
            A Powerful Ecosystem for <br /> Business Integrated Analytics
          </h2>
        </div>
      </div>
    );
  }
}

export default AuthTemplate;
