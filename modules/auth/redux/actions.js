import {
  setJoyrideLink,
  tokens,
  tokensWithCaseId,
  users
} from "../../../common/api/tokens";
import * as types from "./types";
import {
  getLocalStorage,
  REGISTER_PARAMS,
  removeCourseRef,
  removeLocalStorage,
  setUserGlobalNotification,
  setUserId,
  setUserProfileLink
} from "../../../common/utils/storage";
import { doLogout } from "../../../common/utils/doLogout";
import { notify } from "../../../common/utils/notification";
import { BASE_URI } from "../../../common/api/constants";
import { fetchLinkAs } from "../../../common/api/helpers";
import {
  authorizer,
  getGoogleLoginLink,
  getLinkedInLoginLink
} from "../../../common/api/auth";
import { SentryApp } from "../../../common/errorhandler/sentry";
import { useRouter } from 'next/router'


const setLinksToLocalStorage = token => {
  setUserId(token.user_id);
  setUserProfileLink(token._links.user_profile);
  setUserGlobalNotification(token.notification);
  setJoyrideLink(token);
};

export const login = ({ email, password }, query) => dispatch => {
  dispatch({ type: types.LOGIN_REQUESTED });
  return tokens
    .create(email, password, query)
    .then(payload => {
      setLoginCredentials(payload);
      dispatch({ type: types.LOGIN_SUCCEEDED, payload });
    })
    .catch(payload => {
      notify.error("Error", payload.message);
      dispatch({ type: types.LOGIN_FAILED, payload });
    });
};

const setLoginCredentials = token => {
  SentryApp.setUser(token.user_id);
  setLinksToLocalStorage(token);
};

export const logout = () => dispatch => {
  doLogout();
  dispatch({ type: types.USER_LOGOUT });
  notify.success("You have been successfully logged out!", "");
};

export const forgotPassword = param => dispatch => {
  dispatch({ type: types.FORGOT_PASSWORD_REQUESTED });
  users
    .generateResetPasswordLink(param)
    .then(payload => {
      dispatch({ type: types.FORGOT_PASSWORD_SUCCEEDED });
    })
    .catch(error => {
      dispatch({ type: types.FORGOT_PASSWORD_FAILED });
      notify.error("Reset Failed", error.message);
    });
};

export const resetPassword = param => dispatch => {
  dispatch({ type: types.RESET_PASSWORD_REQUESTED });
  users
    .resetPassword(param)
    .then(payload => {
      dispatch({ type: types.RESET_PASSWORD_SUCCEEDED });
    })
    .catch(error => {
      dispatch({ type: types.RESET_PASSWORD_FAILED });
      notify.error("Reset Failed", error.message);
    });
};

export const register = (registration, params) => dispatch => {
  dispatch({ type: types.REGISTER_REQUESTED });
  return users
    .register(
      {
        ...registration,
        experience: 0,
        user_type: "individual",
        tenant_string: "analyttica"
      },
      params
    )
    .then(payload => {
      dispatch({ type: types.REGISTER_SUCCEEDED, payload });
      removeLocalStorage(REGISTER_PARAMS);
    })
    .catch(payload => {
      notify.error("Error", payload.message);
      dispatch({ type: types.REGISTER_FAILED, payload });
    });
};

export const resetRegister = () => dispatch => {
  dispatch({ type: types.RESET_REGISTER });
};

export const verifyEmail = query => dispatch =>
  users
    .verifyEmail(query || window.location.search)
    .then(res => res.json())
    .then(res => {
      if (res.status === 410) {
        notify.error(
          "Error",
          "Your email verification link has expired. We will send another link to your registered Email ID."
        );
        throw new Error("Verification link is invalid");
      }

      if (!res.success) {
        notify.error(res.error, res.message);
        throw new Error(res.error);
      }

      notify.success(
        "Your email was verified successfully.",
        "You will be redirected to the login page shortly."
      );

      const tenant_name = res.tenant;
      let login_page = "/auth/login";
      if (tenant_name !== undefined && tenant_name !== "analyttica") {
        login_page = "/" + tenant_name;
      }
      const router = useRouter();
      setTimeout(() => router.push(login_page), 5000);
    })
    .catch(err => console.log("err: ", err));

export const fetchCountryCodes = () => dispatch => {
  dispatch({ type: types.FETCH_COUNTRY_CODES_REQUESTED });
  const link = { method: "GET", href: "/countries" };
  return fetch(`${BASE_URI}${link.href}`)
    .then(res => res.json())
    .then(payload => {
      dispatch({ type: types.FETCH_COUNTRY_CODES_SUCCEEDED, payload });
    })
    .catch(payload => {
      notify.error("Error", payload.message);
      dispatch({ type: types.FETCH_COUNTRY_CODES_FAILED, payload });
    });
};

export const loginWithGoogle = auth_code => (dispatch, getState) => {
  let link = getGoogleLoginLink(auth_code);
  const body = getLocalStorage(REGISTER_PARAMS, true);
  dispatch({ type: types.LOGIN_REQUESTED });
  fetchLinkAs(link, body)
    .then(payload => {
      removeLocalStorage(REGISTER_PARAMS);
      removeCourseRef();
      SetBearerToken(payload.authorization);
      setLinksToLocalStorage(payload);
      dispatch({ type: types.LOGIN_SUCCEEDED, payload });
    })
    .catch(payload => {
      notify.error("Error", payload.message);
      dispatch({ type: types.LOGIN_FAILED, payload });
    });
};

export const loginWithLinkedIn = auth_code => (dispatch, getState) => {
  let link = getLinkedInLoginLink(auth_code);
  const body = getLocalStorage(REGISTER_PARAMS, true);
  dispatch({ type: types.LOGIN_REQUESTED });
  fetchLinkAs(link, body)
    .then(payload => {
      removeLocalStorage(REGISTER_PARAMS);
      removeCourseRef();
      SetBearerToken(payload.authorization);
      setLinksToLocalStorage(payload);
      dispatch({ type: types.LOGIN_SUCCEEDED, payload });
    })
    .catch(payload => {
      notify.error("Error", payload);
      dispatch({ type: types.LOGIN_FAILED, payload });
    });
};

const SetBearerToken = token => {
  authorizer.setHeader(`Bearer ${token}`);
};

export const isLoggedIn = () => localStorage.getItem("__auth");
