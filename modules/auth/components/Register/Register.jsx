import React from "react";
import RegisterForm from "../shared/RegisterForm";
import { goToLogin, goToRegistration } from "../shared/links";
import LoginOrRegister from "../shared/LoginOrRegister";

export default props => (
  <LoginOrRegister
    goToLogin={goToLogin}
    goToRegistration={goToRegistration}
    register
  >
    <RegisterForm {...props} free_trial />
  </LoginOrRegister>
);
