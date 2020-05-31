import React from "react";
import cx from "classnames";
import AuthTemplate from "./AuthTemplate";

export const LoginOrRegisterTabs = ({
  login,
  register,
  goToLogin,
  goToRegistration,
  allow_registration
}) => (
  <div className="login__tabs">
    <div
      className={cx("login__tab-item", {
        "login__tab-item--active": login
      })}
      onClick={goToLogin}
    >
      Sign In
    </div>
    {allow_registration && (
      <div
        className={cx("login__tab-item", {
          "login__tab-item--active": register
        })}
        onClick={goToRegistration}
      >
        Sign Up
      </div>
    )}
  </div>
);

const LoginOrRegister = ({ children, ...props }) => {
  return (
    <AuthTemplate>
      <div className="login__forms">
        <div className="login__form-sub-container">
          <h2
            className={cx("login__title")}
          >
            Welcome to <span className="login__title--orange">Precision</span>
          </h2>
        </div>
        <LoginOrRegisterTabs
          {...props}
          allow_registration={true}
        />
        {children}
      </div>
    </AuthTemplate>
  );
};

export default LoginOrRegister;
