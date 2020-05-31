import { connect } from "react-redux";
import { createCourse } from "../redux/actions";

const mapStateToProps = (state, props) => {
  const {
    courses: {}
  } = state;

  return {};
};

export default connect(mapStateToProps, { createCourse });
