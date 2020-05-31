import React, { Component } from "react";
import { notify } from "../../../../../common/utils/notification";
import { SOCIAL_REDIRECT_KEY } from "../../../../../common/utils/constants";
import { getSessionStorage } from "../../../../../common/utils/storage";
import {APP_URL} from "../../../../../common/api/constants";

const getUrlValue = (key, url_string) =>
  url_string
    .filter(item => item.split("=")[0] === key)
    .map(keyValue => keyValue.split("=")[1])
    .shift();

class SocialLogin extends Component {
  componentDidMount() {
    let query = this.props.location.search;
    const sliced = query.slice(1);
    const split_string = sliced.split("&");
    const error = getUrlValue("error", split_string);
    if (error) {
      console.log("error : ", error);
    }
    const provider = getUrlValue("provider", split_string);
    const code = getUrlValue("code", split_string);

    switch (provider) {
      case "google":
        return this.props.loginWithGoogle(code);
      case "linkedin":
        return this.props.loginWithLinkedIn(code);
      default:
        console.log("Invalid provider");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loginSuccess } = this.props;
    if (loginSuccess && prevProps.loginSuccess !== loginSuccess) {
      notify.success("Logged in Successful", "");
      let url = getSessionStorage(SOCIAL_REDIRECT_KEY);
      window.location.href = `${APP_URL}${url}`;
    }
  }

  render() {
    return <div />;
  }
}

export default SocialLogin;
