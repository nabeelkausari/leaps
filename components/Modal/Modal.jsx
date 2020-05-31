import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { CloseIcon } from "../../../common/images";

class CustomModal extends Component {
  render() {
    const {
      onClose,
      show,
      title,
      children,
      customFooter,
      primaryActionText = "Save",
      secondaryActionText = "Back",
      primaryAction,
      secondaryAction,
      secondaryVisible,
      primaryBtnDisabled
    } = this.props;
    return (
      <Modal
        show={show}
        onHide={onClose}
        size="md"
        aria-labelledby="example-modal-sizes-title-lg"
        className="bg-user-step-container"
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          {/*<span className="fa fa-close extract-close" onClick={onClose} />*/}
          <CloseIcon className="extract-close" onClick={onClose} />
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {customFooter && <Modal.Footer>{customFooter}</Modal.Footer>}
        {!customFooter && (
          <Modal.Footer>
            <button className="wizard__footer--cancel" onClick={onClose}>
              Cancel
            </button>
            <div className="wizard__footer--container">
              {secondaryVisible && (
                <button
                  className="wizard__footer--back"
                  onClick={secondaryAction}
                >
                  {secondaryActionText}
                </button>
              )}
              <button
                className="wizard__footer--next"
                onClick={primaryAction}
                disabled={primaryBtnDisabled}
              >
                {primaryActionText}
              </button>
            </div>
          </Modal.Footer>
        )}
      </Modal>
    );
  }
}

export default CustomModal;
