import React, { Component } from "react";
import { RotatePhone } from "../../../common/images";

class IncompatibleView extends Component {
  render() {
    return (
      <div className="incompatible-view">
        <RotatePhone />
        <p>The site is best viewed on your laptop or desktop</p>
        <p className="info">
          To view on your mobile device, please turn-off the rotation lock and
          view it in landscape mode
        </p>
      </div>
    );
  }
}

export default IncompatibleView;
