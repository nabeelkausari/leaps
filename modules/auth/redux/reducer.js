import * as types from "./types";
import { getLocalStorage } from "../../../common/utils/storage";

const initialState = {
  is_logged_in: !!getLocalStorage("__auth"),
  loginLoading: null,
  loginSuccess: null,
  loginError: null,
  forgot_password_requested: null,
  forgot_password_succeeded: null,
  forgot_password_failed: null,
  reset_password_requested: null,
  reset_password_succeeded: null,
  reset_password_failed: null,
  registration_requested: null,
  registration_succeeded: null,
  registration_failed: null,
  registration: null,
  country_codes: [],
  fetch_country_codes_requested: null,
  fetch_country_codes_succeeded: null,
  fetch_country_codes_failed: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_REQUESTED:
      return {
        ...state,
        loginLoading: true,
        loginError: null,
        loginSuccess: null
      };
    case types.LOGIN_SUCCEEDED:
      return {
        ...state,
        is_logged_in: true,
        loginLoading: false,
        loginSuccess: true,
        ...payload
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        loginError: payload
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        is_logged_in: null
      };

    case types.FORGOT_PASSWORD_REQUESTED:
      return {
        ...state,
        forgot_password_requested: true,
        forgot_password_failed: null,
        forgot_password_succeeded: null
      };
    case types.FORGOT_PASSWORD_SUCCEEDED:
      return {
        ...state,
        forgot_password_requested: false,
        forgot_password_succeeded: true
      };
    case types.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        forgot_password_requested: false,
        forgot_password_succeeded: false,
        forgot_password_failed: true
      };

    case types.RESET_PASSWORD_REQUESTED:
      return {
        ...state,
        reset_password_requested: true,
        reset_password_failed: null,
        reset_password_succeeded: null
      };
    case types.RESET_PASSWORD_SUCCEEDED:
      return {
        ...state,
        reset_password_requested: false,
        reset_password_succeeded: true
      };
    case types.RESET_PASSWORD_FAILED:
      return {
        ...state,
        reset_password_requested: false,
        reset_password_succeeded: false,
        reset_password_failed: true
      };

    case types.REGISTER_REQUESTED:
      return {
        ...state,
        registration_requested: true,
        registration_failed: null,
        registration_succeeded: null
      };

    case types.REGISTER_SUCCEEDED:
      return {
        ...state,
        registration_requested: false,
        registration_succeeded: true,
        registration: payload
      };

    case types.REGISTER_FAILED:
      return {
        ...state,
        registration_requested: false,
        registration_succeeded: false,
        registration_failed: true
      };

    case types.RESET_REGISTER:
      return {
        ...state,
        registration_requested: null,
        registration_succeeded: null,
        registration_failed: null
      };

    case types.FETCH_COUNTRY_CODES_REQUESTED:
      return {
        ...state,
        fetch_country_codes_requested: null,
        fetch_country_codes_succeeded: null,
        fetch_country_codes_failed: null
      };

    case types.FETCH_COUNTRY_CODES_SUCCEEDED:
      return {
        ...state,
        fetch_country_codes_requested: false,
        fetch_country_codes_succeeded: true,
        fetch_country_codes_failed: false,
        country_codes: payload
      };

    case types.FETCH_COUNTRY_CODES_FAILED:
      return {
        ...state,
        fetch_country_codes_requested: false,
        fetch_country_codes_succeeded: false,
        fetch_country_codes_failed: payload
      };

    default:
      return state;
  }
};
