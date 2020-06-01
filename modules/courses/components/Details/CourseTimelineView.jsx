import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";

import { pad } from "../../../../common/utils/pad"

const CourseTimelineView = ({ modules }) => {
  if (!modules) return null;
  const modules_list = modules.sort(
    (a, b) => a.ui_sequence_number - b.ui_sequence_number
  );
  return (
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
              }}
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
  );
}

export default CourseTimelineView;
