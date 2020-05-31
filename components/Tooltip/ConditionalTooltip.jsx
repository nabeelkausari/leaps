import React, { Component, Fragment } from "react";
import Tooltip from "./Tooltip";
class TooltipComponent extends Component {
  render() {
    const { children, placement, text, is_active } = this.props;
    return is_active ? (
      <Tooltip placement={placement} text={text} children={children} />
    ) : (
      <Fragment>{children}</Fragment>
    );
  }
}

export default TooltipComponent;
