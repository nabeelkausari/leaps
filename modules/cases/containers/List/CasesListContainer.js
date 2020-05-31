import { connect } from "react-redux";
import {
  cloneCase,
  deleteCase,
  editCaseDescription,
  editCaseOverview,
  getAllCases,
  getCaseCategories,
  getCaseDetail,
  getCaseMaterial,
  getCases,
  getSampleCases
} from "../../redux/actions";
import { dialogs } from "../../../toPublish/Dialog";
import get from "lodash/get";

const mapStateToProps = (state, props) => {
  const {
    cases,
    collaborators,
    auth: { is_logged_in },
    profile: { profile_loaded, info }
  } = state;

  return {
    ...cases,
    collaborators,
    is_logged_in,
    profile_loaded,
    can_create_case: get(info, "_links.create_problem")
  };
};

export default connect(mapStateToProps, {
  getAllCases,
  getSampleCases,
  getCases,
  getCaseDetail,
  deleteCase,
  cloneCase,
  showDialog: dialogs.show,
  editCaseOverview,
  editCaseDescription,
  getCaseMaterial,
  getCaseCategories
});
