import React from "react";
import cx from "classnames";

export const Button = props => {
  const {
    onClick,
    disabled,
    children,
    size,
    variant,
    className = "",
    ...rest
  } = props;
  return (
    <button
      className={cx(
        "ath-btn",
        `ath-btn__${size}`,
        `ath-btn__${variant}`,
        className
      )}
      disabled={disabled}
      onClick={!disabled && onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

// sizes :  xs, sm, md, lg

// variants :  primary, outline-primary
//             secondary, outline-secondary
//             tertiary, link
//             default, edit

//className : optional
