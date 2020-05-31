import { connect } from "react-redux";
import { getCourse, getMarketPlaceCourses } from "../../redux/actions";
import {
  getModules,
  markModuleContentAsViewed,
  updateModuleProgress
} from "../../modules/courseModules/redux/actions";
import { dialogs } from "../../../toPublish/Dialog";
import {
  checkForActiveQuiz,
  hideQuizAnswers,
  resetQuiz,
  setActiveQuiz,
  submitQuiz
} from "../../modules/quiz/redux/actions";

const mapStateToProps = (state, props) => {
  const {
    courses: {
      by_course_code,
      modules,
      fetch_marketplace_courses_succeeded,
      marketplace_courses_loading,
      modules: {
        fetch_course_modules_succeeded,
        fetch_course_modules_requested
      }
    },
    quiz: { active_quiz, show_quiz_answers, quiz_over }
  } = state;
  const {
    match: {
      params: { course_code }
    }
  } = props;
  const course = by_course_code[course_code];
  return {
    active_quiz,
    fetch_course_modules_requested,
    fetch_course_modules_succeeded,
    marketplace_courses_loading,
    fetch_marketplace_courses_succeeded,
    course,
    course_name: course && course.title,
    modules: modules.by_course_code[course_code] || [],
    show_quiz_answers,
    quiz_over
  };
};

export default connect(mapStateToProps, {
  getMarketPlaceCourses,
  getCourse,
  getModules,
  showDialog: dialogs.show,
  markModuleContentAsViewed,
  updateModuleProgress,
  setActiveQuiz,
  checkForActiveQuiz,
  hideQuizAnswers,
  resetQuiz
});
