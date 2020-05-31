import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  isFirstSource,
  isSimulab
} from "../../../common/utils/helperFunctions";
// import {
//   ArrowDownIcon,
//   LogoutIcon,
//   ProfileIcon,
//   BrushIcon
// } from "../../../common/images";
import { history } from "../../../../index";

class UserProfile extends Component {
  redirect = link => {
    history.push(`${link}`);
  };

  render() {
    const { profile } = this.props;
    const is_atoms = isSimulab();
    const is_first_source = isFirstSource();
    return (
      <div className="user-profile">
        {profile.profile_pic_url ? (
          <img
            className="user-profile__logo"
            src={profile.profile_pic_url}
            alt=""
          />
        ) : (
          <span className="user-profile__logo--empty">
            {profile.name.split(" ")[0] &&
              profile.name.split(" ")[0][0].toUpperCase()}
            {profile.name.split(" ")[1] &&
              profile.name.split(" ")[1][0].toUpperCase()}
          </span>
        )}
        <DropdownButton
          id="dropdown-basic-button"
          title={
            <div className="user-profile__name">
              <span>{profile.name}</span>
              <ArrowDownIcon className="icon-arrow" />{" "}
            </div>
          }
        >
          <DropDownItem
            label={"Profile"}
            icon={<ProfileIcon className="icon icon_brush" />}
            link={"/profile"}
            onClick={this.redirect}
          />

          {/*{!is_atoms && !is_first_source && (*/}
          {/*  <DropDownItem*/}
          {/*    label={"Theme"}*/}
          {/*    icon={<BrushIcon className="icon icon_brush" />}*/}
          {/*    link={"/themes"}*/}
          {/*    onClick={this.redirect}*/}
          {/*  />*/}
          {/*)}*/}

          <DropDownItem
            label={"Logout"}
            icon={<LogoutIcon className="icon icon_logout" />}
            onClick={this.props.logout}
          />
        </DropdownButton>
      </div>
    );
  }
}

const DropDownItem = props => {
  const { label, icon, link, onClick } = props;
  return (
    <Dropdown.Item onClick={link ? () => onClick(link) : onClick}>
      {icon}
      {label}
    </Dropdown.Item>
  );
};

export default UserProfile;
