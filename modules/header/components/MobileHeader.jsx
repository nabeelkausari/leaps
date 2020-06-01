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
        <Link href={"/"}>
          <img src="/logos/leaps.svg" className="ath-logo" alt="logo" />
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
                href={"/courses"}
              >
                <a className="mobile-header__menu-link">Learn</a>
              </Link>
              <Link
                href={"/sample_cases?type=all"}
              >
                <a className="mobile-header__menu-link">Apply</a>
              </Link>
              <Link
                href={"/hackathons"}

              >
                <a className="mobile-header__menu-link">Solve</a>
              </Link>

              <Link
                href={"/covid-analysis"}
              >
                <a className="mobile-header__menu-link">Covid Analysis</a>
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
