import React, { Component } from "react";
import ReactSelect from "react-select";
import cx from "classnames";

class Select extends Component {
  render() {
    const {
      label,
      options,
      onChange,
      value,
      limit_menu_height,
      max_menu_height
    } = this.props;
    const customStyles = {
      menuList: provided => ({
        ...provided,
        maxHeight: max_menu_height || provided.maxHeight
      })
    };
    return (
      <div className="select-wrapper">
        <label className="select-wrapper__label">{label}</label>
        <ReactSelect
          options={options}
          onChange={onChange}
          classNamePrefix="ath-select"
          className={cx("ath-select-container", {
            "ath-select-container--1": limit_menu_height
          })}
          value={value}
          styles={customStyles}
        />
      </div>
    );
  }
}

export default Select;
