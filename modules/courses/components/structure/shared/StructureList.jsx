import React, { Component } from "react";
import cx from "classnames";
import get from "lodash/get";
import Tooltip from "../../../../../components/Tooltip/Tooltip";
import StructureCard from "./StructureCard";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {
  RightArrowIcon,
  LeftArrowIcon,
  icon_lock
} from "../../../../../../common/images";
import { withRouter } from "react-router-dom";
import { Branding } from "../../../../../../index";

class StructureList extends Component {
  state = {
    active_modules: {}
  };

  componentDidMount() {
    const {
      match: {
        params: { module_sequence }
      }
    } = this.props;
    this.setState({ active_modules: { [parseInt(module_sequence)]: true } });
  }

  onStructureCardClick = (contentRef, module) => {
    const {
      match: {
        params: { course_code }
      }
    } = this.props;
    this.props.onModuleContentSelect(contentRef);
    this.props.history.replace(
      `/courses/${course_code}/modules/${module.sequence_number}`
    );
  };
  handleAccordionClick = (index, module) => {
    const { active_modules } = this.state;
    const {
      match: {
        params: { course_code }
      }
    } = this.props;
    let temp = {};
    if (active_modules[index]) {
      temp = active_modules;
      temp[index] = false;
    } else {
      temp = active_modules;
      temp[index] = true;
    }
    this.setState({ active_modules: temp });
    this.props.history.replace(
      `/courses/${course_code}/modules/${module.sequence_number}`
    );

    if (module && get(module, "_links.start")) {
      this.props.updateModuleProgress(module, course_code);
    }
  };

  render() {
    const {
      modules,
      course_name,
      onModuleContentSelect,
      getContentData,
      selected_module_content_reference,
      handleBack
    } = this.props;
    const { active_modules } = this.state;
    return (
      <div className="course-panel">
        <div className="course-panel__course-name-wrapper">
          <LeftArrowIcon
            className="course-panel__back-icon"
            onClick={handleBack}
          />
          <Tooltip text={course_name} placement="top">
            <p className="course-panel__course-name">{course_name}</p>
          </Tooltip>
        </div>
        <div className="course-panel__modules-structure-wrapper">
          {modules
            .sort((a, b) => a.sequence_number - b.sequence_number)
            .map((module, index) => {
              let sequence = index + 1;
              return (
                <Accordion
                  activeKey={active_modules[sequence] ? sequence : null}
                  key={index}
                >
                  <Card className="course-panel__module-content">
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="0"
                      onClick={() =>
                        module.is_module_locked
                          ? null
                          : this.handleAccordionClick(sequence, module)
                      }
                    >
                      <Tooltip text={module.title}>
                        <div className="course-panel__module-content-title">
                          {module.title}
                        </div>
                      </Tooltip>
                      {module.is_module_locked ? (
                        <img
                          src={icon_lock}
                          alt="locked"
                          className="course-panel__accordion-lock"
                        />
                      ) : (
                        <RightArrowIcon
                          className={cx("course-panel__accordion-toggle-icon", {
                            "course-panel__accordion-toggle-icon--active":
                              active_modules[sequence]
                          })}
                        />
                      )}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={sequence}>
                      <Card.Body>
                        <div>
                          {module.module_contents
                            .sort((a, b) => a.module_seq - b.module_seq)
                            .map((content, index) => {
                              return (
                                <StructureCard
                                  index={index}
                                  content_data={getContentData(content)}
                                  type={content.type}
                                  key={index}
                                  onCardClick={contentRef =>
                                    this.onStructureCardClick(
                                      contentRef,
                                      module
                                    )
                                  }
                                  active={
                                    selected_module_content_reference ===
                                    content.module_seq_id
                                  }
                                />
                              );
                            })}
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              );
            })}
        </div>
        {Branding.BOTTOM_BRANDING && (
          <div style={{ textAlign: "center", margin: "1rem" }}>
            <Branding.BottomLogo3 style={{ height: "3.5rem", width: "auto" }} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(StructureList);
