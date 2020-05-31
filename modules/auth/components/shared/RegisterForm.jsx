import React, { Component } from "react";
import Link from "next/link";
import cx from "classnames";
import queryString from "query-string";
import startsWith from "lodash/startsWith";
// import {
//   CheckIcon,
//   EmailIcon,
//   EyeIcon,
//   InfoIcon,
//   KeyIcon,
//   OrganizationIcon,
//   ProfileIcon,
//   ReferralIcon
// } from "../../../../../common/images";
import { notify } from "../../../../common/utils/notification";
import { FormControl } from "react-bootstrap";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import { SUPPORT_EMAIL } from "../../../../common/utils/constants";
import {
  getLocalStorage,
  REGISTER_PARAMS,
  setLocalStorage
} from "../../../../common/utils/storage";

class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    organization: "",
    agreed: false,
    show_password: false,
    country_list_open: false,
    countryPhoneCode: "91",
    search_phonecode: "",
    phone: "",
    referral_code: ""
  };

  componentDidMount() {
    const { history, fetchCountryCodes, location } = this.props;
    const {
      referral,
      utm_source,
      utm_medium,
      utm_campaign
    } = queryString.parse(history.location.search);
    const utm_landingPage = utm_source && location.pathname.slice(1);

    if (history.location.search) {
      setLocalStorage(REGISTER_PARAMS, {
        ...getLocalStorage(REGISTER_PARAMS, true),
        ...(utm_source && { utm_source }),
        ...(utm_medium && { utm_medium }),
        ...(utm_campaign && { utm_campaign }),
        ...(utm_landingPage && { utm_landingPage }),
        ...(referral && { referral_code: referral })
      });
    }

    const { referral_code } = getLocalStorage(REGISTER_PARAMS, true) || {};
    this.setState({ referral_code });
    fetchCountryCodes();
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handlePhone = event => {
    let phone = event.target.value;
    let validation = phone.match(/[0-9]{0,10}/)[0];
    if (validation === phone) {
      this.setState({ phone: phone });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { history, free_trial } = this.props;
    const {
      show_password,
      search_phonecode,
      country_list_open,
      ...rest
    } = this.state;
    const query = queryString.parse(history.location.search);
    const caseId = query.case_id;

    const params = {
      ...(caseId && { case_id: caseId }),
      ...(free_trial && { login_has_expiry: true })
    };

    const body = {
      ...rest,
      ...getLocalStorage(REGISTER_PARAMS, true)
    };

    if (this.state.phone.length < 10 && this.state.phone !== "") {
      notify.error("Please enter a valid 10 digit mobile number");
    } else {
      this.props.register(body, params);
    }
  };

  togglePassword = () => {
    this.setState((state, props) => {
      return {
        show_password: !state.show_password
      };
    });
  };
  toggleCountryCode = () => {
    this.setState((state, props) => {
      return {
        country_list_open: !state.country_list_open
      };
    });
  };

  onCountryCodeSelect = country_code => {
    this.setState({
      countryPhoneCode: country_code,
      search_phonecode: ""
    });
    this.toggleCountryCode();
  };

  handleSearch = e => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase()
    });
  };

  componentWillUnmount() {
    this.props.resetRegister();
  }

  render() {
    const {
      email,
      password,
      name,
      organization,
      agreed,
      show_password,
      country_list_open,
      countryPhoneCode,
      search_phonecode,
      phone,
      referral_code
    } = this.state;
    const {
      registration_succeeded,
      country_codes,
      full_height,
      free_trial
    } = this.props;
    const country_code_list =
      country_codes &&
      country_codes.filter(
        cc =>
          cc.phoneCode.toString().includes(search_phonecode) ||
          cc.shortName.includes(search_phonecode) ||
          cc.name.toLowerCase().includes(search_phonecode) ||
          (search_phonecode[0] === "+" &&
            startsWith(
              cc.phoneCode.toString(),
              search_phonecode.slice(1, search_phonecode.length)
            ))
      );
    const country_phone_code = `+${countryPhoneCode}`;
    return (
      <>
        {!registration_succeeded && (
          <form
            className={cx("flex-default login__form")}
            onSubmit={this.handleSubmit}
          >
            <div
              className={cx(
                "login__form-body",
                full_height && "login__form-body--full-height"
              )}
            >
              {free_trial && (
                <div className="login__trial-info">
                  <div className="login__trial-message">
                    <div>Note: The account will be</div>
                    <div>a Free Trial for 30 days</div>
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      target="_top"
                      className="login__getintouch"
                    >
                      Get in touch
                    </a>
                  </div>
                  <div className="login__number">
                    <span className="login__number--1">30</span>
                    <span className="login__number--2">DAYS</span>
                  </div>
                </div>
              )}

              <div className="login__form-sub-container">
                <label className="login__sub-text label-required">
                  Name <sup>*</sup>
                </label>
                <div className="login__input-wrapper">
                  {/*<ProfileIcon className="login__input-icon" />*/}
                  <FormControl
                    placeholder="Name"
                    value={name}
                    onChange={this.handleChange}
                    name="name"
                    className="login__input"
                  />
                </div>
              </div>

              <div className="login__form-sub-container">
                <label className="login__sub-text label-required">
                  Email <sup>*</sup>
                </label>
                <div className="login__input-wrapper">
                  {/*<EmailIcon className="login__input-icon" />*/}
                  <FormControl
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
                    name="email"
                    className="login__input"
                  />
                </div>
              </div>

              <div className="login__form-sub-container">
                <label className="login__sub-text login__sub-text--1 label-required">
                  Password <sup>*</sup>
                  {/*<InfoIcon className="login__info-icon" />*/}
                  <div className="login__password-criteria">
                    Note: Password should have a minimum length of 8 characters,
                    maximum length of 30, at least 1 uppercase letter, at least
                    1 in lower case, at least 1 special character
                  </div>
                </label>
                <div className="login__input-wrapper">
                  {/*<KeyIcon className="login__input-icon" />*/}
                  <FormControl
                    placeholder="Password"
                    type={show_password ? "text" : "password"}
                    value={password}
                    onChange={this.handleChange}
                    name="password"
                    className="login__input login__input--1"
                  />
                  {/*<EyeIcon*/}
                  {/*  className={cx("login__input-right-icon", {*/}
                  {/*    "login__input-right-icon--active": show_password*/}
                  {/*  })}*/}
                  {/*  onClick={this.togglePassword}*/}
                  {/*/>*/}
                </div>
              </div>

              <div className="login__form-sub-container">
                <label className="login__sub-text">Phone Number</label>
                <div className="login__input-wrapper login__input-wrapper--1">
                  <div
                    className="login__input-phonenumber"
                    onClick={this.toggleCountryCode}
                  >
                    {country_phone_code}
                    {country_list_open ? (
                      <i className="fa fa-angle-up login__dropdown-icon" />
                    ) : (
                      <i className="fa fa-angle-down login__dropdown-icon" />
                    )}
                  </div>
                  {country_list_open && (
                    <div className="login__input-phonenumber--dropdown">
                      <input
                        name="search_phonecode"
                        type="input"
                        value={search_phonecode}
                        placeholder="Search"
                        className="login__input-phonenumber--search"
                        onChange={this.handleSearch}
                        autoComplete="no"
                      />
                      <div className="login__input-phonenumber--dropdown-menu">
                        {country_code_list.map(cc => (
                          <div
                            className="login__input-phonenumber--dropdown-item"
                            onClick={() =>
                              this.onCountryCodeSelect(cc.phoneCode)
                            }
                          >
                            <span> +{cc.phoneCode}</span>
                            <span>{cc.shortName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <FormControl
                    placeholder="Phone Number"
                    value={phone}
                    onChange={this.handlePhone}
                    name="phone"
                    className="login__input--2"
                  />
                </div>
              </div>

              <div className="login__form-sub-container">
                <label className="login__sub-text">Organization</label>
                <div className="login__input-wrapper">
                  {/*<OrganizationIcon className="login__input-icon" />*/}
                  <FormControl
                    placeholder="Organization Name"
                    value={organization}
                    onChange={this.handleChange}
                    name="organization"
                    className="login__input"
                  />
                </div>
              </div>

              <div className="login__form-sub-container">
                <label className="login__sub-text">Referral Code</label>
                <div className="login__input-wrapper">
                  {/*<ReferralIcon className="login__input-icon" />*/}
                  <FormControl
                    placeholder="Referral Code"
                    value={referral_code}
                    onChange={this.handleChange}
                    name="referral_code"
                    className="login__input"
                  />
                </div>
              </div>
            </div>

            <div className="login__form-footer">
              <Checkbox
                name="agreed"
                onChange={this.handleChange}
                value={agreed}
                label={
                  <p className="login__sub-text">
                    I agree to Analyttica Datalab{" "}
                    <Link target="_blank" href="/terms-conditions">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link target="_blank" href="/privacy-policy">
                      Privacy‚ Intellectual Policy & Disclaimer
                    </Link>
                  </p>
                }
              />
              <button disabled={!agreed} type="submit" className="login__btn">
                Register
              </button>
              <p className="login__form-footer--support">
                Need help?{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </p>
            </div>
          </form>
        )}

        {registration_succeeded && (
          <div className="login__email-sent">
            {/*<CheckIcon className="login__email-sent--logo" />*/}
            <h2 className="login__email-sent--title">One last step</h2>
            <p className="login__success_msg">
              Congratulations! You have successfully registered yourself with
              Analyttica TreasureHunt® LEAPS. A verification
              link from the email ID ath@analyttica.com has been sent to your
              registered email id. Do verify to get started
            </p>
            <p className="login__success_msg login__success_msg--note">
              Note: Please do check your “JUNK” or “CLUTTER” folder in case you
              don’t see the email in your inbox. In case you do not see the
              email in any of the folders, please drop us an email at
              support@analyttica.com
            </p>
          </div>
        )}
      </>
    );
  }
}

export default RegisterForm;
