import React, { Component } from "react";
import cx from "classnames";
import { CloseIcon, RightArrowIcon } from "../../../common/images";

class ExpandableFooter extends Component {
  state = {
    full_height: false
  };

  handleFullScreen = () => {
    this.setState((state, props) => {
      return {
        full_height: !state.full_height
      };
    });
  };
  render() {
    const { full_height } = this.state;
    const { is_steps_open, onClose, fixed_height } = this.props;
    return (
      <div
        className={cx(
          "expandable-footer",
          { "expandable-footer__horizontal": !is_steps_open },
          { "expandable-footer__vertical": full_height },
          { "expandable-footer__fixed": fixed_height }
        )}
      >
        {!fixed_height && (
          <span
            className="expandable-footer__height-adjuster"
            onClick={this.handleFullScreen}
          >
            <RightArrowIcon
              className={cx([
                "expandable-footer__icon",
                full_height && " expandable-footer__icon--close"
              ])}
            />
          </span>
        )}

        <span className="expandable-footer__close-wrapper" onClick={onClose}>
          <CloseIcon className="expandable-footer__close-wrapper--icon" />
        </span>
        <div className="expandable-footer__contents">{this.props.children}</div>
      </div>
    );
  }
}

export default ExpandableFooter;
