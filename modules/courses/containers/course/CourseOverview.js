import { connect } from "react-redux";
import get from "lodash/get";
import {
  selectMarketPlaceCourse,
  getMarketPlaceCourses,
  enrollCourse,
  getCourse,
  enroll
} from "../../redux/actions";
import {
  getModules,
  resumeModule
} from "../../modules/courseModules/redux/actions";

const mapStateToProps = (state, props) => {
  const {
    match: {
      params: { course_code }
    }
  } = props;
  const {
    courses: {
      selected_course_reference,
      by_course_code,
      marketplace_courses_loading,
      fetch_marketplace_courses_succeeded,
      modules
    },
    profile: {
      info: { name },
      profile_loaded
    },
    auth: { is_logged_in }
  } = state;

  const course = by_course_code[course_code];
  const course_modules = modules.by_course_code[course_code];

  const is_upcoming_content =
    course && course.category.toUpperCase().indexOf("UPCOMING") >= 0;
  const primary_caption =
    course && get(course, "_links.resume")
      ? "Resume"
      : get(course, "_links.start")
      ? "Start"
      : "Get Started";

  return {
    course,
    modules: course_modules,
    modules_requested: modules.fetch_course_modules_requested,
    marketplace_courses_loading,
    selected_course_reference,
    fetch_marketplace_courses_succeeded,
    is_upcoming_content,
    primary_caption,
    name,
    is_logged_in,
    profile_loaded
  };
};

export default connect(mapStateToProps, {
  selectMarketPlaceCourse,
  getMarketPlaceCourses,
  getCourse,
  resumeModule,
  getModules,
  enrollCourse,
  enroll
});
