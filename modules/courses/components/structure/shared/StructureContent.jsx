import React, { Component, Fragment } from "react";
import { get, upperCase } from "lodash";
import { MaterialDocument } from "./MaterialDocument";
import {
  setSessionStorage,
  SOLVE_LINK
} from "../../../../../../common/utils/storage";
import { withRouter } from "react-router-dom";
import Overview from "./courseContent/Overview";
import SolveAndApply from "./courseContent/SolveAndApply";
import QuizDetails from "./courseContent/QuizDetails";
import Quiz from "./courseContent/Quiz";
import Webinar from "./courseContent/Webinar";

const MarkAsViewed = ({ viewed, className, onClick }) => {
  return (
    <Fragment>
      {!viewed ? (
        <div className={className + "--active"} onClick={onClick}>
          <span>Mark as viewed</span>&nbsp;&nbsp;
          <i className="fa fa-square-o" />
        </div>
      ) : (
        <div className={className}>
          <span>Viewed</span>&nbsp;&nbsp;
          <i className="fa fa-check-square-o" />
        </div>
      )}
    </Fragment>
  );
};

class StructureContent extends Component {
  openSolve = () => {
    const {
      module_contents_by_uri,
      selected_module_content_reference,
      match: {
        params: { course_code }
      }
    } = this.props;
    const selected_module_content =
      module_contents_by_uri &&
      module_contents_by_uri[selected_module_content_reference];
    const { solve_id } = selected_module_content.data;

    this.props.history.push(
      `/solve/courses/${course_code}/${solve_id}/dataset`
    );
    setSessionStorage(
      SOLVE_LINK,
      get(selected_module_content, "data._links.self")
    );
  };

  handleMarkAsViewed = (
    type,
    view_link,
    module_content_reference,
    module_ref
  ) => {
    const {
      match: {
        params: { course_code }
      }
    } = this.props;
    this.props.showDialog({
      title: `Please confirm if you have viewed the ${type} ?`,
      yesButton: {
        text: "Yes",
        onClick: () => {
          this.props.markModuleContentAsViewed(
            view_link,
            module_content_reference,
            module_ref,
            course_code
          );
          return true;
        }
      },
      noButton: {
        text: "No"
      },
      items_centered: true
    });
  };

  checkForQuiz = content => {
    if (!content._links) return;
    if (content.title === "Quiz") return "quiz";
    return content._links.self.href.split("/")[1] === "quiz" ? "quiz" : null;
  };

  getType = selected_content =>
    selected_content.type
      ? selected_content.type
      : this.checkForQuiz(selected_content);

  render() {
    const {
      selected_module_content_reference,
      getContentData,
      module_contents_by_uri,
      active_quiz,
      show_quiz_answers
    } = this.props;
    const selected_module_content =
      module_contents_by_uri &&
      module_contents_by_uri[selected_module_content_reference];
    const selected_module_content_data = selected_module_content
      ? getContentData(selected_module_content)
      : { title: "HREF NOT FOUND" };
    return (
      <div className="course-module-content">
        {active_quiz.id === selected_module_content_data.id ||
        show_quiz_answers ? null : (
          <div className="course-module-content__header">
            <div
              className="course-module-content__title"
              title={selected_module_content_data.title}
            >
              {selected_module_content_data.title}
              {selected_module_content_data.type === "PDF" && " (PDF)"}
            </div>
            {(() => {
              switch (upperCase(selected_module_content_data.type)) {
                case "VIDEO":
                case "PDF":
                  return (
                    <MarkAsViewed
                      className="course-module-content__mark-as-viewed"
                      onClick={() =>
                        this.handleMarkAsViewed(
                          selected_module_content_data.type,
                          selected_module_content_data._links.viewed,
                          selected_module_content_data._links.self.href,
                          selected_module_content.module_ref
                        )
                      }
                      viewed={selected_module_content_data.view_count > 0}
                    />
                  );
                case "WEBINAR":
                  return (
                    <MarkAsViewed
                      className="course-module-content__mark-as-viewed"
                      onClick={() =>
                        this.handleMarkAsViewed(
                          selected_module_content_data.type,
                          selected_module_content_data._links.webinarViewed,
                          selected_module_content_data._links.self.href,
                          selected_module_content.module_ref
                        )
                      }
                      viewed={selected_module_content_data.viewed}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </div>
        )}
        <div className="course-module-content__main-content">
          {(() => {
            switch (upperCase(this.getType(selected_module_content_data))) {
              case "VIDEO":
              case "PDF":
                return (
                  <MaterialDocument
                    document={selected_module_content_data}
                    key={selected_module_content_data._links.self.href}
                  />
                );
              case "WEBINAR":
                return (
                  <Webinar
                    webinar={
                      module_contents_by_uri[selected_module_content_reference]
                        .data
                    }
                  />
                );
              case "SOLVE":
              case "APPLY":
                return (
                  <SolveAndApply
                    solve={selected_module_content_data}
                    primary_action={this.openSolve}
                  />
                );
              case "MATERIAL":
                return <Overview overview={selected_module_content_data} />;
              case "QUIZ":
                return active_quiz.active_quiz_id ===
                  selected_module_content_data.id ? (
                  <Quiz quiz_id={selected_module_content_data.id} />
                ) : (
                  <QuizDetails quiz_id={selected_module_content_data.id} />
                );
                return (
                  <Overview
                    overview_link={selected_module_content_data._links.self}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    );
  }
}
export default withRouter(StructureContent);
