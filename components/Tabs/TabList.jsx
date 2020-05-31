import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import cx from "classnames";

const TabLink = props => {
  const {
    tab: { title, link }
  } = props;
  return (
    <Nav.Item bsPrefix="ath-nav-tab">
      <NavLink
        to={link}
        className="ath-nav-tab"
        activeClassName="ath-nav-tab__active"
      >
        {title}
      </NavLink>
    </Nav.Item>
  );
};

const TabItem = props => {
  const {
    tab: { title, key },
    active_key,
    onClick
  } = props;
  return (
    <div
      className={cx("ath-nav-tab", {
        "ath-nav-tab__active": active_key === key
      })}
      onClick={() => onClick(key)}
      key={key}
    >
      <p>{title}</p>
    </div>
  );
};

class TabList extends Component {
  render() {
    const { list, type = "item", onTabClick, active_key } = this.props;
    let Tab = type === "link" ? TabLink : TabItem;
    return (
      <div className="ath-tab-list">
        <Nav>
          {list.map(tab => (
            <Tab tab={tab} onClick={onTabClick} active_key={active_key} />
          ))}
        </Nav>
      </div>
    );
  }
}

export default TabList;
