import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class Dropdown extends Component {
  handleAction = action => {
    this.props.toggleDropdown();
    action();
  };

  handleClickOutside = evt => {
    this.props.outsideClick();
  };

  render() {
    const { title, list, open } = this.props;

    return (
      <div className="styled-dropdown">
        {title}
        {open && (
          <div className="styled-dropdown__list">
            {list.map((item, i) => (
              <div
                className="styled-dropdown__item"
                key={i}
                onClick={() => this.handleAction(item.action)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(Dropdown);
