import React, { Component, Fragment } from "react";
import cx from "classnames";

class Radio extends Component {
  render() {
    const { radio_list, selected_id, onSelect, horizontal } = this.props;

    return (
      <div
        className={cx("radio-group", { "radio-group--horizontal": horizontal })}
      >
        {radio_list.map((element, i) => {
          return (
            <Fragment>
              <RadioItem
                key={i}
                checked={selected_id === element.value}
                handleChange={onSelect}
                element={element}
                text={element.label}
                horizontal={horizontal}
                label_color={element.label_color}
              />
              {element.helper_text && element.helper_text}
            </Fragment>
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
    handleChange,
    text,
    horizontal,
    config_bar,
    label_color
  } = props;
  return (
    <div
      className={cx(
        "radio-group__item",
        { "radio-group__item--disabled": element.disabled },
        { "radio-group__item--horizontal": horizontal },
        { "radio-group__item--wrong": element.wrong },
        { "radio-group__item--correct": element.correct },
        { "radio-group__item--warning": element.warning },
        { "radio-group__item--match": element.match },
        { "radio-group__item--user-correct": element.user_selected_correct }
      )}
    >
      <input
        type="radio"
        checked={checked}
        name={element.value}
        onChange={() => handleChange(element.value)}
        className="radio-group__radio"
        id={element.value}
        disabled={element.disabled}
      />

      <label
        className={cx(
          "radio-group__label",
          { "radio-group__label--checked ": checked },
          { "radio-group__label--1": config_bar },
          { "radio-group__label--horizontal": horizontal }
        )}
        htmlFor={element.value}
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
