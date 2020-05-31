import React, { Component } from "react";
import cx from "classnames";

class Radio extends Component {
  render() {
    const {
      radio_list,
      selected_index,
      onSelect,
      object_options,
      horizontal,
      config_bar
    } = this.props;

    return (
      <div
        className={cx(
          "radio-group",
          { "radio-group--1": config_bar },
          { "radio-group--horizontal": horizontal }
        )}
      >
        {radio_list.map((element, i) => {
          return (
            <RadioItem
              key={i}
              checked={
                object_options
                  ? element === selected_index
                  : i === selected_index
              }
              handleChange={onSelect}
              element={element}
              text={element.text || element}
              index={i}
              horizontal={horizontal}
              config_bar={config_bar}
            />
          );
        })}
      </div>
    );
  }
}

export default Radio;

function RadioItem(props) {
  const {
    element,
    checked,
    index,
    handleChange,
    text,
    horizontal,
    config_bar
  } = props;
  return (
    <div
      className={cx(
        "radio-group__item",
        { "radio-group__item--disabled": element.disabled },
        { "radio-group__item--horizontal": horizontal }
      )}
    >
      <input
        type="radio"
        checked={checked}
        name={text}
        onChange={() => handleChange(element, index)}
        className="radio-group__radio"
        id={text}
        disabled={element.disabled}
      />

      <label
        className={cx(
          "radio-group__label",
          { "radio-group__label--checked ": checked },
          { "radio-group__label--1": config_bar },
          { "radio-group__label--horizontal": horizontal }
        )}
        htmlFor={text}
      >
        <div
          className={cx("radio-group__radio-wrapper", {
            "radio-group__radio-wrapper--checked ": checked
          })}
        >
          &nbsp;
        </div>
        <span className="radio-group__label--text">{text}</span>
      </label>
    </div>
  );
}
