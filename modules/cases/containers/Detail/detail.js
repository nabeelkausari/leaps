import { connect } from "react-redux";
import {
  cloneCase,
  deleteCase,
  editCaseDescription,
  editCaseOverview,
  getAllCases,
  getCaseById,
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
    profile_loaded
  };
};

export default connect(mapStateToProps, {
  getCaseDetail,
  cloneCase,
  showDialog: dialogs.show,
  editCaseOverview,
  editCaseDescription,
  getCaseMaterial,
  getCaseById
});
