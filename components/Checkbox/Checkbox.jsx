import React, { Fragment } from "react";

function Checkbox(props) {
  return (
    <Fragment>
      <label className="checkbox-container">
        {props.label}
        <input
          {...props}
          type="checkbox"
          checked={props.checked}
          onChange={props.onChange}
        />
        <span className="checkmark" />
      </label>
    </Fragment>
  );
}

export default Checkbox;
