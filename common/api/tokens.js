import { fetchLink, fetchLinkAs } from "./helpers";
import * as base64 from "base-64";
import { authorizer } from "./auth";
import { TOKEN } from "./media-types";
import { notify } from "../utils/notification";
import { BASE_URI } from "./constants";

const EMAIL_VERIFICATION_URI = `${BASE_URI}users/email/verify`;
const LOCK_JOYRIDE_LINK_KEY = "LOCK_JOYRIDE_LINK_KEY";
const IS_JOYRIDE_LOCKED = "IS_JOYRIDE_LOCKED";

const generateQueryString = params => {
  let esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + "=" + esc(params[k]))
    .join("&");
};

const register = (query = {}) => {
  const query_string = generateQueryString(query);
  let href = "/users?" + query_string;
  return {
    href,
    method: "POST",
    type: "application/vnd.Analyttica.TreasureHunt.UserRegistration+json",
    accept: "application/vnd.Analyttica.TreasureHunt.User+json"
  };
};

const tokensLink = (query = {}) => {
  const query_string = generateQueryString(query);
  let href = "/tokens?" + query_string;
  return { href, method: "POST", accept: TOKEN };
};

const generateResetPwdLink = {
  href: "/password/forgot",
  method: "POST",
  type: "application/json",
  accept: "application/json"
};

const resetPasswordLink = {
  href: "/password/reset",
  method: "POST",
  type: "application/json",
  accept: "application/json"
};

export const saveLockJoyrideLink = link => {
  localStorage.setItem(LOCK_JOYRIDE_LINK_KEY, JSON.stringify(link));
};
export const getLockJoyrideLink = () => {
  const lockJoyrideLink = localStorage.getItem(LOCK_JOYRIDE_LINK_KEY);
  return JSON.parse(lockJoyrideLink);
};
export const setIsJoyrideLocked = status => {
  localStorage.setItem(IS_JOYRIDE_LOCKED, status.toString());
};
export const isJoyrideLocked = () =>
  JSON.parse(localStorage.getItem(IS_JOYRIDE_LOCKED));

export const setJoyrideLink = token => {
  saveLockJoyrideLink(token._links.lock_joyride);
  setIsJoyrideLocked(token.joyride_locked);
};

export const returnProcessedToken = token => {
  authorizer.setHeader(`Bearer ${token.authorization}`);
  return token;
};
export const tokens = {
  create: (username, password, query) => {
    const headers = new Headers();
    headers.set(
      "Authorization",
      `Basic ${base64.encode(`${username}:${password}`)}`
    );
    return fetchLinkAs(tokensLink(query), undefined, headers).then(token =>
      returnProcessedToken(token)
    );
  }
};

export const validatePassword = (newPassword, confirmPassword) => {
  if (newPassword === "" || confirmPassword === "") {
    notify.error(
      "Password is required",
      "Please fill in a password and try again."
    );
    return false;
  } else if (
    !(
      /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(newPassword) &&
      /[a-z]/.test(newPassword) &&
      /[A-Z]/.test(newPassword) &&
      newPassword.length > 7 &&
      newPassword.length < 31
    )
  ) {
    notify.error(
      "Invalid password",
      "A valid password should be 8-30 characters long, and have at least one lowercase, one uppercase and one special character. Please make sure you have entered a valid password and try again."
    );
    return false;
  } else if (newPassword !== confirmPassword) {
    notify.error(
      "Passwords do not match",
      "Please make sure you enter the same password in both password and confirm password and try again."
    );
    return false;
  } else {
    return true;
  }
};

const generateResetPasswordLink = generateResetPasswordLinkEntity =>
  fetchLink(generateResetPwdLink, generateResetPasswordLinkEntity);
const resetPassword = resetPasswordLinkEntity =>
  fetchLinkAs(resetPasswordLink, resetPasswordLinkEntity);

export const users = {
  register: (registration, query) => fetchLinkAs(register(query), registration),
  verifyEmail: query => fetch(`${EMAIL_VERIFICATION_URI}${query}`),
  generateResetPasswordLink,
  resetPassword
};
