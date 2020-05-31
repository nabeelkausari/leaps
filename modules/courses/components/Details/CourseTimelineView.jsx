import React, { Component, Fragment } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import cx from "classnames";

import "react-vertical-timeline-component/style.min.css";

import { pad } from "../../../../../common/utils/pad";
import {
  CalenderIcon,
  PdfIcon,
  QuizIcon,
  ShlCertificateIcon,
  SimulationIcon,
  VideoIcon
} from "../../../../../common/images";
import get from "lodash/get";

class CourseTimelineView extends Component {
  openModule = module => {
    if (!module.is_module_locked) {
      this.props.resumeModule(module._links.self.href);
    }
  };
  render() {
    const { modules, is_logged_in } = this.props;
    if (!modules) return null;
    const modules_list = modules.sort(
      (a, b) => a.ui_sequence_number - b.ui_sequence_number
    );
    return (
      <Fragment>
        <div className="course-timeline">
          <div>
            <VerticalTimeline layout="1-column">
              {modules_list.map((module, i) => (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  key={i}
                  iconStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.6rem"
                    // cursor: "pointer"
                  }}
                  // iconOnClick={
                  //   is_logged_in ? () => this.openModule(module) : null
                  // }
                  icon={pad(i + 1, 2)}
                >
                  <div className="timeline-element">
                    <div className="timeline-element__content">
                      <div className="timeline-element__content--title">
                        Module {pad(module.ui_sequence_number, 2)} :{"  "}
                        {module.title}
                      </div>
                      <div className="timeline-element__content--description">
                        {module.description}
                      </div>
                    </div>
                  </div>
                </VerticalTimelineElement>
              ))}
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                key="certificate"
                iconStyle={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.6rem"
                }}
                icon={pad(modules.length + 1, 2)}
              >
                <div className="timeline-element">
                  <div className="timeline-element__content--certificate">
                    Certificate will be awarded
                  </div>
                </div>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CourseTimelineView;
