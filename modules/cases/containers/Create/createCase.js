import { connect } from "react-redux";

import {
  createBusinessProblem,
  createCase, createCaseAtoms,
  getCaseCategories,
  getRecommendations,
  selectRecommendation
} from "../../redux/actions";

const mapStateToProps = (state, props) => {
  return {
    case_create: state.cases.create,
    recommendations: state.cases.recommendations,
    recommendations_selections: state.cases.recommendations.selections,
    case_categories: state.cases.categories.list,
    is_create_case_loading: state.cases.is_create_case_loading
  };
};

export default connect(mapStateToProps, {
  createBusinessProblem,
  getRecommendations,
  selectRecommendation,
  getCaseCategories,
  createCase,
  createCaseAtoms
});
