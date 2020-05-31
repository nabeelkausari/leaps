import React, { Component } from "react";
import Async from "react-select/async";

class Select extends Component {
  render() {
    const {
      label,
      loadOptions,
      onChange,
      value,
      placeholder = ""
    } = this.props;
    return (
      <div className="select-wrapper">
        <label className="select-wrapper__label">{label}</label>
        <Async
          onChange={onChange}
          classNamePrefix="ath-select"
          className="ath-select-container"
          value={value}
          loadOptions={loadOptions}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default Select;
