import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class TooltipComponent extends Component {
  render() {
    const { children, placement = "top", text } = this.props;
    return (
      <OverlayTrigger
        key={placement}
        placement={placement}
        overlay={<Tooltip id={`tooltip-${placement}`}>{text}</Tooltip>}
      >
        {children}
      </OverlayTrigger>
    );
  }
}

export default TooltipComponent;
