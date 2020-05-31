import { connect } from "react-redux";
import { getCourse } from "../../../redux/actions";
import {
  editCourse,
  makeCourseHidden,
  makeCoursePublic, publishCourse
} from "../redux/actions";
import { dialogs } from "../../../../toPublish/Dialog";

const mapStateToProps = (
  state,
  {
    match: {
      params: { course_code }
    }
  }
) => {
  const {
    courses: {
      by_course_code,
      fetch_marketplace_courses_succeeded,
      marketplace_courses_loading
    }
  } = state;

  return {
    course: by_course_code[course_code],
    marketplace_courses_loading,
    fetch_marketplace_courses_succeeded
  };
};

export default connect(mapStateToProps, {
  editCourse,
  getCourse,
  makeCoursePublic,
  makeCourseHidden,
  publishCourse,
  showDialog: dialogs.show
});
