import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {
  AddIconOutline,
  RightArrowIcon
} from "../../../../../../common/images";
import cx from "classnames";

class AddElement extends Component {
  state = {
    is_accordion_open: false
  };

  handleAccordionClick = () => {
    this.setState(state => ({ is_accordion_open: !state.is_accordion_open }));
  };

  handleAddItem = item => {
    this.props.handleClick(item);
    this.handleAccordionClick();
  };

  render() {
    const { is_accordion_open } = this.state;
    return (
      <div className="insert-menu">
        <Accordion activeKey={is_accordion_open ? "0" : null}>
          <Card className="insert-menu__desc-wrapper">
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div className="insert-menu__elements-wrapper">
                  <div
                    onClick={() =>
                      this.handleAddItem({
                        type: "heading",
                        value: "Heading"
                      })
                    }
                    className="insert-menu__element-wrapper"
                  >
                    <div className="insert-menu__element">Heading</div>
                    Heading
                  </div>
                  <hr />
                  <div
                    onClick={() =>
                      this.handleAddItem({
                        type: "sub-heading",
                        value: "Sub Heading"
                      })
                    }
                    className="insert-menu__element-wrapper"
                  >
                    <div className="insert-menu__element">Sub Heading</div>
                    Sub Heading
                  </div>
                  <hr />
                  <div
                    onClick={() =>
                      this.handleAddItem({
                        type: "editor",
                        value: "Paragraph (Rich text)"
                      })
                    }
                    className="insert-menu__element-wrapper"
                  >
                    <div className="insert-menu__element insert-menu__element--paragraph">
                      <p className="insert-menu__element--paragraph--1">
                        Aenean sed lorem est. Sed quis neque ut nibh suscipit.
                      </p>
                      <ul className="insert-menu__element--paragraph-list">
                        <li>Aenean ornare sit amet lectus.</li>
                        <li>Nunc ut vliutpat lectus. Nulla velit.</li>
                      </ul>
                    </div>
                    Paragraph
                  </div>
                  <hr />
                  <div className="insert-menu__element-wrapper--1" />
                </div>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              onClick={this.handleAccordionClick}
            >
              {/*Input Selections & Parameters*/}
              <div className="insert-menu__accordion-title">
                <AddIconOutline className="insert-menu__add-icon" />
                Add Elements
              </div>
              <RightArrowIcon
                className={cx("insert-menu__accordion-toggle-icon", {
                  "insert-menu__accordion-toggle-icon--active": !is_accordion_open
                })}
              />
            </Accordion.Toggle>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default AddElement;
