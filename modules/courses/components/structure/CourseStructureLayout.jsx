import React, { Component } from "react";
import CourseModuleList from "./shared/StructureList";
import StructureContent from "./shared/StructureContent";
import { groupBy, map } from "ramda";
import get from "lodash/get";
import Loader from "../../../../components/Loader";
import cx from "classnames";

import {
  overview_icon,
  pdf_icon,
  quiz_icon,
  simulation_icon,
  video_icon,
  webinar_icon,
  OverViewIcon,
  VideoIcon,
  DocumentIcon,
  CheckedIcon,
  WebinarIcon,
  PuzzleIcon,
  BoxQuizIcon
} from "../../../../../common/images";
import ActiveQuizBar from "./shared/courseContent/ActiveQuizBar";
import { getLocalStorage } from "../../../../../common/utils/storage";
import { ACTIVE_QUIZ_ID } from "../../../../../common/utils/constants";
import { quiz_links } from "../../../../../common/api/quizLinks";
import { hideQuizAnswers } from "../../modules/quiz/redux/actions";
import { withRouter } from "react-router-dom";

const byUri = (items, module_ref) => {
  let result = {};
  if (!items) return result;
  items.forEach(item => {
    result[item.module_seq_id] = { ...item, module_ref };
  });
  return result;
};

const getOverviewContentId = (modules, module_seq_id) => {
  const [module] = modules.filter(
    m => m.sequence_number === Number(module_seq_id)
  );
  return get(module, "module_contents[0].module_seq_id");
};

class CourseStructureLayout extends Component {
  state = {
    selected_module_content_reference: null
  };

  componentDidMount() {
    const {
      getModules,
      match,
      course,
      getCourse,
      modules,
      active_quiz,
      updateModuleProgress
    } = this.props;
    if (!course) {
      getCourse();
    }

    if (course && !modules.length) {
      getModules(match.params.course_code);
    }

    if (modules.length) {
      this.setState({
        selected_module_content_reference: getOverviewContentId(
          modules,
          match.params.module_sequence
        )
      });

      const module = [...modules].shift();
      if (module && get(module, "_links.start")) {
        updateModuleProgress(module, match.params.course_code);
      }
    }
    const quiz_id = getLocalStorage(ACTIVE_QUIZ_ID, false);
    if (quiz_id && !active_quiz.id) {
      this.props.checkForActiveQuiz(quiz_links.getQuizStatus(quiz_id), quiz_id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      fetch_marketplace_courses_succeeded,
      modules,
      fetch_course_modules_succeeded,
      getModules,
      updateModuleProgress,
      match: {
        params: { course_code, module_sequence }
      }
    } = this.props;

    if (
      fetch_marketplace_courses_succeeded &&
      fetch_marketplace_courses_succeeded !==
        prevProps.fetch_marketplace_courses_succeeded
    ) {
      getModules(course_code);
    }

    if (
      fetch_course_modules_succeeded &&
      fetch_course_modules_succeeded !==
        prevProps.fetch_course_modules_succeeded
    ) {
      this.setState({
        selected_module_content_reference: getOverviewContentId(
          modules,
          module_sequence
        )
      });
      const module = [...modules].shift();
      if (module && get(module, "_links.start")) {
        updateModuleProgress(module, course_code);
      }
    }
  }

  onModuleContentSelect = module_seq => {
    const { quiz_over, show_quiz_answers } = this.props;
    const { selected_module_content_reference } = this.state;

    const modules_by_uri = this.loadModulesByUri();
    const module = modules_by_uri[selected_module_content_reference];
    if (module.type === "QUIZ") {
      if (quiz_over) {
        this.props.resetQuiz();
      }
      if (show_quiz_answers) {
        this.props.hideQuizAnswers();
      }
    }

    this.setState({ selected_module_content_reference: module_seq });
  };

  getContentData = content => {
    switch (content.type) {
      case "MATERIAL":
        return {
          content_reference: content.module_seq_id,
          type: content.type,
          ...content.data,
          title: "Overview",
          icon: OverViewIcon
        };
      case "PDF":
        return {
          content_reference: content.module_seq_id,
          ...content.data,
          title: content.data.title,
          icon: DocumentIcon,
          type: content.type,
          completed: content.data.view_count && content.data.view_count > 0
        };
      case "VIDEO":
        return {
          content_reference: content.module_seq_id,
          ...content.data,
          title: content.data.title,
          icon: VideoIcon,
          completed: content.data.view_count && content.data.view_count > 0
        };
      case "APPLY":
        return {
          content_reference: content.module_seq_id,
          ...content.data,
          title: content.data.title || "Practice Simulation",
          icon: BoxQuizIcon,
          completed: content.data.progress_status.toUpperCase() === "COMPLETED"
        };
      case "SOLVE":
        return {
          content_reference: content.module_seq_id,
          ...content.data,
          title: content.data.title || "Solve",
          icon: BoxQuizIcon,
          completed: content.data.progress_status.toUpperCase() === "COMPLETED"
        };
      case "WEBINAR":
        return {
          content_reference: content.module_seq_id,
          type: content.type,
          ...content.data,
          title: content.data.name,
          icon: WebinarIcon,
          completed: content.data.viewed
        };
      case "QUIZ":
        return {
          content_reference: content.module_seq_id,
          ...content.data,
          title: content.data.details.name || "Quiz",
          icon: PuzzleIcon,
          completed: content.data.progress_status.toUpperCase() === "COMPLETED"
        };
    }
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  loadModulesByUri = () => {
    const { modules } = this.props;
    let module_contents_by_uri = {};
    if (modules && modules.length === 0)
      return console.log("Modules are not loaded");
    modules.forEach(module => {
      module_contents_by_uri = {
        ...module_contents_by_uri,
        ...byUri(module.module_contents, module._links.self.href)
      };
    });
    return module_contents_by_uri;
  };

  render() {
    const {
      modules,
      course_name,
      marketplace_courses_loading,
      fetch_course_modules_requested,
      active_quiz,
      showDialog,
      markModuleContentAsViewed,
      show_quiz_answers,
      updateModuleProgress
    } = this.props;
    const { selected_module_content_reference } = this.state;
    const module_contents_by_uri = this.loadModulesByUri();

    return (
      <div className="course-content-wrapper">
        <Loader
          loading={
            marketplace_courses_loading || fetch_course_modules_requested
          }
        />
        <div className="course-content">
          <div className="course-content__structure-panel">
            <CourseModuleList
              modules={modules}
              course_name={course_name}
              getContentData={this.getContentData}
              onModuleContentSelect={this.onModuleContentSelect}
              selected_module_content_reference={
                selected_module_content_reference
              }
              updateModuleProgress={updateModuleProgress}
              handleBack={this.handleBack}
            />
          </div>
          <div className="course-content__modules-board">
            <StructureContent
              modules={modules}
              getContentData={this.getContentData}
              selected_module_content_reference={
                selected_module_content_reference
              }
              module_contents_by_uri={module_contents_by_uri}
              active_quiz={active_quiz}
              showDialog={showDialog}
              markModuleContentAsViewed={markModuleContentAsViewed}
              show_quiz_answers={show_quiz_answers}
            />
          </div>
        </div>
        {selected_module_content_reference &&
          active_quiz.active_quiz_id &&
          active_quiz.active_quiz_id !==
            module_contents_by_uri[selected_module_content_reference].data
              .id && (
            <ActiveQuizBar active_quiz_id={active_quiz.active_quiz_id} />
          )}
      </div>
    );
  }
}
export default withRouter(CourseStructureLayout);
