import React, { Component, Fragment } from "react";
import { BeatLoader, ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import cx from "classnames";

const override = css`
  border-color: var(--highlight-primary);
`;

const override_clip = css`
  display: block;
  border-color: var(--highlight-primary);
`;

class Loader extends Component {
  getLoader = (type, loading, size) => {
    switch (type) {
      case "beat":
        return (
          <BeatLoader
            css={override}
            color={"var(--highlight-primary)"}
            loading={loading}
          />
        );

      case "clip":
        return (
          <ClipLoader
            css={override_clip}
            sizeUnit={"rem"}
            size={size}
            color={"var(--highlight-primary)"}
            loading={loading}
          />
        );
    }
  };

  render() {
    const {
      loading,
      is_component,
      style,
      type = "beat",
      size = 1,
      className
    } = this.props;
    return (
      <Fragment>
        {loading && (
          <div
            className={cx(
              { "ath-loading": !is_component },
              { "ath-loading-component": is_component },
              `${className ? className : ""}`
            )}
            style={style}
          >
            {this.getLoader(type, loading, size)}
          </div>
        )}
      </Fragment>
    );
  }
}

export default Loader;
