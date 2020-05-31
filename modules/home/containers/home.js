import { connect } from "react-redux";
import {
  getMarketPlaceCourses,
  selectMarketPlaceCourse
} from "../../courses/redux/actions";
import { IsAvailableCourse } from "../../courses/components/Shared/logic";
import { logout } from "../../auth/redux/actions";
import { enrolWebinar, fetchWebinars, unenrolWebinar } from "../redux/actions";

const mapStateToProps = (state, props) => {
  console.log("AVAILABLE_STATE: ", state)
  const {
    courses: { list, marketplace_courses_loading },
    auth: { is_logged_in },
    home
  } = state;
  let course_list = list.filter(course => IsAvailableCourse(course));

  return {
    course_list,
    courses_loading: marketplace_courses_loading,
    is_logged_in,
    ...home
  };
};

export default connect(mapStateToProps, {
  getMarketPlaceCourses,
  selectMarketPlaceCourse,
  logout,
  fetchWebinars,
  enrolWebinar,
  unenrolWebinar
});
