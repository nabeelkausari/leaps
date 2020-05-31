import React, { Component } from "react";
import { Accordion as BootstrapAccordion } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { RightArrowIcon } from "../../../common/images";
import cx from "classnames";

class Accordion extends Component {
  state = {
    is_accordion_open: false
  };
  handleAccordionClick = () => {
    this.setState(state => {
      return {
        is_accordion_open: !state.is_accordion_open
      };
    });
  };
  render() {
    const { title, children } = this.props;
    const { is_accordion_open } = this.state;
    return (
      <BootstrapAccordion activeKey={is_accordion_open ? "0" : null}>
        <Card className="ath-accordion__card">
          <BootstrapAccordion.Toggle
            as={Card.Header}
            eventKey="0"
            onClick={this.handleAccordionClick}
          >
            <div className="ath-accordion__title">{title}</div>
            <RightArrowIcon
              className={cx("ath-accordion__icon", {
                "ath-accordion__icon--active": is_accordion_open
              })}
            />
          </BootstrapAccordion.Toggle>
          <BootstrapAccordion.Collapse eventKey="0">
            <Card.Body>
              <div className="ath-accordion__body">{children}</div>
            </Card.Body>
          </BootstrapAccordion.Collapse>
        </Card>
      </BootstrapAccordion>
    );
  }
}

export default Accordion;
