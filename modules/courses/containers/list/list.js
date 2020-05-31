import { connect } from "react-redux";
import {
  getMarketPlaceCourses,
  selectMarketPlaceCourse
} from "../../redux/actions";
import {
  getModules,
  getModulesAndResumeCourse
} from "../../modules/courseModules/redux/actions";
import {
  getFilteredCourses,
  isCreator
} from "../../../../../common/utils/helperFunctions";

const mapStateToProps = (state, props) => {
  const {
    courses: { list, atoms_courses, marketplace_courses_loading },
    profile: { info }
  } = state;
  const is_creator = isCreator(info);

  return {
    course_list: getFilteredCourses(list),
    course_list_creator: getFilteredCourses(list, is_creator),
    atoms_courses,
    is_creator,
    marketplace_courses_loading
  };
};

export default connect(mapStateToProps, {
  getMarketPlaceCourses,
  selectMarketPlaceCourse,
  getModulesAndResumeCourse,
  getModules
});
