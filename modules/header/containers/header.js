import { connect } from "react-redux";
import { getMarketPlaceCourses } from "../../courses/redux/actions";

const mapStateToProps = (state, props) => {
  const {
    cases: { current_case, fetch_case_details_succeeded },
  } = state;

  return {
    current_case: current_case.info,
    fetch_case_details_succeeded,
  };
};

export default connect(mapStateToProps, {
  getMarketPlaceCourses
});
