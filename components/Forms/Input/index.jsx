import React, { Component } from "react";
import { information_button } from "../../../../common/images";
import Editor from "../../Editor/Editor";
import cx from "classnames";

class Input extends Component {
  handleChange = e => {
    const { type, name } = this.props;
    if (type === "editor") {
      this.props.onChange(name, e);
    } else {
      this.props.onChange(e.target.name, e.target.value);
    }
  };
  render() {
    const {
      name,
      type,
      value,
      helper_text,
      label,
      placeholder = "",
      tabIndex,
      space_below = true,
      input_type = "text",
      style_type = "bordered",
      disabled,
      full_width,
      resize
    } = this.props;
    return (
      <div
        className={cx(
          "input-ele-wrapper",
          {
            "input-ele-wrapper--1": space_below
          },
          { "input-ele-wrapper--full-width": full_width }
        )}
      >
        <label className="input-ele-wrapper__label">{label}</label>
        {(() => {
          switch (type) {
            case "editor":
              return (
                <Editor
                  content={value}
                  handleContentChange={this.handleChange}
                />
              );
            case "textarea":
              return (
                <textarea
                  placeholder={placeholder}
                  name={name}
                  className={cx(
                    "input-ele-wrapper__textarea",
                    ` input-ele-wrapper__textarea--${style_type}`,
                    { " input-ele-wrapper__textarea--no-resize": !resize }
                  )}
                  value={value}
                  onChange={this.handleChange}
                  tabIndex={tabIndex}
                />
              );
            default:
              return (
                <input
                  name={name}
                  className={cx(
                    "input-ele-wrapper__input",
                    ` input-ele-wrapper__input--${style_type}`
                  )}
                  type={input_type}
                  value={value}
                  placeholder={placeholder}
                  onChange={this.handleChange}
                  tabIndex={tabIndex}
                  disabled={disabled}
                />
              );
          }
        })()}
        {helper_text && (
          <span className="input-ele-wrapper__helper-text">
            <img src={information_button} alt="" />
            {helper_text}
          </span>
        )}
      </div>
    );
  }
}

export default Input;
