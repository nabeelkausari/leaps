import React, { Component } from "react";

class Checkbox extends Component {
  handleChange = () => {
    const { name } = this.props;
    this.props.onCheckBoxChange(name);
  };
  render() {
    const { label, checked, id, disabled } = this.props;
    return (
      <div className="checkbox-wrapper">
        <input
          className="styled-checkbox"
          id={id}
          type="checkbox"
          checked={checked}
          onChange={this.handleChange}
          disabled={disabled}
        />
        <label className="checkbox-wrapper__label" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
