import React, { Component } from "react";
import SweetAlert from "sweetalert-react";

import "sweetalert/dist/sweetalert.css";

class Alert extends Component {
  render() {
    const { show, title, text, onConfirm, onCancel } = this.props;

    return (
      <SweetAlert
        show={show}
        title={title}
        text={text}
        onConfirm={onConfirm}
        showCancelButton
        onCancel={onCancel}
        onClose={() => console.log("close")}
      />
    );
  }
}

export default Alert;
