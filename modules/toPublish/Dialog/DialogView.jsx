import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import cx from "classnames";
import { DialogContainer } from "./dialogContainer";
import { Button } from "../../../components/Buttons/Button";

import "./dialog.scss";

class DialogView extends Component {
  buttonCallback = callback => {
    return () => {
      if (!callback || callback()) this.props.onHide();
    };
  };

  render() {
    const {
      is_open,
      onHide,
      noCloseButton,
      yesButton,
      noButton,
      title,
      subtitle,
      content,
      Component,
      sub_subtitle,
      size = "sm",
      items_centered = false,
      component_props,
      hide_header = false,
      hide_footer = false
    } = this.props;
    const { buttonCallback } = this;
    return (
      <Modal
        show={is_open}
        onHide={onHide}
        dialogClassName={cx(
          "dialog-view",
          `dialog-view--${size}`,
          {
            "dialog-view--hide-header": hide_header
          },
          {
            "dialog-view--hide-footer": hide_footer
          }
        )}
        aria-labelledby="modal fade-scale"
        animation={true}
        centered
      >
        <Modal.Header closeButton={!noCloseButton}>
          <div className="modal__headings">
            {!!title && <p className="modal__title">{title}</p>}
            {!!subtitle && <p className="modal__subtitle">{subtitle}</p>}
            {!!sub_subtitle && (
              <h6 className="modal__sub-subtitle">{sub_subtitle}</h6>
            )}
          </div>
        </Modal.Header>
        {content && (
          <Modal.Body>
            <p>{content}</p>
          </Modal.Body>
        )}
        {Component && (
          <Modal.Body>
            <Component {...component_props} onClose={onHide} />
          </Modal.Body>
        )}
        {(!!yesButton || !!noButton) && (
          <Modal.Footer>
            <div
              className={cx("modal__footer-wrapper", {
                "modal__footer-wrapper--centered": items_centered
              })}
            >
              {!!noButton && (
                <Button
                  variant="default"
                  size="md"
                  className={cx(
                    "modal__action-btn modal__action-btn--secondary",
                    { "modal__action-btn--centered": items_centered }
                  )}
                  onClick={buttonCallback(noButton.onClick)}
                >
                  {noButton.text}
                </Button>
              )}
              {!!yesButton && (
                <Button
                  variant="primary"
                  size="md"
                  className={cx("modal__action-btn", {
                    "modal__action-btn--primary": !items_centered
                  })}
                  onClick={buttonCallback(yesButton.onClick)}
                >
                  {yesButton.text || "Yes"}
                </Button>
              )}
            </div>
          </Modal.Footer>
        )}
      </Modal>
    );
  }
}

export default DialogContainer(DialogView);
