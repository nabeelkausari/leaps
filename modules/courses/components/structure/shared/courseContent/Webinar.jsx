import React, { Component, Fragment } from "react";
import { CourseContentTiles } from "./CourseContentTiles";
import { Button } from "../../../../../../components/Buttons/Button";
import "../../../../styles/quizDetail.scss";
import Material from "../../../../../material/components/Material";

class Webinar extends Component {
  joinWebinar = link => {
    window.open(link, "_blank");
  };

  render() {
    const { webinar } = this.props;

    let tiles = webinar && [
      {
        primary: webinar.date,
        secondary: "Date"
      },
      {
        primary: webinar.startTime,
        secondary: "Start Time"
      },
      {
        primary: webinar.duration,
        secondary: "Duration"
      }
    ];
    return (
      <div className="course-module-content__webinar-content">
        <Fragment>
          {tiles && (
            <div className="course-module-content__webinar-tiles">
              <CourseContentTiles tiles={tiles} webinar />
            </div>
          )}
          <div className="course-module-content__webinar-material">
            <Material material_link={webinar._links.material} course_content />
          </div>
          <div className="course-module-content__content-actions course-module-content__content-actions--quiz">
            {!!webinar.liveLink && (
              <Button
                variant="primary"
                size="md"
                onClick={() => this.joinWebinar(webinar.liveLink)}
              >
                Join Now
              </Button>
            )}

            {!!webinar.recordedLink && (
              <Button
                variant="primary"
                size="md"
                onClick={() => this.joinWebinar(webinar.recordedLink)}
              >
                Join Now
              </Button>
            )}
          </div>
        </Fragment>
      </div>
    );
  }
}

export default Webinar;
