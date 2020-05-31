import React, { Component } from "react";
import cx from "classnames";
import Link from "next/link"
import AuthModal from "../../auth/components/shared/AuthModal";


class MobileHeader extends Component {
  state = {
    menu_active: false,
    animate_header: false,
    animate_secondary: false
  };

  toggleMenu = () => {
    const { menu_active } = this.state;
    if (menu_active) {
      this.setState({ animate_secondary: false });
      setTimeout(() => {
        this.setState({ animate_header: false });
      }, 100);
      setTimeout(() => {
        this.setState({ menu_active: false });
      }, 500);
    } else {
      this.setState({ menu_active: true });
      setTimeout(() => {
        this.setState({ animate_header: true });
      }, 50);
      setTimeout(() => {
        this.setState({ animate_secondary: true });
      }, 250);
    }
  };

  render() {
    const { menu_active, animate_header, animate_secondary } = this.state;

    return (
      <div className="mobile-header">
        <Link exact href={"/"}>
          <img src="/images/logos/leaps.svg" className="ath-logo" alt="logo" />
        </Link>

        <i
          className="fa fa-bars mobile-header__menu-icon"
          onClick={this.toggleMenu}
        />

        {menu_active && (
          <div
            className={cx("mobile-header__menu", {
              "mobile-header__menu--active": animate_header
            })}
          >
            <img
              src="/icons/close.svg"
              className={cx("mobile-header__close-icon", {
                "mobile-header__close-icon--animate": animate_secondary
              })}
              onClick={this.toggleMenu}
            />
            <div
              className={cx("mobile-header__menu-container", {
                "mobile-header__menu-container--animate": animate_secondary
              })}
            >
              <Link
                exact
                href={"/courses"}
                className="mobile-header__menu-link"
              >
                Learn
              </Link>
              <Link
                exact
                href={"/sample_cases?type=all"}
                className="mobile-header__menu-link"
              >
                Apply
              </Link>
              <Link
                exact
                href={"/hackathons"}
                className="mobile-header__menu-link"
              >
                Solve
              </Link>

              <Link
                href={"/covid-analysis"}
                className="mobile-header__menu-link"
              >
                Covid Analysis
              </Link>

              <AuthModal
                Trigger={({ handleClick }) => (
                  <span
                    className="mobile-header__menu-link"
                    onClick={handleClick}
                  >
                      Sign In
                    </span>
                )}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MobileHeader;
